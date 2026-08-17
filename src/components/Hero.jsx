import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Activity, 
  Clock, 
  DollarSign, 
  Globe2, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';
import { livePayoutsStream, trustpilotReviews } from '../data/propFirmData';
import AnimatedCounter from './common/AnimatedCounter';
import PayoutProofModal from './PayoutProofModal';

export default function Hero() {
  const { setActiveTab } = useApp();
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [selectedPayoutForProof, setSelectedPayoutForProof] = useState(null);

  // Auto-rotate Trustpilot featured highlight every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % trustpilotReviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      
      {/* ============================================================
          1. HERO MAIN SECTION
          ============================================================ */}
      <section id="home" className="relative pt-6 pb-12 md:pt-12 md:pb-20 overflow-hidden">
        
        {/* Radial-Masked Technical Grid Pattern */}
        <div className="hero-grid-pattern absolute inset-0 pointer-events-none -z-10" aria-hidden="true" />

        {/* Warm Ambient Lighting Orbs */}
        <div 
          className="w-[520px] h-[520px] bg-[#C59A45]/12 rounded-full blur-[120px] pointer-events-none absolute -top-10 left-1/4 -z-10" 
          aria-hidden="true" 
        />
        <div 
          className="w-[450px] h-[450px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none absolute top-16 right-8 -z-10" 
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left 7 Columns: High-Impact Editorial Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              
              {/* Trust Badge / Model Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brass-100/90 border border-brass-300 text-stone-900 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brass-600"></span>
                </span>
                <span>Next-Gen Prop Firm Simulation • 2026 Model</span>
                <span className="hidden sm:inline text-brass-700 font-mono font-normal">|</span>
                <span className="hidden sm:inline text-emerald-800 font-semibold lowercase">no time limits</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-stone-950 tracking-tight leading-[1.12]">
                Trade Institutional Capital. <br />
                <span className="gold-gradient-text italic font-normal">Keep Up To 90%</span> of Profits.
              </h1>

              {/* Sub-copy */}
              <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Pass our evaluation challenge with raw 0.0 spreads, zero hidden rules, and simulated balances up to $150,000. Request rapid weekly payouts with a 100% fee refund on your first withdrawal.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="shimmer-btn w-full sm:w-auto gold-gradient-bg text-stone-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-sm hover:shadow-brass-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Challenge Simulation</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('rules');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-stone-850 hover:text-stone-950 border border-stone-300 bg-white/90 hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Rules Blueprint</span>
                </motion.button>
              </div>

              {/* Trust Indicators with Watermark & Counting Animations */}
              <div className="relative pt-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
                
                {/* Subtle Candlestick & Financial Graph Watermark Curves */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-10 flex items-center justify-center select-none"
                  aria-hidden="true"
                >
                  <svg 
                    viewBox="0 0 520 140" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-full h-full object-cover scale-105"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="35" x2="520" y2="35" stroke="#1C1917" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="520" y2="75" stroke="#1C1917" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="115" y1="0" x2="115" y2="140" stroke="#1C1917" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="340" y1="0" x2="340" y2="140" stroke="#1C1917" strokeWidth="0.8" strokeDasharray="3 3" />
                    <rect x="71" y="70" width="8" height="30" rx="1" fill="#059669" />
                    <rect x="116" y="52" width="8" height="26" rx="1" fill="#059669" />
                    <rect x="161" y="58" width="8" height="18" rx="1" fill="#C59A45" />
                    <rect x="206" y="36" width="8" height="32" rx="1" fill="#059669" />
                    <rect x="251" y="28" width="8" height="28" rx="1" fill="#059669" />
                    <rect x="341" y="14" width="8" height="26" rx="1" fill="#059669" />
                    <rect x="431" y="8" width="8" height="18" rx="1" fill="#C59A45" />
                    <path d="M15 118 C 80 105, 130 70, 210 52 C 290 34, 380 18, 505 6" stroke="url(#heroWatermarkGradient)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="heroWatermarkGradient" x1="15" y1="118" x2="505" y2="6" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#C59A45" />
                        <stop offset="50%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 3-Column Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 text-stone-800 relative z-10">
                  <div>
                    <span className="font-serif font-bold text-2xl text-stone-950 block tabular-nums">
                      <AnimatedCounter value={14.2} prefix="$" suffix="M+" />
                    </span>
                    <span className="text-xs text-stone-500 font-medium">Simulated Payouts</span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-2xl text-emerald-700 block font-mono">
                      0.0 Pips
                    </span>
                    <span className="text-xs text-stone-500 font-medium">Raw Institutional Spread</span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-2xl text-stone-950 block">
                      &lt; 24 Hours
                    </span>
                    <span className="text-xs text-stone-500 font-medium">Avg. Payout Speed</span>
                  </div>
                </div>

              </div>

            </motion.div>

            {/* Right 5 Columns: Interactive Floating Live Preview Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-md border border-stone-200/80 ring-1 ring-white/60 shadow-[0_20px_50px_-12px_rgba(28,25,23,0.08),0_0_0_1px_rgba(28,25,23,0.02)] hover:shadow-editorial-hover transition-all duration-300">
                
                {/* Header of Mockup */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100/90">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <div>
                      <span className="font-serif font-bold text-stone-950 text-sm block">Growth Model #APX-104928</span>
                      <span className="text-[10px] text-stone-500 font-medium">$100,000 Simulated Master</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brass-100 text-brass-900 border border-brass-300 shadow-xs">
                    LIVE SIMULATED
                  </span>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-stone-50/85 border border-stone-200/70 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Current Balance</span>
                    <div className="font-serif font-bold text-xl text-stone-950 font-mono mt-0.5">
                      <AnimatedCounter value={106420.00} prefix="$" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 block mt-0.5">+6.42% net gain</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50/85 border border-stone-200/70 backdrop-blur-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Today's P&amp;L</span>
                    <div className="font-serif font-bold text-xl text-emerald-700 font-mono mt-0.5">
                      <AnimatedCounter value={1840.50} prefix="+$" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500 block mt-0.5">3 active positions</span>
                  </div>
                </div>

                {/* Profit Target Progress Metric */}
                <div className="space-y-1.5 mb-5 p-3 rounded-2xl bg-stone-50/60 border border-stone-100 backdrop-blur-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-semibold">Phase 1 Profit Target ($10,000 goal)</span>
                    <strong className="font-mono text-emerald-700 font-bold">64.2%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200/80 overflow-hidden border border-stone-200">
                    <div className="h-full rounded-full gold-gradient-bg transition-all duration-700" style={{ width: '64.2%' }}></div>
                  </div>
                </div>

                {/* Sample Live Positions */}
                <div className="p-3.5 rounded-2xl bg-stone-50/85 border border-stone-200/70 text-xs space-y-2.5 backdrop-blur-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-stone-950">EURUSD</strong>
                      <span className="text-[10px] text-brass-800 bg-brass-50 border border-brass-200 px-1.5 py-0.2 rounded ml-1.5 font-medium">Swing Sweep</span>
                    </div>
                    <strong className="font-mono font-bold text-emerald-700">+$420.00</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-stone-950">NQ Futures</strong>
                      <span className="text-[10px] text-brass-800 bg-brass-50 border border-brass-200 px-1.5 py-0.2 rounded ml-1.5 font-medium">Fair Value Gap</span>
                    </div>
                    <strong className="font-mono font-bold text-emerald-700">+$1,420.50</strong>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveTab('dashboard');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3 rounded-2xl bg-stone-950 hover:bg-stone-900 text-brass-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <LineChart className="w-4 h-4 text-brass-400" />
                    Open Live Trader Dashboard
                  </motion.button>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================
          2. TRADEIFY-STYLE LIVE PAYOUT STREAM / MARQUEE (SOCIAL PROOF)
          ============================================================ */}
      <div className="w-full py-3 bg-stone-900 text-stone-100 border-y border-stone-800 overflow-hidden relative shadow-inner">
        
        {/* Left & Right Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-stone-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-stone-900 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex items-center gap-6 select-none">
          {/* Double array for seamless loop */}
          {[...livePayoutsStream, ...livePayoutsStream].map((payout, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={() => setSelectedPayoutForProof(payout)}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-stone-850/80 border border-stone-700/80 text-xs shadow-xs shrink-0 hover:border-brass-400/80 hover:bg-stone-800 transition-all cursor-pointer group"
              title="Click to view verified disbursement slip"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-stone-300 font-medium group-hover:text-white">{payout.country} {payout.trader}</span>
              <span className="text-emerald-400 font-mono font-bold">
                +${payout.amount.toLocaleString()}
              </span>
              <span className="text-stone-400 text-[11px]">via {payout.method}</span>
              <span className="text-brass-400/90 text-[10px] font-mono font-semibold bg-stone-800 px-1.5 py-0.5 rounded group-hover:bg-brass-500/20">
                {payout.timeAgo}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          3. SUPPORTED PLATFORMS SHOWCASE STRIP
          ============================================================ */}
      <div className="py-6 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-stone-500 text-xs uppercase tracking-widest font-bold">
              <span>Supported Platforms &amp; Terminals</span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700 font-semibold lowercase">Zero Commission Routing</span>
            </div>

            {/* Platform Badges */}
            <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4">
              
              {/* Tradovate */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-brass-400 transition-colors">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center font-mono">
                  T
                </div>
                <span className="text-xs font-bold text-stone-900">Tradovate</span>
              </div>

              {/* MetaTrader 5 */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-brass-400 transition-colors">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
                  M5
                </div>
                <span className="text-xs font-bold text-stone-900">MetaTrader 5</span>
              </div>

              {/* NinjaTrader */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-brass-400 transition-colors">
                <div className="w-5 h-5 rounded-md bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center font-mono border border-stone-700">
                  NT
                </div>
                <span className="text-xs font-bold text-stone-900">NinjaTrader</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          4. TRUSTPILOT 4.8/5 RATING STRIP & VERIFIED REVIEW CAROUSEL
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Trustpilot Score Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center text-xs">
                  ★
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-950 text-sm">Excellent 4.8 out of 5</span>
                <span className="text-xs text-stone-400">|</span>
                <span className="text-xs font-bold text-stone-700">1,240+ reviews on</span>
                <strong className="text-emerald-700 font-bold text-xs flex items-center gap-0.5">
                  ★ Trustpilot
                </strong>
              </div>
            </div>
          </div>

          {/* Active Rotating Review Card */}
          <div className="flex-1 max-w-xl text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-stone-700"
              >
                <span className="font-bold text-stone-900">"{trustpilotReviews[activeReviewIdx].title}"</span> — {trustpilotReviews[activeReviewIdx].comment}
                <div className="mt-1 text-[11px] text-stone-500 flex items-center gap-2">
                  <span className="font-semibold text-brass-800">{trustpilotReviews[activeReviewIdx].author}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">{trustpilotReviews[activeReviewIdx].fundedAmount}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Payout Verification Modal */}
      <PayoutProofModal 
        payout={selectedPayoutForProof}
        isOpen={!!selectedPayoutForProof}
        onClose={() => setSelectedPayoutForProof(null)}
      />

    </div>
  );
}
