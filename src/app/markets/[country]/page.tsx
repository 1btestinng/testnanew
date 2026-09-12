import { notFound } from 'next/navigation';
import { getMarket } from '@/lib/markets';
import { MarketExplorer } from '@/components/market-explorer';

export default async function MarketPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const market = getMarket(country);
  if (!market) notFound();
  return <MarketExplorer market={market} />;
}
