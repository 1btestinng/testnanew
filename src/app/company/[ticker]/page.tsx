import { CompanyView } from '@/components/company-view';
export default async function LegacyCompanyPage({ params }: { params: Promise<{ ticker:string }> }) { const {ticker}=await params; return <CompanyView ticker={decodeURIComponent(ticker)} />; }
