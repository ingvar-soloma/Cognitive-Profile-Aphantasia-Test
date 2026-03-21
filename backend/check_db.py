import asyncio
import asyncpg
import os
import json
from dotenv import load_dotenv

load_dotenv()

async def run():
    url = os.getenv("DATABASE_URL")
    if not url:
        # Construct from individual vars if DATABASE_URL is not set
        user = os.getenv("DB_USER", "postgres")
        password = os.getenv("DB_PASSWORD", "password")
        name = os.getenv("DB_NAME", "postgres")
        port = os.getenv("LOCAL_DB_PORT", "5432")
        url = f"postgresql://{user}:{password}@localhost:{port}/{name}"
        
    print(f"Connecting to {url}...")
    conn = await asyncpg.connect(url)
    
    users = await conn.fetch("SELECT id, email, first_name FROM aphantasia_users LIMIT 5")
    print("\n--- USERS ---")
    for u in users:
        print(dict(u))
        
    results = await conn.fetch("SELECT user_id, test_type, answers FROM test_results LIMIT 5")
    print("\n--- RESULTS ---")
    for r in results:
        d = dict(r)
        ans = d['answers']
        count = len(json.loads(ans)) if isinstance(ans, str) else len(ans) if ans else 0
        print(f"User: {d['user_id']}, Type: {d['test_type']}, Answers Count: {count}")
    
    await conn.close()

if __name__ == "__main__":
    asyncio.run(run())
