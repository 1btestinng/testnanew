'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Overview' },
  { href: '/markets', label: 'Markets' },
  { href: '/companies', label: 'Companies' },
  { href: '/history', label: 'History' },
  { href: '/culture', label: 'Culture' },
  { href: '/methodology', label: 'Methodology' },
];

export function Navigation() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="iStocks home">
        <span className="brand-mark">i</span>
        <span className="brand-name">iStocks</span>
      </Link>
      <div className="nav-label">RESEARCH</div>
      <nav aria-label="Primary navigation">
        {items.map((item) => {
          const active = path === item.href || (item.href !== '/' && path.startsWith(item.href));
          return <Link key={item.href} href={item.href} className={`nav-link${active ? ' active' : ''}`}>{item.label}</Link>;
        })}
      </nav>
      <div className="sidebar-note"><span>MARKET INTELLIGENCE</span><br />Data, research, history.</div>
    </aside>
  );
}
