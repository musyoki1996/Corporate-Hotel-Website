/**
 * Imperial Crown Hotel - About Us Page
 * Architectural history, philosophy, royal service standards, and sustainability
 */

import React from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { Award, Shield, HeartHandshake, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="About Imperial Crown Hotel"
        subtitle="A heritage of royal distinction, unyielding architectural elegance, and timeless European hospitality."
        backgroundImage={HOTEL_IMAGES.hotelCourtyard}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'About Us' },
        ]}
        kicker="Heritage & Distinction"
      />

      {/* Main Narrative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 space-y-20">
        
        {/* Heritage Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
              The Sovereign Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
              Where Royal Grandeur Meets Contemporary Discretion.
            </h2>
            <div className="w-16 h-0.5 bg-[#B58A3A] rounded-full" />
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Imperial Crown Hotel was established with a singular, resolute vision: to resurrect the noble art of grand international hospitality and curate an incomparable haven for the world's most discerning travelers.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Every archway, colonnade, and bespoke chandelier in our property was engineered to inspire awe while safeguarding our guests' absolute privacy and peace of mind. We believe that true luxury is neither hurried nor ostentatious; it is the silent, effortless anticipation of your every desire.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="border border-stone-200 p-4 rounded-xl bg-white">
                <span className="font-serif text-2xl font-bold text-[#071A38] block">24/7</span>
                <span className="text-stone-500">Dedicated Royal Butler Service</span>
              </div>
              <div className="border border-stone-200 p-4 rounded-xl bg-white">
                <span className="font-serif text-2xl font-bold text-[#071A38] block">100%</span>
                <span className="text-stone-500">Discretion & Privacy Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={HOTEL_IMAGES.fineDining}
                alt="Imperial Crown Hotel Grand Architectural Interior"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* The 4 Pillars of the Royal Standard */}
        <div className="bg-[#071A38] text-white rounded-3xl p-8 sm:p-14 border border-[#B58A3A]/30">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-1">
              Our Guiding Principles
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              The Four Pillars of The Royal Standard
            </h3>
            <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto my-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <Shield className="w-7 h-7 text-[#E9BD62]" />
              <h4 className="font-serif text-base font-bold text-white">Absolute Discretion</h4>
              <p className="text-white/70 leading-relaxed">
                Military-grade security protocols, private VIP entrance subterranean conduits, and non-disclosure standards for heads of state.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <Sparkles className="w-7 h-7 text-[#E9BD62]" />
              <h4 className="font-serif text-base font-bold text-white">Bespoke Mastery</h4>
              <p className="text-white/70 leading-relaxed">
                No standardized checklists. Every pillow preference, culinary menu, and private itinerary is individually curated for you.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <Award className="w-7 h-7 text-[#E9BD62]" />
              <h4 className="font-serif text-base font-bold text-white">Architectural Elegance</h4>
              <p className="text-white/70 leading-relaxed">
                Classical proportions, hand-selected Carrara marble, custom-blown crystal, and tranquil courtyard fountains.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <HeartHandshake className="w-7 h-7 text-[#E9BD62]" />
              <h4 className="font-serif text-base font-bold text-white">Generosity of Spirit</h4>
              <p className="text-white/70 leading-relaxed">
                Hospitality from the soul. Warmth, graciousness, and unhurried service that makes every guest feel truly sovereign.
              </p>
            </div>
          </div>
        </div>

        {/* Environmental & Sustainability Commitments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-2xl border border-stone-200">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-bold block">
              Sovereign Stewardship
            </span>
            <h3 className="font-serif text-2xl text-[#071A38] font-bold">
              Sustainable Luxury & Heritage Preservation
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              True royalty protects the future. Imperial Crown Hotel operates with 100% single-use plastic eradication, zero-waste organic composting for our restaurants, smart geothermal water heating, and direct partnerships with local artisan farmers and purveyors.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={() => onNavigate('rooms')}
              className="px-6 py-3 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider hover:bg-[#0c2752] transition-colors flex items-center gap-2"
            >
              <span>Explore Our Suites</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
