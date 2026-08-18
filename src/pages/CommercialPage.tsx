import React from 'react';
import { CommercialPlumbingSection } from '../components/CommercialPlumbingSection';
import { Building2, ShieldCheck, Phone, Calendar } from 'lucide-react';
import { ActivePage } from '../types';

interface CommercialPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigatePage: (page: ActivePage) => void;
  highLegibilityMode: boolean;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({
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
              <Building2 className="w-3.5 h-3.5" />
              Commercial & Multi-Family Plumbing
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-white">AZ ROC #354554</strong> • Net 30 HOA Invoicing • Certified Backflow Testing
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Commercial Facilities, Property Management & Remodels
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tailored plumbing maintenance, commercial water heater manifolds, hydro-jetting, grease trap maintenance, and full bathroom/kitchen tenant improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Commercial Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CommercialPlumbingSection
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>
    </div>
  );
};
