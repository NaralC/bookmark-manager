import connect, { DatabaseConnection, sql } from "@databases/sqlite";

let db: DatabaseConnection;
let initialized = false;

export const getDatabase = async (path: string) => {
  db = db || connect(path);

  if (!initialized) {
    await db.query(sql`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      icon_url TEXT NOT NULL,
      icon_version INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_DATE,
      updated_at DATETIME NOT NULL
    );
  `);
    initialized = true;
  }

  return db;
};
