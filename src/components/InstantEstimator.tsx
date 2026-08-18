import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  Flame,
  Waves,
  Droplets,
  Bath,
  Filter,
  Wrench,
  Building2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Clock,
  X
} from 'lucide-react';
import { FLAT_RATES_DATA } from '../data/flatRatesData';
import { FlatRateItem } from '../types';

interface InstantEstimatorProps {
  onOpenBooking: (serviceId?: string, customQuote?: { title: string; price: number }) => void;
  onClose?: () => void;
  isModal?: boolean;
  highLegibilityMode: boolean;
}

interface RoomOption {
  id: string;
  name: string;
  icon: any;
  items: FlatRateItem[];
}

export const InstantEstimator: React.FC<InstantEstimatorProps> = ({
  onOpenBooking,
  onClose,
  isModal = false,
  highLegibilityMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('water-heaters');
  const [selectedItemId, setSelectedItemId] = useState<string>('wh-01');
  const [includeAngleStops, setIncludeAngleStops] = useState<boolean>(false);
  const [includeDisposalClean, setIncludeDisposalClean] = useState<boolean>(false);

  const availableItems = useMemo(() => {
    return FLAT_RATES_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const currentItem = useMemo(() => {
    return FLAT_RATES_DATA.find((item) => item.id === selectedItemId) || availableItems[0] || FLAT_RATES_DATA[0];
  }, [selectedItemId, availableItems]);

  const calculatedTotal = useMemo(() => {
    let total = currentItem.price;
    if (includeAngleStops) total += 145;
    if (includeDisposalClean) total += 119;
    return total;
  }, [currentItem, includeAngleStops, includeDisposalClean]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const firstItem = FLAT_RATES_DATA.find((i) => i.category === catId);
    if (firstItem) {
      setSelectedItemId(firstItem.id);
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>60-Second Instant Estimator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Get Your Binding Flat-Rate Quote
          </h2>
          <p className="text-xs text-slate-500">
            Select your plumbing scenario for an exact, transparent quote with zero dispatch fee.
          </p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step 1: Category Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Step 1: Choose System or Problem Area
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'water-heaters', label: 'Water Heater', icon: Flame },
            { id: 'drains', label: 'Drains / Sewer', icon: Waves },
            { id: 'faucets-sinks', label: 'Faucets & Sinks', icon: Droplets },
            { id: 'toilets', label: 'Toilets & Bidets', icon: Bath },
            { id: 'filtration', label: 'Softener & RO', icon: Filter },
            { id: 'leaks-repipe', label: 'Leaks / Slab / PRV', icon: Wrench },
            { id: 'commercial', label: 'Commercial Backflow', icon: Building2 },
            { id: 'remodeling', label: 'Shower / Remodel', icon: Sparkles },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`estimator-cat-${cat.id}`}
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-3 rounded-xl flex items-center gap-2.5 font-bold text-xs transition-all border text-left ${
                  active
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm ring-1 ring-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Exact Service Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Step 2: Select Specific Service
        </label>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {availableItems.map((item) => {
            const active = item.id === currentItem.id;
            return (
              <div
                key={item.id}
                id={`estimator-item-${item.id}`}
                onClick={() => setSelectedItemId(item.id)}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  active
                    ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="pr-3">
                  <div className="font-bold text-sm text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{item.shortDesc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-slate-900 text-base">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">{item.timeEstimate}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Optional Add-ons */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Optional Add-Ons
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={includeAngleStops}
              onChange={(e) => setIncludeAngleStops(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
            />
            <div className="flex-1">
              <div className="font-bold text-slate-800">New 1/4-Turn Brass Angle Stops (Pair)</div>
              <div className="text-slate-500 text-[11px]">Includes stainless braided flex lines (+$145)</div>
            </div>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={includeDisposalClean}
              onChange={(e) => setIncludeDisposalClean(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
            />
            <div className="flex-1">
              <div className="font-bold text-slate-800">Water Heater Power Flush Tune-up</div>
              <div className="text-slate-500 text-[11px]">Removes Phoenix calcium sediment (+$119)</div>
            </div>
          </label>
        </div>
      </div>

      {/* Calculated Binding Estimate Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-4 shadow-lg ring-1 ring-amber-500/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Guaranteed Binding Flat Rate
            </div>
            <div className="text-base font-bold text-white">
              {currentItem.title}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400">
              ${calculatedTotal.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              $0 Trip Fee • 100% Guaranteed
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time: {currentItem.timeEstimate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentItem.warranty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>ROC #354554</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            id="estimator-book-now-btn"
            onClick={() => {
              if (onClose) onClose();
              onOpenBooking(currentItem.id, {
                title: currentItem.title,
                price: calculatedTotal,
              });
            }}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>Lock In Rate & Schedule</span>
          </button>

          <a
            href="tel:4809383803"
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call to Book: (480) 938-3803</span>
          </a>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="estimator-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {content}
        </div>
      </div>
    </section>
  );
};
