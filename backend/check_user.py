import asyncio
import asyncpg
import os
import json
from dotenv import load_dotenv

load_dotenv()

async def run():
    url = os.getenv("DATABASE_URL")
    if not url:
        db_user = os.getenv("DB_USER", "user")
        db_password = os.getenv("DB_PASSWORD", "password")
        db_name = os.getenv("DB_NAME", "postgres")
        db_host = os.getenv("DB_HOST", "localhost")
        db_port = os.getenv("LOCAL_DB_PORT", "5432")
        url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
        
    print(f"Connecting to {url}...")
    conn = await asyncpg.connect(url)
    
    user_id = '100861017981316478259' # Ingvar-Ihor
    row = await conn.fetchrow("SELECT answers, scores, recommendations FROM test_results WHERE user_id = $1 AND test_type = $2", user_id, 'full_aphantasia_profile')
    
    if row:
        ans = row['answers']
        print("\n--- ANSWERS ---")
        print(type(ans))
        print(ans)
        
        scores = row['scores']
        print("\n--- SCORES ---")
        print(scores)
    else:
        print(f"\nNo results found for {user_id}")
        
    await conn.close()

if __name__ == "__main__":
    asyncio.run(run())
