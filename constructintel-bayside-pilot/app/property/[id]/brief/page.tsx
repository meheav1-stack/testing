'use client';

import { useParams } from 'next/navigation';
import { getPropertyById } from '@/lib/search';
import {
  getPublishableEventsForProperty,
  getPublishableSignalsForProperty,
  getSignalsForProperty,
  getAttentionLevel,
  getAttentionLevelLabel,
} from '@/lib/classify';
import { generateReport, DISCLAIMER, PILOT_NOTICE } from '@/lib/report';
import { DemoDataBadge } from '@/components/DemoDataBadge';
import { ConfidenceBadge, EvidenceBadge, DirectionBadge } from '@/components/Badges';
import Link from 'next/link';
import { ArrowLeft, Printer, Building2, FlaskConical } from 'lucide-react';

export default function BriefPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = getPropertyById(propertyId);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="font-display text-xl text-navy-800 mb-2">Property not found</h1>
        <Link href="/" className="text-sm text-navy-600 underline">← Back to search</Link>
      </div>
    );
  }

  const publishableEvents = getPublishableEventsForProperty(propertyId);
  const publishableSignals = getPublishableSignalsForProperty(propertyId);
  const allSignals = getSignalsForProperty(propertyId);
  const attentionLevel = getAttentionLevel(allSignals);
  const report = generateReport(property, publishableSignals, publishableEvents, attentionLevel);

  const now = new Date().toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Controls — hidden on print */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Link href={`/property/${propertyId}`} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-navy-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to property
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print Brief
        </button>
      </div>

      {/* Report */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-navy-600" />
            <span className="font-display text-sm text-navy-600">ConstructIntel</span>
            <DemoDataBadge size="small" />
          </div>
          <h1 className="font-display text-2xl text-navy-900 mb-1">
            Pre-Auction Construction Intelligence Brief
          </h1>
          <p className="text-sm text-gray-500">Generated {now}</p>

          {/* Demo data notice */}
          <div className="mt-4 bg-demo-bg border-2 border-dashed border-demo-border rounded-lg p-3 flex items-start gap-2">
            <FlaskConical className="w-4 h-4 text-demo-text flex-shrink-0 mt-0.5" />
            <p className="text-xs text-demo-text font-medium leading-relaxed">
              This brief was generated from seeded demonstration data only. It is not sourced from live council systems.
              All records, signals, and analysis shown are for pilot demonstration purposes.
            </p>
          </div>
        </div>

        {/* Property details */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Subject Property</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div><span className="text-gray-500">Address:</span> <span className="font-medium text-navy-800">{property.address}</span></div>
            <div><span className="text-gray-500">Suburb:</span> <span className="font-medium text-navy-800">{property.suburb}</span></div>
            <div><span className="text-gray-500">Council:</span> <span className="font-medium text-navy-800">{property.council}</span></div>
            <div><span className="text-gray-500">Type:</span> <span className="font-medium text-navy-800">{property.propertyType}</span></div>
            <div><span className="text-gray-500">Coverage:</span> <span className="font-mono text-xs text-demo-text font-medium">{property.dataCoverageStatus === 'sample_only' ? 'DEMO SAMPLE ONLY' : property.dataCoverageStatus}</span></div>
            <div><span className="text-gray-500">Attention:</span> <span className="font-medium text-navy-800">{getAttentionLevelLabel(attentionLevel)}</span></div>
          </div>
        </div>

        {/* Executive summary */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Executive Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{report.summary}</p>
        </div>

        {/* Signals table */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Signal Summary ({publishableSignals.length} signal{publishableSignals.length !== 1 ? 's' : ''})
          </h2>
          {publishableSignals.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No publishable signals in current pilot dataset.</p>
          ) : (
            <div className="space-y-4">
              {publishableSignals.map(signal => (
                <div key={signal.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-navy-800">{signal.signalLabel}</h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                      <DemoDataBadge size="small" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{signal.signalSummary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <DirectionBadge direction={signal.signalDirection} />
                    <ConfidenceBadge confidence={signal.confidence} />
                    <EvidenceBadge level={signal.evidenceLevel} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Planning / Permit Timeline ({publishableEvents.length} events)
          </h2>
          {publishableEvents.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No events in current pilot dataset.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="pb-2 pr-3 font-medium">Date</th>
                  <th className="pb-2 pr-3 font-medium">Ref</th>
                  <th className="pb-2 pr-3 font-medium">Type</th>
                  <th className="pb-2 pr-3 font-medium">Status</th>
                  <th className="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {publishableEvents.map(event => (
                  <tr key={event.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 pr-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                      {new Date(event.eventDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs text-navy-500 whitespace-nowrap">{event.applicationNumber}</td>
                    <td className="py-2 pr-3 text-xs text-gray-600 whitespace-nowrap">{event.applicationType}</td>
                    <td className="py-2 pr-3">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                        event.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        event.status === 'Refused' ? 'bg-red-50 text-red-600' :
                        event.status === 'Withdrawn' ? 'bg-gray-100 text-gray-600' :
                        'bg-amber-50 text-amber-700'
                      }`}>{event.status}</span>
                    </td>
                    <td className="py-2 text-xs text-gray-600">{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Follow-up questions */}
        {report.followUpQuestions.length > 0 && (
          <div className="border-b border-gray-100 px-8 py-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Questions to take into the next inspection / contract review
            </h2>
            <ol className="space-y-1.5">
              {report.followUpQuestions.map((q, i) => (
                <li key={i} className="text-sm text-gray-700 pl-6 relative">
                  <span className="absolute left-0 text-navy-400 font-mono text-xs">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Limitations */}
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">What this brief does not prove</h2>
          <ul className="space-y-1">
            {report.limitations.map((l, i) => (
              <li key={i} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{l}</li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="px-8 py-5 bg-slate-50">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Disclaimer</h2>
          <p className="text-xs text-gray-500 leading-relaxed">{DISCLAIMER}</p>
          <p className="text-xs text-gray-500 leading-relaxed mt-2 font-medium">{PILOT_NOTICE}</p>
          <p className="text-xs text-gray-400 mt-3 font-mono">
            ConstructIntel Bayside Pilot — Brief ID: {report.id} — Generated: {now}
          </p>
        </div>
      </div>
    </div>
  );
}
