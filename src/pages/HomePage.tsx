/**
 * Imperial Crown Hotel - Official Homepage
 * Experience the Royal Standard
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Users,
  Compass,
  Utensils,
  Sparkles,
  Waves,
  Briefcase,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Coffee,
  Check,
  Key,
} from 'lucide-react';
import { HOTEL_IMAGES, DINING_VENUES, HOTEL_AMENITIES, CURATED_EXPERIENCES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import { BookingSearchWidget } from '../components/booking/BookingSearchWidget';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { rooms, offers, testimonials, setIsBookingModalOpen, setSelectedRoomForDetail } = useHotel();
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleBookRoom = (roomId: string) => {
    onNavigate('booking', roomId);
  };

  const handleViewRoom = (roomId: string) => {
    onNavigate('room-detail', roomId);
  };

  const activeTestimonial = testimonials[currentTestimonialIdx] || testimonials[0];

  return (
    <div className="w-full bg-[#F8F6F1]">
      
      {/* ========================================================================= */}
      {/* SECTION A: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#071A38]">
        {/* Cinematic Backdrop Image */}
        <img
          src={HOTEL_IMAGES.heroFacade}
          alt="Imperial Crown Hotel Grand Architectural Facade at Twilight"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 animate-subtleZoom opacity-75"
        />

        {/* Deep Royal Navy Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A38] via-[#071A38]/50 to-[#071A38]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#071A38]/30 to-[#071A38]/80" />

        {/* Center Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-10 pb-6">
          
          {/* Centered Brand Crown Crest & 5 Stars */}
          <div className="flex flex-col items-center justify-center mb-5 animate-fadeIn">
            <img
              src={HOTEL_IMAGES.logo}
              alt="Imperial Crown Hotel Official Crest"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
            <div className="flex items-center gap-1 mt-2 text-[#E9BD62]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E9BD62] text-[#E9BD62]" />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light mt-1.5">
              Five-Star International Luxury
            </span>
          </div>

          {/* Welcome Message & Headline */}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#B58A3A] block mb-2">
            Welcome to Unrivaled Hospitality
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-medium tracking-tight text-balance leading-tight drop-shadow-md">
            Experience the Royal Standard.
          </h1>

          <div className="w-24 h-0.5 bg-[#B58A3A] mx-auto my-5 rounded-full" />

          <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl mx-auto font-light leading-relaxed text-balance">
            Where classical European grandeur converges with bespoke sovereign service. Discover presidential suites, Michelin-caliber gastronomy, and a private sanctuary crafted for the world’s most discerning guests.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-widest transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-[#B58A3A]/25 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-xs uppercase tracking-widest backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Explore Our Hotel</span>
              <ArrowRight className="w-4 h-4 text-[#E9BD62]" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION B: INTEGRATED BOOKING SEARCH PANEL                                 */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
          <BookingSearchWidget />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: INTRODUCTION & HERITAGE                                        */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
              01. The Sovereign Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#071A38] font-medium leading-tight">
              An Architectural Legacy of Imperial Grace and Modern Precision.
            </h2>
            <div className="w-16 h-0.5 bg-[#B58A3A] rounded-full" />
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              Set within a secluded palatial enclave, Imperial Crown Hotel represents the pinnacle of international luxury hospitality. Conceived as a sanctuary for heads of state, global luminaries, and connoisseurs of gracious living, every corner of our property reflects meticulous craftsmanship.
            </p>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              From our hand-carved Italian marble corridors to the intuitive attentiveness of our Les Clefs d’Or concierges and dedicated private butlers, your stay is elevated beyond conventional luxury into an unforgettable royal residence.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#071A38] hover:bg-[#0f2b57] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="px-6 py-3 border border-stone-300 hover:border-[#B58A3A] text-stone-800 rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors"
              >
                View Hotel Gallery
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={HOTEL_IMAGES.hotelCourtyard}
                alt="Imperial Crown Hotel Palatial Courtyard Gardens and Colonnades"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#E9BD62] font-semibold block">
                  The Royal Colonnade & Courtyard
                </span>
                <p className="font-serif text-lg text-white mt-1">
                  Surrounded by manicured gardens, serene fountains, and timeless neoclassical facades.
                </p>
              </div>
            </div>

            {/* Floating Luxury Inscription Badge */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-[#071A38] text-white p-5 rounded-xl border border-[#B58A3A]/40 shadow-xl max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                The Royal Guarantee
              </span>
              <p className="font-serif italic text-sm text-white/90 mt-1">
                "Every guest welcomed as royalty, every detail honored as sacred."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: ACCOMMODATION SHOWCASE (6 CATEGORIES)                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#071A38] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
                02. Royal Accommodations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium">
                Suites & Palatial Residences
              </h2>
              <p className="text-sm text-white/70 max-w-xl mt-2">
                Exquisitely furnished with Italian linens, Carrera marble bathrooms, bespoke acoustic insulation, and round-the-clock butler service.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rooms')}
              className="text-xs uppercase tracking-wider text-[#E9BD62] hover:underline inline-flex items-center gap-1 font-semibold whitespace-nowrap self-start md:self-end"
            >
              <span>Explore All 6 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Room Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white/[0.04] rounded-2xl border border-white/10 overflow-hidden hover:border-[#B58A3A]/50 transition-all duration-300 flex flex-col group shadow-xl"
              >
                {/* Room Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A38] via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-[#071A38]/90 text-[#E9BD62] px-3 py-1.5 rounded-lg border border-[#B58A3A]/30 backdrop-blur-md">
                    <span className="text-[10px] text-white/60 block leading-none">Starting From</span>
                    <span className="font-mono text-base font-bold">${room.startingPrice}</span>
                    <span className="text-[10px] text-white/70 font-normal"> / night</span>
                  </div>

                  {/* Category Chip */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-semibold bg-black/40 px-2.5 py-1 rounded backdrop-blur-sm">
                      {room.category}
                    </span>
                  </div>
                </div>

                {/* Room Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#E9BD62] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-white/65 mt-2 line-clamp-2 leading-relaxed">
                      {room.shortDescription}
                    </p>

                    {/* Quick Specs */}
                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-white/75">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Dimensions</span>
                        <span>{room.sizeSqM} m² / {room.sizeSqFt} sq ft</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Occupancy</span>
                        <span>Max {room.occupancy.maxTotal} Guests</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-white/40 block text-[10px] uppercase">Bedding</span>
                        <span className="truncate block">{room.bedConfiguration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleViewRoom(room.slug)}
                      className="flex-1 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBookRoom(room.id)}
                      className="flex-1 py-2.5 rounded bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] text-xs uppercase tracking-wider font-bold transition-colors text-center shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: DINING EXPERIENCES                                             */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
            03. Culinary Grandeur
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#071A38] font-medium">
            Fine Dining & Artisan Mixology
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto my-4 rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From Michelin-caliber tasting menus at The Crown Jewel to golden hour cocktails atop Skyview 360, embark on an extraordinary international gastronomic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DINING_VENUES.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-semibold block">
                    {venue.type}
                  </span>
                  <h3 className="font-serif text-xl text-white font-medium">
                    {venue.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                    <p><strong className="text-stone-800">Cuisine:</strong> {venue.cuisine}</p>
                    <p><strong className="text-stone-800">Hours:</strong> {venue.hours}</p>
                    <p><strong className="text-stone-800">Dress Code:</strong> {venue.dressCode}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('dining')}
                    className="w-full py-2.5 rounded bg-[#071A38] text-[#E9BD62] text-xs uppercase tracking-wider font-semibold hover:bg-[#0c2752] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Reserve a Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: HOTEL AMENITIES                                                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#071A38] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
              04. World-Class Facilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium">
              Sovereign Amenities & Wellness
            </h2>
            <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto my-4 rounded-full" />
            <p className="text-sm sm:text-base text-white/70">
              Every facility at Imperial Crown Hotel is designed to rejuvenate your senses, empower productivity, and deliver effortless comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOTEL_AMENITIES.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white/[0.04] rounded-xl p-6 border border-white/10 hover:border-[#B58A3A]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B58A3A]/20 text-[#E9BD62] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[#E9BD62]" />
                </div>
                <h3 className="font-serif text-lg text-white font-semibold">
                  {amenity.name}
                </h3>
                <span className="text-[11px] text-[#B58A3A] uppercase tracking-wider block mt-0.5">
                  {amenity.category} · {amenity.hours}
                </span>
                <p className="text-xs text-white/70 leading-relaxed mt-2.5">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('amenities')}
              className="px-8 py-3.5 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-widest rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <span>Explore All Amenities & Spa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: CURATED EXPERIENCES                                            */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
              05. Bespoke Journeys
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium">
              Curated Guest Experiences
            </h2>
            <p className="text-sm text-stone-600 max-w-xl mt-1">
              Immerse yourself in private yacht cruises, royal historical tours, and sommelier vault tastings crafted by our master concierges.
            </p>
          </div>

          <button
            onClick={() => onNavigate('experiences')}
            className="text-xs uppercase tracking-wider text-[#B58A3A] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>View All Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CURATED_EXPERIENCES.slice(0, 3).map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded text-[11px] backdrop-blur-sm">
                  {exp.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                    {exp.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#071A38] font-bold mt-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    {exp.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-xs uppercase tracking-wider text-[#071A38] font-bold hover:text-[#B58A3A] inline-flex items-center gap-1.5 pt-2"
                >
                  <span>Explore Experience Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: EVENTS AND CONFERENCES                                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#071A38] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
                06. Palatial Gatherings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight">
                Diplomatic Summits, Galas & Royal Weddings.
              </h2>
              <div className="w-16 h-0.5 bg-[#B58A3A] rounded-full" />
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Hosting an event at Imperial Crown Hotel commands instant prestige. Our 1,100 m² Sovereign Grand Ballroom accommodates up to 950 guests under 12 Austrian crystal chandeliers, while our state-of-the-art executive boardrooms offer military-grade encrypted communication.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="font-serif text-2xl font-bold text-[#E9BD62] block">2,500 m²</span>
                  <span className="text-white/60">Total Event & Exhibition Space</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="font-serif text-2xl font-bold text-[#E9BD62] block">950 Guests</span>
                  <span className="text-white/60">Maximum Gala Reception Capacity</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('events')}
                  className="px-6 py-3.5 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-md"
                >
                  <span>Request Event Proposal (RFP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('weddings')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold rounded-lg border border-white/20 transition-colors"
                >
                  Royal Weddings Showcase
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 relative">
                <img
                  src={HOTEL_IMAGES.grandBallroom}
                  alt="Imperial Crown Hotel Sovereign Grand Ballroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-semibold block">
                    The Sovereign Ballroom
                  </span>
                  <h3 className="font-serif text-xl text-white">
                    Pillarless Architectural Splendor
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: GUEST TESTIMONIALS (EDITABLE CAROUSEL)                         */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
            07. Guest Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium">
            Testimonials of Royal Discretion
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto my-3 rounded-full" />
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-xl relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1 text-[#B58A3A]">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B58A3A] text-[#B58A3A]" />
              ))}
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Stayed in {activeTestimonial.suiteStayed} · {activeTestimonial.stayDate}
            </span>
          </div>

          <h3 className="font-serif text-2xl text-[#071A38] font-bold mb-4">
            "{activeTestimonial.reviewTitle}"
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-stone-700 leading-relaxed">
            {activeTestimonial.reviewText}
          </p>

          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#071A38] text-[#E9BD62] font-serif font-bold text-sm flex items-center justify-center">
                {activeTestimonial.avatarPlaceholder}
              </div>
              <div>
                <span className="font-bold text-stone-900 text-sm block">
                  {activeTestimonial.guestName}
                </span>
                <span className="text-xs text-stone-500">{activeTestimonial.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-stone-300 hover:border-[#B58A3A] text-stone-600 hover:text-[#071A38] transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-stone-300 hover:border-[#B58A3A] text-stone-600 hover:text-[#071A38] transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION J: SPECIAL OFFERS & PROMOTIONS                                    */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#F1EFEA] border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-2">
                08. Sovereign Privileges
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium">
                Seasonal Offers & Royal Packages
              </h2>
              <p className="text-sm text-stone-600 max-w-xl mt-1">
                Unlock preferential rates, complimentary spa indulgences, and champagne additions for your next sojourn.
              </p>
            </div>

            <button
              onClick={() => onNavigate('offers')}
              className="text-xs uppercase tracking-wider text-[#B58A3A] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>View All 5 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#071A38] text-[#E9BD62] px-3 py-1 rounded text-xs font-bold font-mono">
                      {offer.discountPercent}% Privilege
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block mb-1">
                      {offer.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#071A38] font-bold">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                      {offer.inclusions.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-stone-600">
                          <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="bg-[#071A38]/5 p-2.5 rounded-lg flex items-center justify-between text-xs mb-3">
                    <span className="text-stone-500">Promo Code:</span>
                    <span className="font-mono font-bold text-[#071A38]">{offer.promoCode}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] text-xs uppercase font-semibold tracking-wider rounded transition-colors text-center"
                  >
                    Apply & Book Offer
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION K: FINAL BOOKING CALL TO ACTION                                   */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#071A38] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-transparent to-[#041124]/90 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <img
            src={HOTEL_IMAGES.logo}
            alt="Imperial Crown Hotel Crest"
            className="h-16 w-auto mx-auto object-contain"
          />

          <span className="text-xs uppercase tracking-[0.3em] text-[#B58A3A] font-semibold block">
            Begin Your Royal Sojourn
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight">
            Your Royal Experience Awaits.
          </h2>

          <div className="w-20 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Reserve directly with Imperial Crown Hotel to enjoy guaranteed best rates, complimentary room upgrades upon availability, and personal royal concierge attention.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-widest rounded-lg shadow-2xl shadow-[#B58A3A]/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Stay Now</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors"
            >
              Contact Royal Concierge
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
