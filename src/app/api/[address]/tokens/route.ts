import { getTokens } from '@/data/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  const tokens = await getTokens(params.address);

  return NextResponse.json(tokens);
}
