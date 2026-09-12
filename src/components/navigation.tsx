'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {href:'/',label:'Overview'},
  {href:'/markets',label:'Markets'},
  {href:'/companies',label:'Companies'},
  {href:'/history',label:'History'},
  {href:'/culture',label:'Culture'},
  {href:'/methodology',label:'Methodology'},
];

export function Navigation() {
  const path = usePathname();
  return <aside className="sidebar"><div className="brand"><span className="brand-mark">MI</span><span>Market Intelligence</span></div><nav>{items.map(i => <Link key={i.href} href={i.href} className={path === i.href || (i.href !== '/' && path.startsWith(i.href)) ? 'nav-link active':'nav-link'}>{i.label}</Link>)}</nav><div className="sidebar-note">Markets, history, culture.<br/>One place to explore.</div></aside>;
}
