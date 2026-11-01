/**
 * Imperial Crown Hotel - Photographic Gallery Page
 * Filterable luxury photo collection with high-resolution lightbox modal
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { X, Maximize2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: string, param?: string) => void;
}

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'suites' | 'dining' | 'wellness' | 'architecture' | 'events';
  categoryLabel: string;
  caption: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      src: HOTEL_IMAGES.heroFacade,
      title: 'Grand Palace Facade at Dusk',
      category: 'architecture',
      categoryLabel: 'Architecture & Grounds',
      caption: 'Neoclassical exterior illuminated with warm architectural lighting and reflecting fountain pool.',
    },
    {
      id: 'gal-2',
      src: HOTEL_IMAGES.presidentialSuite,
      title: 'The Presidential Suite Sanctuary',
      category: 'suites',
      categoryLabel: 'Suites & Accommodations',
      caption: 'Plush velvet salon, Italian silks, and panoramic golden hour city skyline views.',
    },
    {
      id: 'gal-3',
      src: HOTEL_IMAGES.fineDining,
      title: 'The Crown Jewel Grand Dining Room',
      category: 'dining',
      categoryLabel: 'Dining & Gastronomy',
      caption: 'Crystal chandeliers, white linen tables, and sommelier vintage service.',
    },
    {
      id: 'gal-4',
      src: HOTEL_IMAGES.wellnessSpa,
      title: 'Heated Indoor Infinity Pool & Spa Deck',
      category: 'wellness',
      categoryLabel: 'Wellness & Pool',
      caption: 'Travertine stone terraces, teak loungers, and calm turquoise thermal waters.',
    },
    {
      id: 'gal-5',
      src: HOTEL_IMAGES.grandBallroom,
      title: 'The Sovereign Grand Ballroom',
      category: 'events',
      categoryLabel: 'Events & Banquets',
      caption: 'Royal gala banquet setting with crystal chandeliers and golden chiavari chairs.',
    },
    {
      id: 'gal-6',
      src: HOTEL_IMAGES.deluxeBedroom,
      title: 'Deluxe Suite with Private Balcony',
      category: 'suites',
      categoryLabel: 'Suites & Accommodations',
      caption: 'Sunlit marble terrace, velvet armchairs, and king bed dressed in 800-thread Egyptian cotton.',
    },
    {
      id: 'gal-7',
      src: HOTEL_IMAGES.hotelCourtyard,
      title: 'The Royal Colonnade & Topiary Gardens',
      category: 'architecture',
      categoryLabel: 'Architecture & Grounds',
      caption: 'Manicured hedges, marble statues, and sun-drenched neoclassical arches.',
    },
    {
      id: 'gal-8',
      src: HOTEL_IMAGES.rooftopLounge,
      title: 'Skyview 360 Rooftop Lounge Bar',
      category: 'dining',
      categoryLabel: 'Dining & Gastronomy',
      caption: 'Backlit golden marble bar and twilight skyline mixology.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'suites', label: 'Suites & Rooms' },
    { id: 'dining', label: 'Dining & Bars' },
    { id: 'wellness', label: 'Spa & Wellness' },
    { id: 'architecture', label: 'Architecture & Grounds' },
    { id: 'events', label: 'Events & Galas' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Photographic Gallery"
        subtitle="Visual glimpses of sovereign grandeur, palatial suites, tranquil spas, and culinary art."
        backgroundImage={HOTEL_IMAGES.heroFacade}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Gallery' },
        ]}
        kicker="Visual Splendor"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        
        {/* Category Tabs */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-200"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/90 via-[#071A38]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-10 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-semibold">
                  {item.categoryLabel}
                </span>

                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/70 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#E9BD62] font-bold uppercase tracking-wider mt-2">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Fullscreen</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative rounded-xl overflow-hidden max-h-[75vh] shadow-2xl border border-white/20">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center text-white mt-4 max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-[#E9BD62] font-semibold block">
                {activeItem.categoryLabel}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
