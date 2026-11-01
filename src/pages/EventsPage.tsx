/**
 * Imperial Crown Hotel - Events & Conferences Page
 * Grand ballrooms, diplomatic boardrooms, capacity charts, and interactive RFP form
 */

import React, { useState } from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES, EVENT_FACILITIES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import { Users, Maximize2, Check, Send, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { submitEnquiry } = useHotel();
  const [rfpForm, setRfpForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    eventType: 'Corporate Conference / Summit',
    attendees: '100 - 300 Guests',
    targetDate: '2026-11-20',
    details: '',
  });
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRfpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitEnquiry({
      fullName: rfpForm.fullName,
      email: rfpForm.email,
      phone: rfpForm.phone,
      department: 'events',
      subject: `RFP: ${rfpForm.eventType} (${rfpForm.company})`,
      message: `Event: ${rfpForm.eventType} | Company: ${rfpForm.company} | Attendees: ${rfpForm.attendees} | Target Date: ${rfpForm.targetDate} | Details: ${rfpForm.details}`,
    });
    setIsSubmitting(false);
    setRfpSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Events & Sovereign Conferences"
        subtitle="Diplomatic summits, executive retreats, and gala banquets hosted in 2,500 m² of neoclassical splendour."
        backgroundImage={HOTEL_IMAGES.grandBallroom}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Events & Conferences' },
        ]}
        kicker="Palatial Venues & Banquets"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block">
            The Sovereign Standard for Business
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#071A38] font-medium leading-tight">
            Where International Leaders Assemble.
          </h2>
          <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From high-stakes bilateral diplomatic negotiations to product launches and state dinners, Imperial Crown Hotel combines timeless architectural prestige with high-definition audiovisual capabilities and dedicated banqueting staff.
          </p>
        </div>

        {/* Venues & Capacity Cards */}
        <div className="space-y-12">
          {EVENT_FACILITIES.map((facility, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={facility.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Photo */}
                <div
                  className={`lg:col-span-6 relative h-72 sm:h-96 lg:h-auto overflow-hidden ${
                    isReversed ? 'lg:order-last' : ''
                  }`}
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#071A38]/90 text-[#E9BD62] px-3 py-1.5 rounded-lg border border-[#B58A3A]/30 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                    {facility.type}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38]">
                      {facility.name}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-3">
                      {facility.description}
                    </p>

                    {/* Capacity Specs */}
                    <div className="grid grid-cols-4 gap-2 bg-[#F8F6F1] p-3.5 rounded-xl border border-stone-200 text-xs mt-4 text-center">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Area</span>
                        <span className="font-bold text-stone-800">{facility.areaSqM} m²</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Banquet</span>
                        <span className="font-bold text-stone-800">{facility.capacityBanquets}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Cocktail</span>
                        <span className="font-bold text-stone-800">{facility.capacityCocktail}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Theatre</span>
                        <span className="font-bold text-stone-800">{facility.capacityTheatre}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                        Technical Inclusions & Highlights
                      </span>
                      {facility.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#B58A3A] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#rfp-form-section"
                      className="w-full py-2.5 rounded bg-[#071A38] hover:bg-[#0c2752] text-[#E9BD62] text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Inquire About {facility.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Request for Proposal (RFP) Form */}
        <div id="rfp-form-section" className="bg-[#071A38] text-white rounded-3xl p-8 sm:p-14 border border-[#B58A3A]/40 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-bold block mb-1">
              Event Planning
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Submit a Request for Proposal (RFP)
            </h3>
            <div className="w-16 h-0.5 bg-[#B58A3A] mx-auto my-3 rounded-full" />
            <p className="text-white/70 text-xs sm:text-sm">
              Our Senior Banqueting & Protocol Directors will prepare a customized proposal with floor plans, culinary tastings, and group accommodations within 24 hours.
            </p>
          </div>

          {rfpSubmitted ? (
            <div className="bg-white/10 p-8 rounded-2xl border border-white/20 text-center max-w-lg mx-auto space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#E9BD62] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-white">Proposal Request Transmitted</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Thank you, {rfpForm.fullName}. Your RFP has been logged directly with our Executive Events Directorate. A dedicated Event Coordinator will contact you via {rfpForm.email} shortly.
              </p>
              <button
                onClick={() => setRfpSubmitted(false)}
                className="px-6 py-2 bg-[#B58A3A] text-[#071A38] rounded-lg text-xs uppercase font-bold mt-2"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRfpSubmit} className="max-w-2xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 block mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ambassador / Director Name"
                    value={rfpForm.fullName}
                    onChange={(e) => setRfpForm({ ...rfpForm, fullName: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>
                <div>
                  <label className="text-white/80 block mb-1 font-medium">Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="director@organization.com"
                    value={rfpForm.email}
                    onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 block mb-1 font-medium">Telephone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555... / +254 7..."
                    value={rfpForm.phone}
                    onChange={(e) => setRfpForm({ ...rfpForm, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>
                <div>
                  <label className="text-white/80 block mb-1 font-medium">Organization / Entity</label>
                  <input
                    type="text"
                    placeholder="Corporation, Embassy or Society"
                    value={rfpForm.company}
                    onChange={(e) => setRfpForm({ ...rfpForm, company: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-white/80 block mb-1 font-medium">Event Category</label>
                  <select
                    value={rfpForm.eventType}
                    onChange={(e) => setRfpForm({ ...rfpForm, eventType: e.target.value })}
                    className="w-full bg-[#071A38] border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  >
                    <option value="Corporate Conference">Corporate Conference</option>
                    <option value="Diplomatic Summit">Diplomatic Summit</option>
                    <option value="Royal Wedding / Gala">Royal Wedding / Gala</option>
                    <option value="Executive Board Meeting">Executive Board Meeting</option>
                    <option value="Banqueting Banquet">Banqueting Banquet</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/80 block mb-1 font-medium">Estimated Guests</label>
                  <select
                    value={rfpForm.attendees}
                    onChange={(e) => setRfpForm({ ...rfpForm, attendees: e.target.value })}
                    className="w-full bg-[#071A38] border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#B58A3A]"
                  >
                    <option value="Up to 50">Up to 50 Guests</option>
                    <option value="50 - 150">50 - 150 Guests</option>
                    <option value="150 - 350">150 - 350 Guests</option>
                    <option value="350 - 800+">350 - 800+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/80 block mb-1 font-medium">Target Date</label>
                  <input
                    type="date"
                    value={rfpForm.targetDate}
                    onChange={(e) => setRfpForm({ ...rfpForm, targetDate: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/80 block mb-1 font-medium">Event Requirements & Program Details</label>
                <textarea
                  rows={3}
                  placeholder="Audiovisual requirements, VIP suite blocks, dietary mandates..."
                  value={rfpForm.details}
                  onChange={(e) => setRfpForm({ ...rfpForm, details: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B58A3A]"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-bold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting RFP...' : 'Submit Official RFP'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
