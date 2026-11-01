/**
 * Imperial Crown Hotel - Special Offers & Packages Page
 * Weekend Escapes, Honeymoon Packages, Family Holidays, Corporate and Extended Stays
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import { Tag, Check, Calendar, ArrowRight, Sparkles, Copy, CheckCircle } from 'lucide-react';

interface OffersPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onNavigate }) => {
  const { offers, setIsBookingModalOpen, setSearchParams } = useHotel();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleBookWithOffer = (code: string) => {
    setSearchParams((prev) => ({ ...prev, promoCode: code }));
    setIsBookingModalOpen(true);
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Special Offers & Royal Packages"
        subtitle="Curated privileges, preferential seasonal rates, and complimentary additions for an extraordinary stay."
        backgroundImage={HOTEL_IMAGES.deluxeBedroom}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Special Offers' },
        ]}
        kicker="Sovereign Privileges"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            Curated Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            Exclusive Packages for Discerning Sojourners.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Reserve our official packages directly to unlock exclusive amenities, guaranteed late check-outs, and sommelier champagne enhancements.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#071A38]/95 text-[#E9BD62] px-3.5 py-1.5 rounded-lg border border-[#B58A3A]/40 text-xs font-mono font-bold shadow-md">
                    {offer.discountPercent}% OFF
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-semibold bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                      {offer.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                      {offer.title}
                    </h3>
                    <p className="font-serif italic text-xs text-[#B58A3A] mt-0.5">
                      {offer.subtitle}
                    </p>
                  </div>

                  <p className="text-stone-600 text-xs leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                      Package Inclusions
                    </span>
                    {offer.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-stone-500 pt-1">
                    Valid Until: <strong>{offer.validUntil}</strong>
                  </div>
                </div>
              </div>

              {/* Promo Code & Action */}
              <div className="p-6 sm:p-8 pt-0 space-y-3">
                <div className="bg-[#071A38]/5 p-3 rounded-xl flex items-center justify-between border border-stone-200">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#B58A3A]" />
                    <span className="font-mono text-xs font-bold text-[#071A38]">{offer.promoCode}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.promoCode)}
                    className="text-[11px] text-stone-600 hover:text-[#071A38] font-semibold flex items-center gap-1 focus:outline-none"
                  >
                    {copiedCode === offer.promoCode ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => handleBookWithOffer(offer.promoCode)}
                  className="w-full py-3 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#071A38]" />
                  <span>Book with This Offer</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
