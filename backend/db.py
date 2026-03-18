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
        db_name = os.getenv("DB_NAME", "postgres")
        db_host = os.getenv("DB_HOST", "host.docker.internal")
        db_port = os.getenv("DB_PORT", os.getenv("LOCAL_DB_PORT", "5432"))
        database_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
        
    max_retries = 5
    for i in range(max_retries):
        try:
            conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
            return conn
        except Exception as e:
            if i == max_retries - 1:
                logger.error(f"Could not connect to database after {max_retries} attempts: {e}")
                raise e
            logger.warning(f"Database connection attempt {i+1} failed, retrying in 2s...")
            import time
            time.sleep(2)

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

        # Badges Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS badges (
                id SERIAL PRIMARY KEY,
                code VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                icon VARCHAR(255),
                description TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                is_secret BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        # User Badges Table (Many-to-Many)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_badges (
                user_id VARCHAR(255) REFERENCES aphantasia_users(id) ON DELETE CASCADE,
                badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
                assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, badge_id)
            )
        ''')

        conn.commit()
        conn.close()
        logger.info("PostgreSQL Database initialized correctly")
        
        # Run seeder
        seed_badges()
    except Exception as e:
        logger.error(f"Failed to initialize PostgreSQL database: {e}")

def seed_badges():
    badges = [
        {
            "code": "founding_member",
            "name": "Founding Member",
            "icon": "✨",
            "description": "For being one of the first 100 beta testers.",
            "is_active": True,
            "is_secret": False
        },
        {
            "code": "3_sigma_outlier",
            "name": "3-Sigma Outlier",
            "icon": "📊",
            "description": "For exceptional cognitive architecture significantly deviating from the mean.",
            "is_active": True,
            "is_secret": False
        },
        {
            "code": "ux_pioneer",
            "name": "UX Pioneer",
            "icon": "🎨",
            "description": "For helping fix critical mobile UI issues.",
            "is_active": True,
            "is_secret": False
        },
        {
            "code": "early_adopter",
            "name": "Early Adopter",
            "icon": "🚀",
            "description": "Joined during the initial launch phase of the project.",
            "is_active": True,
            "is_secret": False
        },
        {
            "code": "bug_hunter",
            "name": "Bug Hunter",
            "icon": "🐛",
            "description": "For reporting critical bugs that were fixed.",
            "is_active": True,
            "is_secret": False
        },
        {
            "code": "neurodiversity_advocate",
            "name": "Neurodiversity Advocate",
            "icon": "🧠",
            "description": "For contributing to the understanding of cognitive diversity.",
            "is_active": True,
            "is_secret": False
        }
    ]
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        for b in badges:
            cursor.execute('''
                INSERT INTO badges (code, name, icon, description, is_active, is_secret)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (code) DO UPDATE SET
                    name = EXCLUDED.name,
                    icon = EXCLUDED.icon,
                    description = EXCLUDED.description
            ''', (b["code"], b["name"], b["icon"], b["description"], b["is_active"], b["is_secret"]))
        conn.commit()
        conn.close()
        logger.info("Badges seeded successfully")
    except Exception as e:
        logger.error(f"Failed to seed badges: {e}")
