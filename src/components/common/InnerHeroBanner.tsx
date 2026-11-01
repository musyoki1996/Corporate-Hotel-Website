/**
 * Imperial Crown Hotel - Inner Page Hero Banner System
 * Mandatory design element providing consistent luxury banner presentation with unique photography,
 * dark navy gradient overlay, breadcrumbs, and gold typographic accents.
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface InnerHeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
  kicker?: string;
}

export const InnerHeroBanner: React.FC<InnerHeroBannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs,
  kicker,
}) => {
  return (
    <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full overflow-hidden flex items-end">
      {/* Background High-Resolution Photography */}
      <img
        src={backgroundImage}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 animate-subtleZoom transition-transform duration-1000"
      />

      {/* Dark Navy Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A38] via-[#071A38]/75 to-[#071A38]/45" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-white/70">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1.5">
                  {crumb.onClick && !isLast ? (
                    <button
                      onClick={crumb.onClick}
                      className="hover:text-[#E9BD62] transition-colors focus:outline-none"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={isLast ? 'text-[#E9BD62] font-medium' : 'text-white/70'}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="w-3.5 h-3.5 text-[#B58A3A]/70" />}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Optional Editorial Kicker */}
        {kicker && (
          <div className="text-xs uppercase tracking-[0.25em] text-[#B58A3A] font-semibold mb-2">
            {kicker}
          </div>
        )}

        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight text-balance">
          {title}
        </h1>

        {/* Gold Hairline Accent */}
        <div className="w-16 h-0.5 bg-[#B58A3A] my-3 rounded-full" />

        {/* Page Subtitle */}
        <p className="text-sm sm:text-base text-white/80 max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>

      </div>
    </div>
  );
};
