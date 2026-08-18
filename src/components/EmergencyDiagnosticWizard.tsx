import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  Calendar,
  X,
  ShieldAlert,
  Droplets,
  Flame,
  Waves,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface EmergencyDiagnosticWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
  highLegibilityMode: boolean;
}

export const EmergencyDiagnosticWizard: React.FC<EmergencyDiagnosticWizardProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  highLegibilityMode,
}) => {
  const [selectedEmergency, setSelectedEmergency] = useState<string>('burst-pipe');

  if (!isOpen) return null;

  const emergencies = [
    {
      id: 'burst-pipe',
      title: 'Burst Pipe / Active Gushing Leak',
      icon: Droplets,
      urgency: 'HIGH DANGER OF FLOODING',
      immediateStep: 'SHUT OFF MAIN WATER VALVE IMMEDIATELY',
      shutoffGuide: 'Locate your outdoor front yard main water riser (usually near the hose bibb by front wall or near the water meter). Turn the brass ball valve handle 90 degrees until perpendicular to the pipe.',
      recommendedServiceId: 'lk-02',
      flatRatePrice: 245,
      serviceName: 'Copper Pinhole / Pipe Burst Solder Repair',
    },
    {
      id: 'water-heater-flood',
      title: 'Water Heater Flooding / Leaking Tank',
      icon: Flame,
      urgency: 'WATER & GAS/ELECTRICAL HAZARD',
      immediateStep: 'SHUT OFF COLD WATER INLET & FLIP BREAKER / GAS VALVE',
      shutoffGuide: 'Turn the cold water shutoff valve on top of the water heater clockwise. For gas heaters, rotate the bottom gas thermostat dial to "OFF". For electric heaters, switch off the 30-amp breaker.',
      recommendedServiceId: 'wh-01',
      flatRatePrice: 1489,
      serviceName: 'Standard 40/50 Gal Water Heater Replacement',
    },
    {
      id: 'sewer-backup',
      title: 'Whole House Sewer Backup / Toilets Overflowing',
      icon: Waves,
      urgency: 'BIOHAZARD / CEASE WATER USAGE',
      immediateStep: 'STOP RUNNING ALL WATER, DISHWASHER & LAUNDRY',
      shutoffGuide: 'Do not flush any toilets or run washing machines. Water used upstairs will back up into downstairs showers or tubs. If cleanout cap in yard is loose, open carefully to relieve house head pressure.',
      recommendedServiceId: 'dr-01',
      flatRatePrice: 139,
      serviceName: 'Main Sewer Cleanout Snaking (Up to 100 Ft)',
    },
    {
      id: 'gas-odor',
      title: 'Gas Odor / Rotten Egg Smell',
      icon: AlertTriangle,
      urgency: 'EXPLOSION RISK - EVACUATE STRUCTURE',
      immediateStep: 'EVACUATE & DO NOT TOUCH ELECTRICAL SWITCHES',
      shutoffGuide: 'Leave the house immediately. Do NOT turn light switches on/off or use cell phone inside. Turn off main gas valve at meter with an adjustable wrench if safe to reach.',
      recommendedServiceId: 'lk-10',
      flatRatePrice: 280,
      serviceName: 'Gas Leak Detection & Emergency Safety Isolation',
    },
  ];

  const active = emergencies.find((e) => e.id === selectedEmergency) || emergencies[0];
  const Icon = active.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-red-500/40 max-h-[92vh] flex flex-col overflow-hidden ring-1 ring-red-500/30">
        {/* Top Emergency Red Banner */}
        <div className="bg-red-600 text-white px-5 py-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-lg bg-white/20">
              <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-black text-sm uppercase tracking-wider">
                24/7 Phoenix Emergency Plumbing Triage
              </span>
              <div className="text-[11px] text-red-100">$0 Overtime / Night / Weekend Surcharges</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-red-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Select Emergency Situation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Your Active Emergency:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {emergencies.map((em) => {
                const isSelected = selectedEmergency === em.id;
                const EmIcon = em.icon;
                return (
                  <button
                    key={em.id}
                    id={`emergency-btn-${em.id}`}
                    onClick={() => setSelectedEmergency(em.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-red-950/80 border-red-500 ring-2 ring-red-400/50'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <EmIcon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-red-400' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-white">{em.title}</div>
                      <div className="text-[10px] text-red-400 font-semibold">{em.urgency}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Critical Shut-Off Instruction Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-950 border border-red-500/40 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-black text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Step 1: {active.immediateStep}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {active.shutoffGuide}
            </p>
          </div>

          {/* Bound Flat-Rate Solution Card */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Published Flat-Rate Fix
              </div>
              <div className="font-bold text-sm text-white">
                {active.serviceName}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Arrival Window: 30 - 45 Minutes Across Greater Phoenix
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="font-mono text-2xl font-black text-amber-400">
                ${active.flatRatePrice.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase">
                $0 Trip Fee • 1-Yr Warranty
              </div>
            </div>
          </div>

          {/* Action CTAs: Direct Call or Immediate Book */}
          <div className="space-y-2.5 pt-1">
            <a
              href="tel:4809383803"
              id="emergency-call-dispatch-btn"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-base shadow-lg shadow-red-900/40 transition-transform active:scale-95"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>CALL DISPATCH NOW: (480) 938-3803</span>
            </a>

            <button
              id="emergency-book-now-btn"
              onClick={() => {
                onClose();
                onOpenBooking(active.recommendedServiceId);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Or Dispatch via Housecall Pro Online</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AZ ROC #354554 (Bonded)</span>
            </span>
            <span>•</span>
            <span>Jalal J. Master Plumber On-Call</span>
          </div>
        </div>
      </div>
    </div>
  );
};
