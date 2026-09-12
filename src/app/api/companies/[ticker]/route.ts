import { NextRequest, NextResponse } from 'next/server';
import { getQuote, getHistory } from '@/lib/providers/yahoo';

export async function GET(request: NextRequest, { params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const range = request.nextUrl.searchParams.get('range') || '1y';
  const symbol = decodeURIComponent(ticker);
  const [quote, history] = await Promise.all([getQuote(symbol), getHistory(symbol, range)]);
  return NextResponse.json({ quote, history });
}
