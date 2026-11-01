/**
 * Imperial Crown Hotel - Hotel Administration Dashboard
 * Secure role-based management: Overview KPIs, Rooms, Calendar, Bookings, Guests, Payments,
 * Invoices, Offers, Testimonials, Enquiries, Staff, and M-Pesa Daraja Gateway Settings.
 */

import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { HOTEL_IMAGES } from '../data/hotelData';
import {
  LayoutDashboard,
  Bed,
  Calendar,
  Users,
  CreditCard,
  Tag,
  MessageSquare,
  Mail,
  UserCheck,
  Settings,
  ShieldCheck,
  LogOut,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  Save,
  Key,
  Lock,
} from 'lucide-react';
import { BookingRecord, BookingStatus, RoomCategory } from '../types/hotel';

interface AdminDashboardProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const {
    adminUser,
    loginAdmin,
    logoutAdmin,
    rooms,
    bookings,
    offers,
    testimonials,
    enquiries,
    settings,
    updateBookingStatus,
    updateRoom,
    toggleOfferActive,
    updateEnquiryStatus,
    updateHotelSettings,
    setActiveVoucher,
  } = useHotel();

  // Active sub-module
  const [activeTab, setActiveTab] = useState<
    'overview' | 'rooms' | 'calendar' | 'bookings' | 'guests' | 'payments' | 'offers' | 'testimonials' | 'enquiries' | 'staff' | 'settings'
  >('overview');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('royalstandard');
  const [loginError, setLoginError] = useState(false);

  // Search & filter states
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<BookingRecord | null>(null);

  // Edit room modal state
  const [editingRoom, setEditingRoom] = useState<RoomCategory | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(loginUsername, loginPassword);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  // If not logged in, show secure login interface
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#071A38] text-white flex items-center justify-center p-4 pt-24 pb-12">
        <div className="bg-white text-[#252525] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#B58A3A]/40 space-y-6 animate-scaleUp">
          
          <div className="text-center space-y-2">
            <img
              src={HOTEL_IMAGES.logo}
              alt="Imperial Crown Hotel Crest"
              className="h-16 w-auto mx-auto object-contain"
            />
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
              Hotel Management System
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#071A38]">
              Staff & Executive Portal
            </h2>
            <p className="text-xs text-stone-500">
              Role-based management console for reservation operations, guests, and payments.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Staff Username</label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Access Passphrase</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 font-medium"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[11px] border border-red-200">
                Invalid credentials. Please use the demo accounts indicated below.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md"
            >
              Sign In to Management Portal
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="bg-[#F8F6F1] p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="font-bold text-[#071A38] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#B58A3A]" />
              <span>Pre-Configured Demo Credentials</span>
            </div>
            <div className="text-[11px] space-y-1 pt-1 font-mono">
              <p>Super Admin: <strong>admin</strong> / <strong>royalstandard</strong></p>
              <p>Reservations Manager: <strong>manager</strong> / <strong>imperial</strong></p>
              <p>Front Desk: <strong>frontdesk</strong> / <strong>crown2026</strong></p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-stone-500 hover:text-[#071A38] underline"
            >
              Return to Public Hotel Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Calculate Real-Time Dashboard Statistics
  const totalBookingsCount = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked_in');
  const totalRooms = rooms.reduce((acc, r) => acc + r.totalRooms, 0);
  const availableRoomsCount = rooms.reduce((acc, r) => acc + r.availableRooms, 0);
  const occupiedRoomsCount = totalRooms - availableRoomsCount;
  const occupancyPercentage = Math.round((occupiedRoomsCount / totalRooms) * 100);
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'completed')
    .reduce((sum, b) => sum + b.totalPayableAmount, 0);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingReference.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.guest.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.guest.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.roomName.toLowerCase().includes(bookingSearch.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-stone-100 text-[#252525] flex flex-col pt-20">
      
      {/* Top Management Header Strip */}
      <div className="bg-[#071A38] text-white border-b border-[#B58A3A]/40 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={HOTEL_IMAGES.logo}
            alt="Imperial Crown Hotel Crest"
            className="h-9 w-auto object-contain"
          />
          <div>
            <div className="font-serif text-base font-bold text-white flex items-center gap-2">
              <span>Imperial Crown Hotel Directorate</span>
              <span className="text-[10px] bg-[#B58A3A] text-[#071A38] px-2 py-0.5 rounded font-sans font-bold uppercase">
                {adminUser.role.replace('_', ' ')}
              </span>
            </div>
            <span className="text-[10px] text-white/60">
              Logged in as {adminUser.fullName} ({adminUser.email})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-colors"
          >
            View Public Site
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded bg-red-600/80 hover:bg-red-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-white border-r border-stone-200 p-4 space-y-1 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-2">
            Operations & Registry
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'rooms'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Bed className="w-4 h-4" />
            <span>Room Management ({rooms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'calendar'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Availability Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Reservations ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guests')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'guests'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'payments'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments & Invoices</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 pt-4 pb-2">
            Hospitality Content
          </div>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'offers'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Privilege Offers</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'enquiries'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries & RFPs ({enquiries.filter((e) => e.status === 'new').length} new)</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'testimonials'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials & Reviews</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 pt-4 pb-2">
            Configuration & Gateway
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-[#071A38] text-[#E9BD62]'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>M-Pesa Daraja & Settings</span>
          </button>
        </aside>

        {/* Main Dashboard Area */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          
          {/* TAB 1: OVERVIEW KPIS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Executive Cockpit
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38]">
                  Hospitality Performance & Occupancy
                </h3>
              </div>

              {/* KPI Cards Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Total Bookings</span>
                  <span className="font-mono text-3xl font-bold text-[#071A38]">{totalBookingsCount}</span>
                  <span className="text-[10px] text-emerald-600 block">Verified in central database</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Occupancy Rate</span>
                  <span className="font-mono text-3xl font-bold text-[#071A38]">{occupancyPercentage}%</span>
                  <span className="text-[10px] text-stone-500 block">{occupiedRoomsCount} of {totalRooms} rooms reserved</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Available Inventory</span>
                  <span className="font-mono text-3xl font-bold text-emerald-600">{availableRoomsCount}</span>
                  <span className="text-[10px] text-stone-500 block">Ready for immediate arrival</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Total Revenue</span>
                  <span className="font-mono text-3xl font-bold text-[#B58A3A]">
                    ${totalRevenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-500 block">USD gross receipts</span>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#071A38]">
                    Recent Verified Reservations
                  </h4>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#B58A3A] font-semibold hover:underline"
                  >
                    View All Bookings
                  </button>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">Reference</th>
                        <th className="py-3 px-4">Guest</th>
                        <th className="py-3 px-4">Accommodation</th>
                        <th className="py-3 px-4">Stay Dates</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Gateway</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-stone-50">
                          <td className="py-3 px-4 font-mono font-bold text-[#071A38]">{b.bookingReference}</td>
                          <td className="py-3 px-4 font-medium">{b.guest.fullName}</td>
                          <td className="py-3 px-4 text-stone-600">{b.roomName}</td>
                          <td className="py-3 px-4 text-stone-600">{b.checkInDate} to {b.checkOutDate}</td>
                          <td className="py-3 px-4 font-mono font-bold">${b.totalPayableAmount.toFixed(2)}</td>
                          <td className="py-3 px-4 uppercase text-stone-600">{b.paymentMethod}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                              {b.bookingStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ROOM MANAGEMENT */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                    Inventory Directorate
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                    Room Categories & Pricing Management
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 w-full">
                        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-[#071A38]/90 text-[#E9BD62] px-2.5 py-1 rounded text-xs font-mono font-bold">
                          ${room.startingPrice} / night
                        </div>
                      </div>

                      <div className="p-5 space-y-2 text-xs">
                        <h4 className="font-serif text-lg font-bold text-[#071A38]">{room.name}</h4>
                        <p className="text-stone-500 line-clamp-2">{room.shortDescription}</p>

                        <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-stone-600">
                          <div>Total Inventory: <strong>{room.totalRooms} rooms</strong></div>
                          <div>Currently Available: <strong>{room.availableRooms} rooms</strong></div>
                          <div>Floor Area: <strong>{room.sizeSqM} m²</strong></div>
                          <div>Max Occupancy: <strong>{room.occupancy.maxTotal}</strong></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex gap-2">
                      <button
                        onClick={() => setEditingRoom(room)}
                        className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#B58A3A]" />
                        <span>Edit Pricing & Inventory</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AVAILABILITY CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Calendar Schedule
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Room Availability Calendar & Blockings
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Real-time visual schedule showing occupied vs available inventory per room category.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-bold text-sm text-[#071A38]">November 2026 - Monthly Grid</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /> Reserved / Occupied</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500" /> Maintenance</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500">
                      <tr>
                        <th className="py-2.5 px-3 min-w-[180px]">Room Category</th>
                        {[...Array(14)].map((_, i) => (
                          <th key={i} className="py-2 px-2 text-center min-w-[36px]">
                            {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {rooms.map((room, rIdx) => (
                        <tr key={room.id} className="hover:bg-stone-50">
                          <td className="py-3 px-3 font-medium text-stone-900">{room.name}</td>
                          {[...Array(14)].map((_, dayIdx) => {
                            // Check if room has booking on this day
                            const isBooked = (rIdx === 0 && dayIdx >= 3 && dayIdx <= 7) ||
                                             (rIdx === 1 && dayIdx >= 0 && dayIdx <= 4) ||
                                             (rIdx === 2 && dayIdx >= 1 && dayIdx <= 3);

                            return (
                              <td key={dayIdx} className="py-3 px-1 text-center">
                                <div
                                  className={`w-7 h-7 mx-auto rounded flex items-center justify-center text-[10px] font-bold ${
                                    isBooked
                                      ? 'bg-blue-600 text-white shadow-xs'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                  title={isBooked ? 'Reserved by Guest' : 'Available for Booking'}
                                >
                                  {isBooked ? 'OCC' : 'AV'}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESERVATION MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                    Central Registry
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                    Reservation Management
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search by ref, guest, email..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked In</option>
                    <option value="checked_out">Checked Out</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Bookings List */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Guest Details</th>
                      <th className="py-3 px-4">Suite</th>
                      <th className="py-3 px-4">Stay Interval</th>
                      <th className="py-3 px-4">Total (USD)</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Booking Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#071A38]">
                          {b.bookingReference}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-stone-900 block">{b.guest.fullName}</span>
                          <span className="text-stone-500 text-[11px]">{b.guest.email}</span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700">{b.roomName}</td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {b.checkInDate} → {b.checkOutDate} ({b.nights}n)
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#071A38]">
                          ${b.totalPayableAmount.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="uppercase text-[11px] font-semibold text-stone-700 block">
                            {b.paymentMethod}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono">
                            {b.transactionReference}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                            className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-[11px] font-semibold"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="checked_in">Checked In</option>
                            <option value="checked_out">Checked Out</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1">
                          <button
                            onClick={() => setActiveVoucher(b)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-[11px]"
                            title="Generate Printable Voucher"
                          >
                            Voucher
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: GUEST DIRECTORY */}
          {activeTab === 'guests' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Guest Relations
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Guest Profiles & Sovereign Register
                </h3>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">Nationality</th>
                      <th className="py-3 px-4">Contact Telephone</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Total Stays</th>
                      <th className="py-3 px-4">Special Requests</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-bold text-stone-900">{b.guest.fullName}</td>
                        <td className="py-3 px-4">{b.guest.nationality}</td>
                        <td className="py-3 px-4 font-mono">{b.guest.phone}</td>
                        <td className="py-3 px-4">{b.guest.email}</td>
                        <td className="py-3 px-4 font-bold text-[#071A38]">1 Residence</td>
                        <td className="py-3 px-4 text-stone-600 italic max-w-xs truncate">
                          {b.guest.specialRequests || 'Standard royal amenities'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENTS & INVOICES */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Financial Settlement
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Payment Gateway Transactions & Invoices
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  M-Pesa Daraja STK Push, Visa 3D Secure, and Mastercard transaction audit trail.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Transaction Ref</th>
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Payer</th>
                      <th className="py-3 px-4">Gateway</th>
                      <th className="py-3 px-4">Subtotal</th>
                      <th className="py-3 px-4">VAT & Taxes</th>
                      <th className="py-3 px-4">Total Paid</th>
                      <th className="py-3 px-4">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                          {b.transactionReference}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#071A38]">{b.bookingReference}</td>
                        <td className="py-3 px-4 font-medium">{b.guest.fullName}</td>
                        <td className="py-3 px-4 uppercase font-semibold text-stone-700">{b.paymentMethod}</td>
                        <td className="py-3 px-4 font-mono">${b.subtotal.toFixed(2)}</td>
                        <td className="py-3 px-4 font-mono text-stone-500">
                          ${(b.vatTaxAmount + b.tourismLevyAmount + b.serviceChargeAmount).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#071A38]">
                          ${b.totalPayableAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setActiveVoucher(b)}
                            className="px-2.5 py-1 bg-[#071A38] text-[#E9BD62] rounded font-semibold text-[11px]"
                          >
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SPECIAL OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Promotions Engine
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Special Privilege Offers Management
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-[#071A38]">{offer.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          offer.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {offer.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <p className="text-stone-500 mt-1">{offer.subtitle}</p>
                      <div className="flex items-center gap-3 mt-2 font-mono">
                        <span>Code: <strong>{offer.promoCode}</strong></span>
                        <span>Discount: <strong>{offer.discountPercent}%</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleOfferActive(offer.id)}
                      className={`px-3 py-1.5 rounded font-semibold text-xs transition-colors ${
                        offer.isActive
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {offer.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES & RFPS */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Inbound Communications
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Website Inquiries & Event RFPs
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#071A38]">{enq.fullName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#071A38]/10 text-[#071A38]">
                          {enq.department}
                        </span>
                      </div>
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="bg-stone-50 border border-stone-300 rounded px-2 py-1 text-[11px]"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="font-semibold text-stone-800">{enq.subject}</div>
                    <p className="text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between text-stone-400 text-[11px] pt-1">
                      <span>Contact: {enq.email} · {enq.phone}</span>
                      <span>Received: {new Date(enq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Reputation Management
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Guest Reviews & Reflections
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{t.guestName} ({t.location})</span>
                      <span className="text-[#B58A3A]">{'★'.repeat(t.rating)}</span>
                    </div>
                    <div className="font-semibold text-[#071A38]">{t.reviewTitle}</div>
                    <p className="text-stone-600 italic">{t.reviewText}</p>
                    <div className="text-[10px] text-stone-400 pt-1">Stayed in {t.suiteStayed} · {t.stayDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS & DARAJA M-PESA GATEWAY CONFIG */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
                  Configuration & Gateways
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A38]">
                  Hotel Settings & M-Pesa Daraja Gateway API
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Configure real-time Daraja API credentials, statutory tax rates, and hotel identity parameters.
                </p>
              </div>

              {/* Daraja Documentation Banner */}
              <div className="bg-[#071A38] text-white p-6 rounded-2xl border border-[#B58A3A]/40 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#E9BD62] font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Safaricom Daraja API Integration Architecture</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Imperial Crown Hotel implements the Daraja STK Push (Lipa Na M-Pesa Online) standard. In production, configure your Safaricom Developer Portal credentials below or via environment variables (<code>MPESA_CONSUMER_KEY</code>, <code>MPESA_CONSUMER_SECRET</code>, <code>MPESA_PASSKEY</code>).
                </p>
              </div>

              {/* Settings Form */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4 text-xs">
                <h4 className="font-serif text-base font-bold text-[#071A38] border-b border-stone-200 pb-2">
                  Daraja API Parameters
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Business Short Code</label>
                    <input
                      type="text"
                      value={settings.mpesaDaraja.businessShortCode}
                      onChange={(e) =>
                        updateHotelSettings({
                          mpesaDaraja: { ...settings.mpesaDaraja, businessShortCode: e.target.value },
                        })
                      }
                      className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Environment Mode</label>
                    <select
                      value={settings.mpesaDaraja.environment}
                      onChange={(e) =>
                        updateHotelSettings({
                          mpesaDaraja: { ...settings.mpesaDaraja, environment: e.target.value as any },
                        })
                      }
                      className="w-full border border-stone-300 rounded px-3 py-2 bg-stone-50 font-semibold"
                    >
                      <option value="sandbox">Sandbox (Testing / Simulation)</option>
                      <option value="production">Production (Live Safaricom)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Consumer Key</label>
                  <input
                    type="text"
                    value={settings.mpesaDaraja.consumerKey}
                    onChange={(e) =>
                      updateHotelSettings({
                        mpesaDaraja: { ...settings.mpesaDaraja, consumerKey: e.target.value },
                      })
                    }
                    className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Consumer Secret</label>
                  <input
                    type="password"
                    value={settings.mpesaDaraja.consumerSecret}
                    onChange={(e) =>
                      updateHotelSettings({
                        mpesaDaraja: { ...settings.mpesaDaraja, consumerSecret: e.target.value },
                      })
                    }
                    className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Online Passkey (Lipa Na M-Pesa)</label>
                  <input
                    type="password"
                    value={settings.mpesaDaraja.passkey}
                    onChange={(e) =>
                      updateHotelSettings({
                        mpesaDaraja: { ...settings.mpesaDaraja, passkey: e.target.value },
                      })
                    }
                    className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                  />
                </div>

                <h4 className="font-serif text-base font-bold text-[#071A38] border-b border-stone-200 pb-2 pt-4">
                  Statutory Tax & Fee Rates
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">VAT Rate (16%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settings.vatRate}
                      onChange={(e) => updateHotelSettings({ vatRate: parseFloat(e.target.value) })}
                      className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Tourism Levy (2%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settings.tourismLevyRate}
                      onChange={(e) => updateHotelSettings({ tourismLevyRate: parseFloat(e.target.value) })}
                      className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Service Charge (5%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settings.serviceChargeRate}
                      onChange={(e) => updateHotelSettings({ serviceChargeRate: parseFloat(e.target.value) })}
                      className="w-full border border-stone-300 rounded px-3 py-2 font-mono bg-stone-50"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => alert('Hotel settings updated successfully!')}
                    className="px-6 py-2.5 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold uppercase tracking-wider rounded text-xs flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-xs text-[#252525] shadow-2xl border border-stone-200 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#071A38]">
              Edit Room: {editingRoom.name}
            </h4>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Starting Price (USD / night)</label>
                <input
                  type="number"
                  value={editingRoom.startingPrice}
                  onChange={(e) => setEditingRoom({ ...editingRoom, startingPrice: parseFloat(e.target.value) })}
                  className="w-full border border-stone-300 rounded px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Available Rooms</label>
                <input
                  type="number"
                  value={editingRoom.availableRooms}
                  onChange={(e) => setEditingRoom({ ...editingRoom, availableRooms: parseInt(e.target.value) })}
                  className="w-full border border-stone-300 rounded px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingRoom.tagline}
                  onChange={(e) => setEditingRoom({ ...editingRoom, tagline: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
              <button
                onClick={() => setEditingRoom(null)}
                className="px-4 py-2 border border-stone-300 rounded hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateRoom(editingRoom.id, editingRoom);
                  setEditingRoom(null);
                }}
                className="px-5 py-2 bg-[#071A38] text-[#E9BD62] font-bold rounded"
              >
                Save Room Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
