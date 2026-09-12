import { NextRequest, NextResponse } from 'next/server';
import { getMarket } from '@/lib/markets';
import { searchCompanies } from '@/lib/providers/yahoo';

export async function GET(request: NextRequest, { params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const market = getMarket(country);
  if (!market) return NextResponse.json({ error:'Unknown market' }, { status:404 });
  const q = request.nextUrl.searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ companies: [] });
  const companies = await searchCompanies(q);
  return NextResponse.json({ market: market.country, companies });
}
