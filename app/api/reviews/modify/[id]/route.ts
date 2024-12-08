import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';

interface Params {
  id: string;
  action: 'approve' | 'reject' | 'delete';
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { id } = params; // Extract the ID from the route params

  try {
    verifyToken(req.headers)
    const { action, isApproved } = await req.json()
    if (!action) return NextResponse.json({ error: 'Missing required parameter: action' }, { status: 400 })
    if (!['approve', 'reject', 'delete'].includes(action)) return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

    const db = await openDb()

    let result;
    if (action === 'approve') {

      result = await db.run('UPDATE reviews SET isApproved = ? WHERE id = ?', [true, id]);
    } else if (action === 'reject') {

      result = await db.run('UPDATE reviews SET isApproved = ? WHERE id = ?', [false, id]);
    } else if (action === 'delete') {

      result = await db.run('DELETE FROM reviews WHERE id = ?', [id]);
    }

    if (result?.changes === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `Review with ID ${id} updated successfully` });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}