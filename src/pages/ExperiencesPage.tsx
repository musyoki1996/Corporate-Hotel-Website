/**
 * Imperial Crown Hotel - Curated Experiences Page
 * Leisure, excursions, cultural encounters, family journeys, and romantic getaways
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES, CURATED_EXPERIENCES } from '../data/hotelData';
import { Clock, Check, ArrowRight, Compass, Heart, Users, Sparkles } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [bookingInquiryExp, setBookingInquiryExp] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'leisure', label: 'Leisure & Yachting' },
    { id: 'excursions', label: 'Heritage Excursions' },
    { id: 'cultural', label: 'Cultural & Sommelier' },
    { id: 'family', label: 'Royal Family' },
    { id: 'romantic', label: 'Romantic Getaways' },
  ];

  const filteredExperiences = CURATED_EXPERIENCES.filter((exp) => {
    if (activeCategory === 'all') return true;
    return exp.category === activeCategory;
  });

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Curated Royal Experiences"
        subtitle="Unforgettable moments beyond the ordinary: private luxury yachts, heritage architecture tours, and candlelit serenades."
        backgroundImage={HOTEL_IMAGES.rooftopLounge}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Experiences & Activities' },
        ]}
        kicker="Bespoke Itineraries"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            Beyond the Palace Walls
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            Curated Privileges Crafted by Our Les Clefs d'Or Concierges.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Allow us to orchestrate bespoke expeditions tailored to your passions. Every experience includes private chauffeur transport, personalized refreshments, and discreet escort.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#071A38] text-[#E9BD62] shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Experiences List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-[#071A38]/90 text-white px-2.5 py-1 rounded text-xs font-mono backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E9BD62]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                    {exp.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#071A38]">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                      Privilege Inclusions
                    </span>
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 rounded bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Request Booking with Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
