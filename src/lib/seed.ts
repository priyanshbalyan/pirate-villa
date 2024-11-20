import { addDays, startOfDay } from 'date-fns';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

async function openDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    return open({
        filename: './my-database.sqlite',
        driver: sqlite3.Database,
    });
}

async function seed() {
    const db = await openDb();
    await db.exec(`
    INSERT INTO users 
    VALUES ('test@email.com', '${await bcrypt.hash('12345', 10)}')  
  `)

    await db.run(
        'INSERT INTO bookings (name, email, checkInDate, checkOutDate, villaType) VALUES (?, ?, ?, ?, ?)',
        'name',
        'test@email.com',
        startOfDay(addDays(new Date(), 3)).toISOString(),
        startOfDay(addDays(new Date(), 7)).toISOString(),
        'north'
    );

    console.log('Database seeded.')
}

seed()