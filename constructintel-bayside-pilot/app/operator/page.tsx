'use client';

import { properties } from '@/data/properties';
import { getAllSignals, getAllEvents, getSignalsForProperty, getEventsForProperty, getAttentionLevel, getAttentionLevelLabel } from '@/lib/classify';
import { DemoDataBadge } from '@/components/DemoDataBadge';
import { PublishabilityBadge, ConfidenceBadge, EvidenceBadge } from '@/components/Badges';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, Eye, EyeOff, ChevronDown, ChevronRight, FlaskConical } from 'lucide-react';

export default function OperatorPage() {
  const allSignals = getAllSignals();
  const allEvents = getAllEvents();
  const [expandedProp, setExpandedProp] = useState<string | null>(null);

  const suppressedSignals = allSignals.filter(s => s.publishability === 'red' || s.operatorStatus === 'suppressed');
  const reviewSignals = allSignals.filter(s => s.operatorStatus === 'needs_review');
  const greenSignals = allSignals.filter(s => s.publishability === 'green' && s.operatorStatus === 'ready_to_publish');
  const amberSignals = allSignals.filter(s => s.publishability === 'amber' && s.operatorStatus !== 'suppressed');
  const redEvents = allEvents.filter(e => e.publishability === 'red');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-navy-900 flex items-center gap-2">
            Operator Review
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">INTERNAL</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Review publishability, suppression, and data coverage across all properties.</p>
        </div>
        <DemoDataBadge size="large" />
      </div>

      {/* Demo data notice */}
      <div className="bg-demo-bg border-2 border-dashed border-demo-border rounded-lg p-4 mb-6 flex items-start gap-3">
        <FlaskConical className="w-5 h-5 text-demo-text flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-demo-text font-semibold mb-1">All data is seeded demonstration data</p>
          <p className="text-xs text-demo-text leading-relaxed">
            No records shown are sourced from live council systems. This operator view demonstrates the review workflow
            that would be required in production, including publishability classification, suppression of sensitive records,
            and operator review of ambiguous signals.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Properties</div>
          <div className="text-xl font-bold text-navy-800 font-mono">{properties.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Eye className="w-3 h-3" />Green Signals</div>
          <div className="text-xl font-bold text-emerald-600 font-mono">{greenSignals.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Amber Signals</div>
          <div className="text-xl font-bold text-amber-600 font-mono">{amberSignals.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><EyeOff className="w-3 h-3" />Suppressed</div>
          <div className="text-xl font-bold text-red-500 font-mono">{suppressedSignals.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Shield className="w-3 h-3" />Needs Review</div>
          <div className="text-xl font-bold text-orange-500 font-mono">{reviewSignals.length}</div>
        </div>
      </div>

      {/* Suppressed records section */}
      {(suppressedSignals.length > 0 || redEvents.length > 0) && (
        <section className="mb-8">
          <h2 className="font-display text-lg text-navy-800 mb-3 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-red-400" />
            Suppressed Records (Red)
          </h2>
          <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 space-y-3">
            {suppressedSignals.map(signal => (
              <div key={signal.id} className="bg-white border border-red-100 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-red-700">{signal.signalLabel}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Property: {properties.find(p => p.id === signal.propertyId)?.address || signal.propertyId}
                    </p>
                  </div>
                  <PublishabilityBadge status="red" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{signal.signalSummary}</p>
                {signal.reviewReasons && signal.reviewReasons.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-gray-400">Review reasons:</span>
                    {signal.reviewReasons.map(r => (
                      <span key={r} className="text-xs font-mono bg-red-50 text-red-600 px-1.5 py-0.5 rounded">{r}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {redEvents.map(event => (
              <div key={event.id} className="bg-white border border-red-100 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-red-700">{event.applicationType} — {event.applicationNumber}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Property: {properties.find(p => p.id === event.propertyId)?.address || event.propertyId}
                    </p>
                  </div>
                  <PublishabilityBadge status="red" />
                </div>
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                <p className="text-xs text-red-500 mt-2 font-medium">
                  Personal data removed: {event.rawPersonalDataRemoved ? 'Yes' : 'NO — REQUIRES ATTENTION'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Needs review section */}
      {reviewSignals.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display text-lg text-navy-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Signals Needing Review
          </h2>
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 space-y-3">
            {reviewSignals.map(signal => (
              <div key={signal.id} className="bg-white border border-orange-100 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-orange-700">{signal.signalLabel}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Property: {properties.find(p => p.id === signal.propertyId)?.address || signal.propertyId}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PublishabilityBadge status={signal.publishability} />
                    <span className="text-xs font-mono bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-200">
                      {signal.operatorStatus}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{signal.signalSummary}</p>
                {signal.reviewReasons && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-gray-400">Review reasons:</span>
                    {signal.reviewReasons.map(r => (
                      <span key={r} className="text-xs font-mono bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">{r}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All properties table */}
      <section>
        <h2 className="font-display text-lg text-navy-800 mb-3">All Properties</h2>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {properties.map(property => {
            const propSignals = getSignalsForProperty(property.id);
            const propEvents = getEventsForProperty(property.id);
            const attention = getAttentionLevel(propSignals);
            const suppressed = propSignals.filter(s => s.publishability === 'red' || s.operatorStatus === 'suppressed').length;
            const needsReview = propSignals.filter(s => s.operatorStatus === 'needs_review').length;
            const isExpanded = expandedProp === property.id;

            return (
              <div key={property.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => setExpandedProp(isExpanded ? null : property.id)}
                  className="w-full text-left px-5 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-navy-800 truncate">{property.address}</span>
                          <DemoDataBadge size="small" />
                        </div>
                        <span className="text-xs text-gray-400">{property.suburb} · {property.propertyType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs flex-shrink-0">
                      <span className="font-mono text-gray-500">{propEvents.length} events</span>
                      <span className="font-mono text-gray-500">{propSignals.length} signals</span>
                      {suppressed > 0 && <span className="font-mono text-red-500">{suppressed} suppressed</span>}
                      {needsReview > 0 && <span className="font-mono text-orange-500">{needsReview} review</span>}
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        attention === 'routine' ? 'bg-emerald-50 text-emerald-700' :
                        attention === 'review_recommended' ? 'bg-amber-50 text-amber-700' :
                        'bg-orange-50 text-orange-700'
                      }`}>
                        {getAttentionLevelLabel(attention)}
                      </span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 pl-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="text-xs">
                        <span className="text-gray-400">Coverage:</span>{' '}
                        <span className="font-mono text-demo-text font-medium">{property.dataCoverageStatus}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-400">Notes:</span>{' '}
                        <span className="text-gray-600">{property.coverageNotes}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {propSignals.map(signal => (
                        <div key={signal.id} className={`text-xs p-3 rounded-lg border ${
                          signal.publishability === 'red' ? 'bg-red-50/50 border-red-100' :
                          signal.publishability === 'amber' ? 'bg-amber-50/50 border-amber-100' :
                          'bg-gray-50 border-gray-100'
                        }`}>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-medium text-navy-700">{signal.signalLabel}</span>
                            <div className="flex items-center gap-1.5">
                              <PublishabilityBadge status={signal.publishability} />
                              <ConfidenceBadge confidence={signal.confidence} />
                              <span className="font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{signal.operatorStatus}</span>
                            </div>
                          </div>
                          <p className="text-gray-500">{signal.signalSummary}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Link href={`/property/${property.id}`} className="text-xs text-navy-600 hover:text-navy-800 underline">
                        View property page →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
