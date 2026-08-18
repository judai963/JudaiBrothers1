import React from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Calendar,
  Phone,
  Sparkles,
  Info
} from 'lucide-react';
import { COMPETITOR_COMPARISONS } from '../data/benchmarkData';

interface CompetitorComparisonProps {
  onOpenBooking: () => void;
  highLegibilityMode: boolean;
}

export const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  return (
    <section id="competitor-comparison" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Honest Market Transparency</span>
          </div>

          <h2 className={`font-black tracking-tight text-white ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            How Judai Brothers Compares Against <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Phoenix Corporate Plumbing Franchises
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Compare us directly against Parker & Sons, George Brazil, Goettl, Radiant, and Service Champions. We built our business to fix the broken pricing and commission sales culture in the plumbing industry.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl mb-8">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-xs">Comparison Metric</th>
                <th className="p-4 sm:p-5 font-black text-amber-400 text-sm bg-amber-950/40 border-x border-amber-500/30">
                  <div className="flex items-center gap-1.5">
                    <span>Judai Brothers</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold">You Pick</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 font-semibold text-slate-400">Parker & Sons</th>
                <th className="p-4 sm:p-5 font-semibold text-slate-400">George Brazil</th>
                <th className="p-4 sm:p-5 font-semibold text-slate-400">Goettl</th>
                <th className="p-4 sm:p-5 font-semibold text-slate-400">Radiant / Service Champ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {COMPETITOR_COMPARISONS.map((comp, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-900/40 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-slate-200">
                    <div>{comp.feature}</div>
                    <div className="text-[11px] font-normal text-slate-400 mt-1 max-w-xs">
                      {comp.explanation}
                    </div>
                  </td>

                  {/* Judai Brothers Column (Highlighted) */}
                  <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-amber-950/20 border-x border-amber-500/30">
                    <div className="flex items-start gap-1.5 text-xs text-white">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-bold text-amber-200">{comp.judaiBrothers}</span>
                    </div>
                  </td>

                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="text-slate-300">{comp.parkerAndSons}</span>
                  </td>

                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="text-slate-300">{comp.georgeBrazil}</span>
                  </td>

                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="text-slate-300">{comp.goettl}</span>
                  </td>

                  <td className="p-4 sm:p-5 text-slate-400">
                    <span className="text-slate-300">{comp.radiantPlumbing}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left text-slate-950">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Experience Honest Plumbing?
            </h3>
            <p className="text-sm font-semibold text-amber-950">
              No trip fees, no sales commissions, and 86 flat rates published upfront.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="compare-cta-book-btn"
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online (Housecall Pro)</span>
            </button>

            <a
              href="tel:4809383803"
              className="px-5 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-slate-950 font-bold text-sm flex items-center gap-2 border border-slate-950/20"
            >
              <Phone className="w-4 h-4" />
              <span>(480) 938-3803</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
