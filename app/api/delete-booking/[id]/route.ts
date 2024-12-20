import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';

interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = params; // Extract the ID from the route params

  try {
    verifyToken(req.headers)
    const db = await openDb()
    const result = await db.run('DELETE FROM bookings WHERE id = ?', [id]);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `Booking with ID ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}