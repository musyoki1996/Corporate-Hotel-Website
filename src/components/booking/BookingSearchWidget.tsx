/**
 * Imperial Crown Hotel - Integrated Reservation Search Widget
 * Check-in, Check-out, Adults, Children, Rooms, and Check Availability Action
 */

import React from 'react';
import { Calendar, Users, Home, Search, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

interface BookingSearchWidgetProps {
  onSearchSubmit?: () => void;
  variant?: 'floating' | 'embedded';
}

export const BookingSearchWidget: React.FC<BookingSearchWidgetProps> = ({
  onSearchSubmit,
  variant = 'floating',
}) => {
  const { searchParams, setSearchParams, setIsBookingModalOpen } = useHotel();

  const handleInputChange = (field: string, value: any) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div
      className={`w-full ${
        variant === 'floating'
          ? 'bg-[#071A38]/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-[#B58A3A]/40'
          : 'bg-[#071A38] rounded-xl p-6 border border-[#B58A3A]/30'
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* Check-In Date */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#E9BD62] font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B58A3A]" />
              <span>Check-In Date</span>
            </label>
            <input
              type="date"
              required
              value={searchParams.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#B58A3A] transition-colors"
            />
          </div>

          {/* Check-Out Date */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#E9BD62] font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B58A3A]" />
              <span>Check-Out Date</span>
            </label>
            <input
              type="date"
              required
              value={searchParams.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#B58A3A] transition-colors"
            />
          </div>

          {/* Adults & Children */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#E9BD62] font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B58A3A]" />
              <span>Guests</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={searchParams.adults}
                onChange={(e) => handleInputChange('adults', parseInt(e.target.value, 10))}
                className="w-full bg-[#071A38] border border-white/20 rounded-lg px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B58A3A]"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>

              <select
                value={searchParams.children}
                onChange={(e) => handleInputChange('children', parseInt(e.target.value, 10))}
                className="w-full bg-[#071A38] border border-white/20 rounded-lg px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B58A3A]"
              >
                <option value={0}>0 Kids</option>
                <option value={1}>1 Kid</option>
                <option value={2}>2 Kids</option>
                <option value={3}>3 Kids</option>
              </select>
            </div>
          </div>

          {/* Number of Rooms */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#E9BD62] font-medium flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#B58A3A]" />
              <span>Rooms</span>
            </label>
            <select
              value={searchParams.roomsCount}
              onChange={(e) => handleInputChange('roomsCount', parseInt(e.target.value, 10))}
              className="w-full bg-[#071A38] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#B58A3A]"
            >
              <option value={1}>1 Suite / Room</option>
              <option value={2}>2 Suites / Rooms</option>
              <option value={3}>3 Suites / Rooms</option>
              <option value={4}>4 Suites / Rooms</option>
            </select>
          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#B58A3A]/20"
            >
              <Search className="w-4 h-4 text-[#071A38]" />
              <span className="whitespace-nowrap">Check Availability</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
