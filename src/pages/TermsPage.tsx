/**
 * Imperial Crown Hotel - Terms & Conditions Page
 * Booking policies, check-in terms, payment settlement, cancellation, and property regulations
 */

import React from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { Scale, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Terms & Hospitality Conditions"
        subtitle="Transparent guidelines governing accommodations, guarantees, payment settlements, and cancellations."
        backgroundImage={HOTEL_IMAGES.hotelCourtyard}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Terms and Conditions' },
        ]}
        kicker="Legal & Standards"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-10 text-stone-700 text-sm leading-relaxed">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-8">
          
          <div className="border-b border-stone-100 pb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block mb-1">
              Official Hotel Regulations · 2026 Edition
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38]">
              General Hospitality Contract
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              By confirming a reservation at Imperial Crown Hotel, the guest enters into an official hospitality agreement subject to the terms detailed herein.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#071A38]">
              1. Check-In & Identification Requirements
            </h3>
            <p className="text-xs text-stone-600">
              Check-in time is officially 15:00 hours; check-out is 12:00 noon. Guests residing in our Presidential and Royal Executive Suites enjoy flexible check-out up to 16:00 upon request. All guests must provide an official passport or government photo ID, along with a credit card for incidental verification.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#071A38]">
              2. Rates, Statutory Taxes & Levies
            </h3>
            <p className="text-xs text-stone-600">
              All quotes are rendered in United States Dollars (USD) or equivalent Kenyan Shillings (KES). Rates are subject to 16% Value Added Tax (VAT), 2% National Tourism Training Levy, and a 5% Discretionary Hotel Service Charge.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#071A38]">
              3. Cancellation & Modification Policy
            </h3>
            <p className="text-xs text-stone-600">
              Standard flexible reservations may be modified or cancelled without penalty up to 48 hours prior to official check-in time (15:00 on arrival date). Cancellations received within 48 hours are subject to a fee equivalent to one night's room charge plus applicable taxes. Special non-refundable promotional rates are non-cancellable.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#071A38]">
              4. Payment Gateways & Transaction Verification
            </h3>
            <p className="text-xs text-stone-600">
              Payments initiated via M-Pesa Daraja STK Push, Visa 3D Secure, or Mastercard SecureCode are credited immediately. A booking reference is generated only once successful gateway acknowledgement is recorded by our central reservation system.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-[#071A38]">
              5. Guest Conduct & Property Care
            </h3>
            <p className="text-xs text-stone-600">
              Imperial Crown Hotel is a strictly non-smoking property in all suites and enclosed restaurants. Dedicated smoking lounges are available on garden terraces. Guests are responsible for excessive damage or loss of historic furnishings.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
