/**
 * Imperial Crown Hotel - Dining & Restaurants Page
 * 6 dining venues, tasting menus, wine cellar, and table reservation booking
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES, DINING_VENUES } from '../data/hotelData';
import { Utensils, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface DiningPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({ onNavigate }) => {
  const [selectedVenueForTable, setSelectedVenueForTable] = useState<string | null>(null);
  const [tableForm, setTableForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-11-05',
    time: '19:30',
    guests: '2 Guests',
    specialNotes: '',
  });
  const [tableReservedSuccess, setTableReservedSuccess] = useState(false);

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTableReservedSuccess(true);
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Dining & Haute Cuisine"
        subtitle="Michelin-caliber culinary craft, historic grand salons, sommelier cellar vaults, and rooftop mixology."
        backgroundImage={HOTEL_IMAGES.fineDining}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Dining & Restaurants' },
        ]}
        kicker="Gastronomy & Lounges"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            A Symphony of Global Flavors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            Six Distinctive Culinary Sanctuaries Led by Master Chefs.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Dining at Imperial Crown Hotel is an art form. We harvest fresh organic herbs from our palace gardens, source premier vintage grand crus from European subterranean caves, and carve prime selections tableside in timeless grandeur.
          </p>
        </div>

        {/* 6 Venues List */}
        <div className="space-y-16">
          {DINING_VENUES.map((venue, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={venue.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Photo Side */}
                <div
                  className={`lg:col-span-6 relative h-72 sm:h-96 lg:h-auto overflow-hidden ${
                    isReversed ? 'lg:order-last' : ''
                  }`}
                >
                  <img
                    src={venue.image}
                    alt={venue.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#071A38]/90 text-[#E9BD62] px-3 py-1.5 rounded-lg border border-[#B58A3A]/30 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                    {venue.type}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs text-[#B58A3A] font-bold uppercase tracking-wider">
                      {venue.cuisine}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38] mt-1">
                      {venue.name}
                    </h3>
                    <p className="font-serif italic text-xs text-stone-500 mt-0.5">
                      {venue.tagline}
                    </p>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-4">
                      {venue.description}
                    </p>

                    {/* Operational Details */}
                    <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-xs text-stone-700">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Service Hours</span>
                        <span>{venue.hours}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Dress Code</span>
                        <span>{venue.dressCode}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Location</span>
                        <span>{venue.location}</span>
                      </div>
                    </div>

                    {/* Menu Highlights */}
                    <div className="mt-6 pt-4 border-t border-stone-100">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-2">
                        Signature Culinary Highlights
                      </span>
                      <div className="space-y-2">
                        {venue.menuHighlights.map((item, i) => (
                          <div key={i} className="flex justify-between items-baseline gap-2 text-xs">
                            <div>
                              <span className="font-bold text-stone-900">{item.title}</span>
                              <span className="text-stone-500 block text-[11px]">{item.desc}</span>
                            </div>
                            <span className="font-mono font-bold text-[#071A38] shrink-0">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Table Reservation Action */}
                  <div className="pt-4 border-t border-stone-100">
                    <button
                      onClick={() => {
                        setSelectedVenueForTable(venue.name);
                        setTableReservedSuccess(false);
                      }}
                      className="w-full py-3 bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Utensils className="w-4 h-4 text-[#B58A3A]" />
                      <span>Reserve Table at {venue.name}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Table Reservation Modal */}
      {selectedVenueForTable && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-[#252525] shadow-2xl border border-[#B58A3A]/40 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Table Reservation
                </span>
                <h4 className="font-serif text-xl font-bold text-[#071A38]">
                  {selectedVenueForTable}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVenueForTable(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {tableReservedSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-serif text-lg font-bold text-[#071A38]">
                  Table Request Confirmed
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, {tableForm.name}. Our Maître d' has reserved your table at {selectedVenueForTable} on {tableForm.date} at {tableForm.time} for {tableForm.guests}. A confirmation SMS and email have been dispatched.
                </p>
                <button
                  onClick={() => setSelectedVenueForTable(null)}
                  className="px-6 py-2.5 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold mt-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleTableSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Charles Vance"
                      value={tableForm.name}
                      onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                      className="w-full border border-stone-300 rounded px-2.5 py-1.5 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (800) 555..."
                      value={tableForm.phone}
                      onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                      className="w-full border border-stone-300 rounded px-2.5 py-1.5 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Date</label>
                    <input
                      type="date"
                      value={tableForm.date}
                      onChange={(e) => setTableForm({ ...tableForm, date: e.target.value })}
                      className="w-full border border-stone-300 rounded px-2 py-1.5 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Time</label>
                    <select
                      value={tableForm.time}
                      onChange={(e) => setTableForm({ ...tableForm, time: e.target.value })}
                      className="w-full border border-stone-300 rounded px-2 py-1.5 bg-stone-50"
                    >
                      <option value="12:30">12:30 (Lunch)</option>
                      <option value="18:30">18:30 (Dinner)</option>
                      <option value="19:30">19:30 (Dinner)</option>
                      <option value="20:30">20:30 (Dinner)</option>
                      <option value="21:30">21:30 (Late)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Party Size</label>
                    <select
                      value={tableForm.guests}
                      onChange={(e) => setTableForm({ ...tableForm, guests: e.target.value })}
                      className="w-full border border-stone-300 rounded px-2 py-1.5 bg-stone-50"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8+ Guests">8+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Special Dietary / Seating Request</label>
                  <textarea
                    rows={2}
                    placeholder="Window table, anniversary champagne, allergy notes..."
                    value={tableForm.specialNotes}
                    onChange={(e) => setTableForm({ ...tableForm, specialNotes: e.target.value })}
                    className="w-full border border-stone-300 rounded px-2.5 py-1.5 bg-stone-50"
                  />
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedVenueForTable(null)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold uppercase tracking-wider rounded"
                  >
                    Confirm Table
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
