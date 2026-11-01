/**
 * Imperial Crown Hotel - Rooms & Suites Overview Page
 * Filterable luxury catalog of all 6 room categories with starting prices and direct booking
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import { Users, Bed, Maximize2, Check, ArrowRight, Calendar, SlidersHorizontal } from 'lucide-react';
import { RoomCategory } from '../types/hotel';

interface RoomsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onNavigate }) => {
  const { rooms, setIsBookingModalOpen, checkRoomAvailability } = useHotel();
  const [activeFilter, setActiveFilter] = useState<'all' | 'suite' | 'room'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'size'>('recommended');

  const filteredRooms = rooms
    .filter((room) => {
      if (activeFilter === 'suite') {
        return room.category === 'presidential' || room.category === 'executive' || room.category === 'junior';
      }
      if (activeFilter === 'room') {
        return room.category === 'deluxe' || room.category === 'superior' || room.category === 'standard';
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'size') return b.sizeSqM - a.sizeSqM;
      return 0;
    });

  const handleBookNow = (roomId: string) => {
    onNavigate('booking', roomId);
  };

  const handleViewDetails = (slug: string) => {
    onNavigate('room-detail', slug);
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Rooms & Suites Collection"
        subtitle="Sanctuaries of sovereign composure, furnished with bespoke European silks, Carrara marble baths, and royal butler care."
        backgroundImage={HOTEL_IMAGES.presidentialSuite}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Rooms & Suites' },
        ]}
        kicker="Accommodations"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Filter & Sorting Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#071A38] text-[#E9BD62] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Categories ({rooms.length})
            </button>
            <button
              onClick={() => setActiveFilter('suite')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === 'suite'
                  ? 'bg-[#071A38] text-[#E9BD62] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Suites Only (3)
            </button>
            <button
              onClick={() => setActiveFilter('room')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === 'room'
                  ? 'bg-[#071A38] text-[#E9BD62] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Deluxe & Rooms (3)
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-stone-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-800 text-xs font-medium focus:outline-none focus:border-[#B58A3A]"
            >
              <option value="recommended">Curated / Recommended</option>
              <option value="price_asc">Starting Price: Low to High</option>
              <option value="price_desc">Starting Price: High to Low</option>
              <option value="size">Dimensions: Largest First</option>
            </select>
          </div>

        </div>

        {/* Accommodation Cards List */}
        <div className="space-y-12">
          {filteredRooms.map((room, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Photo Side */}
                <div
                  className={`lg:col-span-6 relative h-72 sm:h-96 lg:h-auto overflow-hidden ${
                    isReversed ? 'lg:order-last' : ''
                  }`}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#071A38]/90 text-[#E9BD62] px-3.5 py-1.5 rounded-lg border border-[#B58A3A]/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                    {room.category}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38]">
                          {room.name}
                        </h3>
                        <p className="font-serif italic text-xs text-[#B58A3A] mt-0.5">
                          {room.tagline}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] text-stone-500 uppercase block">Starting From</span>
                        <span className="font-mono text-2xl font-bold text-[#071A38]">
                          ${room.startingPrice}
                        </span>
                        <span className="text-xs text-stone-500 font-normal"> / night</span>
                      </div>
                    </div>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-4">
                      {room.shortDescription}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#F8F6F1] p-3.5 rounded-xl border border-stone-200 text-xs mt-4">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Space</span>
                        <span className="font-semibold text-stone-800">{room.sizeSqM} m²</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Occupancy</span>
                        <span className="font-semibold text-stone-800">Max {room.occupancy.maxTotal}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">View</span>
                        <span className="font-semibold text-stone-800 truncate block">{room.view}</span>
                      </div>
                    </div>

                    {/* Highlighted Facilities */}
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                        Select Suite Amenities
                      </span>
                      {room.facilities.slice(0, 3).map((facility, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleViewDetails(room.slug)}
                      className="w-full sm:flex-1 py-3 rounded-lg border border-stone-300 hover:border-[#071A38] text-stone-800 text-xs uppercase font-semibold tracking-wider transition-colors text-center"
                    >
                      View Details & Floor Plan
                    </button>
                    <button
                      onClick={() => handleBookNow(room.id)}
                      className="w-full sm:flex-1 py-3 rounded-lg bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] text-xs uppercase font-bold tracking-wider transition-all duration-200 text-center shadow-md flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#071A38]" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
