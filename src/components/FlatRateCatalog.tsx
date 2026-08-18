import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Flame,
  Waves,
  Droplets,
  Bath,
  Filter,
  Wrench,
  Building2,
  Home,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';
import { CATEGORIES, FLAT_RATES_DATA } from '../data/flatRatesData';
import { FlatRateItem } from '../types';

interface FlatRateCatalogProps {
  onOpenBooking: (serviceId?: string) => void;
  highLegibilityMode: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Waves: <Waves className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  Bath: <Bath className="w-4 h-4" />,
  Filter: <Filter className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
};

export const FlatRateCatalog: React.FC<FlatRateCatalogProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [activeItemModal, setActiveItemModal] = useState<FlatRateItem | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    let list = [...FLAT_RATES_DATA];

    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.whatsIncluded.some((inc) => inc.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <section id="flat-rates-catalog" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>The 86 Published Flat Rates of Judai Brothers</span>
          </div>

          <h2 className={`font-black tracking-tight text-slate-900 ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            Every Price Transparently Published.<br />
            <span className="text-amber-700">No Surprises. No High-Pressure Sales.</span>
          </h2>

          <p className={`text-slate-600 ${highLegibilityMode ? 'text-base sm:text-lg font-medium' : 'text-sm sm:text-base'}`}>
            Other Phoenix plumbing companies hide their rates behind dispatch fees and commission-hungry technicians. We put all 86 flat rates upfront right here.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="flat-rates-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 86 rates (e.g. water heater, drain snaking, garbage disposal, slab leak, RO)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort:</span>
              <select
                id="flat-rates-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="popular">Most Popular First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-slate-900 text-amber-400 shadow-sm ring-1 ring-slate-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {CATEGORY_ICONS[cat.icon]}
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    active ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Guarantees Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-semibold text-slate-600 px-1">
          <div>
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> of 86 flat-rate plumbing services
            {selectedCategory !== 'all' && <span> in <strong className="text-amber-800">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-slate-900">{searchQuery}</strong>"</span>}
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>✓ $0 Trip Fees</span>
            <span>✓ 1-Year Workmanship Warranty</span>
            <span>✓ Housecall Pro Online Booking</span>
          </div>
        </div>

        {/* Flat Rate Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Info className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No flat rates matched your search</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              We provide custom quotes for any unique Phoenix plumbing scenario. Call or text us directly for immediate flat-rate pricing.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs text-slate-800"
              >
                Reset Filters
              </button>
              <a
                href="tel:4809383803"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (480) 938-3803</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const isExpanded = expandedCardId === item.id;
              return (
                <div
                  key={item.id}
                  id={`flat-rate-card-${item.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 space-y-3.5">
                    {/* Card Category & Badge Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.popular && (
                          <span className="text-[10px] font-bold uppercase bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                        {item.emergency && (
                          <span className="text-[10px] font-bold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-200">
                            24/7 Fast
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-slate-900 leading-snug group-hover:text-amber-900 transition-colors ${
                      highLegibilityMode ? 'text-lg font-black' : 'text-base'
                    }`}>
                      {item.title}
                    </h3>

                    {/* Price & Unit Display */}
                    <div className="flex items-baseline gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
                        ${item.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.unit}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.shortDesc}
                    </p>

                    {/* Meta Indicators: Time & Warranty */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-medium text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.timeEstimate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.warranty}</span>
                      </div>
                    </div>

                    {/* Expandable What's Included */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 space-y-2.5 animate-in fade-in duration-150">
                        <div className="text-xs font-bold text-slate-800">What’s Included:</div>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {item.whatsIncluded.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                        {item.recommendedFor && (
                          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900">
                            <strong>Recommended when:</strong> {item.recommendedFor}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1"
                    >
                      <span>{isExpanded ? 'Less' : 'Scope & Inclusions'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      id={`book-service-${item.id}`}
                      onClick={() => onOpenBooking(item.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book on Housecall Pro</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
