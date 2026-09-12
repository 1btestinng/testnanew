import type { MetadataRoute } from 'next';
import { MARKETS } from '@/lib/markets';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://market-intelligence.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const marketRoutes = Object.keys(MARKETS).map((country) => ({
    url: `${siteUrl}/markets/${country.toLowerCase()}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/markets`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/companies`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/methodology`, changeFrequency: 'monthly', priority: 0.5 },
    ...marketRoutes,
  ];
}
