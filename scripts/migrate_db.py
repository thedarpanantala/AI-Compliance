import os
import sys
import psycopg2
from pathlib import Path

# Migration SQL content
SQL = """
-- Add any missing tables for the 12 tabs
CREATE TABLE IF NOT EXISTS system_discovery (
    id VARCHAR(64) PRIMARY KEY,
    org_id VARCHAR(64),
    discovered_name VARCHAR(255),
    discovery_type VARCHAR(50), 
    meta_info JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'unassigned'
);

-- Ensure all other tables from migration.sql are applied
"""

def run_migration():
    print("🚀 Starting Database Migration...")
    
    # Try to get database connection from env
    db_url = os.getenv("DATABASE_URL")
    if not db_url or "@db:" in db_url:
        print("❌ DATABASE_URL is missing or using placeholder '@db'.")
        print("Please provide the full Supabase Connection String (with password).")
        return

    try:
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        with conn.cursor() as cur:
            # We'll read the full migration.sql if it exists
            migration_file = Path(__file__).parent.parent / "artifacts" / "migration.sql"
            if migration_file.exists():
                sql_content = migration_file.read_text()
                print(f"📖 Reading migration from {migration_file.name}...")
            else:
                sql_content = SQL
            
            cur.execute(sql_content)
            print("✅ Migration applied successfully!")
    except Exception as e:
        print(f"❌ Error applying migration: {e}")
        print("\nTIP: If authentication failed, ensure your DATABASE_URL includes the DB password.")

if __name__ == "__main__":
    run_migration()
