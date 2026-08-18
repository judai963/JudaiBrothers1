import React from 'react';
import { FlatRateCatalog } from '../components/FlatRateCatalog';
import { ShieldCheck, Phone, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../types';

interface RatesPageProps {
  onOpenBooking: (serviceId?: string, customQuote?: { title: string; price: number }) => void;
  onNavigatePage: (page: ActivePage) => void;
  onOpenVirtualPlumber?: () => void;
  highLegibilityMode: boolean;
}

export const RatesPage: React.FC<RatesPageProps> = ({
  onOpenBooking,
  onNavigatePage,
  onOpenVirtualPlumber,
  highLegibilityMode,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0D3B66] text-white py-10 px-4 sm:px-6 border-b border-blue-900/60 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Upfront Pricing Catalog
            </div>
            <div className="text-xs text-blue-200">
              <strong className="text-white">$0 Trip Fees</strong> • No Surprise Invoices • 1-Year Workmanship Warranty
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              All 86 Flat Rates Published Online
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              We believe in total transparency. Explore our complete residential and commercial rate book. Filter by category, search specific jobs, and book online with guaranteed upfront pricing.
            </p>
          </div>

          {/* Quick Stats / Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs">
              <div className="text-blue-300 font-medium">Trip Fee:</div>
              <div className="font-bold text-emerald-400 text-sm">$0.00 Always</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs">
              <div className="text-blue-300 font-medium">After-Hours Surcharge:</div>
              <div className="font-bold text-emerald-400 text-sm">$0.00 None</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs">
              <div className="text-blue-300 font-medium">Warranty:</div>
              <div className="font-bold text-amber-300 text-sm">365 Days Parts & Labor</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs">
              <div className="text-blue-300 font-medium">Need a Custom Quote?</div>
              <button
                onClick={() => onNavigatePage('estimator')}
                className="font-bold text-amber-300 hover:underline flex items-center gap-1 mt-0.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Instant Estimator</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Flat Rate Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {onOpenVirtualPlumber && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Unsure which flat rate matches your plumbing issue?</h2>
                <p className="text-xs text-slate-600">Our Virtual Plumber AI can analyze your symptoms and pinpoint the exact item and price in seconds.</p>
              </div>
            </div>
            <button
              onClick={onOpenVirtualPlumber}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shrink-0 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Virtual Plumber AI</span>
            </button>
          </div>
        )}

        <FlatRateCatalog
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>
    </div>
  );
};
