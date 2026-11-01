/**
 * Imperial Crown Hotel - Weddings & Royal Celebrations Page
 * Majestic ballroom galas, courtyard ceremonies, bespoke wedding packages and inquiry
 */

import React from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { Heart, Sparkles, Check, ArrowRight, Camera, Utensils, Music, Calendar } from 'lucide-react';

interface WeddingsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const WeddingsPage: React.FC<WeddingsPageProps> = ({ onNavigate }) => {
  const weddingPackages = [
    {
      title: 'The Sovereign Monarch Wedding',
      subtitle: 'The Grand Imperial Celebration in The Sovereign Ballroom',
      capacity: 'Up to 650 Guests',
      pricePlaceholder: 'From $45,000 Bespoke Foundation',
      inclusions: [
        'Exclusive full-day hire of The Sovereign Grand Ballroom and VIP Receiving Foyer',
        'Complimentary 2-night stay in the palatial Presidential Suite for the Wedding Couple',
        'Five-course bespoke Michelin-caliber banquet crafted with Executive Chef',
        'Rolls-Royce Phantom bridal chauffeur transfer and airport limousine for parents',
        'Crystal chandeliers, theatrical floral rigging, and sound engineers included',
        'Dedicated Royal Wedding Butler and Senior Event Master of Ceremonies',
      ],
    },
    {
      title: 'The Windsor Pavilion Garden Romance',
      subtitle: 'Enchanting Conservatory Ceremony & Al Fresco Cocktail Reception',
      capacity: 'Up to 250 Guests',
      pricePlaceholder: 'From $28,000 Bespoke Foundation',
      inclusions: [
        'Full access to The Windsor Glass Pavilion and Fountain Courtyard',
        'Complimentary 2-night stay in the Royal Executive Suite for the Couple',
        'Four-course customized menu with sommelier-paired grand cru selections',
        'Fountain terrace cocktail reception with live string quartet staging',
        'Custom 5-tier wedding cake created by Master Pastry Chef',
        'Complimentary anniversary stay voucher for first wedding anniversary',
      ],
    },
  ];

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Royal Weddings & Celebrations"
        subtitle="Unforgettable declarations of love surrounded by neoclassical architecture, crystal chandeliers, and bespoke bridal care."
        backgroundImage={HOTEL_IMAGES.hotelCourtyard}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Weddings & Celebrations' },
        ]}
        kicker="The Royal Union"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            A Regal Celebration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            The Backdrop to Your Most Sacred Promise.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From intimate ceremonies in our private rose garden colonnade to magnificent 650-guest banquets beneath our Austrian crystal chandeliers, every Imperial Crown wedding is an orchestral masterpiece of elegance and emotion.
          </p>
        </div>

        {/* Wedding Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weddingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg p-8 sm:p-10 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#B58A3A] font-bold">
                    {pkg.capacity}
                  </span>
                  <span className="font-mono text-xs font-semibold text-stone-500">
                    {pkg.pricePlaceholder}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  {pkg.title}
                </h3>
                <p className="font-serif italic text-xs text-stone-600">
                  {pkg.subtitle}
                </p>

                <div className="pt-4 border-t border-stone-100 space-y-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                    Signature Package Inclusions
                  </span>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-[#B58A3A] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#B58A3A]" />
                  <span>Request Wedding Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Wedding Services Features */}
        <div className="bg-[#071A38] text-white rounded-3xl p-8 sm:p-12 border border-[#B58A3A]/30">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Bespoke Bridal Services
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1">
              Every detail handled by our resident wedding designers, florists, and pastry artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-center">
            <div className="p-6 bg-white/[0.04] rounded-xl border border-white/10 space-y-2">
              <Utensils className="w-6 h-6 text-[#E9BD62] mx-auto" />
              <h4 className="font-serif text-base font-bold text-white">Menu & Wine Tasting</h4>
              <p className="text-white/60 leading-relaxed">
                Private preliminary tasting for the couple and four guests in The Royal Cellar with Executive Chef and Sommelier.
              </p>
            </div>

            <div className="p-6 bg-white/[0.04] rounded-xl border border-white/10 space-y-2">
              <Sparkles className="w-6 h-6 text-[#E9BD62] mx-auto" />
              <h4 className="font-serif text-base font-bold text-white">Bridal Spa Sanctum</h4>
              <p className="text-white/60 leading-relaxed">
                Dedicated pre-wedding rejuvenation package: anti-stress massage, diamond radiance facial, and champagne salon styling.
              </p>
            </div>

            <div className="p-6 bg-white/[0.04] rounded-xl border border-white/10 space-y-2">
              <Camera className="w-6 h-6 text-[#E9BD62] mx-auto" />
              <h4 className="font-serif text-base font-bold text-white">Cinematic Backdrops</h4>
              <p className="text-white/60 leading-relaxed">
                Exclusive permits to photograph within the marble colonnades, fountain courtyards, and rooftop terraces.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
