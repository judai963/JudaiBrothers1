import React from 'react';
import { InstantEstimator } from '../components/InstantEstimator';
import { Sparkles, ShieldCheck, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';

interface EstimatorPageProps {
  onOpenBooking: (serviceId?: string, customQuote?: { title: string; price: number }) => void;
  onNavigatePage: (page: ActivePage) => void;
  highLegibilityMode: boolean;
}

export const EstimatorPage: React.FC<EstimatorPageProps> = ({
  onOpenBooking,
  onNavigatePage,
  highLegibilityMode,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              60-Second Instant Price Estimator
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-white">Real Upfront Math</strong> • No Email Required • Guaranteed Rates
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Calculate Your Exact Plumbing Cost in Under 60 Seconds
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Select your plumbing category, choose your exact fixtures or issues, and customize options. Receive an itemized quote instantly that you can lock in with $0 trip fees.
            </p>
          </div>
        </div>
      </section>

      {/* Main Estimator Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <InstantEstimator
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>
    </div>
  );
};
