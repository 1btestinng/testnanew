'use client';

import { useEffect, useMemo, useState } from 'react';
import type { HistoricalPoint, Quote } from '@/lib/types';

const RANGES = ['1m', '3m', '1y', '3y', '5y', 'max'] as const;

export function CompanyView({ ticker }: { ticker: string }) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [history, setHistory] = useState<HistoricalPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<(typeof RANGES)[number]>('1y');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/companies/${encodeURIComponent(ticker)}?range=${range}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load company data');
        return response.json();
      })
      .then((data) => {
        setQuote(data.quote ?? null);
        setHistory(data.history ?? []);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setQuote({ symbol: ticker, provider: 'Yahoo Finance', status: 'unavailable' });
        setHistory([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [ticker, range]);

  const validHistory = useMemo(
    () => history.filter((point) => point.local != null),
    [history],
  );
  const latest = validHistory.at(-1)?.local;
  const first = validHistory[0]?.local;
  const min = validHistory.length ? Math.min(...validHistory.map((point) => point.local!)) : 0;
  const max = validHistory.length ? Math.max(...validHistory.map((point) => point.local!)) : 0;
  const span = max - min || 1;
  const performance = latest != null && first != null && first !== 0
    ? ((latest - first) / first) * 100
    : undefined;

  return (
    <div className="page">
      <div className="breadcrumb">Companies <span>/</span> {ticker}</div>
      <header className="company-header">
        <div>
          <p className="eyebrow">COMPANY / {ticker}</p>
          <h1>{ticker}</h1>
          <p>Provider-backed market data. Financial values are never invented when unavailable.</p>
        </div>
        <span className={`status-pill ${quote?.status === 'unavailable' ? 'status-muted' : ''}`}>
          {quote?.status ?? 'loading'}
        </span>
      </header>

      <section className="metric-grid">
        <Metric label="Price" value={quote?.price != null ? `${quote.price.toLocaleString()} ${quote.currency ?? ''}` : '—'} />
        <Metric
          label="Change"
          value={quote?.previousClose != null && quote.price != null
            ? `${(quote.price - quote.previousClose).toFixed(2)} (${((quote.price / quote.previousClose - 1) * 100).toFixed(2)}%)`
            : '—'}
        />
        <Metric label="Historical performance" value={performance != null ? `${performance.toFixed(2)}%` : '—'} />
        <Metric label="Last observation" value={quote?.timestamp ? new Date(quote.timestamp).toLocaleString() : '—'} />
      </section>

      <section className="chart-panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">HISTORICAL PRICE</p>
            <h2>{loading ? 'Loading…' : history.length ? `${history.length} observations` : 'Unavailable'}</h2>
          </div>
          <div className="range-tabs" aria-label="Historical range">
            {RANGES.map((value) => (
              <button key={value} className={range === value ? 'selected' : ''} onClick={() => setRange(value)}>
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="chart" role="img" aria-label={`Historical price chart for ${ticker}`}>
          <div className="chart-line">
            {validHistory.map((point, index) => {
              const left = validHistory.length > 1 ? (index / (validHistory.length - 1)) * 100 : 50;
              const bottom = 8 + ((point.local! - min) / span) * 76;
              return <span key={`${point.date}-${index}`} title={`${point.date}: ${point.local}`} style={{ left: `${left}%`, bottom: `${bottom}%` }} />;
            })}
          </div>
          {!history.length && !loading && (
            <div className="chart-empty">Historical data unavailable from the configured provider.</div>
          )}
        </div>

        <div className="source-note">Source: Yahoo Finance · Values may be delayed · Historical USD conversion is not shown until historical FX is available.</div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}
