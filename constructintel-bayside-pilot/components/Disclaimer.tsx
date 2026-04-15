import { DISCLAIMER, PILOT_NOTICE } from '@/lib/report';
import { Info } from 'lucide-react';

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-gray-400 leading-relaxed">
        Pilot dataset only. Not a building inspection, legal advice, valuation, planning certificate or guarantee of property condition.
      </p>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-2">
          <p className="text-xs text-slate-600 leading-relaxed">{DISCLAIMER}</p>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">{PILOT_NOTICE}</p>
        </div>
      </div>
    </div>
  );
}

export function LimitationsPanel({ limitations }: { limitations: string[] }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
        <Info className="w-4 h-4" />
        What this brief does not prove
      </h3>
      <ul className="space-y-1.5">
        {limitations.map((l, i) => (
          <li key={i} className="text-xs text-slate-600 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
