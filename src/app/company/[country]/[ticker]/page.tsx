import { notFound } from 'next/navigation';
import { getMarket } from '@/lib/markets';
import { CompanyView } from '@/components/company-view';

export default async function CompanyPage({ params }: { params: Promise<{ country:string; ticker:string }> }) {
  const { country, ticker } = await params;
  if (!getMarket(country)) notFound();
  return <CompanyView ticker={decodeURIComponent(ticker)} />;
}
