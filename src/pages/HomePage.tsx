import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Calendar,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Clock,
  Droplets,
  Award,
  Flame,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Wrench
} from 'lucide-react';
import { JBLogo } from '../components/JBLogo';
import { ActivePage, FlatRateItem } from '../types';

interface HomePageProps {
  onNavigatePage: (page: ActivePage) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenEstimator: () => void;
  onOpenEmergency: () => void;
  onOpenVirtualPlumber: () => void;
  highLegibilityMode: boolean;
}

const featuredServices = [
  {
    id: 'wh-50-gas',
    title: '50-Gal Water Heater Replacement',
    price: '$1,489',
    unit: 'Complete Install',
    desc: 'Includes Rheem/Bradford unit, thermal expansion tank, brass ball valve, earthquake strapping & haul away.',
    badge: 'Most Popular',
    page: 'rates' as ActivePage,
  },
  {
    id: 'drain-main',
    title: 'Main Line Sewer Drain Snaking',
    price: '$189',
    unit: 'Flat Rate',
    desc: 'Heavy-duty commercial drum snake up to 100ft with free video camera inspection included.',
    badge: '24/7 Available',
    page: 'rates' as ActivePage,
  },
  {
    id: 'softener-whole-home',
    title: 'Whole-Home Water Softener',
    price: '$1,695',
    unit: 'Fleck 5600SXT',
    desc: 'High-efficiency 48k grain system tailored for Phoenix’s extreme 15–25 GPG mineral hardness.',
    badge: 'Desert Essential',
    page: 'rates' as ActivePage,
  },
  {
    id: 'disposal-1-2hp',
    title: 'Garbage Disposal Replacement',
    price: '$265',
    unit: 'Insinkerator 1/2 HP',
    desc: 'Complete Badger 5 unit, new quick-lock collar, electrical whip, and plumbing tie-in.',
    badge: 'Same-Day Install',
    page: 'rates' as ActivePage,
  },
  {
    id: 'leak-slab-detect',
    title: 'Acoustic Slab Leak Detection',
    price: '$395',
    unit: 'Complete Diagnostic',
    desc: 'Non-destructive ultrasonic acoustic + thermal detection pinpointing underground pipe leaks.',
    badge: 'Precision Tech',
    page: 'rates' as ActivePage,
  },
  {
    id: 'prv-regulator',
    title: 'Main Pressure Regulator (PRV)',
    price: '$425',
    unit: 'Wilkins / Watts',
    desc: 'Prevents high-pressure pipe bursts by calibrating municipal water safely between 55–65 PSI.',
    badge: 'Code Required',
    page: 'rates' as ActivePage,
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigatePage,
  onOpenBooking,
  onOpenEstimator,
  onOpenEmergency,
  onOpenVirtualPlumber,
  highLegibilityMode,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Authentic judaibrothers.com Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        id="home-hero"
        className="relative overflow-hidden bg-[#0C0C0E] text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#222226]"
      >
        {/* Atmospheric Field Jobsite Lighting Glows & Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle geometric grid */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Top Eyebrow & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs tracking-widest uppercase font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[#D4A359]">AZ ROC 354554</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">PHOENIX METRO</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">SINCE 2023</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181D] border border-[#2E2E38] text-[11px] text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>24/7 Valley Dispatch Active</span>
              <span className="text-[#3E3E48]">•</span>
              <span className="text-[#E6B054] font-bold">45–90 Min Avg Arrival</span>
            </div>
          </div>

          {/* Main Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">
            {/* Left Column: Exact Headline & $0 Leaderboard from judaibrothers.com */}
            <div className="lg:col-span-7 space-y-7">
              {/* Editorial Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl text-white font-serif tracking-tight leading-[1.12]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Phoenix plumbing <br className="hidden sm:inline" />
                with the{' '}
                <span className="text-[#E6B054] italic font-serif">
                  price up front.
                </span>
              </h1>

              {/* Lead Paragraph */}
              <p
                className={`text-slate-300 leading-relaxed max-w-xl ${
                  highLegibilityMode ? 'text-lg font-medium text-white' : 'text-base sm:text-lg text-slate-300'
                }`}
              >
                Eighty-six flat rates, published on this site. You know the number before we arrive — and you only pay for work you approve.
              </p>

              {/* Exact $0 Transparent Price Leaderboard with Dotted Leaders */}
              <div className="space-y-2.5 max-w-md py-2 border-y border-[#26262C]">
                <div className="flex items-center justify-between text-sm tracking-wider uppercase font-semibold">
                  <span className="text-slate-400 text-xs sm:text-sm">TRIP FEE</span>
                  <span className="flex-1 mx-3 border-b border-dotted border-slate-700/80 mb-1" />
                  <span className="text-lg font-serif font-bold text-[#E6B054]">$0</span>
                </div>

                <div className="flex items-center justify-between text-sm tracking-wider uppercase font-semibold">
                  <span className="text-slate-400 text-xs sm:text-sm">AFTER-HOURS</span>
                  <span className="flex-1 mx-3 border-b border-dotted border-slate-700/80 mb-1" />
                  <span className="text-lg font-serif font-bold text-[#E6B054]">$0</span>
                </div>

                <div className="flex items-center justify-between text-sm tracking-wider uppercase font-semibold">
                  <span className="text-slate-400 text-xs sm:text-sm">ESTIMATE</span>
                  <span className="flex-1 mx-3 border-b border-dotted border-slate-700/80 mb-1" />
                  <span className="text-lg font-serif font-bold text-[#E6B054]">$0</span>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => onNavigatePage('rates')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E6B054] hover:text-[#FDE68A] transition-colors"
                  >
                    <span>SEE ALL 86 RATES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">100% Binding Upfront Quotes</span>
                </div>
              </div>

              {/* Primary Call-to-Actions (Exact Red Call Button + Dark Outline Book Button) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="tel:4809383803"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#E53935] hover:bg-[#D32F2F] text-white font-black text-sm tracking-wide shadow-lg shadow-red-950/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>CALL 480-938-3803</span>
                </a>

                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#141418] hover:bg-[#1C1C22] text-slate-200 hover:text-white font-bold text-sm tracking-wide border border-[#383842] hover:border-[#E6B054]/70 shadow-md transition-all uppercase"
                >
                  <Calendar className="w-4 h-4 text-[#E6B054]" />
                  <span>BOOK ONLINE</span>
                </button>

                <button
                  onClick={() => onOpenVirtualPlumber()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:bg-amber-500/20 text-[#E6B054] font-bold text-xs border border-amber-500/30 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI DIAGNOSTIC</span>
                </button>
              </div>

              {/* Reassurance Guarantee Text (Direct from judaibrothers.com) */}
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                1-year warranty on parts and workmanship. 100% satisfaction guarantee — if you're not happy, we make it right.
              </p>
            </div>

            {/* Right Column: Visual Technician Card & 24/7 Fast Dispatch Box */}
            <div className="lg:col-span-5 space-y-4">
              {/* Authentic Jobsite Visual Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2A2A32] bg-[#121216] shadow-2xl group">
                {/* Visual Header / Inspection Camera Screen Simulation */}
                <div className="relative h-64 sm:h-72 w-full bg-gradient-to-br from-[#18181F] via-[#0E0E12] to-[#08080A] p-4 flex flex-col justify-between overflow-hidden">
                  {/* Background Radial Light to simulate jobsite worklight */}
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0E] to-transparent" />

                  {/* High Quality Field Plumber Inspection Backdrop Graphics */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      <Wrench className="w-3 h-3 text-amber-400" />
                      Licensed Master Plumbers On-Duty
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-black/50 px-2 py-0.5 rounded">
                      ROC #354554
                    </span>
                  </div>

                  {/* Technician Jobsite Graphic / Rig Context */}
                  <div className="relative z-10 space-y-2 mt-auto">
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#E53935]/90 text-white font-bold text-xs shadow">
                      24/7 Zero Overtime Charges
                    </div>
                    <div className="text-white font-serif text-lg font-bold">
                      Master Tradespeople, Not Salespeople
                    </div>
                    <p className="text-xs text-slate-300">
                      Equipped with Ridgid sewer inspection cameras, hydro-jetting rigs, and factory OEM repair parts.
                    </p>
                  </div>
                </div>

                {/* Emergency Triage Quick Dispatch Block */}
                <div className="p-4 sm:p-5 bg-[#141418] border-t border-[#26262E] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="font-bold text-white text-xs uppercase tracking-wider">
                        Plumbing Emergency?
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      ON-CALL NOW
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onNavigatePage('emergency')}
                      className="py-2.5 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/40 font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>Shutoff Guide</span>
                    </button>
                    <button
                      onClick={() => onNavigatePage('estimator')}
                      className="py-2.5 px-3 rounded-lg bg-[#1C1C24] hover:bg-[#252530] text-[#E6B054] border border-[#3E3E4E] font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>60-Sec Estimate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Services & Transparent Upfront Rates Snapshot */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[#26262E] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6B054]">
              Transparent Pricing Promise
            </span>
            <h2
              className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Popular Upfront Flat-Rate Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every rate published online before our truck arrives. No hidden surcharges, no diagnostic fees.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage('rates')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#18181D] hover:bg-[#22222A] text-[#E6B054] border border-[#3E3E48] font-bold text-xs sm:text-sm self-start sm:self-auto shadow-sm transition-colors uppercase tracking-wider"
          >
            <span>View All 86 Flat Rates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Clean Featured Cards in Dark Craftsman Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredServices.map((service) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              key={service.id}
              className="rounded-xl bg-[#121216] border border-[#26262E] p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group hover:border-[#E6B054]/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-[#E6B054] border border-amber-500/30">
                    {service.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">1-Yr Warranty</span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-[#E6B054] transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-black text-white font-mono">
                      {service.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {service.unit}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1E1E24] flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigatePage('rates')}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs shadow-sm transition-colors uppercase tracking-wider"
                >
                  Book at This Rate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Virtual Plumber AI Interactive Diagnostic Banner */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-2xl bg-[#121216] text-white p-6 sm:p-8 border border-[#26262E] shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[#E6B054] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Master Plumber Diagnosis</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-serif text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Not sure what’s wrong with your plumbing? <br />
                <span className="text-[#E6B054] italic">
                  Ask our Virtual Plumber AI in seconds.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trained on Arizona plumbing codes, Phoenix hard water conditions (15–25 GPG), and our complete catalog of 86 transparent flat rates. Get immediate triage, DIY safety checks, or instant booking with <strong>$0 trip fees</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant symptom diagnosis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Emergency water shutoff guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exact upfront pricing checks</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                id="homepage-open-virtual-plumber-btn"
                onClick={onOpenVirtualPlumber}
                className="px-6 py-3.5 rounded-lg bg-[#E6B054] hover:bg-[#D4A359] text-[#0C0C0E] font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Virtual Plumber</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:4809383803"
                className="px-5 py-3 rounded-lg bg-[#18181E] hover:bg-[#222228] text-slate-200 font-bold text-xs sm:text-sm border border-[#3E3E48] transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <Phone className="w-4 h-4 text-[#E6B054]" />
                <span>Speak to Master Plumber</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Judai Brothers - 5 Pillars */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-2xl bg-[#121216] text-white p-8 sm:p-10 border border-[#26262E] shadow-xl">
          <div className="max-w-3xl space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6B054]">
              The Judai Brothers Standard
            </span>
            <h2
              className="text-2xl sm:text-3xl font-serif text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why Phoenix Homeowners Choose Our Master Plumbers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              We started Judai Brothers because homeowners were tired of predatory diagnostic fees, inflated quotes, and commissioned salespeople posing as plumbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-5 rounded-xl bg-[#18181E] border border-[#282830] space-y-2.5">
              <div className="p-2.5 rounded-lg bg-amber-500/15 text-[#E6B054] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">100% Upfront Pricing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All 86 flat rates are published online. The price you see is the price you pay. Never an invoice surprise.
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-5 rounded-xl bg-[#18181E] border border-[#282830] space-y-2.5">
              <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 w-fit">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">$0 Trip & Diagnostic Fees</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We never charge you just to drive to your home. Free straightforward estimates with clear options.
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-5 rounded-xl bg-[#18181E] border border-[#282830] space-y-2.5">
              <div className="p-2.5 rounded-lg bg-amber-500/15 text-[#E6B054] w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">1-Year Warranty on All Work</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every repair, repipe, and installation is covered by our comprehensive 365-day parts and labor guarantee.
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-5 rounded-xl bg-[#18181E] border border-[#282830] space-y-2.5">
              <div className="p-2.5 rounded-lg bg-sky-500/15 text-sky-400 w-fit">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Non-Commissioned Plumbers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our technicians are paid fair hourly wages, not commissions. They recommend only what you actually need.
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-5 rounded-xl bg-[#18181E] border border-[#282830] space-y-2.5 sm:col-span-2 lg:col-span-1">
              <div className="p-2.5 rounded-lg bg-red-500/15 text-red-400 w-fit">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">24/7 Valley Emergency Service</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nights, weekends, and holidays at standard flat rates. We never exploit an emergency with surge pricing.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Navigation Cards to Other Pages */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => onNavigatePage('emergency')}
            className="cursor-pointer rounded-xl bg-[#141418] hover:bg-[#1A1A22] border border-[#2E2E38] p-6 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-[#E53935] text-white shadow-md">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wide">24/7 Fast Help</span>
            </div>
            <h3 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors">
              Emergency Plumbing & Water Shutoff
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Step-by-step water shutoff assistance, triage diagnostic wizard, and rapid master plumber dispatch.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-red-400">
              <span>Open Emergency Center</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => onNavigatePage('estimator')}
            className="cursor-pointer rounded-xl bg-[#141418] hover:bg-[#1A1A22] border border-[#2E2E38] p-6 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-[#E6B054] text-[#0C0C0E] shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#E6B054] uppercase tracking-wide">60-Sec Calculator</span>
            </div>
            <h3 className="font-bold text-white text-lg group-hover:text-[#E6B054] transition-colors">
              Instant Quote Estimator
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Calculate your exact plumbing repair or replacement cost in under a minute with itemized options.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#E6B054]">
              <span>Calculate Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => onNavigatePage('service-areas')}
            className="cursor-pointer rounded-xl bg-[#141418] hover:bg-[#1A1A22] border border-[#2E2E38] p-6 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-[#2563EB] text-white shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Phoenix Metro</span>
            </div>
            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
              Valley Coverage & Water Hardness
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Check service response times and local water hardness ratings (grains per gallon) for your city.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-400">
              <span>Check Your City</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust & Verified Reviews Preview */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-2xl bg-[#121216] border border-[#26262E] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#E6B054] mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
                <span className="text-xs font-bold text-white ml-1">4.9 / 5.0 Average Rating</span>
              </div>
              <h3
                className="text-xl font-serif text-white font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What Valley Homeowners Say About Judai Brothers
              </h3>
            </div>
            <button
              onClick={() => onNavigatePage('about')}
              className="text-xs font-bold text-[#E6B054] hover:text-[#FDE68A] underline self-start sm:self-auto"
            >
              Read All Verified Customer Stories
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4 rounded-xl bg-[#18181E] border border-[#282830] space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white">David M. — Peoria, AZ</strong>
                <span className="text-[#E6B054] font-bold">★★★★★</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Our water heater started leaking on a Sunday morning. Judai Brothers came out in 50 minutes, charged the exact $1,489 flat rate from their website, and didn't add a dime in weekend fees. Outstanding."
              </p>
              <div className="text-[10px] text-slate-500 font-medium">Verified Housecall Pro Job</div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4 rounded-xl bg-[#18181E] border border-[#282830] space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white">Sarah K. — Scottsdale, AZ</strong>
                <span className="text-[#E6B054] font-bold">★★★★★</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Another corporate company quoted me $4,800 for a water softener and repipe. Jalal from Judai Brothers explained we only needed a new pressure valve and softener for half that price. Honest and skilled."
              </p>
              <div className="text-[10px] text-slate-500 font-medium">Verified Google Review</div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-4 rounded-xl bg-[#18181E] border border-[#282830] space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white">Marcus T. — Glendale, AZ</strong>
                <span className="text-[#E6B054] font-bold">★★★★★</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Cleaned our clogged main sewer line in under an hour. Provided a camera recording of the pipe condition for free. Will never call anyone else."
              </p>
              <div className="text-[10px] text-slate-500 font-medium">Verified Thumbtack Top Pro</div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
