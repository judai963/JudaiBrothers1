import React from 'react';
import { WhyJudaiBrothers } from '../components/WhyJudaiBrothers';
import { CompetitorComparison } from '../components/CompetitorComparison';
import { ReviewsAndTrust } from '../components/ReviewsAndTrust';
import { ShieldCheck, Award, Users, Phone, Calendar, Heart, Wrench } from 'lucide-react';
import { ActivePage } from '../types';

interface AboutPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigatePage: (page: ActivePage) => void;
  highLegibilityMode: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigatePage,
  highLegibilityMode,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0D3B66] text-white py-12 px-4 sm:px-6 border-b border-blue-900/60 shadow-md">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Family-Owned & Operated Master Plumbers
            </div>
            <div className="text-xs text-blue-200">
              <strong className="text-white">AZ ROC #354554 (CR-37)</strong> • BBB A+ Accredited • 4.9★ Rated
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Plumbing Built on Transparency, Craftsmanship & Family Values
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Judai Brothers was founded with a singular mission: to eliminate the high-pressure sales tactics, hidden diagnostic fees, and mystery pricing that have plagued the plumbing industry for decades.
              </p>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                When you call Judai Brothers, you get a licensed master tradesperson focused strictly on solving your plumbing problem permanently, backed by a 1-year full warranty.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:4809383803"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B2545] font-black text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-[#0B2545]" />
                  <span>Call (480) 938-3803</span>
                </a>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-5 py-3 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-100 font-bold text-sm border border-blue-700/60 transition-colors"
                >
                  Schedule Appointment ($0 Trip Fee)
                </button>
              </div>
            </div>

            {/* Credential Cards */}
            <div className="lg:col-span-4 rounded-2xl bg-blue-950/80 border border-blue-800/80 p-5 space-y-3.5 text-xs shadow-xl">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B2545] border border-blue-800">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">AZ Registrar of Contractors</div>
                  <div className="text-blue-200">License #354554 (CR-37 Plumbing)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B2545] border border-blue-800">
                <Award className="w-6 h-6 text-amber-300 shrink-0" />
                <div>
                  <div className="font-bold text-white">Better Business Bureau</div>
                  <div className="text-blue-200">Accredited Business (A+ Rating)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Heart className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Thumbtack & Google Top Pro</div>
                  <div className="text-slate-400">4.9 / 5.0 Star Verified Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - 5 Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <WhyJudaiBrothers
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>

      {/* Competitor Benchmark Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CompetitorComparison
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>

      {/* Customer Reviews & Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ReviewsAndTrust
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>
    </div>
  );
};
