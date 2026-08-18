import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  Sparkles,
  ShieldCheck,
  Search,
  Menu,
  X,
  Eye,
  AlertTriangle,
  MapPin,
  Clock,
  Flame,
  Award,
  Building2,
  HelpCircle,
  Home,
  MessageSquareQuote
} from 'lucide-react';
import { JBLogo } from './JBLogo';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigatePage: (page: ActivePage) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenEstimator: () => void;
  onOpenEmergency: () => void;
  onOpenProgressAudit: () => void;
  onOpenVirtualPlumber: () => void;
  highLegibilityMode: boolean;
  onToggleLegibility: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigatePage,
  onOpenBooking,
  onOpenEstimator,
  onOpenEmergency,
  onOpenProgressAudit,
  onOpenVirtualPlumber,
  highLegibilityMode,
  onToggleLegibility,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; badge?: string; isEmergency?: boolean; icon?: any }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rates', label: 'Pricing (86 Rates)', badge: '100% Upfront' },
    { id: 'emergency', label: '24/7 Emergency', isEmergency: true },
    { id: 'estimator', label: 'Estimator' },
    { id: 'service-areas', label: 'Valley Areas' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C0C0E]/95 backdrop-blur-md border-b border-[#222226] text-white transition-all">
      {/* Top Utility & Schedule Bar (Directly from judaibrothers.com) */}
      <div className="bg-[#070709] text-slate-400 text-xs py-1.5 px-4 sm:px-6 border-b border-[#1A1A1E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Phone & Operating Hours */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <a
              href="tel:4809383803"
              className="font-bold text-[#E6B054] hover:text-[#FDE68A] transition-colors"
            >
              480-938-3803
            </a>
            <span className="text-[#3E3E46]">|</span>
            <span className="text-slate-300">
              Every day 8–6 • 24-hour emergency service
            </span>
          </div>

          {/* Social Links & Senior / Accessibility Toggles */}
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] tracking-wider uppercase font-semibold text-slate-400 ml-auto">
            <span className="hidden lg:inline text-slate-500 hover:text-slate-300 cursor-pointer">NEXTDOOR</span>
            <span className="hidden lg:inline text-slate-500 hover:text-slate-300 cursor-pointer">FACEBOOK</span>
            <span className="hidden lg:inline text-slate-500 hover:text-slate-300 cursor-pointer">INSTAGRAM</span>
            <span className="hidden lg:inline text-slate-500 hover:text-slate-300 cursor-pointer">GOOGLE</span>

            <span className="hidden sm:inline text-[#2A2A30]">|</span>

            {/* Senior / High Legibility Toggle */}
            <button
              id="header-senior-mode-toggle"
              onClick={onToggleLegibility}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                highLegibilityMode
                  ? 'bg-[#E6B054] text-[#0C0C0E]'
                  : 'bg-[#1C1C22] text-slate-300 hover:text-white border border-[#2E2E38]'
              }`}
              title="Toggle Large High-Legibility Mode"
            >
              <Eye className="w-3 h-3" />
              <span>{highLegibilityMode ? 'Legibility: ON' : 'Senior View'}</span>
            </button>

            {/* Virtual Plumber AI Shortcut */}
            <button
              id="header-virtual-plumber-top-btn"
              onClick={onOpenVirtualPlumber}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-[#E6B054] hover:text-amber-200 border border-amber-500/40 text-[10px] font-bold uppercase transition-all"
              title="Open Virtual Plumber AI Diagnostic Chat"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Plumber</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Authentic Brand Logo */}
        <div
          className="cursor-pointer shrink-0"
          onClick={() => onNavigatePage('home')}
        >
          <JBLogo size={highLegibilityMode ? 'lg' : 'md'} />
        </div>

        {/* Desktop Multi-Page Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold tracking-widest uppercase text-slate-300">
          {navItems.map((item) => {
            const isActive = activePage === item.id;

            if (item.isEmergency) {
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}-btn`}
                  onClick={() => onNavigatePage(item.id)}
                  className={`flex items-center gap-1.5 transition-colors font-bold ${
                    isActive
                      ? 'text-red-400'
                      : 'text-red-500 hover:text-red-400'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => onNavigatePage(item.id)}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive
                    ? 'text-[#E6B054] font-bold'
                    : 'text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E6B054] rounded-full" />
                )}
                {item.badge && (
                  <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-[#E6B054] border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs (Matching judaibrothers.com Phone Pill & Red Call Button) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Sleek Golden Border Phone Pill (from live site) */}
          <a
            href="tel:4809383803"
            id="header-call-btn"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121215] hover:bg-[#1A1A20] text-slate-200 hover:text-[#E6B054] font-medium text-xs border border-[#4A3D28] transition-all hover:border-[#E6B054]/80 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#E6B054]" />
            <span className="font-mono text-xs font-bold tracking-wide">480-938-3803</span>
          </a>

          {/* Book Online Pill Button */}
          <button
            id="header-housecall-book-btn"
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-bold text-xs shadow-md transition-all hover:shadow-red-900/40 active:scale-95 border border-red-500/30"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Book Online ($0 Fee)</span>
          </button>
        </div>

        {/* Mobile / Tablet Menu Button (Matching live site rounded pill menu) */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16161A] text-slate-300 hover:text-white border border-[#2E2E36] text-xs font-semibold"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>MENU</span>
        </button>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0C0C0E] border-b border-[#222226] px-4 pt-3 pb-6 shadow-2xl space-y-3 animate-in slide-in-from-top-4 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <a
              href="tel:4809383803"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DC2626] text-white font-black text-xs sm:text-sm shadow"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>(480) 938-3803</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1C1C22] text-[#E6B054] border border-[#4A3D28] font-bold text-xs sm:text-sm shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online ($0)</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider text-slate-300 pt-2 border-t border-[#1E1E24]">
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigatePage(item.id);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                    isActive
                      ? 'bg-[#18181E] text-[#E6B054] font-bold'
                      : item.isEmergency
                      ? 'bg-red-950/30 text-red-400 font-bold border border-red-900/30'
                      : 'hover:bg-[#141418] text-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-amber-500/20 text-[#E6B054] font-black px-2 py-0.5 rounded border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVirtualPlumber();
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 text-[#E6B054] text-left font-black mt-2"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E6B054]" />
                <span>Virtual Plumber AI</span>
              </span>
              <span className="text-[10px] bg-[#E6B054] text-[#0C0C0E] font-black px-2 py-0.5 rounded">
                Instant Help
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProgressAudit();
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-[#141418] text-slate-400 text-left font-semibold text-xs"
            >
              <Award className="w-4 h-4 text-[#E6B054]" />
              <span>Live Benchmark Audit (/progress.html)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
