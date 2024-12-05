import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { verifyToken } from '~/lib/auth';
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    verifyToken(request.headers)

    const form = await request.formData();
    const uploadDir = path.join(process.cwd(), 'public');

    const file = form.get('file')
    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 500 })
    }

    const buffer = Buffer.from(await (file as any).arrayBuffer())
    const fileName = (file as any).name.replaceAll(" ", '-');

    await writeFile(path.join(process.cwd(), 'public/' + fileName), buffer)

    return NextResponse.json({ message: 'File uploaded successfully', fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}