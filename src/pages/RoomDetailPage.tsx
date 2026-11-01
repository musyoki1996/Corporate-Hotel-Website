/**
 * Imperial Crown Hotel - Individual Room Details Page
 * Gallery, floor plan information, specifications, amenities, and direct reservation
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { useHotel } from '../context/HotelContext';
import {
  Users,
  Bed,
  Maximize2,
  Check,
  Calendar,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Share2,
} from 'lucide-react';

interface RoomDetailPageProps {
  roomSlug: string;
  onNavigate: (page: string, param?: string) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ roomSlug, onNavigate }) => {
  const { rooms, setIsBookingModalOpen, checkRoomAvailability, searchParams, setSearchParams } = useHotel();

  // Find room by slug or id
  const room = rooms.find((r) => r.slug === roomSlug || r.id === roomSlug) || rooms[0];
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>(room.image);

  const availabilityCheck = checkRoomAvailability(
    room.id,
    searchParams.checkIn,
    searchParams.checkOut
  );

  const handleBookThisSuite = () => {
    onNavigate('booking', room.id);
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title={room.name}
        subtitle={room.tagline}
        backgroundImage={room.image}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Rooms & Suites', onClick: () => onNavigate('rooms') },
          { label: room.name },
        ]}
        kicker={`Palatial Residence · ${room.category.toUpperCase()}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('rooms')}
          className="text-xs text-stone-600 hover:text-[#071A38] inline-flex items-center gap-1 mb-8 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Suites</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visual Gallery & Detailed Narrative */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Gallery Viewer */}
            <div className="space-y-4">
              <div className="relative h-[360px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                <img
                  src={selectedGalleryImg}
                  alt={`${room.name} High Resolution View`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              {room.gallery && room.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {room.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryImg(img)}
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedGalleryImg === img
                          ? 'border-[#B58A3A] ring-2 ring-[#B58A3A]/30 scale-[1.02]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Narrative */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-bold block">
                The Residence Experience
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#071A38] font-bold">
                {room.tagline}
              </h2>
              <div className="w-16 h-0.5 bg-[#B58A3A] rounded-full" />
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                {room.longDescription}
              </p>
            </div>

            {/* Architectural Floor Plan & Layout */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-bold block">
                Spatial Architecture & Floor Plan
              </span>
              <h3 className="font-serif text-xl text-[#071A38] font-bold">
                Layout Specifications
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {room.floorPlanInfo}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Square Meters</span>
                  <span className="font-semibold text-stone-800">{room.sizeSqM} m²</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Square Feet</span>
                  <span className="font-semibold text-stone-800">{room.sizeSqFt} sq ft</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Ceiling Elevation</span>
                  <span className="font-semibold text-stone-800">3.6 Meters</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Balcony / Terrace</span>
                  <span className="font-semibold text-stone-800">Private Marble</span>
                </div>
              </div>
            </div>

            {/* Complete Facilities List */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-bold block">
                Suite Facilities & Sovereign Inclusions
              </span>
              <h3 className="font-serif text-xl text-[#071A38] font-bold">
                Curated Amenities Included
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {room.facilities.map((facility, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-[#B58A3A] shrink-0 mt-0.5" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Reservation Card & Availability Check */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-28 bg-[#071A38] text-white p-6 sm:p-8 rounded-2xl border border-[#B58A3A]/40 shadow-2xl space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-white/60 block">
                  Official Rate
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#E9BD62]">
                    ${room.startingPrice}
                  </span>
                  <span className="text-xs text-white/70">USD / night</span>
                </div>
                <span className="text-[10px] text-white/50 block mt-1">
                  *Excluding 16% VAT, 2% Tourism Levy & 5% Service Charge
                </span>
              </div>

              {/* Date Inputs */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div>
                  <label className="text-white/70 block mb-1">Arrival Date</label>
                  <input
                    type="date"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>

                <div>
                  <label className="text-white/70 block mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-white/70 block mb-1">Adults</label>
                    <select
                      value={searchParams.adults}
                      onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
                      className="w-full bg-[#071A38] border border-white/20 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/70 block mb-1">Children</label>
                    <select
                      value={searchParams.children}
                      onChange={(e) => setSearchParams({ ...searchParams, children: parseInt(e.target.value) })}
                      className="w-full bg-[#071A38] border border-white/20 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                    >
                      <option value={0}>None</option>
                      <option value={1}>1 Kid</option>
                      <option value={2}>2 Kids</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Inventory Status */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                {availabilityCheck.available ? (
                  <div className="text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span>Inventory Available ({availabilityCheck.remainingRooms} Suites Remaining)</span>
                  </div>
                ) : (
                  <div className="text-amber-400">
                    {availabilityCheck.reason || 'Sold out for the requested dates.'}
                  </div>
                )}
              </div>

              {/* Book Button */}
              <button
                disabled={!availabilityCheck.available}
                onClick={handleBookThisSuite}
                className="w-full py-4 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-xl shadow-[#B58A3A]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Calendar className="w-4 h-4 text-[#071A38]" />
                <span>Reserve This Suite</span>
              </button>

              <div className="text-[11px] text-white/50 text-center space-y-1">
                <p>Guaranteed Best Online Rate</p>
                <p>Free Cancellation up to 48 hours prior</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
