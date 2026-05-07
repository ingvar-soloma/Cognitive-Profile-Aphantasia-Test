import os
import json
import hashlib
from typing import List, Tuple, Dict, Any
from pathlib import Path
import logging

import tree_sitter
import tree_sitter_typescript as ts_ts
import tree_sitter_python as ts_py

import lancedb
from lancedb.pydantic import LanceModel, Vector
from sentence_transformers import SentenceTransformer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Config
INDEXER_DIR = Path(__file__).parent
DATA_DIR = INDEXER_DIR / ".lancedb_data"
DATA_DIR.mkdir(exist_ok=True)
STATE_FILE = DATA_DIR / "index_state.json"
DB_PATH = str(DATA_DIR / "lancedb")

# Initializing sentence-transformer
embed_model = None

class CodeChunk(LanceModel):
    id: str
    file_path: str
    content: str
    node_type: str
    start_line: int
    end_line: int
    vector: Vector(384) # type: ignore

def get_embed_model():
    global embed_model
    if embed_model is None:
        logger.info("Loading sentence-transformers model...")
        embed_model = SentenceTransformer("all-MiniLM-L6-v2")
    return embed_model

def get_db_table():
    db = lancedb.connect(DB_PATH)
    if "code_chunks" not in db.table_names():
        return db.create_table("code_chunks", schema=CodeChunk)
    else:
        return db.open_table("code_chunks")

def load_state() -> Dict[str, str]:
    if STATE_FILE.exists():
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    return {}

def save_state(state: Dict[str, str]):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def chunk_node(node: tree_sitter.Node, source_bytes: bytes, max_chars: int = 1500) -> List[Tuple[int, int, str, str]]:
    """Returns chunks: [(start_line, end_line, node_type, text)]"""
    try:
        node_text = source_bytes[node.start_byte:node.end_byte].decode("utf-8", errors="replace")
    except Exception:
        return []
    
    if len(node_text) <= max_chars:
        return [(node.start_point[0], node.end_point[0], node.type, node_text)]
        
    chunks = []
    current_chunk_text = ""
    current_start_line = -1
    current_end_line = -1
    
    if not node.children:
        return [(node.start_point[0], node.end_point[0], node.type, node_text)]
        
    for child in node.children:
        try:
            child_text = source_bytes[child.start_byte:child.end_byte].decode("utf-8", errors="replace")
        except Exception:
            continue
            
        if len(child_text) > max_chars:
            if current_chunk_text:
                chunks.append((current_start_line, current_end_line, node.type, current_chunk_text))
                current_chunk_text = ""
                current_start_line = -1
                current_end_line = -1
            chunks.extend(chunk_node(child, source_bytes, max_chars))
        else:
            if len(current_chunk_text) + len(child_text) + 1 > max_chars and current_chunk_text:
                chunks.append((current_start_line, current_end_line, node.type, current_chunk_text))
                current_chunk_text = child_text
                current_start_line = child.start_point[0]
                current_end_line = child.end_point[0]
            else:
                if not current_chunk_text:
                    current_start_line = child.start_point[0]
                current_chunk_text += "\n" + child_text if current_chunk_text else child_text
                current_end_line = child.end_point[0]
                
    if current_chunk_text:
        chunks.append((current_start_line, current_end_line, node.type, current_chunk_text))
        
    return chunks

def hash_content(file_path: str, content: str) -> str:
    return hashlib.sha256(f"{file_path}:{content}".encode("utf-8")).hexdigest()

def get_parser(ext: str) -> tree_sitter.Parser:
    parser = tree_sitter.Parser()
    if ext == ".py":
        lang = tree_sitter.Language(ts_py.language())
    elif ext == ".tsx":
        lang = tree_sitter.Language(ts_ts.language_tsx())
    elif ext == ".ts":
        lang = tree_sitter.Language(ts_ts.language_typescript())
    else:
        return None
    parser.language = lang
    return parser

def update_index(project_dir: str):
    logger.info(f"Scanning project: {project_dir}")
    state = load_state()
    table = get_db_table()
    
    new_state = {}
    updates_performed = False
    
    # Process files
    extensions = [".py", ".ts", ".tsx"]
    ignore_dirs = {".git", ".vscode", "node_modules", ".idea", "dist", "venv", "__pycache__", "mcp_indexer"}
    
    chunks_to_insert = []
    
    try:
        model = get_embed_model()
    except Exception as e:
        logger.error(f"Failed to load embed model: {e}")
        return
        
    for root, dirs, files in os.walk(project_dir):
        dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith(".")]
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext not in extensions: continue
            
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_dir)
            
            with open(file_path, "rb") as f:
                source_bytes = f.read()
                
            parser = get_parser(ext)
            if not parser: continue
            
            tree = parser.parse(source_bytes)
            
            # Split to chunks
            file_chunks = chunk_node(tree.root_node, source_bytes)
            
            for i, (start, end, node_type, text) in enumerate(file_chunks):
                chunk_hash = hash_content(rel_path, text)
                chunk_id = f"{rel_path}_{i}"
                
                new_state[chunk_id] = chunk_hash
                
                # Check if it exists and hash matches
                if state.get(chunk_id) == chunk_hash:
                    continue
                    
                # Needs update
                chunks_to_insert.append({
                    "id": chunk_id,
                    "file_path": rel_path,
                    "content": text,
                    "node_type": node_type,
                    "start_line": start,
                    "end_line": end,
                    "text_to_embed": f"File: {rel_path}\n{text}"
                })
                
    # If chunks to insert, generate embedding and upsert
    if chunks_to_insert:
        logger.info(f"Generating vectors for {len(chunks_to_insert)} changed/new chunks...")
        texts = [c.pop("text_to_embed") for c in chunks_to_insert]
        embeddings = model.encode(texts)
        
        for i, chunk in enumerate(chunks_to_insert):
            chunk["vector"] = embeddings[i]
            
        # Bulk upsert (LanceDB table overwrite isn't right, we should append, wait... 
        # Actually in LanceDB, the easiest way to "upsert" is to delete by id and add, or use mergeInsert if pk exists
        # Or simple: if we are using an ID, but lance doesn't strictly enforce unique PKs implicitly without a merge.
        # Let's delete existing by id if they exist, then append. Or just delete all old ones from this file?
        # A simple wipe of all chunks whose IDs are in chunks_to_insert:
        ids_to_del = [c["id"] for c in chunks_to_insert]
        try:
            # construct filter string for IDs
            id_list_str = ", ".join([f"'{i}'" for i in ids_to_del])
            table.delete(f"id IN ({id_list_str})")
        except Exception as e:
            pass # might fail if no such rows exist
            
        table.add(chunks_to_insert)
        updates_performed = True
        
    # Also find deleted chunks to remove from LanceDB
    deleted_ids = [cid for cid in state.keys() if cid not in new_state]
    if deleted_ids:
        logger.info(f"Removing {len(deleted_ids)} deleted chunks...")
        try:
            id_list_str = ", ".join([f"'{i}'" for i in deleted_ids])
            table.delete(f"id IN ({id_list_str})")
        except Exception:
            pass
        updates_performed = True
        
    save_state(new_state)
    if updates_performed:
        logger.info("Index update complete!")
    else:
        logger.info("Index is up to date.")

if __name__ == "__main__":
    update_index(os.path.abspath(os.path.join(INDEXER_DIR, "..")))
