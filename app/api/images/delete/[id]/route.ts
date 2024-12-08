import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import fs from 'fs/promises'
import path from 'path';

interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = params; // Extract the ID from the route params

  try {
    verifyToken(req.headers)

    const sanitizedFileName = id.replace(/[^a-zA-Z0-9.\-_]/g, '-');

    // Ensure the file path is safe
    const filePath = path.resolve('./uploads', sanitizedFileName);

    await fs.unlink(filePath)

    return NextResponse.json({ message: `Image with url ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}