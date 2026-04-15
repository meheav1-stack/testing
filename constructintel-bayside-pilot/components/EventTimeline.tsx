import { PlanningEvent } from '@/data/types';
import { EvidenceBadge, PublishabilityBadge } from './Badges';
import { DemoDataBadge } from './DemoDataBadge';
import { Calendar, FileText, ExternalLink } from 'lucide-react';

export function EventTimeline({ events }: { events: PlanningEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-4 text-center italic">
        No planning events in the current pilot dataset.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
      <div className="space-y-0">
        {events.map((event, idx) => (
          <div key={event.id} className="relative pl-10 pb-6 last:pb-0">
            {/* Timeline dot */}
            <div className={`absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full border-2 ${
              event.status === 'Approved' ? 'bg-emerald-400 border-emerald-500' :
              event.status === 'Refused' ? 'bg-red-300 border-red-400' :
              event.status === 'Withdrawn' ? 'bg-gray-300 border-gray-400' :
              'bg-amber-300 border-amber-400'
            }`} />

            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono">{formatDate(event.eventDate)}</span>
                  <span className="text-gray-300">|</span>
                  <span className="font-mono text-navy-500">{event.applicationNumber}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {event.sourceClass === 'manual_seed_demo' && <DemoDataBadge size="small" />}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    event.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                    event.status === 'Refused' ? 'bg-red-50 text-red-600' :
                    event.status === 'Withdrawn' ? 'bg-gray-100 text-gray-600' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs font-medium text-navy-600 block mb-0.5">{event.applicationType}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <EvidenceBadge level={event.evidenceLevel} />
                <PublishabilityBadge status={event.publishability} />
                <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  {event.sourceName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
