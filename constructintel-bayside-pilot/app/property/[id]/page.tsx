'use client';

import { useParams } from 'next/navigation';
import { getPropertyById } from '@/lib/search';
import {
  getPublishableEventsForProperty,
  getPublishableSignalsForProperty,
  getSignalsForProperty,
  getAttentionLevel,
  getAttentionLevelLabel,
  getAttentionLevelColor,
} from '@/lib/classify';
import { EventTimeline } from '@/components/EventTimeline';
import { SignalCard } from '@/components/SignalCard';
import { Disclaimer, LimitationsPanel } from '@/components/Disclaimer';
import { DemoDataBadge } from '@/components/DemoDataBadge';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  FileText,
  ArrowLeft,
  AlertTriangle,
  Shield,
  Eye,
  EyeOff,
  Layers,
  Printer,
} from 'lucide-react';

export default function PropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = getPropertyById(propertyId);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <h1 className="font-display text-xl text-navy-800 mb-2">Property not found</h1>
        <p className="text-sm text-gray-500 mb-4">
          Could not confidently match this property ID in the pilot dataset.
        </p>
        <Link href="/" className="text-sm text-navy-600 hover:text-navy-800 underline">
          ← Back to search
        </Link>
      </div>
    );
  }

  const publishableEvents = getPublishableEventsForProperty(propertyId);
  const publishableSignals = getPublishableSignalsForProperty(propertyId);
  const allSignals = getSignalsForProperty(propertyId);
  const suppressedCount = allSignals.length - publishableSignals.length;
  const attentionLevel = getAttentionLevel(allSignals);
  const attentionLabel = getAttentionLevelLabel(attentionLevel);
  const attentionColor = getAttentionLevelColor(attentionLevel);

  const directCount = publishableSignals.filter(s => s.evidenceLevel === 'direct_property').length;
  const nearbyCount = publishableSignals.filter(s => s.evidenceLevel === 'nearby_property' || s.evidenceLevel === 'area_level').length;
  const followUpCount = publishableSignals.filter(s => s.signalDirection === 'requires_follow_up').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-navy-600 mb-6 transition-colors no-print">
        <ArrowLeft className="w-3.5 h-3.5" />
        Search
      </Link>

      {/* Property header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="font-display text-2xl text-navy-900">{property.address}</h1>
              <DemoDataBadge />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{property.suburb}</span>
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{property.propertyType}</span>
              <span>{property.council}</span>
            </div>
          </div>
          <Link
            href={`/property/${propertyId}/brief`}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors no-print flex-shrink-0"
          >
            <Printer className="w-4 h-4" />
            View Brief
          </Link>
        </div>

        {/* Coverage + data notice */}
        <div className="bg-demo-bg/30 border border-demo-border/50 rounded-lg p-3 text-xs text-demo-text leading-relaxed">
          <strong className="font-semibold">Data source:</strong> {property.coverageNotes}
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className={`rounded-xl border p-4 ${attentionColor}`}>
          <div className="text-xs font-medium opacity-70 mb-1">Attention Level</div>
          <div className="text-sm font-bold">{attentionLabel}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Eye className="w-3 h-3" />Pilot Coverage</div>
          <div className="text-sm font-bold text-navy-800 font-mono">{property.dataCoverageStatus === 'sample_only' ? 'Sample Only' : 'Seeded'}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Layers className="w-3 h-3" />Direct Records</div>
          <div className="text-sm font-bold text-navy-800 font-mono">{directCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Shield className="w-3 h-3" />Follow-Up</div>
          <div className="text-sm font-bold text-navy-800 font-mono">{followUpCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><EyeOff className="w-3 h-3" />Suppressed</div>
          <div className="text-sm font-bold text-gray-400 font-mono">{suppressedCount}</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Signals — main column */}
        <div className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="font-display text-lg text-navy-800 mb-4">Key Signals</h2>
            {publishableSignals.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">No publishable signals in current pilot dataset.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {publishableSignals.map(signal => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    isDemo={property.dataCoverageStatus === 'sample_only'}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Due-diligence questions aggregated */}
          {publishableSignals.some(s => s.dueDiligenceQuestions.length > 0) && (
            <section>
              <h2 className="font-display text-lg text-navy-800 mb-3">
                Questions for the next inspection / contract review
              </h2>
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <ul className="space-y-2">
                  {[...new Set(publishableSignals.flatMap(s => s.dueDiligenceQuestions))].map((q, i) => (
                    <li key={i} className="text-sm text-gray-700 pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-navy-400 before:font-mono">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Timeline — sidebar */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg text-navy-800 mb-4">Planning / Permit Timeline</h2>
          <EventTimeline events={publishableEvents} />
        </div>
      </div>

      {/* Limitations + Disclaimer */}
      <div className="mt-8 space-y-4">
        <LimitationsPanel
          limitations={[
            'This brief uses a pilot demonstration dataset only.',
            'Absence of a signal does not mean absence of risk.',
            'This is not a building inspection, pest inspection, engineering assessment, or legal advice.',
            'Source records should be independently verified.',
            'Full production identity resolution would use G-NAF + cadastre matching; this MVP uses bounded sample matching.',
          ]}
        />
        <Disclaimer />
      </div>
    </div>
  );
}
