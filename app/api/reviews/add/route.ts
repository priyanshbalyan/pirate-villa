import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const data = await req.json();
  const {
    name,
    title,
    content,
    rating,
    villaType
  } = data

  if (!name) return NextResponse.json({ error: 'Missing required fields: name' }, { status: 400 });
  if (!title) return NextResponse.json({ error: 'Missing required fields: title' }, { status: 400 });
  if (!content) return NextResponse.json({ error: 'Missing required fields: content' }, { status: 400 });
  if (!rating) return NextResponse.json({ error: 'Missing required fields: Rating' }, { status: 400 });
  if (!villaType) return NextResponse.json({ error: 'Missing required fields: villa type' }, { status: 400 });
  if (villaType !== 'north' && villaType !== 'south') return NextResponse.json({ error: 'villa type can only be north or south' }, { status: 400 });
  if (Number.isNaN(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: 'Rating can only be between 1 and 5' }, { status: 400 });

  try {
    const db = await openDb();

    await db.run(
      'INSERT INTO reviews (name, title, content, isApproved, createdAt, rating, villaType) VALUES (?, ?, ?, ?, ?, ?, ?)',
      name, title, content, false, new Date().toISOString(), rating, villaType
    );

    return NextResponse.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Review add error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}