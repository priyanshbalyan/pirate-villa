import { NextRequest } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';
import { TextMap } from '~/types';

export async function POST(req: NextRequest) {

  try {
    verifyToken(req.headers)

    const db = await openDb()
    const texts: TextMap = await req.json();

    for (const [textKey, textContent] of Object.entries(texts)) {
      const existingText = await db.get("SELECT id FROM texts WHERE text_key = ?", []);
      if (existingText) {
        await db.run("UPDATE texts SET content = ? WHERE text_key = ?", [JSON.stringify(textContent), textKey]);
      } else {
        await db.run("INSERT INTO texts (text_key, content) VALUES (?, ?)", [textKey, JSON.stringify(textContent)]);
      }
    }

    return new Response(JSON.stringify({ message: `Texts updated` }), { status: 200 });
  } catch (error) {
    console.error('Error updating texts:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}