/**
 * Imperial Crown Hotel - Master Application Root
 * Experience the Royal Standard
 */

import React, { useState, useEffect } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { ReservationVoucherModal } from './components/booking/ReservationVoucherModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { DiningPage } from './pages/DiningPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { EventsPage } from './pages/EventsPage';
import { WeddingsPage } from './pages/WeddingsPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const { isBookingModalOpen, setIsBookingModalOpen, activeVoucher, setActiveVoucher } = useHotel();

  // Navigation router handler
  const handleNavigate = (page: string, param?: string) => {
    if (page === 'booking') {
      // Direct booking trigger
      setPageParam(param);
      setIsBookingModalOpen(true);
      return;
    }

    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document title and meta per page for SEO
  useEffect(() => {
    const titles: { [key: string]: string } = {
      home: 'Imperial Crown Hotel | Experience the Royal Standard',
      about: 'About Us | Imperial Crown Hotel',
      rooms: 'Suites & Accommodations | Imperial Crown Hotel',
      'room-detail': 'Suite Details & Floor Plan | Imperial Crown Hotel',
      dining: 'Dining & Haute Cuisine | Imperial Crown Hotel',
      amenities: 'Spa, Pool & Amenities | Imperial Crown Hotel',
      experiences: 'Curated Royal Experiences | Imperial Crown Hotel',
      events: 'Events & Conferences | Imperial Crown Hotel',
      weddings: 'Weddings & Royal Galas | Imperial Crown Hotel',
      gallery: 'Photographic Gallery | Imperial Crown Hotel',
      offers: 'Special Offers & Packages | Imperial Crown Hotel',
      contact: 'Contact & Concierge | Imperial Crown Hotel',
      faq: 'Frequently Asked Questions | Imperial Crown Hotel',
      privacy: 'Privacy & Data Protection | Imperial Crown Hotel',
      terms: 'Terms & Conditions | Imperial Crown Hotel',
      admin: 'Hotel Administration & Management | Imperial Crown Hotel',
    };

    document.title = titles[currentPage] || 'Imperial Crown Hotel | Experience the Royal Standard';
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#252525] selection:bg-[#B58A3A]/20 selection:text-[#071A38]">
      {/* Main Top Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Primary Page Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'rooms' && <RoomsPage onNavigate={handleNavigate} />}
        {currentPage === 'room-detail' && (
          <RoomDetailPage roomSlug={pageParam || 'presidential-suite'} onNavigate={handleNavigate} />
        )}
        {currentPage === 'dining' && <DiningPage onNavigate={handleNavigate} />}
        {currentPage === 'amenities' && <AmenitiesPage onNavigate={handleNavigate} />}
        {currentPage === 'experiences' && <ExperiencesPage onNavigate={handleNavigate} />}
        {currentPage === 'events' && <EventsPage onNavigate={handleNavigate} />}
        {currentPage === 'weddings' && <WeddingsPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'offers' && <OffersPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'faq' && <FaqPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPage onNavigate={handleNavigate} />}
        {currentPage === 'terms' && <TermsPage onNavigate={handleNavigate} />}
        {currentPage === 'admin' && <AdminDashboard onNavigate={handleNavigate} />}
      </main>

      {/* Master Footer (rendered unless on dedicated management dashboard) */}
      {currentPage !== 'admin' && <Footer onNavigate={handleNavigate} />}

      {/* Global 7-Step Booking Engine Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedRoomId={pageParam}
      />

      {/* Global Printable Royal Reservation Voucher Modal */}
      <ReservationVoucherModal
        booking={activeVoucher}
        onClose={() => setActiveVoucher(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <AppContent />
    </HotelProvider>
  );
}
