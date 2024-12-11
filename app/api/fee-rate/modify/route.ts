import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';
import { FeeAdjustment } from '~/types';

export async function POST(req: NextRequest) {

  try {
    verifyToken(req.headers)

    const db = await openDb()
    const body: FeeAdjustment = await req.json();

    for (let [title, value] of Object.entries(body)) {
      const existingText = await db.get("SELECT title FROM fee_rates WHERE title = ?", [title]);
      if (!existingText) {
        return NextResponse.json({ error: 'Unknown title in body ' + title }, { status: 400 })
      }
    }

    for (let [title, value] of Object.entries(body)) {
      await db.run('UPDATE fee_rates SET value = ? WHERE title = ?', [value, title])
    }

    return NextResponse.json({ message: `Fee rates updated` });
  } catch (error) {
    console.error('Error updating fee rates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}