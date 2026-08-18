import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Award,
  Sparkles,
  ExternalLink,
  Heart,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { JBLogo } from './JBLogo';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigatePage: (page: ActivePage) => void;
  onOpenBooking: () => void;
  onOpenEstimator: () => void;
  onOpenEmergency: () => void;
  onOpenProgressAudit: () => void;
  onOpenVirtualPlumber: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenBooking,
  onOpenEstimator,
  onOpenEmergency,
  onOpenProgressAudit,
  onOpenVirtualPlumber,
}) => {
  return (
    <footer className="bg-[#0C0C0E] text-slate-300 border-t border-[#222226] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#222226]">
          {/* Col 1: Brand & License */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigatePage('home')}>
              <JBLogo size="lg" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Greater Phoenix’s trusted family-owned plumbing company. Built on honest transparent flat rates, $0 trip fees, non-commissioned master craftsmen, and a 1-Year Workmanship Warranty.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Arizona Registrar of Contractors: <strong className="text-white font-mono">AZ ROC #354554</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Better Business Bureau: <strong className="text-white">BBB A+ Accredited</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E6B054]" />
                <span>Thumbtack Top Pro: <strong className="text-white">4.9★ Average Rating</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Pages Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Website Pages
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('rates')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1 font-semibold text-slate-200"
                >
                  <span>86 Flat Rates Catalog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('emergency')}
                  className="hover:text-red-300 text-red-400 transition-colors flex items-center gap-1 font-bold"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>24/7 Emergency Triage</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVirtualPlumber}
                  className="text-[#E6B054] hover:text-[#FDE68A] font-bold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Virtual Plumber (AI Diagnostic)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('estimator')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E6B054]" />
                  <span>60-Sec Price Estimator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('service-areas')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1"
                >
                  <span>Valley Coverage & Hardness</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('commercial')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1"
                >
                  <span>Commercial & Remodels</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('about')}
                  className="hover:text-[#E6B054] transition-colors flex items-center gap-1"
                >
                  <span>About & Competitor Comparison</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Flat Rates */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Popular Flat Rates
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Water Heaters (From $1,489)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Drain Snaking (From $139)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Garbage Disposals ($265)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Whole-Home Water Softeners ($1,695)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Under-Sink 5-Stage RO ($595)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  Acoustic Slab Leak Detection ($395)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('rates')} className="hover:text-[#E6B054] transition-colors">
                  PRV Pressure Regulators ($425)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Dispatch
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <a
                href="tel:4809383803"
                className="flex items-center gap-2 text-[#E6B054] hover:text-[#FDE68A] font-bold text-sm"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#E6B054]" />
                <span>(480) 938-3803</span>
              </a>

              <a
                href="mailto:Jalal@judaibrothers.com"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Jalal@judaibrothers.com</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <Clock className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Hours of Operation:</div>
                  <div>Mon - Sun: 8:00 AM - 6:00 PM</div>
                  <div className="text-[#E6B054] font-semibold">+ 24/7 Emergency Dispatch</div>
                  <div className="text-[11px] text-slate-500">Zero Overtime Surcharges</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Phoenix Metropolitan Area, AZ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Benchmarks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Judai Brothers LLC. All rights reserved. AZ ROC #354554 (CR-37 Plumbing).
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenProgressAudit} className="hover:text-white underline">
              Benchmark Verification (/progress.html)
            </button>
            <span>•</span>
            <span className="text-slate-400">100% Transparent Flat Rates</span>
            <span>•</span>
            <span className="text-slate-400">Housecall Pro Integrated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
