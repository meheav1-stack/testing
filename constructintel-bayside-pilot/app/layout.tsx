import type { Metadata } from 'next';
import './globals.css';
import { DemoDataBanner } from '@/components/DemoDataBadge';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ConstructIntel — Bayside Pilot',
  description: 'Pre-auction construction and planning intelligence for Bayside properties. Decision-support tool for buyer\'s agents and property professionals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <DemoDataBanner />
        <header className="bg-white border-b border-gray-200 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Building2 className="w-5 h-5 text-navy-600 group-hover:text-navy-700 transition-colors" />
              <span className="font-display text-lg text-navy-800">ConstructIntel</span>
              <span className="text-xs font-mono text-gray-400 ml-1 hidden sm:inline">Bayside Pilot</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-navy-700 transition-colors">Search</Link>
              <Link href="/operator" className="text-gray-400 hover:text-navy-700 transition-colors font-mono text-xs">Operator</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 py-6 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Pilot dataset only. Not a building inspection, legal advice, valuation, planning certificate or guarantee of property condition.
              Absence of a signal does not mean absence of risk. Built for demonstration purposes.
            </p>
            <p className="text-xs text-gray-300 mt-2 font-mono">ConstructIntel Bayside Pilot MVP</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
