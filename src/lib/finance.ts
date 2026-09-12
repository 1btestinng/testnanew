export function historicalUsd(localValue: number | undefined, localPerUsd: number | undefined): number | undefined {
  if (localValue == null || localPerUsd == null || !Number.isFinite(localValue) || !Number.isFinite(localPerUsd) || localPerUsd <= 0) return undefined;
  return localValue / localPerUsd;
}

export function marketCap(price: number | undefined, shares: number | undefined): number | undefined {
  if (price == null || shares == null || !Number.isFinite(price) || !Number.isFinite(shares) || price < 0 || shares <= 0) return undefined;
  return price * shares;
}

export function percentageChange(current: number | undefined, previous: number | undefined): number | undefined {
  if (current == null || previous == null || !Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return undefined;
  return ((current - previous) / previous) * 100;
}
