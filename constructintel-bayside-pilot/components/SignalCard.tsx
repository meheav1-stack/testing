import { Signal } from '@/data/types';
import { ConfidenceBadge, EvidenceBadge, DirectionBadge } from './Badges';
import { DemoDataBadge } from './DemoDataBadge';
import { ChevronDown, ChevronUp, HelpCircle, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export function SignalCard({ signal, isDemo = true }: { signal: Signal; isDemo?: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const borderColor =
    signal.signalDirection === 'requires_follow_up' ? 'border-l-orange-400' :
    signal.signalDirection === 'caution' ? 'border-l-amber-400' :
    'border-l-navy-300';

  return (
    <div className={`bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden border-l-4 ${borderColor}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h4 className="text-sm font-semibold text-navy-800">{signal.signalLabel}</h4>
              {isDemo && <DemoDataBadge size="small" />}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{signal.signalSummary}</p>
          </div>
          <div className="flex-shrink-0 mt-0.5">
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <DirectionBadge direction={signal.signalDirection} />
          <ConfidenceBadge confidence={signal.confidence} />
          <EvidenceBadge level={signal.evidenceLevel} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4">
          {/* Confidence reason */}
          <div className="mt-3">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Confidence Basis</h5>
            <p className="text-sm text-gray-600">{signal.confidenceReason}</p>
          </div>

          {/* Due diligence questions */}
          {signal.dueDiligenceQuestions.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Due-Diligence Questions
              </h5>
              <ul className="space-y-1.5">
                {signal.dueDiligenceQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-gray-700 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-navy-400">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prohibited claims */}
          {signal.prohibitedClaimsAvoided.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-md p-3">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Not a Finding Of
              </h5>
              <ul className="space-y-1">
                {signal.prohibitedClaimsAvoided.map((c, i) => (
                  <li key={i} className="text-xs text-gray-500 italic">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
