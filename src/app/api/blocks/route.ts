import { getBlocks } from '@/data/blocks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  let cursor = Number(request.nextUrl.searchParams.get('cursor'));

  const blocks = await getBlocks(cursor);

  return NextResponse.json(blocks);
}
