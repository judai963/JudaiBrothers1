import React from 'react';
import {
  ShieldCheck,
  DollarSign,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  ThumbsUp,
  HeartHandshake
} from 'lucide-react';

interface WhyJudaiBrothersProps {
  onOpenBooking: () => void;
  highLegibilityMode: boolean;
}

export const WhyJudaiBrothers: React.FC<WhyJudaiBrothersProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  const pillars = [
    {
      num: '01',
      title: 'All 86 Flat Rates Published Upfront',
      desc: 'No "we will quote you when we get there" sales traps. You see the exact binding cost on our website before you book.',
      icon: DollarSign,
    },
    {
      num: '02',
      title: '$0 Trip Fees & Zero Overtime Surcharges',
      desc: 'We never charge a dime just to pull into your driveway. Weekends and late evenings cost the exact same flat rate.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Full 1-Year Workmanship Warranty',
      desc: 'Every solder joint, fitting, valve, and fixture is backed for 365 days. If it drips, we return immediately and fix it free.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Non-Commissioned Master Plumbers',
      desc: 'Our technicians are not sales reps pressured by sales quotas. We fix what is broken—nothing more, nothing less.',
      icon: Award,
    },
    {
      num: '05',
      title: 'Housecall Pro GPS & SMS Transparency',
      desc: 'Real-time text alerts, technician photo identification, and live on-the-way GPS tracking directly to your phone.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span>The Judai Brothers Standard</span>
          </div>

          <h2 className={`font-black tracking-tight text-white ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            Why Phoenix Homeowners Pick Us Over <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Big Private Equity Plumbing Conglomerates
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Founded on honest trade craftsmanship, clear numbers, and local family accountability.
          </p>
        </div>

        {/* 5 Pillars Bento / Flex */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {p.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Judai Brothers Guarantee</span>
                </div>
              </div>
            );
          })}

          {/* Quick Schedule Callout Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-slate-950 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-amber-950">
                Saturday Slots Active
              </div>
              <h3 className="font-black text-xl leading-snug text-slate-950">
                Need a Plumber Today or This Weekend?
              </h3>
              <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                Book in 60 seconds on Housecall Pro with instant SMS confirmation and zero trip fee.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs shadow transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
