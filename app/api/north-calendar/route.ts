import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Path to the file you want to serve
  const filePath = path.resolve('./public/north-calendar.ics'); // Replace with your file path
  
  // Read the file
  try {
    const fileData = fs.readFileSync(filePath);

    return new NextResponse(fileData, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain', // Adjust based on file type
        'Content-Disposition': 'attachment; filename="north-calendar.ics"', // File name for the download
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}