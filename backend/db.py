import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor

logger = logging.getLogger(__name__)

def get_db():
    database_url = os.getenv("DATABASE_URL")
    
    # If DATABASE_URL is not set directly, try constructing it 
    # from the individual variables the user provided
    if not database_url:
        db_user = os.getenv("DB_USER", "user")
        db_password = os.getenv("DB_PASSWORD", "password")
        db_name = os.getenv("DB_NAME", "lugabus")
        db_host = os.getenv("DB_HOST", "host.docker.internal")
        db_port = os.getenv("LOCAL_DB_PORT", "5432")
        database_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
        
    try:
        conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        logger.error(f"Could not connect to database: {e}")
        raise e

def init_db():
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # We use a prefixed table name to avoid conflicts with your main app's users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS aphantasia_users (
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255),
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                photo_url TEXT,
                is_guest BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')
        # In case the table was created just before we added is_guest:
        try:
            cursor.execute("ALTER TABLE aphantasia_users ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT FALSE")
        except Exception:
            pass
        conn.commit()
        conn.close()
        logger.info("PostgreSQL Database initialized correctly")
    except Exception as e:
        logger.error(f"Failed to initialize PostgreSQL database: {e}")
