/**
 * Imperial Crown Hotel - Application Context & State Engine
 * Manages bookings, room availability, payments, enquiries, and administration
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoomCategory,
  BookingRecord,
  SpecialOffer,
  GuestTestimonial,
  ContactEnquiry,
  HotelSettings,
  AdminUser,
  BookingStatus,
} from '../types/hotel';
import {
  INITIAL_ROOM_CATEGORIES,
  INITIAL_BOOKINGS,
  SPECIAL_OFFERS,
  SAMPLE_TESTIMONIALS,
  HOTEL_SETTINGS,
} from '../data/hotelData';

interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  selectedRoomId?: string;
  promoCode?: string;
}

interface HotelContextType {
  // Catalogs
  rooms: RoomCategory[];
  bookings: BookingRecord[];
  offers: SpecialOffer[];
  testimonials: GuestTestimonial[];
  enquiries: ContactEnquiry[];
  settings: HotelSettings;
  adminUser: AdminUser | null;
  
  // Search & Booking Flow
  searchParams: BookingSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<BookingSearchParams>>;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedRoomForDetail: RoomCategory | null;
  setSelectedRoomForDetail: (room: RoomCategory | null) => void;
  activeVoucher: BookingRecord | null;
  setActiveVoucher: (voucher: BookingRecord | null) => void;
  
  // Actions
  checkRoomAvailability: (roomId: string, checkIn: string, checkOut: string) => { available: boolean; remainingRooms: number; reason?: string };
  calculateBookingCost: (roomId: string, nights: number, roomsCount: number, promoCode?: string) => {
    roomRate: number;
    subtotal: number;
    vat: number;
    tourismLevy: number;
    serviceCharge: number;
    discount: number;
    total: number;
  };
  createBooking: (bookingInput: Omit<BookingRecord, 'id' | 'bookingReference' | 'createdAt' | 'paidAt'>) => Promise<BookingRecord>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  updateRoom: (roomId: string, updates: Partial<RoomCategory>) => void;
  submitEnquiry: (enquiryInput: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; id: string }>;
  updateEnquiryStatus: (id: string, status: 'new' | 'in_progress' | 'resolved') => void;
  submitTestimonial: (testimonialInput: Omit<GuestTestimonial, 'id'>) => void;
  toggleOfferActive: (offerId: string) => void;
  updateHotelSettings: (updates: Partial<HotelSettings>) => void;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROOMS: 'ich_rooms_v1',
  BOOKINGS: 'ich_bookings_v1',
  OFFERS: 'ich_offers_v1',
  TESTIMONIALS: 'ich_testimonials_v1',
  ENQUIRIES: 'ich_enquiries_v1',
  SETTINGS: 'ich_settings_v1',
  ADMIN_SESSION: 'ich_admin_session_v1',
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent or seed data
  const [rooms, setRooms] = useState<RoomCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
    return saved ? JSON.parse(saved) : INITIAL_ROOM_CATEGORIES;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return saved ? JSON.parse(saved) : SPECIAL_OFFERS;
  });

  const [testimonials, setTestimonials] = useState<GuestTestimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : SAMPLE_TESTIMONIALS;
  });

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : [
      {
        id: 'enq-101',
        fullName: 'Lady Victoria Hastings',
        email: 'v.hastings@mayfair.co.uk',
        phone: '+44 20 7946 0192',
        department: 'events',
        subject: 'Inquiry regarding Sovereign Ballroom for Diamond Jubilee Gala',
        message: 'We are organizing an international charity ball in November 2026 for 500 dignitaries. We require full audiovisual staging, kosher/halal catering options, and VIP security suite reservations.',
        createdAt: '2026-10-30T11:20:00Z',
        status: 'new',
      },
    ];
  });

  const [settings, setSettings] = useState<HotelSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : HOTEL_SETTINGS;
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    return saved ? JSON.parse(saved) : null;
  });

  // Calculate default dates (tomorrow to +3 days)
  const today = new Date();
  const checkInDefault = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const checkOutDefault = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState<BookingSearchParams>({
    checkIn: checkInDefault,
    checkOut: checkOutDefault,
    adults: 2,
    children: 0,
    roomsCount: 1,
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<RoomCategory | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<BookingRecord | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  }, [adminUser]);

  /**
   * Double booking validation engine:
   * Checks for overlapping reservations for the specified room category.
   * If existing active bookings meet or exceed room inventory, prevents double booking.
   */
  const checkRoomAvailability = (roomId: string, checkIn: string, checkOut: string) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    if (!targetRoom) {
      return { available: false, remainingRooms: 0, reason: 'Room category not found' };
    }

    const startRequested = new Date(checkIn).getTime();
    const endRequested = new Date(checkOut).getTime();

    if (endRequested <= startRequested) {
      return { available: false, remainingRooms: 0, reason: 'Check-out must be after check-in' };
    }

    // Filter active bookings for this room category that overlap
    const overlappingBookings = bookings.filter((b) => {
      if (b.roomId !== roomId) return false;
      if (b.bookingStatus === 'cancelled') return false;

      const bStart = new Date(b.checkInDate).getTime();
      const bEnd = new Date(b.checkOutDate).getTime();

      // Check date interval intersection: (StartA < EndB) and (EndA > StartB)
      return startRequested < bEnd && endRequested > bStart;
    });

    const bookedRoomsCount = overlappingBookings.reduce((sum, b) => sum + (b.roomsCount || 1), 0);
    const remainingRooms = Math.max(0, targetRoom.totalRooms - bookedRoomsCount);

    return {
      available: remainingRooms > 0,
      remainingRooms,
      reason: remainingRooms > 0 ? undefined : 'All rooms in this royal category are reserved for the selected dates.',
    };
  };

  /**
   * Transparent Financial Pricing Calculation
   * Standardized: 16% VAT, 2% Tourism Levy, 5% Service Charge
   */
  const calculateBookingCost = (roomId: string, nights: number, roomsCount: number, promoCode?: string) => {
    const room = rooms.find((r) => r.id === roomId);
    const roomRate = room ? room.startingPrice : 500;
    const baseSubtotal = roomRate * nights * roomsCount;

    // Apply promo discount if valid
    let discount = 0;
    if (promoCode) {
      const cleanCode = promoCode.trim().toUpperCase();
      const matchedOffer = offers.find((o) => o.isActive && o.promoCode.toUpperCase() === cleanCode);
      if (matchedOffer) {
        discount = Math.round(baseSubtotal * (matchedOffer.discountPercent / 100));
      }
    }

    const subtotalAfterDiscount = Math.max(0, baseSubtotal - discount);
    const vat = parseFloat((subtotalAfterDiscount * settings.vatRate).toFixed(2));
    const tourismLevy = parseFloat((subtotalAfterDiscount * settings.tourismLevyRate).toFixed(2));
    const serviceCharge = parseFloat((subtotalAfterDiscount * settings.serviceChargeRate).toFixed(2));
    const total = parseFloat((subtotalAfterDiscount + vat + tourismLevy + serviceCharge).toFixed(2));

    return {
      roomRate,
      subtotal: baseSubtotal,
      vat,
      tourismLevy,
      serviceCharge,
      discount,
      total,
    };
  };

  /**
   * Record verified reservation in system
   */
  const createBooking = async (
    bookingInput: Omit<BookingRecord, 'id' | 'bookingReference' | 'createdAt' | 'paidAt'>
  ): Promise<BookingRecord> => {
    // Validate availability again immediately before creation to strictly prevent double bookings
    const check = checkRoomAvailability(bookingInput.roomId, bookingInput.checkInDate, bookingInput.checkOutDate);
    if (!check.available) {
      throw new Error(check.reason || 'Requested room is no longer available for the selected dates.');
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const bookingReference = `ICH-${year}-${randomNum}`;
    const id = `book-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newBooking: BookingRecord = {
      ...bookingInput,
      id,
      bookingReference,
      createdAt: nowIso,
      paidAt: bookingInput.paymentStatus === 'completed' ? nowIso : undefined,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update available rooms count in room category
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === bookingInput.roomId) {
          return {
            ...r,
            availableRooms: Math.max(0, r.availableRooms - (bookingInput.roomsCount || 1)),
          };
        }
        return r;
      })
    );

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            bookingStatus: status,
          };
        }
        return b;
      })
    );
  };

  const updateRoom = (roomId: string, updates: Partial<RoomCategory>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, ...updates } : r))
    );
  };

  const submitEnquiry = async (
    enquiryInput: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>
  ) => {
    const id = `enq-${Date.now()}`;
    const newEnquiry: ContactEnquiry = {
      ...enquiryInput,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return { success: true, id };
  };

  const updateEnquiryStatus = (id: string, status: 'new' | 'in_progress' | 'resolved') => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const submitTestimonial = (testimonialInput: Omit<GuestTestimonial, 'id'>) => {
    const id = `test-${Date.now()}`;
    setTestimonials((prev) => [{ ...testimonialInput, id }, ...prev]);
  };

  const toggleOfferActive = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, isActive: !o.isActive } : o))
    );
  };

  const updateHotelSettings = (updates: Partial<HotelSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    // Robust local administrator authentication
    // Default admin demo credentials: admin / royalstandard or manager / imperial
    if (
      (username === 'admin' && pass === 'royalstandard') ||
      (username === 'manager' && pass === 'imperial') ||
      (username === 'frontdesk' && pass === 'crown2026')
    ) {
      const user: AdminUser = {
        id: 'usr-1',
        username,
        fullName: username === 'admin' ? 'General Manager Arthur Sterling' : 'Operations Manager Sarah Vance',
        role: username === 'admin' ? 'super_admin' : 'reservations_manager',
        email: `${username}@imperialcrownhotel.com`,
      };
      setAdminUser(user);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        bookings,
        offers,
        testimonials,
        enquiries,
        settings,
        adminUser,
        searchParams,
        setSearchParams,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedRoomForDetail,
        setSelectedRoomForDetail,
        activeVoucher,
        setActiveVoucher,
        checkRoomAvailability,
        calculateBookingCost,
        createBooking,
        updateBookingStatus,
        updateRoom,
        submitEnquiry,
        updateEnquiryStatus,
        submitTestimonial,
        toggleOfferActive,
        updateHotelSettings,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
