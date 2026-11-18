import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

// Create the data directory if it does not exist.
const dataDirectory = path.resolve(process.cwd(), "data");
fs.mkdirSync(dataDirectory, { recursive: true });

// Open the SQLite database file.
const databasePath = path.join(dataDirectory, "coy.db");
const db = new Database(databasePath);

// Enable database performance and relationship settings.
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Create the profile and swipe tables.
db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    photo TEXT NOT NULL,
    bio TEXT NOT NULL,
    city TEXT NOT NULL,
    interests TEXT NOT NULL,
    liked_user INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS swipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL DEFAULT 1,
    profile_id INTEGER NOT NULL,
    action TEXT NOT NULL CHECK(action IN ('like', 'pass')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, profile_id),
    FOREIGN KEY(profile_id) REFERENCES profiles(id)
  );

  CREATE INDEX IF NOT EXISTS idx_swipes_user_id
  ON swipes(user_id);

  CREATE INDEX IF NOT EXISTS idx_swipes_profile_id
  ON swipes(profile_id);
`);

export default db;
