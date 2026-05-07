import os
import sys
from pydantic import Field
from mcp.server.fastmcp import FastMCP

# Append local path so we can import indexer
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import indexer

mcp = FastMCP("MicroIndex")

@mcp.tool()
def update_index(project_dir: str = Field(description="Absolute path to the project root directory")):
    """
    Scans the project directory, computes hashes, and incrementally updates the vectors
    in the LanceDB database. Use this command to sync changes before searching.
    """
    indexer.update_index(project_dir)
    return "Project indexing complete. The vectors are up to date."

@mcp.tool()
def search_code(query: str = Field(description="Natural language query to find in the codebase"), 
                top_k: int = Field(default=5, description="Number of results to return")):
    """
    Converts a natural language query into an embedding and searches the local LanceDB vector,
    returning the top_k most relevant semantic code chunks.
    """
    try:
        table = indexer.get_db_table()
        model = indexer.get_embed_model()
    except Exception as e:
        return f"Failed to load table or model: {e}"
        
    query_vector = model.encode([query])[0]
    
    try:
        # lancedb vector search
        results = table.search(query_vector).limit(top_k).to_list()
    except Exception as e:
        return f"Search failed: {e}"
        
    formatted_results = []
    for r in results:
        score = r.get('_distance', 0)
        formatted_results.append(
            f"Result (Score: {score:.4f}) - File: {r['file_path']} (lines {r['start_line']}-{r['end_line']})\n"
            f"```\n{r['content']}\n```"
        )
        
    if not formatted_results:
        return "No results found. Did you run update_index() first?"
        
    return "\n\n====================\n\n".join(formatted_results)

@mcp.tool()
def get_code_chunk(file_path: str = Field(description="Relative path to the file"), 
                   node_type: str = Field(default="", description="Optional tree-sitter node type (e.g. function_declaration, class_declaration)")):
    """
    Retrieves specific code chunks directly from the LanceDB index for a given file.
    Optionally filters by node type.
    """
    try:
        table = indexer.get_db_table()
    except Exception as e:
        return f"Database error: {e}"
        
    try:
        # Use simple string matching or LanceDB exact matching
        if node_type:
            # We filter via where clause
            # lancedb sql filter
            results = table.search().where(f"file_path = '{file_path}' AND node_type = '{node_type}'").limit(50).to_list()
        else:
            results = table.search().where(f"file_path = '{file_path}'").limit(100).to_list()
    except Exception as e:
        return f"Query failed: {e}"
        
    formatted_results = []
    for r in results:
        formatted_results.append(
            f"File: {r['file_path']} (lines {r['start_line']}-{r['end_line']}, type: {r['node_type']})\n"
            f"```\n{r['content']}\n```"
        )
        
    if not formatted_results:
        return f"No chunks found for {file_path}. Make sure the path exactly matches."
        
    return "\n\n====================\n\n".join(formatted_results)

if __name__ == "__main__":
    mcp.run()
