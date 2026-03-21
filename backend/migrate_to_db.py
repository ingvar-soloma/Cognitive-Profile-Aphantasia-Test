import os
import json
import logging
import asyncio
import asyncpg
import sys
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

# Add current directory to path for local imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from db import get_db_url, init_db

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Config
DATA_DIR = os.getenv("DATA_DIR", "/app/data/results")
if not os.path.exists(DATA_DIR):
    # Try local path if inside backend folder
    DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "results")

async def migrate_to_db():
    if not os.path.exists(DATA_DIR):
        logger.error(f"Data directory {DATA_DIR} does not exist. Please check DATA_DIR environment variable.")
        return

    # 1. Initialize DB (ensure tables exist)
    await init_db()
    
    database_url = await get_db_url()
    conn = await asyncpg.connect(database_url)
    
    try:
        # Clean up database: Remove invalid test_type entries that were accidentally created
        logger.info("Cleaning up invalid test_type entries from DB...")
        deleted_count = await conn.execute('''
            DELETE FROM test_results 
            WHERE test_type NOT IN ('full_aphantasia_profile', 'express_demo', 'perfectionism_big_three', 'cognitive_style_test')
        ''')
        logger.info(f"Deleted invalid rows: {deleted_count}")

        files = [f for f in os.listdir(DATA_DIR) if f.endswith(".json")]
        logger.info(f"Found {len(files)} result files in {DATA_DIR}")

        processed_users = 0
        processed_results = 0

        for filename in files:
            path = os.path.join(DATA_DIR, filename)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                
                if not isinstance(data, dict):
                    logger.warning(f"Skipping {filename}: Not a dictionary structure (likely subscribers or other data)")
                    continue
                
                user_id = str(data.get("user_id") or filename.replace(".json", ""))
                
                # 1. Extract email
                email = data.get("email")
                if not email and data.get("auth"):
                    email = data["auth"].get("email")
                
                # 2. Extract results for each test type
                all_answers = data.get("answers", {})
                all_scores = data.get("scores", {})
                all_recs = data.get("gemini_recommendations", {})
                main_test_type = data.get("test_type", "full_aphantasia_profile")

                # Detect if answers are flat or keyed
                test_type_keys = ["full_aphantasia_profile", "express_demo", "perfectionism_big_three", "cognitive_style_test"]
                is_keyed = False
                if isinstance(all_answers, dict) and any(k in test_type_keys for k in all_answers.keys()):
                    is_keyed = True
                elif isinstance(all_scores, dict) and any(k in test_type_keys for k in all_scores.keys()):
                    is_keyed = True

                keyed_ans = all_answers
                keyed_scores = all_scores
                
                if not is_keyed:
                    # Transform flat to keyed if it's not already
                    logger.info(f"   -> Converting flat answers/scores for {user_id}")
                    keyed_ans = {main_test_type: all_answers} if isinstance(all_answers, dict) and all_answers else {}
                    keyed_scores = {main_test_type: all_scores} if isinstance(all_scores, dict) and all_scores else {}

                # 3. Ensure User exists
                await conn.execute('''
                    INSERT INTO aphantasia_users (id, email, first_name, last_name, photo_url, is_public, public_nickname, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (id) DO UPDATE SET
                        email = EXCLUDED.email,
                        first_name = EXCLUDED.first_name,
                        last_name = EXCLUDED.last_name,
                        photo_url = EXCLUDED.photo_url
                ''', 
                user_id, 
                email, 
                data.get("first_name"), 
                data.get("last_name"), 
                data.get("photo_url"),
                data.get("is_public", False), 
                data.get("public_nickname"),
                datetime.fromisoformat(data.get("created_at").replace("Z", "+00:00")).replace(tzinfo=None) if data.get("created_at") else datetime.now()
                )

                test_types = set()
                if isinstance(keyed_ans, dict): test_types.update(keyed_ans.keys())
                if isinstance(keyed_scores, dict): test_types.update(keyed_scores.keys())
                if main_test_type: test_types.add(main_test_type)

                for t_type in test_types:
                    if not isinstance(t_type, str) or not t_type: continue
                    if t_type not in test_type_keys: continue

                    answers = keyed_ans.get(t_type) if isinstance(keyed_ans, dict) else {}
                    scores = keyed_scores.get(t_type) if isinstance(keyed_scores, dict) else {}
                    
                    if not answers and not scores:
                         # Still try to migrate if there are recommendations
                         pass

                    recs = {}
                    if isinstance(all_recs, dict):
                        if t_type in all_recs: recs[t_type] = all_recs[t_type]
                        if f"{t_type}_versions" in all_recs: recs[f"{t_type}_versions"] = all_recs[f"{t_type}_versions"]
                        if f"{t_type}_current_index" in all_recs: recs[f"{t_type}_current_index"] = all_recs[f"{t_type}_current_index"]
                    elif isinstance(all_recs, str) and t_type == main_test_type:
                        recs[t_type] = all_recs

                    if not answers and not scores and not recs: continue

                    logger.info(f"   -> Migrating {t_type} for {user_id} ({len(answers) if isinstance(answers, dict) else 0} answers)")
                    await conn.execute('''
                        INSERT INTO test_results (user_id, test_type, answers, scores, recommendations)
                        VALUES ($1, $2, $3, $4, $5)
                        ON CONFLICT (user_id, test_type) DO UPDATE SET
                            answers = EXCLUDED.answers,
                            scores = EXCLUDED.scores,
                            recommendations = EXCLUDED.recommendations
                    ''', user_id, t_type, json.dumps(answers), json.dumps(scores), json.dumps(recs))
                    processed_results += 1

                processed_users += 1

            except Exception as e:
                logger.error(f"Failed to process {filename}: {e}")

        logger.info("-" * 40)
        logger.info(f"Migration to DB complete.")
        logger.info(f"Users processed: {processed_users}")
        logger.info(f"Total test results migrated: {processed_results}")

    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(migrate_to_db())
