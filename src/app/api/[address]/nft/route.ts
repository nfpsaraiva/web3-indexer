import { getNfts } from '@/data/nft';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  const tokens = await getNfts(params.address);

  return NextResponse.json(tokens);
}
