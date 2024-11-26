import { NextRequest } from 'next/server';
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
    const result = await db.run('DELETE FROM pricing WHERE id = ?', [id]);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: 'Pricing not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: `Pricing with ID ${id} deleted successfully` }), { status: 200 });
  } catch (error) {
    console.error('Error deleting pricing:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}