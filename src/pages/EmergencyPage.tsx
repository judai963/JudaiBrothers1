import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  Calendar,
  ShieldAlert,
  Droplets,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  HelpCircle,
  Zap,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EmergencyDiagnosticWizard } from '../components/EmergencyDiagnosticWizard';
import { ActivePage } from '../types';

interface EmergencyPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigatePage: (page: ActivePage) => void;
  onOpenVirtualPlumber?: () => void;
  highLegibilityMode: boolean;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({
  onOpenBooking,
  onNavigatePage,
  onOpenVirtualPlumber,
  highLegibilityMode,
}) => {
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [selectedEmergencyScenario, setSelectedEmergencyScenario] = useState<string | null>(null);

  const emergencyScenarios = [
    {
      id: 'burst-pipe',
      title: 'Active Burst Pipe / Flooding',
      icon: Droplets,
      severity: 'Critical — High Water Damage Risk',
      immediateStep: 'Shut off the main water valve immediately (usually on the exterior wall near hose bib or in curbside meter box). Open lowest outdoor faucet to drain pressure.',
      suggestedService: 'leak-slab-detect',
      suggestedPrice: '$395 (Detection) / $550–$950 (Direct Repair)',
    },
    {
      id: 'water-heater-leaking',
      title: 'Water Heater Leaking / Spewing',
      icon: Flame,
      severity: 'High — Scalding & Tank Rupture Risk',
      immediateStep: 'Turn off the cold water shutoff valve on top of the tank. For electric units, flip the circuit breaker off. For gas units, twist thermostat dial to "PILOT" or "OFF".',
      suggestedService: 'wh-50-gas',
      suggestedPrice: '$1,489 (Complete 50-Gal Replacement)',
    },
    {
      id: 'sewer-backup',
      title: 'Sewer Backing Up in Multiple Drains',
      icon: AlertTriangle,
      severity: 'Critical — Biohazard & Flood Risk',
      immediateStep: 'Stop running all water immediately (washing machine, dishwasher, showers). Locate outdoor cleanout cap near flower bed or sidewalk to relieve interior backup.',
      suggestedService: 'drain-main',
      suggestedPrice: '$189 (Main Sewer Snake + Free Camera)',
    },
    {
      id: 'toilet-overflow',
      title: 'Toilet Overflowing Uncontrollably',
      icon: Droplets,
      severity: 'Moderate — Floor Damage Risk',
      immediateStep: 'Turn the oval chrome valve behind the toilet base clockwise until tight. Remove tank lid and push the rubber flapper down over the drain hole.',
      suggestedService: 'toilet-rebuild',
      suggestedPrice: '$185 (Complete Tank Rebuild)',
    },
    {
      id: 'gas-smell',
      title: 'Smell of Gas / Rotten Eggs (Mercaptan)',
      icon: Zap,
      severity: 'Life Safety Emergency',
      immediateStep: 'Do NOT flip electrical switches or light matches. Evacuate everyone from the home immediately and call Southwest Gas (877-860-6020) and 911, then call us for repair.',
      suggestedService: 'gas-pressure-test',
      suggestedPrice: '$285 (Gas Line Pressure Test & Leak Locating)',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Top Urgent Emergency Reassurance Banner */}
      <section className="bg-gradient-to-b from-red-950 via-slate-900 to-slate-950 text-white py-10 px-4 sm:px-6 border-b border-red-900/50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/30 text-red-200 border border-red-500/40 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              24/7 Valley Emergency Plumbing Response
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Average Arrival: <strong className="text-white">45–90 Minutes</strong> Across Phoenix Metro</span>
            </div>
          </div>

          {/* Core Emergency Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Don’t Panic. We’re On Call 24/7 with{' '}
                <span className="text-red-400">Zero Overtime Fees</span>
              </h1>
              <p className={`text-slate-300 leading-relaxed ${highLegibilityMode ? 'text-lg' : 'text-base'}`}>
                Active leak, burst pipe, or flooded bathroom? Call our on-call master plumber directly. We arrive equipped with fully stocked trucks ready to diagnose and stop the water immediately.
              </p>

              {/* Emergency Call & Dispatch Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:4809383803"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-lg shadow-xl shadow-red-600/30 transition-transform transform hover:scale-[1.02] active:scale-100"
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  <span>Call Master Plumber: (480) 938-3803</span>
                </a>

                <button
                  onClick={() => onOpenBooking(undefined)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-base border border-slate-700 shadow-md transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Request Immediate Dispatch ($0 Trip Fee)</span>
                </button>

                {onOpenVirtualPlumber && (
                  <button
                    onClick={onOpenVirtualPlumber}
                    className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-md transition-all active:scale-95"
                  >
                    <Zap className="w-5 h-5" />
                    <span>AI Virtual Plumber Triage</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Pricing Guarantee Box */}
            <div className="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Our Emergency Guarantee:
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80">
                  <span className="text-slate-300">Trip & Assessment:</span>
                  <span className="font-bold text-emerald-400">$0.00 (Free)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80">
                  <span className="text-slate-300">Saturday / Sunday Rate:</span>
                  <span className="font-bold text-emerald-400">Standard Rate (No Extra)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80">
                  <span className="text-slate-300">Late Night / Holiday:</span>
                  <span className="font-bold text-emerald-400">$0 Surcharge</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80">
                  <span className="text-slate-300">Workmanship Warranty:</span>
                  <span className="font-bold text-amber-300">1 Full Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Minute Water Emergency Guide: How to Stop Water Right Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Immediate Homeowner Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              3 Steps to Stop Water Damage While Our Truck Is Rolling
            </h2>
            <p className="text-sm text-slate-600">
              Follow these simple steps right now to prevent thousands in flooring and drywall damage:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <span className="text-[11px] font-bold uppercase text-red-600">Most Critical</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Shut Off Main Water</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Locate your main water shutoff valve. In Phoenix homes, this is usually on the front or side exterior wall near the hose spigot, or inside the curbside city meter box (requires a meter key or crescent wrench). Turn 90° clockwise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  2
                </span>
                <span className="text-[11px] font-bold uppercase text-blue-600">Pressure Relief</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Open an Outdoor Faucet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                After shutting the main valve, turn on an outdoor garden hose faucet or the lowest cold-water sink in your home. This immediately drains remaining water trapped in the pipes away from your interior walls.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <span className="text-[11px] font-bold uppercase text-amber-700">Safety & Power</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Avoid Electrical Outlets</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If water is pooling near electrical outlets, appliances, or baseboard heaters, flip the main breaker in your electrical panel before stepping into standing water. Take photos of wet areas for insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Scenario Selector & Upfront Flat Rates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Emergency Triage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            What Kind of Emergency Are You Experiencing?
          </h2>
          <p className="text-sm text-slate-600">
            Click your situation below to see exact emergency steps and upfront pricing:
          </p>
        </div>

        <div className="space-y-3">
          {emergencyScenarios.map((scenario) => {
            const Icon = scenario.icon;
            const isExpanded = selectedEmergencyScenario === scenario.id;

            return (
              <div
                key={scenario.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-slate-900 text-white border-amber-500/50 shadow-lg'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  onClick={() =>
                    setSelectedEmergencyScenario(isExpanded ? null : scenario.id)
                  }
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isExpanded
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{scenario.title}</h3>
                      <span
                        className={`text-xs ${
                          isExpanded ? 'text-red-300 font-semibold' : 'text-red-600 font-medium'
                        }`}
                      >
                        {scenario.severity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold hidden sm:inline ${
                        isExpanded ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    >
                      {scenario.suggestedPrice}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800 space-y-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                        Immediate Action Right Now:
                      </div>
                      <p className="text-slate-200 leading-relaxed text-sm">
                        {scenario.immediateStep}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="text-slate-300">
                        Upfront Flat Rate: <strong className="text-amber-400 text-sm">{scenario.suggestedPrice}</strong>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href="tel:4809383803"
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs text-center"
                        >
                          Call Dispatch (480) 938-3803
                        </a>
                        <button
                          onClick={() => onOpenBooking(scenario.suggestedService)}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                        >
                          Book at this Rate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Emergency Wizard Trigger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need a Step-by-Step Diagnostic Check?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Use our interactive diagnostic tool to safely identify pipe locations, water heater problems, and emergency valve shutoffs in under 60 seconds.
            </p>
          </div>

          <button
            onClick={() => setIsDiagnosticModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 shrink-0"
          >
            Launch Emergency Diagnostic Tool
          </button>
        </div>
      </section>

      {/* Emergency Diagnostic Modal */}
      <EmergencyDiagnosticWizard
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        onOpenBooking={onOpenBooking}
        highLegibilityMode={highLegibilityMode}
      />
    </div>
  );
};
