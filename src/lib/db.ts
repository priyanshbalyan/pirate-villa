import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function openDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return open({
    filename: './my-database.sqlite',
    driver: sqlite3.Database,
  });
}

async function initializeDatabase(): Promise<void> {
  const db = await openDb();

  // Create `users` table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      password TEXT NOT NULL
    )
  `);

  // Create `bookings` table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      checkInDate TEXT NOT NULL,
      checkOutDate TEXT NOT NULL,
      villaType TEXT NOT NULL,
      transactionId TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pricing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      villaType TEXT NOT NULL,
      nightlyRate REAL NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS manual_adjustment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      villaType TEXT NOT NULL,
      nightlyRate REAL NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS texts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text_key TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      villaType TEXT NOT NULL,
      isApproved BOOLEAN NOT NULL,
      rating INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  console.log('Database initialized');
}

initializeDatabase()
  .catch((error) => console.error('Error initialising database: ', error))