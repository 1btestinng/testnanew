import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = { title: 'Market Intelligence', description: 'Multi-country financial market intelligence.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navigation /><main className="shell">{children}</main></body></html>;
}
