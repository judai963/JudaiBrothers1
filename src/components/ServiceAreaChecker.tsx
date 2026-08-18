import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Droplets,
  Search,
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SERVICE_AREAS, checkZipCodeCoverage } from '../data/serviceAreasData';

interface ServiceAreaCheckerProps {
  onOpenBooking: () => void;
  highLegibilityMode: boolean;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  const [zipInput, setZipInput] = useState<string>('85255');
  const [selectedAreaCity, setSelectedAreaCity] = useState<string>('Scottsdale');

  const zipResult = checkZipCodeCoverage(zipInput);
  const selectedArea =
    SERVICE_AREAS.find((a) => a.city === selectedAreaCity) || SERVICE_AREAS[0];

  return (
    <section id="service-areas-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Greater Phoenix Valley-Wide Coverage</span>
          </div>

          <h2 className={`font-black tracking-tight text-slate-900 ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            Serving the Entire Valley with <br className="hidden sm:inline" />
            <span className="text-amber-700">$0 Trip Fees Anywhere in Maricopa County</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            From North Scottsdale down to Chandler, and from Surprise across to Mesa — Judai Brothers trucks are stationed throughout the Valley for fast response.
          </p>
        </div>

        {/* Live ZIP Code Verification Tool */}
        <div className="max-w-2xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-12 border border-slate-800 ring-1 ring-amber-500/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Live Zip Code Checker
              </span>
              <span className="text-xs text-slate-400">30-45 Min Emergency Response</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="zip-checker-input"
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="Enter 5-digit ZIP code (e.g. 85018, 85255)..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                id="zip-check-book-btn"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow transition-transform active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book This Area</span>
              </button>
            </div>

            {/* Live Result Feedback Card */}
            {zipInput.length >= 3 && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                zipResult.covered
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100'
                  : 'bg-amber-950/50 border-amber-500/40 text-amber-100'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{zipResult.covered ? 'Active Coverage Confirmed' : 'Custom Regional Dispatch'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {zipResult.message}
                </p>
                {zipResult.area && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <div>Average Response: <strong className="text-white">{zipResult.area.avgResponseMins} mins</strong></div>
                    <div>Water Hardness: <strong className="text-amber-300">{zipResult.area.waterHardnessGrains}</strong></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Valley Municipalities Grid Explorer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Select a Municipality to View Local Plumbing Insights:
            </h3>
            <span className="text-xs text-slate-500 font-medium">14 Valley Cities</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {SERVICE_AREAS.map((area) => {
              const active = selectedAreaCity === area.city;
              return (
                <button
                  key={area.city}
                  id={`area-pill-${area.city.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedAreaCity(area.city)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    active
                      ? 'bg-slate-900 text-amber-400 border-slate-900 ring-2 ring-amber-500/40'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="truncate">{area.city}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{area.avgResponseMins}m ETA</div>
                </button>
              );
            })}
          </div>

          {/* Selected City Details Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1 md:col-span-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {selectedArea.region}
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                {selectedArea.city}, AZ
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Avg Dispatch Time: <strong className="text-slate-900">{selectedArea.avgResponseMins} minutes</strong></span>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>Water Quality Index: <strong className="text-amber-800">{selectedArea.waterHardnessGrains}</strong></span>
              </div>
              <p className="leading-relaxed text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                <strong>Local Plumbing Advisory:</strong> {selectedArea.plumbingNote}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500">Covered ZIPs:</span>
                {selectedArea.zipCodes.slice(0, 8).map((z) => (
                  <span key={z} className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-800 font-mono text-[10px] font-bold">
                    {z}
                  </span>
                ))}
                {selectedArea.zipCodes.length > 8 && (
                  <span className="text-[10px] text-slate-400 font-bold">+{selectedArea.zipCodes.length - 8} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
