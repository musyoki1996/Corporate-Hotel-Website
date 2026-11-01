/**
 * Imperial Crown Hotel - Contact Us & Concierge Desk
 * Validated inquiry form, telephone/email/address placeholders, map, WhatsApp direct link
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { submitEnquiry } = useHotel();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'reservations' as const,
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitEnquiry(form);
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setForm({
      fullName: '',
      email: '',
      phone: '',
      department: 'reservations',
      subject: '',
      message: '',
    });
  };

  const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(
    'Hello Imperial Crown Hotel Concierge, I would like to inquire regarding suite reservations.'
  )}`;

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Contact Us & Royal Concierge"
        subtitle="Our dedicated guest relations team and Les Clefs d'Or concierges are at your continuous service."
        backgroundImage={HOTEL_IMAGES.heroFacade}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Contact Us' },
        ]}
        kicker="Direct Communication"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#071A38] text-[#E9BD62] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
              Direct Telephone
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071A38]">
              Royal Concierge & Reservations
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              +1 (800) 555-ROYAL (International Toll-Free)<br />
              +254 700 000 000 (East Africa Dispatch)
            </p>
            <span className="text-[11px] text-stone-400 block pt-1">
              Available 24 Hours / 7 Days
            </span>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#071A38] text-[#E9BD62] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
              Electronic Mail
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071A38]">
              Direct Inquiries
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              reservations@imperialcrownhotel.com<br />
              concierge@imperialcrownhotel.com
            </p>
            <span className="text-[11px] text-stone-400 block pt-1">
              Guaranteed Response in 2 Hours
            </span>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#071A38] text-[#E9BD62] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block">
              Physical Location
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071A38]">
              The Royal Enclave
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Imperial Boulevard, The Royal Enclave, Private Bag 00100
            </p>
            <span className="text-[11px] text-stone-400 block pt-1">
              Helipad & VIP Porte-Cochère On-Site
            </span>
          </div>

        </div>

        {/* Form and Quick Chat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-bold block">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#071A38] font-bold mt-1">
                Send an Inquiry to Our Directorate
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Please complete the form below. Your message is dispatched securely to the relevant hotel department.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-950">
                  Message Successfully Dispatched
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out to Imperial Crown Hotel. A senior guest relations officer has been assigned to your request and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-5 py-2 bg-[#071A38] text-[#E9BD62] rounded-lg text-xs font-semibold uppercase mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (800) 555-..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Department
                    </label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value as any })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                    >
                      <option value="reservations">Suite & Room Reservations</option>
                      <option value="concierge">Royal Concierge & Limousines</option>
                      <option value="dining">Private Dining & Sommeliers</option>
                      <option value="events">Events, Galas & Summits</option>
                      <option value="general">General Management</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please provide dates, specific requirements, or flight details..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#B58A3A]" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Official Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: WhatsApp & Google Maps Embed */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Link */}
            <div className="bg-[#071A38] text-white p-6 sm:p-8 rounded-3xl border border-[#B58A3A]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E9BD62] font-bold block">
                    Instant Messaging
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white">
                    WhatsApp Royal Concierge
                  </h4>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                Connect directly with our 24/7 duty concierge via WhatsApp for rapid replies regarding table bookings, chauffeur dispatch, or room availability.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+254 700 000 000)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Interactive Map Visual Container */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg">
              <div className="relative h-64 w-full bg-stone-200 flex items-center justify-center overflow-hidden">
                <img
                  src={HOTEL_IMAGES.hotelCourtyard}
                  alt="Imperial Crown Hotel Location Map View"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-[#071A38]/50 flex flex-col items-center justify-center p-4 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-[#B58A3A] text-[#071A38] flex items-center justify-center mb-2 shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-white">
                    Imperial Crown Hotel
                  </h5>
                  <span className="text-xs text-white/80 mt-0.5">
                    Imperial Boulevard, The Royal Enclave
                  </span>
                  <div className="mt-3 bg-white/20 px-3 py-1 rounded text-[11px] font-mono backdrop-blur-sm">
                    GPS Coordinates: -1.286389, 36.817223
                  </div>
                </div>
              </div>

              <div className="p-4 text-xs text-stone-500 flex justify-between items-center bg-stone-50">
                <span>Airport Distance: 18 Minutes via Chauffeur</span>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-[#B58A3A] font-semibold hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Transport FAQs</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
