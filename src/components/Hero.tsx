import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Calendar,
  Phone,
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  Waves,
  Droplets,
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Zap
} from 'lucide-react';
import { JBLogo } from './JBLogo';
import { PhoenixWeatherAlert } from './PhoenixWeatherAlert';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenEstimator: () => void;
  onOpenEmergency: () => void;
  onNavigateToCatalog: () => void;
  onOpenVirtualPlumber?: () => void;
  highLegibilityMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenEstimator,
  onOpenEmergency,
  onNavigateToCatalog,
  onOpenVirtualPlumber,
  highLegibilityMode,
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#07172C] via-[#0B2545] to-[#0D3B66] text-white pt-8 pb-16 lg:pt-10 lg:pb-20 border-b border-blue-900/60"
    >
      {/* Background Subtle Precision Grid & Desert Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1E3A8A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A_1px,transparent_1px)] bg-[size:4rem_4rem]" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-400/20 via-blue-500/15 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Top Trust & Status Badges */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B2545]/90 border border-blue-700/60 text-xs font-semibold text-blue-100 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Phoenix Metro On-Call: <strong className="text-amber-300">5 Master Crews Active</strong></span>
            <span className="text-blue-400">•</span>
            <span className="text-blue-200">Avg Response 30-45 mins</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-blue-100">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5.0</span>
            <span className="text-blue-200">(324+ Verified Reviews)</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-blue-600/30 text-blue-200 font-bold border border-blue-400/40 text-[11px]">
              Thumbtack Top Pro 2023-2025
            </span>
          </div>
        </motion.div>

        {/* Proactive Weather & Seasonal Advice Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PhoenixWeatherAlert
            highLegibilityMode={highLegibilityMode}
            onOpenBooking={onOpenBooking}
          />
        </motion.div>

        {/* Main Headline & Value Proposition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Clear Core Messaging */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                <span className="w-6 h-[2px] bg-amber-400" />
                <span>Greater Phoenix Residential & Commercial Plumbing</span>
              </div>
              
              <h1 className={`font-black tracking-tight text-white ${
                highLegibilityMode ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl'
              } leading-[1.12]`}>
                Transparent Flat Rates.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100">
                  Zero Trip Fees.
                </span><br />
                Master Plumber Craftsmanship.
              </h1>

              <p className={`text-blue-100 font-normal leading-relaxed max-w-2xl ${
                highLegibilityMode ? 'text-lg sm:text-xl text-white font-medium' : 'text-base sm:text-lg'
              }`}>
                We published all <strong className="text-white font-bold">86 exact flat rates</strong> on our website so you know the binding cost before anyone turns a wrench. Licensed & bonded under <strong className="text-amber-300 font-bold">AZ ROC #354554</strong> with a full 1-Year Workmanship Warranty on every job.
              </p>
            </motion.div>

            {/* Core Pillars Bullet Points */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm font-semibold text-blue-100"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>$0 Trip Fee to Show Up</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Overtime or Weekend Surcharges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Year 100% Parts & Labor Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Housecall Pro GPS Tracking</span>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3"
            >
              <button
                id="hero-book-saturday-btn"
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B2545] font-black text-base shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
              >
                <Calendar className="w-5 h-5 text-[#0B2545]" />
                <span>Book Online (Saturday Slots Open)</span>
              </button>

              <button
                id="hero-view-rates-btn"
                onClick={onNavigateToCatalog}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-white font-bold text-base border border-blue-600/60 transition-colors shadow-sm"
              >
                <Search className="w-5 h-5 text-amber-300" />
                <span>View All 86 Flat Rates</span>
              </button>

              <a
                href="tel:4809383803"
                id="hero-call-direct-btn"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#0B2545] hover:bg-blue-950 text-amber-300 font-black text-base border border-amber-400/50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>(480) 938-3803</span>
              </a>
            </motion.div>

            {/* Guaranteed Trust Line */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AZ ROC #354554 (CR-37)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>BBB A+ Accredited Business</span>
              </span>
              <span>•</span>
              <span>Jalal J. (Owner & Master Plumber)</span>
            </motion.div>
          </div>

          {/* Right Column: Instant Action Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", bounce: 0.3 }}
            className="lg:col-span-5 perspective-1000"
          >
            <div className="relative rounded-2xl bg-[#0B2545]/95 border border-blue-700/60 p-6 shadow-2xl space-y-5 ring-1 ring-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Quick Plumbing Hub</span>
                  </h2>
                  <p className="text-xs text-blue-200">Select your urgent need for instant flat rate & booking</p>
                </div>
                <button
                  onClick={onOpenEstimator}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 underline"
                >
                  60-Sec Calculator
                </button>
              </div>

              {/* Fast Issue Selector Pills */}
              <div className="space-y-2.5">
                <button
                  id="hero-quick-water-heater"
                  onClick={() => onOpenBooking('wh-01')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 hover:border-amber-400/50 border border-blue-800/80 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/15 text-amber-300 group-hover:bg-amber-400/25">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-amber-200">
                        Water Heater Tank Replacement
                      </div>
                      <div className="text-xs text-blue-200">Bradford White 40/50 gal complete with haul-away</div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <div className="font-mono font-bold text-amber-300 text-sm">$1,489</div>
                    <div className="text-[10px] text-blue-200 font-semibold">Flat Rate</div>
                  </div>
                </button>

                <button
                  id="hero-quick-drain-clearing"
                  onClick={() => onOpenBooking('dr-01')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 hover:border-amber-400/50 border border-blue-800/80 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 group-hover:bg-sky-500/30">
                      <Waves className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-amber-200">
                        Main Sewer Cleanout Snaking
                      </div>
                      <div className="text-xs text-blue-200">Industrial root-cutting blades up to 100 ft</div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <div className="font-mono font-bold text-amber-300 text-sm">$139</div>
                    <div className="text-[10px] text-blue-200 font-semibold">Flat Rate</div>
                  </div>
                </button>

                <button
                  id="hero-quick-disposal"
                  onClick={() => onOpenBooking('fs-03')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 hover:border-amber-400/50 border border-blue-800/80 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500/30">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-amber-200">
                        Garbage Disposal (Badger 5 Unit Included)
                      </div>
                      <div className="text-xs text-blue-200">New InSinkErator 1/2 HP + installation</div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <div className="font-mono font-bold text-amber-300 text-sm">$265</div>
                    <div className="text-[10px] text-blue-200 font-semibold">Flat Rate</div>
                  </div>
                </button>

                <button
                  id="hero-quick-slab-leak"
                  onClick={() => onOpenBooking('lk-01')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 hover:border-amber-400/50 border border-blue-800/80 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500/30">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-amber-200">
                        Electronic Acoustic Slab Leak Detection
                      </div>
                      <div className="text-xs text-blue-200">FLIR thermal imaging & acoustic sensors</div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <div className="font-mono font-bold text-amber-300 text-sm">$345</div>
                    <div className="text-[10px] text-blue-200 font-semibold">Flat Rate</div>
                  </div>
                </button>
              </div>

              {/* Virtual Plumber AI Diagnostic Banner */}
              {onOpenVirtualPlumber && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-amber-400/25 via-blue-900/40 to-blue-950/60 border border-amber-400/40 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#0B2545] flex items-center justify-center font-bold shrink-0 relative">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-amber-200 border-dashed rounded-lg"
                      />
                      <Sparkles className="w-4 h-4 z-10" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <span>Virtual Plumber (AI)</span>
                        <span className="text-[9px] bg-amber-400 text-[#0B2545] px-1.5 py-0.2 rounded font-black uppercase shadow-sm">Free</span>
                      </div>
                      <div className="text-[11px] text-blue-100">Describe your symptoms for instant diagnosis</div>
                    </div>
                  </div>

                  <button
                    id="hero-virtual-plumber-btn"
                    onClick={onOpenVirtualPlumber}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0B2545] font-black text-xs shrink-0 shadow transition-all active:scale-95 flex items-center gap-1 group"
                  >
                    <span>Ask AI</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Instant Emergency Diagnostic CTA */}
              <div className="pt-2 border-t border-blue-800/80 flex items-center justify-between text-xs">
                <span className="text-blue-200">Active leak or burst pipe right now?</span>
                <button
                  onClick={onOpenEmergency}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 group"
                >
                  <span>Emergency Shutoff Help</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
