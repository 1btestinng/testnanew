export type DataStatus = 'verified' | 'calculated' | 'estimated' | 'delayed' | 'unavailable';

export type MarketCompany = {
  id: string; name: string; ticker: string; exchange: string; exchangeCode: string;
  country: string; sector?: string; price?: number; currency: string; change?: number;
  changePercent?: number; marketCapLocal?: number; marketCapUSD?: number;
  sharesOutstanding?: number; logo?: string; timestamp?: string; provider?: string;
  dataStatus: DataStatus;
};

export type HistoricalPoint = { date: string; local?: number; usd?: number; marketCapLocal?: number; marketCapUSD?: number; status: DataStatus };

export type Quote = { symbol: string; price?: number; previousClose?: number; open?: number; high?: number; low?: number; volume?: number; currency?: string; timestamp?: string; provider: string; status: DataStatus };
