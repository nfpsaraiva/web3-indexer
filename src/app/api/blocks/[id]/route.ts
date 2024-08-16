import { getBlock } from '@/data/blocks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const block = await getBlock(Number(params.id));

  return NextResponse.json(block);
}
