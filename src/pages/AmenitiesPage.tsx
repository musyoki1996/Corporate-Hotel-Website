/**
 * Imperial Crown Hotel - Amenities & Facilities Page
 * Spa wellness, heated infinity pool, fitness, business lounge, and royal services
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES, HOTEL_AMENITIES } from '../data/hotelData';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface AmenitiesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onNavigate }) => {
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>('all');

  const categories = ['all', 'Wellness & Recreation', 'Business & Conferences', 'Guest Services', 'Technology'];

  const filteredAmenities = HOTEL_AMENITIES.filter((a) => {
    if (selectedAmenityCategory === 'all') return true;
    return a.category.toLowerCase().includes(selectedAmenityCategory.toLowerCase());
  });

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Amenities & Wellness Sanctuary"
        subtitle="Heated infinity waters, rejuvenating hydrotherapy spa treatments, and uninterrupted executive services."
        backgroundImage={HOTEL_IMAGES.wellnessSpa}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Amenities & Facilities' },
        ]}
        kicker="Facilities & Wellness"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            Crafted for Unhurried Living
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            Comprehensive Facilities for Rejuvenation and Productivity.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Whether surrendering to deep hydrotherapy massage in our thermal chambers or hosting confidential negotiations in our Sovereign Business Club, our facilities operate at the highest echelon of international hospitality.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedAmenityCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedAmenityCategory === cat
                  ? 'bg-[#071A38] text-[#E9BD62] shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat === 'all' ? 'All 9 Facilities' : cat}
            </button>
          ))}
        </div>

        {/* 9 Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-[#071A38]/90 text-white px-2.5 py-1 rounded text-[11px] font-mono backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E9BD62]" />
                    <span>{amenity.hours}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                    {amenity.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#071A38]">
                    {amenity.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {amenity.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    {amenity.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 rounded border border-stone-300 hover:border-[#071A38] text-stone-800 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Inquire with Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B58A3A]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
