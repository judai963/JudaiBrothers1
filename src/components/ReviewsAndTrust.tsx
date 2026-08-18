import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  ThumbsUp,
  MapPin,
  Filter
} from 'lucide-react';
import { REVIEWS_DATA, REVIEWS_STATS } from '../data/reviewsData';

interface ReviewsAndTrustProps {
  onOpenBooking: () => void;
  highLegibilityMode: boolean;
}

export const ReviewsAndTrust: React.FC<ReviewsAndTrustProps> = ({
  onOpenBooking,
  highLegibilityMode,
}) => {
  const [filterSource, setFilterSource] = useState<string>('all');

  const filteredReviews = filterSource === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.verifiedSource.toLowerCase() === filterSource.toLowerCase());

  return (
    <section id="reviews-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs">
            <Award className="w-4 h-4 text-amber-700" />
            <span>324+ Verified Reviews Across Greater Phoenix</span>
          </div>

          <h2 className={`font-black tracking-tight text-slate-900 ${
            highLegibilityMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl lg:text-4xl'
          }`}>
            Real Phoenix Neighbors. <br />
            <span className="text-amber-700">Real 4.9-Star Master Plumber Service.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Every review below comes from an actual verified Housecall Pro, Thumbtack Top Pro, or BBB completed job in Maricopa County.
          </p>
        </div>

        {/* Big Trust Bar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <div className="flex justify-center text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="font-mono text-3xl font-black text-slate-900">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-medium">324+ Verified Reviews</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="font-black text-lg text-slate-900">Thumbtack Top Pro</div>
            <div className="text-xs text-blue-700 font-bold">2023, 2024 & 2025</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <div className="font-black text-lg text-slate-900">BBB A+ Rating</div>
            <div className="text-xs text-slate-500 font-medium">Accredited Business</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <div className="font-mono font-black text-lg text-slate-900">ROC #354554</div>
            <div className="text-xs text-amber-800 font-bold">Licensed, Bonded & Insured</div>
          </div>
        </div>

        {/* Filter Source Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 text-xs font-bold">
          <span className="text-slate-500">Filter Source:</span>
          {['all', 'Housecall Pro', 'Thumbtack', 'Google', 'BBB'].map((src) => {
            const active = filterSource.toLowerCase() === src.toLowerCase();
            return (
              <button
                key={src}
                id={`filter-review-${src.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setFilterSource(src)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  active
                    ? 'bg-slate-900 text-amber-400 font-bold shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {src === 'all' ? 'All Reviews (324+)' : src}
              </button>
            );
          })}
        </div>

        {/* Reviews Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                {/* Header with Star Rating & Verification Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    ✓ {rev.verifiedSource}
                  </span>
                </div>

                {/* Service Tag */}
                <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                  {rev.service}
                </div>

                {/* Text */}
                <p className={`text-slate-700 leading-relaxed ${
                  highLegibilityMode ? 'text-sm sm:text-base font-medium' : 'text-xs sm:text-sm'
                }`}>
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Location Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.location}</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            id="reviews-bottom-book-btn"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Join 324+ Happy Homeowners — Book Today</span>
          </button>
        </div>
      </div>
    </section>
  );
};
