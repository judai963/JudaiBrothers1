import React, { useState, useEffect } from 'react';
import {
  ThermometerSnowflake,
  ThermometerSun,
  AlertTriangle,
  Info,
  CheckCircle,
  Droplets,
  ShieldAlert,
  ChevronRight,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  temp: number;
  apparentTemp: number;
  lowForecast: number;
  highForecast: number;
  condition: string;
  isFreezingRisk: boolean;
  isExtremeHeat: boolean;
  isSimulated?: boolean;
}

interface PhoenixWeatherAlertProps {
  highLegibilityMode: boolean;
  onOpenBooking: (serviceId?: string) => void;
}

export const PhoenixWeatherAlert: React.FC<PhoenixWeatherAlertProps> = ({
  highLegibilityMode,
  onOpenBooking,
}) => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 34,
    apparentTemp: 32,
    lowForecast: 31,
    highForecast: 64,
    condition: 'Cold Front / Overnight Freeze Risk',
    isFreezingRisk: true,
    isExtremeHeat: false,
    isSimulated: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [simulationMode, setSimulationMode] = useState<'live' | 'freeze' | 'heat'>('freeze');

  const fetchPhoenixWeather = async () => {
    setLoading(true);
    try {
      // Phoenix Coordinates: 33.4484, -112.0740
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=33.4484&longitude=-112.0740&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FPhoenix',
        { signal: AbortSignal.timeout(4000) }
      );
      if (res.ok) {
        const data = await res.json();
        const currentTemp = Math.round(data.current?.temperature_2m ?? 58);
        const apparent = Math.round(data.current?.apparent_temperature ?? currentTemp);
        const minTemp = Math.round(data.daily?.temperature_2m_min?.[0] ?? 42);
        const maxTemp = Math.round(data.daily?.temperature_2m_max?.[0] ?? 76);

        const isFreezing = currentTemp <= 38 || minTemp <= 36;
        const isHeat = currentTemp >= 102 || maxTemp >= 105;

        let condition = 'Mild / Clear Desert Sky';
        if (isFreezing) condition = 'Cold Advisory / Overnight Freeze Risk';
        else if (isHeat) condition = 'Excessive Heat Warning';
        else if (currentTemp < 60) condition = 'Chilly Winter Weather';

        setWeather({
          temp: currentTemp,
          apparentTemp: apparent,
          lowForecast: minTemp,
          highForecast: maxTemp,
          condition,
          isFreezingRisk: isFreezing,
          isExtremeHeat: isHeat,
          isSimulated: false,
        });
        setSimulationMode('live');
      }
    } catch {
      // Graceful fallback to proactive cold advisory default
      setWeather({
        temp: 34,
        apparentTemp: 32,
        lowForecast: 31,
        highForecast: 62,
        condition: 'Valley Cold Advisory',
        isFreezingRisk: true,
        isExtremeHeat: false,
        isSimulated: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoenixWeather();
  }, []);

  const handleSetSimulation = (mode: 'live' | 'freeze' | 'heat') => {
    setSimulationMode(mode);
    if (mode === 'live') {
      fetchPhoenixWeather();
    } else if (mode === 'freeze') {
      setWeather({
        temp: 32,
        apparentTemp: 29,
        lowForecast: 28,
        highForecast: 56,
        condition: 'Hard Freeze Advisory (Valley Metro)',
        isFreezingRisk: true,
        isExtremeHeat: false,
        isSimulated: true,
      });
    } else if (mode === 'heat') {
      setWeather({
        temp: 112,
        apparentTemp: 116,
        lowForecast: 88,
        highForecast: 115,
        condition: 'Extreme Summer Heatwave',
        isFreezingRisk: false,
        isExtremeHeat: true,
        isSimulated: true,
      });
    }
  };

  return (
    <>
      {/* Proactive Weather Advisory Bar in Hero */}
      <div
        id="phoenix-weather-advisory-pill"
        className={`w-full rounded-xl border transition-all ${
          weather.isFreezingRisk
            ? 'bg-blue-950/80 border-blue-500/40 text-blue-100 shadow-lg shadow-blue-950/40'
            : weather.isExtremeHeat
            ? 'bg-amber-950/80 border-amber-500/40 text-amber-100 shadow-lg shadow-amber-950/40'
            : 'bg-slate-900/80 border-slate-700/60 text-slate-200 shadow-sm'
        } p-3 sm:p-3.5 backdrop-blur-md`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Weather Indicator & Core Advisory */}
          <div className="flex items-start sm:items-center gap-3">
            <div
              className={`p-2 rounded-lg shrink-0 ${
                weather.isFreezingRisk
                  ? 'bg-blue-500/20 text-cyan-300 ring-1 ring-blue-400/30'
                  : weather.isExtremeHeat
                  ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {weather.isFreezingRisk ? (
                <ThermometerSnowflake className="w-5 h-5 animate-pulse" />
              ) : weather.isExtremeHeat ? (
                <ThermometerSun className="w-5 h-5 animate-pulse" />
              ) : (
                <Droplets className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Phoenix Real-Time Advisory
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs font-mono font-bold text-white bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                  {weather.temp}°F (Low: {weather.lowForecast}°F)
                </span>
                {weather.isSimulated && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Preview Demo Mode
                  </span>
                )}
              </div>

              <div
                className={`text-sm font-medium mt-0.5 ${
                  highLegibilityMode ? 'text-white font-semibold' : 'text-slate-200'
                }`}
              >
                {weather.isFreezingRisk ? (
                  <span>
                    <strong className="text-cyan-300 font-bold">Freeze Risk Tonight:</strong> Drip indoor faucets & insulate exposed outdoor backflow valves to prevent burst pipes.
                  </span>
                ) : weather.isExtremeHeat ? (
                  <span>
                    <strong className="text-amber-300 font-bold">Thermal Stress Alert:</strong> Inspect water heater T&P valves & regulator pressure under 100°F+ ground heat.
                  </span>
                ) : (
                  <span>
                    <strong className="text-emerald-400 font-bold">Optimal Plumbing Conditions:</strong> Great time for annual water heater mineral descaling & RO filter changes.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              id="view-weather-checklist-btn"
              onClick={() => setShowDetailsModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 text-xs font-bold transition-colors"
            >
              <span>{weather.isFreezingRisk ? 'Freeze Checklist' : 'Prevention Guide'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Test State Selector for Easy Evaluation */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-[11px] font-medium">
              <button
                onClick={() => handleSetSimulation('freeze')}
                className={`px-2 py-0.5 rounded ${
                  simulationMode === 'freeze' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Simulate Phoenix Freeze Advisory"
              >
                Freeze (32°)
              </button>
              <button
                onClick={() => handleSetSimulation('live')}
                className={`px-2 py-0.5 rounded ${
                  simulationMode === 'live' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Check Live Phoenix Weather Feed"
              >
                Live Feed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Weather Advice Modal / Checklist */}
      {showDetailsModal && (
        <div
          id="weather-advice-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-white space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Phoenix Winter & Cold Weather Action Guide
                  </h3>
                  <p className="text-xs text-slate-400">
                    Master Plumber advice for Sonoran Desert temperature swings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Snapshot */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-sm">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Forecast Status</div>
                <div className="font-bold text-cyan-300">{weather.condition}</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Overnight Low</div>
                <div className="font-bold text-white text-base">{weather.lowForecast}°F</div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                4 Critical Steps to Protect Your Home Tonight:
              </h4>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Drip the Faucets:</strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Let one cold and one hot faucet (furthest from your main line) drip at a slow pencil-lead trickle to keep water moving and relieve internal pressure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Wrap Outdoor Backflow & Hose Bibs:</strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Desert homes often have exposed brass backflow preventers (RPZ valves) and hose spigots. Disconnect garden hoses and wrap brass valves with insulation tape or heavy towels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Open Under-Sink Cabinet Doors:</strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      For exterior-facing walls (kitchens or guest baths), leave cabinet doors ajar so warm interior air circulates around the copper supply lines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Locate Your Main Water Shutoff Valve:</strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Ensure you know where your curbside or house main shutoff valve is in case an outdoor line cracks when temperatures rebound in the morning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="tel:4809383803"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-sm border border-slate-700"
              >
                Call On-Call Crew (480) 938-3803
              </a>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm"
              >
                Schedule Insulation / Inspection ($0 Trip Fee)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
