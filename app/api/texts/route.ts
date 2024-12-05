import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Text } from '~/types';
import { getTextMap } from '~/utils/utils';

export async function GET(req: Request) {
  try {
    const db = await openDb();
    const texts = await db.all<Text[]>('SELECT * FROM texts');

    const textMap = getTextMap(texts)
    return NextResponse.json(textMap);
  } catch (error) {
    console.error('Fetch texts error:', error);
    return NextResponse.json({ error: 'Unauthorized or server error' }, { status: 401 });
  }
}
