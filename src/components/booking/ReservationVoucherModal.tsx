/**
 * Imperial Crown Hotel - Official Reservation Voucher Modal
 * Generates an elegant, printable royal reservation voucher with full financial breakdown,
 * booking reference, guest details, and check-in instructions.
 */

import React from 'react';
import { X, Printer, CheckCircle, MapPin, Calendar, Clock, CreditCard, Shield, Download } from 'lucide-react';
import { BookingRecord } from '../../types/hotel';
import { HOTEL_IMAGES } from '../../data/hotelData';

interface ReservationVoucherModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
}

export const ReservationVoucherModal: React.FC<ReservationVoucherModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-[#B58A3A]/40 text-[#252525] animate-scaleUp">
        
        {/* Header Ribbon */}
        <div className="bg-[#071A38] text-white px-6 sm:px-8 py-6 relative border-b border-[#B58A3A]/40">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close Voucher"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={HOTEL_IMAGES.logo}
                alt="Imperial Crown Hotel Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="font-serif text-xl tracking-wider text-white">IMPERIAL CROWN HOTEL</h3>
                <span className="text-[10px] tracking-[0.25em] text-[#E9BD62] uppercase font-light">
                  Official Royal Reservation Voucher
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-white/60 uppercase tracking-widest">Booking Reference</div>
              <div className="font-mono text-lg font-bold text-[#E9BD62] tracking-wider">
                {booking.bookingReference}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Confirmed & Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Body (Printable Area) */}
        <div className="p-6 sm:p-8 space-y-6 text-sm" id="printable-voucher">
          
          {/* Welcome Announcement */}
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider">Distinguished Guest</p>
              <h4 className="font-serif text-xl text-[#071A38] font-bold">
                {booking.guest.fullName}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Nationality: {booking.guest.nationality} · Email: {booking.guest.email} · Phone: {booking.guest.phone}
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6 text-xs text-stone-500">
              <p>Issue Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <p>Hotel Status: 5-Star Luxury</p>
            </div>
          </div>

          {/* Stay & Room Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8F6F1] p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Check-In</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{booking.checkInDate}</span>
              <span className="text-[11px] text-stone-500">From 15:00</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Check-Out</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{booking.checkOutDate}</span>
              <span className="text-[11px] text-stone-500">Until 12:00</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Duration</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{booking.nights} Night(s)</span>
              <span className="text-[11px] text-stone-500">{booking.roomsCount} Suite / Room</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Occupancy</span>
              <span className="font-semibold text-stone-900 block mt-0.5">
                {booking.adults} Adults {booking.children > 0 ? `, ${booking.children} Child` : ''}
              </span>
              <span className="text-[11px] text-stone-500">All registered</span>
            </div>
          </div>

          {/* Room Category Specification */}
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#B58A3A] font-semibold uppercase tracking-wider">
                Confirmed Accommodation
              </span>
              <h5 className="font-serif text-lg font-bold text-[#071A38]">
                {booking.roomName}
              </h5>
              <p className="text-xs text-stone-500 mt-1">
                Complimentary 24-hour butler assistance, high-speed Wi-Fi, and welcome champagne.
              </p>
            </div>
            <div className="text-right sm:shrink-0">
              <span className="text-xs text-stone-500 block">Nightly Rate</span>
              <span className="font-mono text-base font-bold text-[#071A38]">
                ${booking.roomRatePerNight.toLocaleString()} <span className="text-xs font-normal">/ night</span>
              </span>
            </div>
          </div>

          {/* Special Requests if any */}
          {booking.guest.specialRequests && (
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-xs">
              <span className="font-semibold text-amber-900 uppercase tracking-wider block mb-0.5">
                Special Requests Logged
              </span>
              <p className="text-amber-800">{booking.guest.specialRequests}</p>
            </div>
          )}

          {/* Financial Breakdown Table */}
          <div>
            <h6 className="font-serif text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
              Itemized Financial Breakdown
            </h6>
            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <div className="flex justify-between py-2 px-4 bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                <span>Description</span>
                <span>Amount (USD)</span>
              </div>
              <div className="flex justify-between py-2 px-4 border-b border-stone-100">
                <span className="text-stone-700">
                  Room Rate ({booking.nights} nights × {booking.roomsCount} room)
                </span>
                <span className="font-mono font-medium">${booking.subtotal.toFixed(2)}</span>
              </div>
              {booking.discountAmount && booking.discountAmount > 0 && (
                <div className="flex justify-between py-2 px-4 border-b border-stone-100 text-emerald-700 bg-emerald-50/40">
                  <span>Special Privilege Promo Discount ({booking.promoCodeApplied})</span>
                  <span className="font-mono font-medium">-${booking.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 px-4 border-b border-stone-100 text-stone-600">
                <span>Value Added Tax (VAT 16%)</span>
                <span className="font-mono">${booking.vatTaxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 px-4 border-b border-stone-100 text-stone-600">
                <span>National Tourism Training Levy (2%)</span>
                <span className="font-mono">${booking.tourismLevyAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 px-4 border-b border-stone-100 text-stone-600">
                <span>Discretionary Hotel Service Charge (5%)</span>
                <span className="font-mono">${booking.serviceChargeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 px-4 bg-[#071A38]/5 font-bold text-sm text-[#071A38]">
                <span>Total Amount Paid</span>
                <span className="font-mono text-base text-[#B58A3A]">
                  ${booking.totalPayableAmount.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* Payment & Security Clearance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Payment Method</span>
              <span className="font-semibold text-stone-900 block mt-0.5 uppercase">
                {booking.paymentMethod === 'mpesa'
                  ? 'M-Pesa Daraja STK Push'
                  : booking.paymentMethod === 'visa'
                  ? 'Visa Card Verified'
                  : booking.paymentMethod === 'mastercard'
                  ? 'Mastercard SecureCode'
                  : 'Direct Bank Wire'}
              </span>
              <span className="font-mono text-stone-600 text-[11px] mt-0.5 block">
                Ref: {booking.transactionReference}
              </span>
            </div>
            <div>
              <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Verification & Policy</span>
              <span className="text-stone-700 block mt-0.5">
                Official electronic voucher issued by Imperial Crown Hotel. Free cancellation up to 48 hours prior to arrival.
              </span>
            </div>
          </div>

          {/* Hotel Location & Instructions */}
          <div className="text-[11px] text-stone-500 border-t border-stone-200 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Imperial Boulevard, The Royal Enclave · Concierge: +1 (800) 555-ROYAL</span>
            <span className="font-serif italic text-stone-700">Experience the Royal Standard</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-stone-100 px-6 sm:px-8 py-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-500 hidden sm:block">
            Please present this voucher or reference upon check-in.
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4 text-[#B58A3A]" />
              <span>Print Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#071A38] text-[#E9BD62] text-xs font-semibold uppercase tracking-wider hover:bg-[#0c2752] transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
