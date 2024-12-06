import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define supported MIME types
const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;

    // Validate filename
    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ message: 'Invalid filename' }, { status: 400 });
    }

    // Sanitize the filename to prevent path traversal
    const sanitizedFilename = path.basename(filename);

    // Construct the file path
    const filePath = path.join(process.cwd(), 'uploads', sanitizedFilename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    // Determine the content type dynamically
    const ext = path.extname(sanitizedFilename).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Return the file as a response
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}