import React, { useState, useEffect } from 'react';
import { Bot, Wrench, Sparkles, MessageSquare, X } from 'lucide-react';

interface VirtualPlumberLauncherProps {
  onClick: () => void;
  isOpen: boolean;
}

export const VirtualPlumberLauncher: React.FC<VirtualPlumberLauncherProps> = ({
  onClick,
  isOpen,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto hide prompt tooltip after 10s if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isOpen) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Interactive Tooltip Bubble */}
      {showTooltip && (
        <div className="relative bg-[#0B2545] text-white p-3 rounded-2xl shadow-2xl border border-blue-600/60 max-w-[240px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 ring-1 ring-blue-400/20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-1.5 -right-1.5 bg-[#07172C] text-blue-200 hover:text-white p-0.5 rounded-full border border-blue-700"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-amber-300 pb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Plumbing Help?</span>
          </div>
          <p className="text-[11px] text-blue-100 leading-snug">
            Ask our <strong>Virtual Plumber AI</strong> to diagnose your leak, noise, or water heater in seconds.
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-semibold">$0 Trip Fees</span>
            <button
              onClick={onClick}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline"
            >
              Start Chat &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="virtual-plumber-fab"
        onClick={() => {
          setShowTooltip(false);
          onClick();
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#0D3B66] hover:from-[#0B2545] hover:to-[#07172C] text-white shadow-2xl border border-amber-400/50 hover:border-amber-300 transition-all hover:scale-105 active:scale-95 group ring-1 ring-blue-500/30"
        aria-label="Open Virtual Plumber AI Diagnostic Chat"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-[#0B2545] font-bold shadow-md">
            <Wrench className="w-5 h-5 text-[#0B2545] transition-transform group-hover:rotate-45" />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B2545] animate-pulse" />
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-[10px] uppercase font-black text-amber-300 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Master Plumber</span>
          </div>
          <div className="text-xs font-extrabold text-white">
            Virtual Plumber
          </div>
        </div>
      </button>
    </div>
  );
};
