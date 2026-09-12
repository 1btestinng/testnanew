import Link from 'next/link';
import { MARKETS } from '@/lib/markets';

export default function MarketsPage() { return <div className="page"><header className="page-header"><p className="eyebrow">MARKETS</p><h1>Choose a market</h1><p>Country-aware market pages share the same architecture and data layer.</p></header><div className="market-list">{Object.values(MARKETS).map(m => <Link href={`/markets/${m.country}`} className="market-row" key={m.country}><span className="country-code">{m.country}</span><span className="market-name"><strong>{m.countryName}</strong><small>{m.exchangeName}</small></span><span>{m.currency}</span><span>{m.timezone}</span><span className="arrow">→</span></Link>)}</div></div>; }
