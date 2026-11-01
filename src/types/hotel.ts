/**
 * Imperial Crown Hotel - TypeScript Type Definitions
 * Experience the Royal Standard
 */

export interface RoomCategory {
  id: string;
  name: string;
  slug: string;
  category: 'presidential' | 'executive' | 'junior' | 'deluxe' | 'superior' | 'standard';
  tagline: string;
  shortDescription: string;
  longDescription: string;
  startingPrice: number; // Placeholder rate in USD
  currency: string;
  occupancy: {
    adults: number;
    children: number;
    maxTotal: number;
  };
  bedConfiguration: string;
  sizeSqM: number;
  sizeSqFt: number;
  view: string;
  image: string;
  gallery: string[];
  facilities: string[];
  floorPlanInfo: string;
  isFeatured: boolean;
  totalRooms: number;
  availableRooms: number;
}

export type PaymentMethod = 'mpesa' | 'visa' | 'mastercard' | 'bank_wire';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type BookingStatus = 'confirmed' | 'pending' | 'checked_in' | 'checked_out' | 'cancelled';

export interface BookingGuest {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests?: string;
  dietaryPreferences?: string;
  estimatedArrival?: string;
}

export interface BookingRecord {
  id: string;
  bookingReference: string;
  roomId: string;
  roomName: string;
  roomCategory: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  guest: BookingGuest;
  // Financial breakdown
  roomRatePerNight: number;
  subtotal: number;
  vatTaxAmount: number; // 16% VAT
  tourismLevyAmount: number; // 2% Tourism Levy
  serviceChargeAmount: number; // 5% Service Charge
  totalPayableAmount: number;
  currency: string;
  promoCodeApplied?: string;
  discountAmount?: number;
  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionReference: string;
  mpesaPhoneNumber?: string;
  cardLastFour?: string;
  paidAt?: string;
  // Lifecycle
  bookingStatus: BookingStatus;
  createdAt: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  hours: string;
  dressCode: string;
  cuisine: string;
  image: string;
  menuHighlights: { title: string; desc: string; price: string }[];
  location: string;
}

export interface HotelAmenity {
  id: string;
  name: string;
  category: string;
  description: string;
  hours: string;
  image: string;
  iconName: string;
  details: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: 'leisure' | 'excursions' | 'cultural' | 'family' | 'romantic';
  duration: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface EventFacility {
  id: string;
  name: string;
  type: string;
  capacityBanquets: number;
  capacityCocktail: number;
  capacityTheatre: number;
  areaSqM: number;
  description: string;
  features: string[];
  image: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  promoCode: string;
  discountPercent: number;
  description: string;
  validUntil: string;
  inclusions: string[];
  image: string;
  isActive: boolean;
}

export interface GuestTestimonial {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  suiteStayed: string;
  stayDate: string;
  reviewTitle: string;
  reviewText: string;
  isVerifiedGuest: boolean;
  avatarPlaceholder: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  department: 'reservations' | 'concierge' | 'events' | 'dining' | 'general';
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'resolved';
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'super_admin' | 'general_manager' | 'reservations_manager' | 'front_desk';
  email: string;
}

export interface HotelSettings {
  hotelName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  vatRate: number;
  tourismLevyRate: number;
  serviceChargeRate: number;
  checkInTime: string;
  checkOutTime: string;
  mpesaDaraja: {
    enabled: boolean;
    environment: 'sandbox' | 'production';
    businessShortCode: string;
    consumerKey: string;
    consumerSecret: string;
    passkey: string;
    callbackUrl: string;
  };
}
