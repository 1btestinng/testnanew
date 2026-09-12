# Market Intelligence

A multi-country financial market intelligence platform built with Next.js, TypeScript, Prisma and provider adapters.

## What is implemented

- Shared country/market registry for Egypt, Morocco, Tunisia and Algeria
- Provider adapter boundary with Yahoo Finance
- Normalized quote, historical-price and company-search types
- Explicit unavailable/delayed states; no fabricated financial values
- Historical FX conversion helper with strict validation
- Normalized Prisma schema for countries, markets, companies, listings, quotes, history, FX and statements
- Responsive editorial financial UI
- Country-aware company routes
- Provider-backed company search
- Historical price views with selectable ranges
- Methodology page
- Vitest coverage for core calculations

## Local development

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. `npm install`
4. `npm run typecheck`
5. `npm run test`
6. `npm run dev`

The database schema is ready for PostgreSQL when `DATABASE_URL` is configured. The market-data search and historical quote paths can operate without a database because they are provider-backed and explicitly degrade to unavailable states when the provider does not return data.

## Architecture

`country config → market registry → provider adapter → normalized data → calculations → UI`

Provider credentials remain server-side. Provider-specific response shapes do not cross the adapter boundary.
