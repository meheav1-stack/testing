import { SearchBox } from '@/components/SearchBox';
import { Disclaimer } from '@/components/Disclaimer';
import { DemoDataBadge } from '@/components/DemoDataBadge';
import { Shield, Search, FileText, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="flex justify-center mb-4">
            <DemoDataBadge size="large" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4 leading-tight">
            Bayside Property<br />Construction Intelligence
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3 leading-relaxed">
            Planning, permit and construction-history signals for pre-auction due diligence.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Search a pilot Bayside property to view selected public-record planning events, derived due-diligence signals, confidence levels and follow-up questions. Built for buyer&apos;s agents and property professionals.
          </p>

          <div className="flex justify-center mb-6">
            <SearchBox />
          </div>

          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Target council: Bayside City Council, Victoria
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-display text-xl text-navy-800 text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-navy-600" />
            </div>
            <h3 className="font-display text-base text-navy-800 mb-2">Search a property</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Enter a Bayside address to find selected planning, permit and construction records in the pilot dataset.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-navy-600" />
            </div>
            <h3 className="font-display text-base text-navy-800 mb-2">Review signals</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              See derived due-diligence signals with confidence levels, evidence basis and recommended follow-up questions.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-navy-600" />
            </div>
            <h3 className="font-display text-base text-navy-800 mb-2">Generate a brief</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Create a printable pre-auction intelligence brief with key signals, questions and limitations clearly stated.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <Disclaimer />
      </section>
    </div>
  );
}
