import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { verifyToken } from '~/lib/auth';
import { writeFile } from 'fs/promises';
import fs from 'fs'

export async function POST(request: NextRequest) {
  try {
    verifyToken(request.headers)

    const form = await request.formData();
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

    const file = form.get('file')
    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 500 })
    }

    const buffer = Buffer.from(await (file as any).arrayBuffer())
    const fileName = (file as any).name.replaceAll(" ", '-') || `uploaded-file-${new Date().getTime().toString()}`;

    const sanitizedFileName = path.basename(fileName).replace(/[^a-zA-Z0-9.\-_]/g, '-');

    if (!sanitizedFileName) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const fileExtension = path.extname(sanitizedFileName).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    await writeFile(path.join(process.cwd(), 'uploads/' + sanitizedFileName), buffer)

    return NextResponse.json({ message: 'File uploaded successfully', fileName: sanitizedFileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}