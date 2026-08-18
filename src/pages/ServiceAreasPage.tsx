import React from 'react';
import { ServiceAreaChecker } from '../components/ServiceAreaChecker';
import { MapPin, ShieldCheck, Clock, Droplets } from 'lucide-react';
import { ActivePage } from '../types';

interface ServiceAreasPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigatePage: (page: ActivePage) => void;
  highLegibilityMode: boolean;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Greater Phoenix Metro Coverage
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-white">$0 Trip Fees</strong> Valley-Wide • Fast Dispatched Trucks
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Phoenix Valley Coverage & Water Quality Report
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We provide 24/7 master plumbing service across Peoria, Glendale, Scottsdale, Phoenix, Surprise, Sun City, Goodyear, Tempe, Mesa, Chandler, and Avondale. Check your city's municipal water hardness below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Service Area & Hardness Checker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ServiceAreaChecker
          onOpenBooking={onOpenBooking}
          highLegibilityMode={highLegibilityMode}
        />
      </div>
    </div>
  );
};
