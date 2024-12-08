const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt');
const { startOfDay, addDays, format } = require('date-fns');
require('dotenv').config()
const fs = require('fs')
const locale = require('../../public/locale/en.json')

async function openDb() {
  return open({
    filename: './my-database.sqlite',
    driver: sqlite3.Database,
  });
}

async function initializeDatabase() {
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


async function seed() {
  if (!process.env.ADMIN_PASS || !process.env.ADMIN_EMAIL) throw new Error('Admin not set!')
  const db = await openDb();

  await initializeDatabase()

  await db.exec(`
    INSERT INTO users (email, password)
    VALUES ('${process.env.ADMIN_EMAIL}', '${await bcrypt.hash(process.env.ADMIN_PASS, 10)}')
    ON CONFLICT (email) DO UPDATE SET
      password = excluded.password;
  `)

  for (let [textKey, textContent] of Object.entries(locale)) {
    const existingText = await db.get("SELECT id FROM texts WHERE text_key = ?", [textKey]);
    if (existingText) {
      await db.run("UPDATE texts SET content = ? WHERE text_key = ?", [JSON.stringify(textContent), textKey]);
    } else {
      await db.run("INSERT INTO texts (text_key, content) VALUES (?, ?)", [textKey, JSON.stringify(textContent)]);
    }
  }

  console.log('Database seeded.')
}

seed()