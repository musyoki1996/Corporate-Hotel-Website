/**
 * Imperial Crown Hotel - Main Navigation Bar
 * Responsive, sticky, transparent-to-solid navy transition with official brand logo
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { HOTEL_IMAGES } from '../../data/hotelData';
import { useHotel } from '../../context/HotelContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsBookingModalOpen } = useHotel();

  // Handle scroll event for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'dining', label: 'Dining' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'events', label: 'Events & Conferences' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPage === 'home';
  // Use solid navy if not on home, or if scrolled, or if mobile menu is open
  const useSolidBg = !isHome || isScrolled || mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useSolidBg
            ? 'bg-[#071A38] shadow-xl py-3 border-b border-[#B58A3A]/25 backdrop-blur-md'
            : 'bg-gradient-to-b from-[#071A38]/90 via-[#071A38]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Wordmark */}
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
              aria-label="Imperial Crown Hotel Home"
            >
              <img
                src={HOTEL_IMAGES.logo}
                alt="Imperial Crown Hotel Official Crown Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className="block font-serif text-lg tracking-wider text-white font-medium leading-none">
                  IMPERIAL CROWN
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#E9BD62] uppercase font-light mt-0.5">
                  HOTEL · 5 STARS
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors duration-200 py-1 relative ${
                      isActive
                        ? 'text-[#E9BD62] font-semibold'
                        : 'text-white/85 hover:text-[#E9BD62]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B58A3A] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Zone: Admin Link + Book Now Button */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Hotel Management Link */}
              <button
                onClick={() => handleLinkClick('admin')}
                className={`hidden lg:flex items-center gap-1.5 text-xs tracking-wider uppercase px-3 py-1.5 rounded transition-colors whitespace-nowrap border ${
                  currentPage === 'admin'
                    ? 'border-[#E9BD62] text-[#E9BD62] bg-[#E9BD62]/10'
                    : 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
                title="Hotel Staff & Management Console"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9BD62]" />
                <span>Portal</span>
              </button>

              {/* Gold BOOK NOW CTA */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] shadow-lg shadow-[#B58A3A]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#071A38]" />
                <span>Book Now</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-white/90 hover:text-[#E9BD62] focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#071A38]/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 overflow-y-auto animate-fadeIn xl:hidden">
          <div className="flex flex-col gap-2 mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#B58A3A] mb-2">
              Guest Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-[#B58A3A]/15 text-[#E9BD62] font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-serif text-base">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#B58A3A]/60" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('admin')}
                className="flex items-center gap-2 py-3 px-3 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/5"
              >
                <ShieldCheck className="w-4 h-4 text-[#E9BD62]" />
                <span className="text-sm">Hotel Staff & Management Portal</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-3.5 rounded text-center text-sm font-semibold uppercase tracking-wider bg-[#B58A3A] text-[#071A38] shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Accommodation</span>
              </button>
            </div>
          </div>

          <div className="mt-auto text-center text-xs text-white/50 border-t border-white/10 pt-4">
            <p className="font-serif italic text-white/70">Experience the Royal Standard</p>
            <p className="mt-1">Reservations: +1 (800) 555-ROYAL</p>
          </div>
        </div>
      )}
    </>
  );
};
