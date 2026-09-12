import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600'], display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600'], display: 'swap' });

export const metadata: Metadata = {
  title: 'iStocks — Market Intelligence',
  description: 'A premium editorial platform for understanding markets, companies, countries and history.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}><body><Navigation /><main className="shell">{children}</main></body></html>;
}
