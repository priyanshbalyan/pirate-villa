const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt');
const { startOfDay, addDays, format } = require('date-fns');
require('dotenv').config()

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
        villaType TEXT NOT NULL
      )
    `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pricing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      nightlyRate REAL NOT NULL,
      villaType TEXT NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS manual_adjustment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      nightlyRate REAL NOT NULL,
      villaType TEXT NOT NULL
    );
  `)

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

  await db.run(
    'INSERT INTO pricing (nightlyRate, startDate, endDate, villaType) VALUES (?, ?, ?, ?)',
    100,
    format(startOfDay(addDays(new Date(), 3)), 'yyyy-MM-dd'),
    format(startOfDay(addDays(new Date(), 7)), 'yyyy-MM-dd'),
    'north'
  );

  await db.run(
    'INSERT INTO manual_adjustment (nightlyRate, date, villaType) VALUES (?, ?, ?)',
    100,
    format(startOfDay(addDays(new Date(), 3)), 'yyyy-MM-dd'),
    'north'
  );

  await db.run(
    'INSERT INTO manual_adjustment (nightlyRate, date, villaType) VALUES (?, ?, ?)',
    200,
    format(startOfDay(addDays(new Date(), 3)), 'yyyy-MM-dd'),
    'south'
  );

  console.log('Database seeded.')
}

seed()