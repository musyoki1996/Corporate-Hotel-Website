/**
 * Imperial Crown Hotel - Frequently Asked Questions (FAQ) Page
 * Categorized accordion covering reservations, payments (M-Pesa & cards), dining, and amenities
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES, FAQ_DATA } from '../data/hotelData';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '1-1': true,
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Frequently Asked Questions"
        subtitle="Clarifications regarding reservation policies, check-in formalities, Daraja payment processing, and dining."
        backgroundImage={HOTEL_IMAGES.deluxeBedroom}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Frequently Asked Questions' },
        ]}
        kicker="Guest Guidance"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        
        {FAQ_DATA.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071A38] border-b border-stone-200 pb-2">
              {cat.category}
            </h3>

            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#071A38] hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-serif text-base">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#B58A3A] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Concierge Assistance Card */}
        <div className="bg-[#071A38] text-white p-8 rounded-3xl border border-[#B58A3A]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="font-serif text-xl font-bold text-white">Have a Specific Inquiry Not Addressed Here?</h4>
            <p className="text-xs text-white/70 mt-1 max-w-lg">
              Our 24-hour concierge team is available to assist with special diplomatic clearances, helicopter charters, or private chef curations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shrink-0 shadow-md flex items-center gap-2"
          >
            <span>Contact Concierge Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
