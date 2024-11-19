import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import bcrypt from 'bcrypt';

export async function openDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return open({
    filename: './my-database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function initializeDatabase(): Promise<void> {
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

  // await db.exec(`
  //   INSERT INTO users 
  //   VALUES ('test@email.com', '${await bcrypt.hash('12345', 10)}')  
  // `)

  //  await db.exec(`
  //   INSERT INTO bookings 
  //   VALUES (1, 'Name', 'email@email.com', '2024-11-19T14:39:28.434Z', '2024-21-19T14:39:28.434Z', 'north')  
  // `)


  console.log('Database initialized');
}

initializeDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch((error) => console.error('Error initialising database: ', error))