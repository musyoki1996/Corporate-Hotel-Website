/**
 * Imperial Crown Hotel - Master Footer Component
 * Royal Navy and Gold, brand description, quick links, newsletter, and legal notices
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { HOTEL_IMAGES } from '../../data/hotelData';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubscribed(true);
    setEmailInput('');
  };

  const handleLink = (page: string, param?: string) => {
    onNavigate(page, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071A38] text-white border-t border-[#B58A3A]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B58A3A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLink('home')}>
              <img
                src={HOTEL_IMAGES.logo}
                alt="Imperial Crown Hotel Official Logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                <h3 className="font-serif text-xl tracking-wider text-white">IMPERIAL CROWN</h3>
                <span className="text-[11px] tracking-[0.25em] text-[#E9BD62] uppercase font-light">
                  HOTEL · 5 STARS
                </span>
              </div>
            </div>

            <p className="font-serif italic text-[#E9BD62] text-sm">
              Experience the Royal Standard.
            </p>

            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              A peerless international hospitality sanctuary dedicated to refined luxury, sovereign comfort, personalized bespoke service, and Michelin-caliber culinary craft.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B58A3A] shrink-0" />
                <span>Imperial Boulevard, The Royal Enclave, Private Bag 00100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B58A3A] shrink-0" />
                <span>+1 (800) 555-ROYAL / +254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B58A3A] shrink-0" />
                <span>reservations@imperialcrownhotel.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-white/[0.03] p-6 sm:p-8 rounded-xl border border-white/10">
            <span className="text-xs uppercase tracking-widest text-[#B58A3A] font-semibold">
              The Sovereign Gazette
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white mt-1">
              Join Our Private Connoisseur Circle
            </h4>
            <p className="text-sm text-white/70 mt-1 mb-5">
              Receive privileged access to private seasonal suites, sommelier tastings, and bespoke royal promotions.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-[#E9BD62] text-sm bg-[#B58A3A]/10 p-4 rounded-lg border border-[#B58A3A]/30">
                <CheckCircle2 className="w-5 h-5 text-[#E9BD62] shrink-0" />
                <span>You are now subscribed to The Sovereign Gazette. Welcome to our private circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your personal email address..."
                  className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#B58A3A] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#B58A3A] hover:bg-[#ca9c47] text-[#071A38] font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[11px] text-white/40 mt-3">
              We respect your confidentiality. Unsubscribe at any time. View our Privacy Policy.
            </span>
          </div>

        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          
          {/* Col 1: Explore */}
          <div>
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#E9BD62] mb-4">
              Explore Hotel
            </h5>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-[#E9BD62] transition-colors">
                  About Imperial Crown
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms')} className="hover:text-[#E9BD62] transition-colors">
                  Suites & Accommodations
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('dining')} className="hover:text-[#E9BD62] transition-colors">
                  Restaurants & Lounges
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('amenities')} className="hover:text-[#E9BD62] transition-colors">
                  Spa & Wellness Sanctuary
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('gallery')} className="hover:text-[#E9BD62] transition-colors">
                  Photographic Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('offers')} className="hover:text-[#E9BD62] transition-colors">
                  Special Privilege Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Accommodations */}
          <div>
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#E9BD62] mb-4">
              Accommodations
            </h5>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button onClick={() => handleLink('rooms', 'presidential-suite')} className="hover:text-[#E9BD62] transition-colors">
                  Presidential Suite
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms', 'royal-executive-suite')} className="hover:text-[#E9BD62] transition-colors">
                  Royal Executive Suite
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms', 'luxury-junior-suite')} className="hover:text-[#E9BD62] transition-colors">
                  Luxury Junior Suite
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms', 'deluxe-double-room')} className="hover:text-[#E9BD62] transition-colors">
                  Deluxe Double Room
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms', 'superior-twin-room')} className="hover:text-[#E9BD62] transition-colors">
                  Superior Twin Room
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('rooms', 'standard-room')} className="hover:text-[#E9BD62] transition-colors">
                  Standard Room
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Events & Gatherings */}
          <div>
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#E9BD62] mb-4">
              Events & Gatherings
            </h5>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button onClick={() => handleLink('events')} className="hover:text-[#E9BD62] transition-colors">
                  Sovereign Grand Ballroom
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('events')} className="hover:text-[#E9BD62] transition-colors">
                  Corporate Summits & RFPs
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('weddings')} className="hover:text-[#E9BD62] transition-colors">
                  Royal Weddings & Galas
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('experiences')} className="hover:text-[#E9BD62] transition-colors">
                  Bespoke Excursions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('dining')} className="hover:text-[#E9BD62] transition-colors">
                  Private Vault Dinners
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-[#E9BD62] transition-colors">
                  Event Planning Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Guest Services & Management */}
          <div>
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#E9BD62] mb-4">
              Guest Care & Portal
            </h5>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button onClick={() => handleLink('faq')} className="hover:text-[#E9BD62] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-[#E9BD62] transition-colors">
                  Concierge Assistance
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('privacy')} className="hover:text-[#E9BD62] transition-colors">
                  Privacy Policy (GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('terms')} className="hover:text-[#E9BD62] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleLink('admin')}
                  className="inline-flex items-center gap-1.5 text-[#E9BD62] hover:underline font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Management Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Imperial Crown Hotel. All rights reserved. "Experience the Royal Standard" is an official registered trademark.
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/60">
            <span>Accepted Payments:</span>
            <span className="text-white/80 font-medium">M-Pesa Daraja</span>
            <span>·</span>
            <span className="text-white/80 font-medium">Visa</span>
            <span>·</span>
            <span className="text-white/80 font-medium">Mastercard</span>
            <span>·</span>
            <span className="text-white/80 font-medium">SWIFT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
