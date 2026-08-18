import React from 'react';
import { motion } from 'framer-motion';

/**
 * Apex Funded Brand Logo Component
 * Combines an architectural "A" mountain summit + ascending market chevron + golden diamond apex
 * High-contrast, radiant typography tailored for deep obsidian fintech theme.
 */
export default function Logo({ size = 'md', className = '', showSubtitle = true, inverted = false }) {
  // Dimension configurations
  const dimensions = {
    sm: {
      emblem: 'w-8 h-8',
      svg: 30,
      title: 'text-lg',
      funded: 'text-sm',
      badge: 'text-[9px] px-1.5 py-0.5',
      subtitle: 'text-[9px]',
      gap: 'gap-2.5',
      dot: 'w-1.5 h-1.5'
    },
    md: {
      emblem: 'w-10 h-10',
      svg: 40,
      title: 'text-2xl',
      funded: 'text-base sm:text-lg',
      badge: 'text-[10px] px-2 py-0.5',
      subtitle: 'text-[10px]',
      gap: 'gap-3',
      dot: 'w-1.5 h-1.5'
    },
    lg: {
      emblem: 'w-14 h-14',
      svg: 56,
      title: 'text-3xl sm:text-4xl',
      funded: 'text-xl sm:text-2xl',
      badge: 'text-xs px-2.5 py-1',
      subtitle: 'text-xs',
      gap: 'gap-4',
      dot: 'w-2 h-2'
    }
  };

  const current = dimensions[size] || dimensions.md;

  return (
    <div className={`flex items-center ${current.gap} group select-none ${className}`}>
      
      {/* ============================================================
          1. BESPOKE APEX EMBLEM ICON (Architectural Summit + Alpha Chevron)
          ============================================================ */}
      <div className={`relative ${current.emblem} rounded-2xl bg-gradient-to-b from-stone-900 via-obsidian-950 to-black border border-white/20 shadow-lg group-hover:border-emerald-400/80 group-hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center shrink-0 overflow-hidden`}>
        
        {/* Subtle Ambient Radial Gold/Emerald Glow */}
        <div 
          className="absolute inset-0 bg-radial from-emerald-400/30 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Shimmer Sweep Animation on Hover */}
        <div 
          className="absolute -inset-full bg-gradient-to-r from-transparent via-white/25 to-transparent -rotate-45 group-hover:translate-x-full duration-1000 ease-in-out transition-transform pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Precision SVG Monogram */}
        <svg
          width={current.svg * 0.75}
          height={current.svg * 0.75}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Gold Gradients */}
            <linearGradient id="apexLeftFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#C59A45" />
            </linearGradient>
            <linearGradient id="apexRightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="60%" stopColor="#D4A74F" />
              <stop offset="100%" stopColor="#8C6524" />
            </linearGradient>
            <linearGradient id="apexSummitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFF9E6" />
              <stop offset="100%" stopColor="#F5D77F" />
            </linearGradient>
            <linearGradient id="apexBaseChart" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00F59B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Left Wing / Mountain Ridge of the 'A' */}
          <path
            d="M16 6.5L6 24.5H10.5L16 14.5L18.8 19.5L21 16L16 6.5Z"
            fill="url(#apexLeftFacet)"
          />

          {/* Right Wing / Shaded Facet of the 'A' */}
          <path
            d="M16 6.5L21 16L26 24.5H21.5L18.8 19.5L16 14.5L16 6.5Z"
            fill="url(#apexRightFacet)"
          />

          {/* Ascending Alpha Trendline Cut / Crossbar */}
          <path
            d="M8.5 22L14 17.5L17.5 20.5L24 13"
            stroke="url(#apexBaseChart)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Luminous Summit Diamond Cap */}
          <polygon
            points="16,3 18.5,6.5 16,10 13.5,6.5"
            fill="url(#apexSummitGlow)"
            className="filter drop-shadow-[0_0_4px_rgba(245,215,127,0.95)]"
          />

          {/* Micro Top Sparkle */}
          <circle cx="16" cy="3" r="1.1" fill="#FFFFFF" />
        </svg>

        {/* Precision Notch Accents */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400/50 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400/50 rounded-bl-xl" />
      </div>

      {/* ============================================================
          2. HIGH-VISIBILITY TYPOGRAPHIC WORDMARK
          ============================================================ */}
      <div className="flex flex-col justify-center">
        
        {/* Main Brand Title */}
        <div className="flex items-baseline gap-2 leading-none">
          <span className={`font-serif font-black tracking-tight text-white transition-colors duration-200 ${current.title} drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]`}>
            APEX
          </span>
          <span className={`font-sans font-black tracking-tight uppercase bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent ${current.funded} drop-shadow-[0_0_12px_rgba(245,215,127,0.4)]`}>
            FUNDED
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 self-center hidden sm:inline-block shadow-[0_0_8px_#00F59B] animate-pulse" />
        </div>

        {/* Refined Institutional Subtitle */}
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-1">
            <span className={`tracking-[0.22em] uppercase font-mono font-bold text-emerald-400 ${current.subtitle}`}>
              Futures Prop
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-300 font-semibold lowercase">
              <span className={`rounded-full bg-emerald-400 shrink-0 ${current.dot} shadow-[0_0_6px_#00F59B]`} />
              <span className="hidden sm:inline font-mono">cme live</span>
            </span>
          </div>
        )}

      </div>

    </div>
  );
}
