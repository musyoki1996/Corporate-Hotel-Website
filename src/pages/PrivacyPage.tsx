/**
 * Imperial Crown Hotel - Privacy Policy Page
 * International luxury hospitality privacy standards, GDPR compliance, and payment security
 */

import React from 'react';
import { InnerHeroBanner } from '../components/common/InnerHeroBanner';
import { HOTEL_IMAGES } from '../data/hotelData';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* Mandatory Photographic Inner Page Hero Banner */}
      <InnerHeroBanner
        title="Privacy & Data Protection Policy"
        subtitle="Our solemn pledge to safeguard guest discretion, confidential itineraries, and personal data."
        backgroundImage={HOTEL_IMAGES.wellnessSpa}
        breadcrumbs={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: 'Privacy Policy' },
        ]}
        kicker="Discretion & Trust"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-10 text-stone-700 text-sm leading-relaxed">
        
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-8">
          
          <div className="border-b border-stone-100 pb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B58A3A] font-bold block mb-1">
              Effective Date: January 1, 2026 · Version 4.2
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A38]">
              Imperial Crown Hotel Privacy Charter
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              At Imperial Crown Hotel, discretion is the hallmark of true royalty. We understand that our guests—including dignitaries, corporate executives, and international travelers—require the highest standard of privacy.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#071A38] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#B58A3A]" />
              <span>1. Information We Collect</span>
            </h3>
            <p className="text-xs text-stone-600">
              When reserving a suite, dining table, or event venue, we collect identifying details including your legal name, nationality, email address, international telephone number, credit card or M-Pesa details, and voluntary dietary or concierge preferences.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#071A38] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#B58A3A]" />
              <span>2. Purpose & Lawful Basis of Processing</span>
            </h3>
            <p className="text-xs text-stone-600">
              Your personal data is utilized strictly for the execution of your lodging contract, fulfilling statutory immigration and hospitality registry requirements, verifying electronic transactions through authorized gateways (Safaricom Daraja M-Pesa, Visa, and Mastercard), and tailoring your room preferences.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#071A38] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#B58A3A]" />
              <span>3. Confidentiality for High-Profile Dignitaries</span>
            </h3>
            <p className="text-xs text-stone-600">
              We uphold strict confidentiality protocols. Hotel associates sign comprehensive non-disclosure agreements prohibiting the release of guest identities, room allocations, flight itineraries, or dining companions. Dedicated private arrival subterranean elevators ensure unobserved transit.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#071A38] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B58A3A]" />
              <span>4. Data Subject Rights (GDPR & International Charters)</span>
            </h3>
            <p className="text-xs text-stone-600">
              You retain the absolute right to request access to your personal data, rectify erroneous records, or mandate deletion of marketing preferences. Direct all inquiries to our Data Protection Officer at: <strong>privacy@imperialcrownhotel.com</strong>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
