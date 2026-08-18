import React from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';

interface CommercialPlumbingSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  highLegibilityMode: boolean;
}

export const CommercialPlumbingSection: React.FC<CommercialPlumbingSectionProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  const commercialCapabilities = [
    {
      title: 'Backflow Testing & Municipal Certification',
      desc: 'Annual certified testing of RPZ, DCVA, and PVB backflow preventers with direct report filing to City of Phoenix, Scottsdale, Tempe, and Glendale water departments.',
      flatRate: '$165 / device',
      serviceId: 'cm-01',
    },
    {
      title: 'Restaurant Grease Interceptor & Drain Hydrojetting',
      desc: '4000 PSI high-pressure grease scouring to prevent health department shutdowns and keep kitchen lines flowing seamlessly during peak dinner rushes.',
      flatRate: '$580 flat rate',
      serviceId: 'cm-03',
    },
    {
      title: 'Commercial High-Recovery Water Heaters & Boilers',
      desc: '100-Gallon 199k BTU gas commercial water heaters and multi-tank manifold systems for hotels, gyms, laundromats, and food service.',
      flatRate: 'From $3,200',
      serviceId: 'cm-04',
    },
    {
      title: 'Property Management & HOA Service Agreements',
      desc: 'Dedicated priority dispatch for Maricopa County commercial landlords, strip malls, HOA boards, and retail centers with consolidated billing.',
      flatRate: '$0 Dispatch Fees',
      serviceId: 'cm-10',
    },
  ];

  return (
    <section id="commercial-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>Commercial & Property Management Division</span>
          </div>

          <h2 className={`font-black tracking-tight text-slate-900 ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            Commercial Plumbing & Backflow Compliance for <br />
            <span className="text-amber-700">Phoenix Businesses & Facilities</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Licensed & bonded under <strong className="text-slate-900">AZ ROC #354554 (CR-37)</strong>. We keep restaurants, retail complexes, offices, and HOAs compliant with Arizona plumbing codes and municipal regulations.
          </p>
        </div>

        {/* 4 Commercial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {commercialCapabilities.map((cap, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {cap.title}
                  </h3>
                  <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                    {cap.flatRate}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Licensed AZ ROC #354554</span>
                </span>
                <button
                  id={`comm-book-${cap.serviceId}`}
                  onClick={() => onOpenBooking(cap.serviceId)}
                  className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Hotline Banner */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Commercial Direct Line
            </div>
            <h4 className="text-xl font-bold text-white">
              Need Priority Facility Service or Backflow Certification?
            </h4>
            <p className="text-xs text-slate-400">
              Contact our master plumbing dispatch for same-day commercial routing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:4809383803"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>(480) 938-3803</span>
            </a>
            <button
              onClick={() => onOpenBooking('cm-01')}
              className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
            >
              Schedule Commercial Inspection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
