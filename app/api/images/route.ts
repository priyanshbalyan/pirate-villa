import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';

function getPublicImageUrls(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    return /\.(jpe?g|png|gif|bmp|webp|avif)$/i.test(entry.name) ? [`/${entry.name}`] : [];
  }).filter(Boolean);
}

export async function GET(req: NextRequest) {
  try {
    verifyToken(req.headers)

    const imagesDirectory = path.join(process.cwd(), 'public');
    const imageUrls = getPublicImageUrls(imagesDirectory); // URLs relative to `public`
    return NextResponse.json(imageUrls);
  } catch (error) {
    console.log('Error occured while reading images: ', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}