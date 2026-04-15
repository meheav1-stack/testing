'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { searchProperties } from '@/lib/search';
import { SearchBox } from '@/components/SearchBox';
import { MatchConfidenceBadge } from '@/components/Badges';
import { DemoDataBadge } from '@/components/DemoDataBadge';
import { Disclaimer } from '@/components/Disclaimer';
import Link from 'next/link';
import { MapPin, ArrowRight, AlertTriangle } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProperties(query);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <SearchBox initialQuery={query} compact />
      </div>

      <div className="mb-6">
        <h1 className="font-display text-xl text-navy-800 mb-1">
          Search results
        </h1>
        <p className="text-sm text-gray-500">
          {results.length > 0
            ? `${results.length} propert${results.length === 1 ? 'y' : 'ies'} matched in pilot dataset`
            : 'Searching pilot Bayside dataset'
          }
        </p>
      </div>

      {results.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
          <AlertTriangle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <h2 className="font-display text-lg text-navy-800 mb-2">No confident match found</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-4">
            No confident match was found in the current Bayside pilot dataset. This does not mean there are no relevant records. It means this MVP has not matched the address with sufficient confidence.
          </p>
          <div className="inline-flex items-center gap-1.5">
            <DemoDataBadge size="small" />
            <span className="text-xs text-gray-400">Pilot coverage is limited</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map(result => (
            <Link
              key={result.property.id}
              href={`/property/${result.property.id}`}
              className="block bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-navy-100 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h2 className="text-base font-semibold text-navy-800 group-hover:text-navy-600 transition-colors">
                      {result.property.address}
                    </h2>
                    <MatchConfidenceBadge confidence={result.matchConfidence} />
                    <DemoDataBadge size="small" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {result.property.suburb}
                    </span>
                    <span>{result.property.propertyType}</span>
                    <span className="text-gray-300">|</span>
                    <span>{result.property.council}</span>
                  </div>
                  <p className="text-xs text-gray-400">{result.matchDetails}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-navy-500 transition-colors mt-1 flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Coverage note */}
      <div className="mt-8">
        <Disclaimer compact />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-gray-400">Loading search results...</p>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
