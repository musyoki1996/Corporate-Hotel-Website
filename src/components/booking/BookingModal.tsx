/**
 * Imperial Crown Hotel - Complete 7-Step Hotel Booking Engine
 * Strict availability validation, live pricing calculation, and multi-gateway payment integration
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Tag,
  Loader2,
  Lock,
  Sparkles,
  Printer,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { RoomCategory, PaymentMethod, BookingRecord } from '../../types/hotel';
import { HOTEL_IMAGES } from '../../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
}) => {
  const {
    rooms,
    searchParams,
    setSearchParams,
    checkRoomAvailability,
    calculateBookingCost,
    createBooking,
    setActiveVoucher,
  } = useHotel();

  // Current Step: 1 to 7
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoomId || rooms[0]?.id || ''
  );

  // Guest details form state
  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: 'United States',
    specialRequests: '',
    dietaryPreferences: '',
    estimatedArrival: '15:00',
  });

  // Add-on amenities selected
  const [addOns, setAddOns] = useState<{
    airportChauffeur: boolean;
    champagneArrival: boolean;
    spaDayPass: boolean;
  }>({
    airportChauffeur: false,
    champagneArrival: false,
    spaDayPass: false,
  });

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Payment states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('+254712345678');
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '888',
  });

  // Transaction processing states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmedBookingRecord, setConfirmedBookingRecord] = useState<BookingRecord | null>(null);

  // Sync preSelectedRoomId when modal opens
  useEffect(() => {
    if (preSelectedRoomId) {
      setSelectedRoomId(preSelectedRoomId);
      setCurrentStep(2);
    }
  }, [preSelectedRoomId, isOpen]);

  if (!isOpen) return null;

  // Calculate nights
  const checkInTime = new Date(searchParams.checkIn).getTime();
  const checkOutTime = new Date(searchParams.checkOut).getTime();
  const nights = Math.max(1, Math.round((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24)));

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Financial calculations
  const costs = calculateBookingCost(
    selectedRoom.id,
    nights,
    searchParams.roomsCount,
    appliedPromo || undefined
  );

  // Add-ons cost calculation
  const addOnsTotal =
    (addOns.airportChauffeur ? 120 : 0) +
    (addOns.champagneArrival ? 85 : 0) +
    (addOns.spaDayPass ? 150 : 0);

  const finalTotalAmount = parseFloat((costs.total + addOnsTotal).toFixed(2));

  // Step 1 to Step 2 validation
  const handleProceedFromSearch = () => {
    if (checkOutTime <= checkInTime) {
      alert('Please select a check-out date that is after your check-in date.');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2 room selection
  const handleSelectRoom = (room: RoomCategory) => {
    const avail = checkRoomAvailability(room.id, searchParams.checkIn, searchParams.checkOut);
    if (!avail.available) {
      alert(avail.reason || 'This royal category is fully booked for the selected dates.');
      return;
    }
    setSelectedRoomId(room.id);
    setCurrentStep(3);
  };

  // Step 4 guest info submission
  const handleProceedGuestDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestForm.fullName || !guestForm.email || !guestForm.phone) {
      alert('Please fill in your name, email and contact telephone.');
      return;
    }
    setCurrentStep(5);
  };

  // Apply promo code
  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    setAppliedPromo(promoCodeInput.trim().toUpperCase());
  };

  // Final Payment & Confirmation Execution
  const handleExecutePayment = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // Simulate gateway verification
      if (selectedPaymentMethod === 'mpesa') {
        setMpesaPromptSent(true);
        // Simulate Daraja STK Push processing delay
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Generate transaction reference
      const txnRef =
        selectedPaymentMethod === 'mpesa'
          ? `MPESA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          : selectedPaymentMethod === 'visa'
          ? `TXN-VISA-${Math.floor(100000 + Math.random() * 900000)}`
          : selectedPaymentMethod === 'mastercard'
          ? `TXN-MC-${Math.floor(100000 + Math.random() * 900000)}`
          : `SWIFT-WIRE-${Math.floor(100000 + Math.random() * 900000)}`;

      // Record booking with backend double-booking validation
      const confirmed = await createBooking({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        roomCategory: selectedRoom.category,
        checkInDate: searchParams.checkIn,
        checkOutDate: searchParams.checkOut,
        nights,
        adults: searchParams.adults,
        children: searchParams.children,
        roomsCount: searchParams.roomsCount,
        guest: {
          fullName: guestForm.fullName,
          email: guestForm.email,
          phone: guestForm.phone,
          nationality: guestForm.nationality,
          specialRequests: [
            guestForm.specialRequests,
            addOns.airportChauffeur ? 'Add-on: Airport Chauffeur ($120)' : '',
            addOns.champagneArrival ? 'Add-on: Champagne on Arrival ($85)' : '',
            addOns.spaDayPass ? 'Add-on: Spa Hydrotherapy Day Pass ($150)' : '',
          ]
            .filter(Boolean)
            .join(' | '),
          dietaryPreferences: guestForm.dietaryPreferences,
          estimatedArrival: guestForm.estimatedArrival,
        },
        roomRatePerNight: selectedRoom.startingPrice,
        subtotal: costs.subtotal,
        vatTaxAmount: costs.vat,
        tourismLevyAmount: costs.tourismLevy,
        serviceChargeAmount: costs.serviceCharge,
        totalPayableAmount: finalTotalAmount,
        currency: 'USD',
        promoCodeApplied: appliedPromo || undefined,
        discountAmount: costs.discount,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: 'completed',
        transactionReference: txnRef,
        mpesaPhoneNumber: selectedPaymentMethod === 'mpesa' ? mpesaPhone : undefined,
        cardLastFour: selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard' ? '4242' : undefined,
        bookingStatus: 'confirmed',
      });

      setConfirmedBookingRecord(confirmed);
      setCurrentStep(7);
    } catch (err: any) {
      setPaymentError(err.message || 'Payment verification failed. Please try another method.');
    } finally {
      setIsProcessingPayment(false);
      setMpesaPromptSent(false);
    }
  };

  const stepLabels = [
    'Dates',
    'Rooms',
    'Customise',
    'Guest Details',
    'Review',
    'Payment',
    'Confirmed',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#F8F6F1] text-[#252525] rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-[#B58A3A]/40 flex flex-col max-h-[92vh] animate-scaleUp">
        
        {/* Modal Top Bar */}
        <div className="bg-[#071A38] text-white px-6 py-4 border-b border-[#B58A3A]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={HOTEL_IMAGES.logo}
              alt="Imperial Crown Hotel Logo"
              className="h-9 w-auto object-contain"
            />
            <div>
              <h3 className="font-serif text-base sm:text-lg text-white font-medium">
                Reserve Your Royal Accommodation
              </h3>
              <span className="text-[10px] tracking-widest text-[#E9BD62] uppercase block">
                Step {currentStep} of 7: {stepLabels[currentStep - 1]}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper Bar */}
        <div className="bg-stone-200/80 px-6 py-2.5 overflow-x-auto shrink-0 border-b border-stone-300">
          <div className="flex items-center justify-between min-w-[560px] gap-2 text-xs">
            {stepLabels.map((lbl, idx) => {
              const stepNumber = idx + 1;
              const isPast = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              return (
                <div key={idx} className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isPast
                        ? 'bg-[#071A38] text-[#E9BD62]'
                        : isCurrent
                        ? 'bg-[#B58A3A] text-[#071A38]'
                        : 'bg-stone-300 text-stone-600'
                    }`}
                  >
                    {isPast ? '✓' : stepNumber}
                  </span>
                  <span
                    className={`text-[11px] whitespace-nowrap ${
                      isCurrent
                        ? 'font-bold text-[#071A38]'
                        : isPast
                        ? 'text-stone-700 font-medium'
                        : 'text-stone-400'
                    }`}
                  >
                    {lbl}
                  </span>
                  {idx < stepLabels.length - 1 && (
                    <span className="text-stone-300 mx-1">·</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Search Parameters */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Step 1: Check Availability
                </span>
                <h4 className="font-serif text-2xl text-[#071A38] font-bold mt-1">
                  Select Your Dates & Party Size
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Choose your arrival and departure dates to view verified room inventory.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={searchParams.checkIn}
                      onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Adults
                    </label>
                    <select
                      value={searchParams.adults}
                      onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Children
                    </label>
                    <select
                      value={searchParams.children}
                      onChange={(e) => setSearchParams({ ...searchParams, children: parseInt(e.target.value) })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50"
                    >
                      <option value={0}>None</option>
                      <option value={1}>1 Child</option>
                      <option value={2}>2 Children</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Rooms
                    </label>
                    <select
                      value={searchParams.roomsCount}
                      onChange={(e) => setSearchParams({ ...searchParams, roomsCount: parseInt(e.target.value) })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50"
                    >
                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedFromSearch}
                  className="px-6 py-3 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider hover:bg-[#0c2752] transition-colors flex items-center gap-2 shadow-md"
                >
                  <span>View Available Rooms</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Display Available Rooms */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <h4 className="font-serif text-xl text-[#071A38] font-bold">
                    Available Suites & Accommodations
                  </h4>
                  <p className="text-xs text-stone-600">
                    {nights} Night(s) · {searchParams.checkIn} to {searchParams.checkOut} · {searchParams.adults} Guests
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#B58A3A] hover:underline flex items-center gap-1 font-medium"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Modify Dates</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => {
                  const avail = checkRoomAvailability(room.id, searchParams.checkIn, searchParams.checkOut);
                  const isSelected = room.id === selectedRoomId;

                  return (
                    <div
                      key={room.id}
                      className={`bg-white rounded-xl border overflow-hidden shadow-sm transition-all flex flex-col ${
                        isSelected
                          ? 'border-[#B58A3A] ring-2 ring-[#B58A3A]/30'
                          : 'border-stone-200 hover:border-[#B58A3A]/60'
                      }`}
                    >
                      <div className="relative h-44 w-full">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[#071A38]/90 text-[#E9BD62] px-2.5 py-1 rounded text-[11px] font-mono font-bold backdrop-blur-sm">
                          ${room.startingPrice} <span className="text-[9px] font-normal text-white">/ night</span>
                        </div>
                        {avail.remainingRooms <= 2 && avail.remainingRooms > 0 && (
                          <div className="absolute bottom-2 left-2 bg-amber-500/90 text-white px-2 py-0.5 rounded text-[10px] font-medium">
                            Only {avail.remainingRooms} left
                          </div>
                        )}
                        {!avail.available && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-xs">
                            Sold Out For Selected Dates
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h5 className="font-serif text-base font-bold text-[#071A38]">
                            {room.name}
                          </h5>
                          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                            {room.shortDescription}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-stone-600 mt-2">
                            <span>{room.sizeSqM} m² / {room.sizeSqFt} sq ft</span>
                            <span>·</span>
                            <span>{room.bedConfiguration}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500">
                            Max {room.occupancy.maxTotal} Guests
                          </span>
                          <button
                            disabled={!avail.available}
                            onClick={() => handleSelectRoom(room)}
                            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                              avail.available
                                ? 'bg-[#071A38] text-[#E9BD62] hover:bg-[#B58A3A] hover:text-[#071A38]'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            Select Suite
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Customize Room & Add-Ons */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Step 3: Royal Enhancements
                </span>
                <h4 className="font-serif text-2xl text-[#071A38] font-bold mt-1">
                  Customise Your Experience in {selectedRoom.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Enhance your stay with our signature airport greeting, vintage champagne, or private spa sanctuary access.
                </p>
              </div>

              {/* Selected Room Summary Card */}
              <div className="bg-white p-4 rounded-xl border border-[#B58A3A]/40 flex items-center gap-4">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-24 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h5 className="font-serif text-base font-bold text-[#071A38]">{selectedRoom.name}</h5>
                  <p className="text-xs text-stone-500">{nights} Nights · ${selectedRoom.startingPrice} / night</p>
                  <p className="text-[11px] text-stone-600 mt-1">{selectedRoom.bedConfiguration}</p>
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Optional Sovereign Add-Ons
                </h5>

                <label className="flex items-center justify-between p-3.5 bg-white border border-stone-200 rounded-xl cursor-pointer hover:border-[#B58A3A] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.airportChauffeur}
                      onChange={(e) => setAddOns({ ...addOns, airportChauffeur: e.target.checked })}
                      className="w-4 h-4 text-[#B58A3A] rounded border-stone-300"
                    />
                    <div>
                      <span className="font-semibold text-xs text-stone-900 block">
                        Rolls-Royce / Maybach VIP Airport Chauffeur
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Direct terminal escort, luggage assistance, chilled refreshments in car
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#071A38]">+$120</span>
                </label>

                <label className="flex items-center justify-between p-3.5 bg-white border border-stone-200 rounded-xl cursor-pointer hover:border-[#B58A3A] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.champagneArrival}
                      onChange={(e) => setAddOns({ ...addOns, champagneArrival: e.target.checked })}
                      className="w-4 h-4 text-[#B58A3A] rounded border-stone-300"
                    />
                    <div>
                      <span className="font-semibold text-xs text-stone-900 block">
                        Chilled Grand Cru Champagne & Caviar on Arrival
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Awaits in your suite upon check-in with artisan chocolate truffles
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#071A38]">+$85</span>
                </label>

                <label className="flex items-center justify-between p-3.5 bg-white border border-stone-200 rounded-xl cursor-pointer hover:border-[#B58A3A] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.spaDayPass}
                      onChange={(e) => setAddOns({ ...addOns, spaDayPass: e.target.checked })}
                      className="w-4 h-4 text-[#B58A3A] rounded border-stone-300"
                    />
                    <div>
                      <span className="font-semibold text-xs text-stone-900 block">
                        The Grand Imperial Spa Hydrotherapy & Sauna Pass
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Unlimited access to eucalyptus steam room, thermal vitality pool, and salt lounge
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#071A38]">+$150</span>
                </label>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  Back to Rooms
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider hover:bg-[#0c2752] transition-colors flex items-center gap-1.5"
                >
                  <span>Proceed to Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Details Form */}
          {currentStep === 4 && (
            <form onSubmit={handleProceedGuestDetails} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Step 4: Guest Information
                </span>
                <h4 className="font-serif text-2xl text-[#071A38] font-bold mt-1">
                  Primary Guest Contact & Preferences
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Please provide accurate legal details matching your passport or official identification.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander Wright"
                      value={guestForm.fullName}
                      onChange={(e) => setGuestForm({ ...guestForm, fullName: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={guestForm.email}
                      onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Phone Number (International) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 555 0192 / +254 712 345678"
                      value={guestForm.phone}
                      onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Nationality / Passport Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. British, American, Kenyan, Swiss"
                      value={guestForm.nationality}
                      onChange={(e) => setGuestForm({ ...guestForm, nationality: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Estimated Arrival Time
                    </label>
                    <select
                      value={guestForm.estimatedArrival}
                      onChange={(e) => setGuestForm({ ...guestForm, estimatedArrival: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50"
                    >
                      <option value="12:00">Early Arrival (12:00 - 14:00)</option>
                      <option value="15:00">Standard Check-In (15:00 - 18:00)</option>
                      <option value="20:00">Late Arrival (18:00 - 22:00)</option>
                      <option value="00:00">Midnight Arrival (22:00 - 02:00)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Dietary Preferences
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gluten-Free, Halal, Kosher, None"
                      value={guestForm.dietaryPreferences}
                      onChange={(e) => setGuestForm({ ...guestForm, dietaryPreferences: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Special Requests & Concierge Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific floor preference, anniversary/birthday arrangements, quiet wing..."
                    value={guestForm.specialRequests}
                    onChange={(e) => setGuestForm({ ...guestForm, specialRequests: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs uppercase font-semibold tracking-wider hover:bg-[#0c2752] transition-colors flex items-center gap-1.5"
                >
                  <span>Review Reservation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Review Reservation & Pricing */}
          {currentStep === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Step 5: Review Reservation
                </span>
                <h4 className="font-serif text-2xl text-[#071A38] font-bold mt-1">
                  Summary & Itemized Charges
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Review your accommodation parameters, guest details, and statutory tax breakdown before proceeding to payment.
                </p>
              </div>

              {/* Booking Overview */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Guest</span>
                    <span className="font-bold text-stone-900 text-sm block">{guestForm.fullName}</span>
                    <span className="text-stone-600">{guestForm.email} · {guestForm.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Dates & Stay</span>
                    <span className="font-bold text-stone-900 block">{searchParams.checkIn} to {searchParams.checkOut}</span>
                    <span className="text-stone-600">{nights} Night(s) · {searchParams.roomsCount} Room · {searchParams.adults} Adults</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Selected Suite</span>
                  <span className="font-bold text-[#071A38] text-sm">{selectedRoom.name}</span>
                  <span className="text-stone-600 block">{selectedRoom.bedConfiguration} · {selectedRoom.view}</span>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-stone-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Promo Code (e.g. ROYALWEEKEND)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 uppercase text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-700 flex items-center gap-1"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#E9BD62]" />
                    <span>Apply</span>
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded flex items-center justify-between">
                    <span>Promo code <strong>{appliedPromo}</strong> applied successfully!</span>
                    <button onClick={() => setAppliedPromo(null)} className="text-red-500 underline ml-2">Remove</button>
                  </div>
                )}

                {/* Financial breakdown table */}
                <div className="border border-stone-200 rounded-lg overflow-hidden mt-3">
                  <div className="flex justify-between py-2 px-3 bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                    <span>Item</span>
                    <span>Amount</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 border-b border-stone-100">
                    <span>Accommodation ({nights} nights × ${selectedRoom.startingPrice})</span>
                    <span className="font-mono">${costs.subtotal.toFixed(2)}</span>
                  </div>
                  {costs.discount > 0 && (
                    <div className="flex justify-between py-2 px-3 border-b border-stone-100 text-emerald-700">
                      <span>Privilege Promo Discount</span>
                      <span className="font-mono">-${costs.discount.toFixed(2)}</span>
                    </div>
                  )}
                  {addOnsTotal > 0 && (
                    <div className="flex justify-between py-2 px-3 border-b border-stone-100 text-stone-700">
                      <span>Selected Sovereign Add-Ons</span>
                      <span className="font-mono">+${addOnsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 px-3 border-b border-stone-100 text-stone-500">
                    <span>Value Added Tax (16% VAT)</span>
                    <span className="font-mono">${costs.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 border-b border-stone-100 text-stone-500">
                    <span>Tourism Training Levy (2%)</span>
                    <span className="font-mono">${costs.tourismLevy.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 border-b border-stone-100 text-stone-500">
                    <span>Discretionary Hotel Service Charge (5%)</span>
                    <span className="font-mono">${costs.serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-3 px-3 bg-[#071A38] text-white font-bold text-sm">
                    <span>Total Payable Amount</span>
                    <span className="font-mono text-[#E9BD62] text-base">
                      ${finalTotalAmount.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="px-6 py-2.5 bg-[#B58A3A] text-[#071A38] font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-[#ca9c47] transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Proceed to Payment (${finalTotalAmount.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Payment Method & Gateway Integration */}
          {currentStep === 6 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Step 6: Secure Payment
                </span>
                <h4 className="font-serif text-2xl text-[#071A38] font-bold mt-1">
                  Select Your Preferred Payment Gateway
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Supported by M-Pesa Daraja STK Push, Visa, Mastercard, and International Bank Wire.
                </p>
              </div>

              {/* Payment Gateway Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('mpesa')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedPaymentMethod === 'mpesa'
                      ? 'border-[#071A38] bg-[#071A38] text-[#E9BD62] shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold block">M-Pesa Daraja</span>
                  <span className="text-[10px] opacity-75">Instant STK Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('visa')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedPaymentMethod === 'visa'
                      ? 'border-[#071A38] bg-[#071A38] text-[#E9BD62] shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-bold block">Visa Card</span>
                  <span className="text-[10px] opacity-75">3D Secure</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('mastercard')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedPaymentMethod === 'mastercard'
                      ? 'border-[#071A38] bg-[#071A38] text-[#E9BD62] shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-bold block">Mastercard</span>
                  <span className="text-[10px] opacity-75">SecureCode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('bank_wire')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedPaymentMethod === 'bank_wire'
                      ? 'border-[#071A38] bg-[#071A38] text-[#E9BD62] shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-stone-500" />
                  <span className="text-xs font-bold block">Bank Wire</span>
                  <span className="text-[10px] opacity-75">SWIFT Transfer</span>
                </button>
              </div>

              {/* Gateway Detail Panels */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 text-xs">
                {selectedPaymentMethod === 'mpesa' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-emerald-50 p-3.5 rounded-lg border border-emerald-200">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        M
                      </div>
                      <div>
                        <span className="font-bold text-emerald-950 block">M-Pesa Daraja STK Push</span>
                        <span className="text-emerald-800 text-[11px]">
                          Enter your registered Safaricom phone number. A secure PIN prompt will appear on your handset.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        Safaricom M-Pesa Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm bg-stone-50 font-mono"
                      />
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        Payload routed to Daraja API Business Short Code: <strong>174379</strong>
                      </span>
                    </div>
                  </div>
                )}

                {(selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard') && (
                  <div className="space-y-4">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name as it appears on card"
                        value={cardDetails.nameOnCard || guestForm.fullName}
                        onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="font-semibold text-stone-700 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'bank_wire' && (
                  <div className="space-y-2 bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <span className="font-bold text-[#071A38] block">Imperial Crown Hotel SWIFT Wire Instructions</span>
                    <p className="text-stone-600 text-[11px]">
                      Bank: Standard Chartered Royal Private Banking · Account: IMPERIAL CROWN HOSPITALITY LTD · SWIFT: SCBLKENX001 · IBAN/Acc: 0108 555 921004.
                    </p>
                    <span className="text-stone-500 text-[10px] block">
                      A provisional reservation reference will be generated immediately; rooms remain held for 72 hours pending funds clearance.
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted Banking Channel</span>
                  </div>
                  <div className="font-bold text-stone-900 text-sm">
                    Amount: <span className="text-[#B58A3A] font-mono">${finalTotalAmount.toFixed(2)} USD</span>
                  </div>
                </div>

                {paymentError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50 disabled:opacity-50"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleExecutePayment}
                  className="px-7 py-3 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#B58A3A]/20 disabled:opacity-75"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {selectedPaymentMethod === 'mpesa'
                          ? 'Prompting STK on Handset...'
                          : 'Verifying Security Clearance...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Authorize Payment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Booking Confirmed & Verified */}
          {currentStep === 7 && confirmedBookingRecord && (
            <div className="space-y-6 max-w-2xl mx-auto text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
                  Reservation Officially Confirmed
                </span>
                <h4 className="font-serif text-3xl text-[#071A38] font-bold mt-1">
                  Experience the Royal Standard
                </h4>
                <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                  Your reservation has been recorded in the central hotel registry and guaranteed. An official confirmation email and voucher have been transmitted to <strong>{confirmedBookingRecord.guest.email}</strong>.
                </p>
              </div>

              {/* Confirmation Reference Badge */}
              <div className="bg-[#071A38] text-white p-5 rounded-xl border border-[#B58A3A]/40 max-w-md mx-auto shadow-lg">
                <span className="text-[11px] text-white/60 uppercase tracking-widest block">
                  Official Booking Reference
                </span>
                <div className="font-mono text-2xl font-bold text-[#E9BD62] tracking-widest my-1">
                  {confirmedBookingRecord.bookingReference}
                </div>
                <div className="text-xs text-white/70 flex items-center justify-center gap-2">
                  <span>{confirmedBookingRecord.roomName}</span>
                  <span>·</span>
                  <span>{confirmedBookingRecord.checkInDate} to {confirmedBookingRecord.checkOutDate}</span>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-md mx-auto space-y-1">
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-stone-900">${confirmedBookingRecord.totalPayableAmount.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Reference:</span>
                  <span className="font-mono text-stone-800">{confirmedBookingRecord.transactionReference}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway:</span>
                  <span className="uppercase text-stone-800">{confirmedBookingRecord.paymentMethod}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveVoucher(confirmedBookingRecord);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#B58A3A] text-[#071A38] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#ca9c47] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>View & Print Official Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#071A38] text-white font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#0c2752] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
