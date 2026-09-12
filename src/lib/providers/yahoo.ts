import type { HistoricalPoint, MarketCompany, Quote } from '@/lib/types';

const base = 'https://query1.finance.yahoo.com';

async function yahoo<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${base}${path}`, { headers: { 'User-Agent': 'market-intelligence/1.0' }, next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json() as T;
  } catch { return null; }
}

type ChartResponse = { chart?: { result?: Array<{ meta?: { regularMarketPrice?: number; previousClose?: number; currency?: string; exchangeName?: string; symbol?: string; regularMarketTime?: number }; timestamp?: number[]; indicators?: { quote?: Array<{ close?: Array<number|null>; open?: Array<number|null>; high?: Array<number|null>; low?: Array<number|null>; volume?: Array<number|null> }> } }> } };

type SearchResponse = { quotes?: Array<{ symbol?: string; shortname?: string; longname?: string; exchange?: string; quoteType?: string }> };

export async function getQuote(symbol: string): Promise<Quote> {
  const data = await yahoo<ChartResponse>(`/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1m`);
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) return { symbol, provider:'Yahoo Finance', status:'unavailable' };
  const price = meta.regularMarketPrice;
  const previousClose = meta.previousClose;
  return { symbol, price, previousClose, currency:meta.currency, timestamp:meta.regularMarketTime ? new Date(meta.regularMarketTime*1000).toISOString() : undefined, provider:'Yahoo Finance', status:'delayed' };
}

export async function searchCompanies(query: string): Promise<MarketCompany[]> {
  const data = await yahoo<SearchResponse>(`/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=20&newsCount=0`);
  return (data?.quotes ?? []).filter(q => q.symbol && q.quoteType === 'EQUITY').map(q => ({ id:q.symbol!, name:q.longname ?? q.shortname ?? q.symbol!, ticker:q.symbol!, exchange:q.exchange ?? '—', exchangeCode:q.exchange ?? '—', country:'—', currency:'—', provider:'Yahoo Finance', dataStatus:'unavailable' as const }));
}

export async function getHistory(symbol: string, range = '1y'): Promise<HistoricalPoint[]> {
  const data = await yahoo<ChartResponse>(`/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1d`);
  const result = data?.chart?.result?.[0];
  const timestamps = result?.timestamp ?? [];
  const closes = result?.indicators?.quote?.[0]?.close ?? [];
  return timestamps.map((t,i) => ({ date:new Date(t*1000).toISOString().slice(0,10), local:closes[i] ?? undefined, status:closes[i] != null ? 'delayed' : 'unavailable' }));
}
