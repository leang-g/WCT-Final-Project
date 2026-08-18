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
  ArrowUpRight,
  Play,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { livePayoutsStream, trustpilotReviews } from '../data/propFirmData';
import AnimatedCounter from './common/AnimatedCounter';
import PayoutProofModal from './PayoutProofModal';

export default function Hero() {
  const { navigateToTab, setActiveTab } = useApp();
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [selectedPayoutForProof, setSelectedPayoutForProof] = useState(null);

  // Live Ticking Market Prices
  const [marketPrices, setMarketPrices] = useState({
    NQ: { price: 19842.25, change: '+1.24%', up: true },
    ES: { price: 5614.50, change: '+0.78%', up: true },
    GC: { price: 2518.30, change: '+0.42%', up: true }
  });

  // Simulated Live Active Position in Hero
  const [activePositionTab, setActivePositionTab] = useState('NQ');
  const [simBalance, setSimBalance] = useState(106420.00);
  const [simTodayPnL, setSimTodayPnL] = useState(1840.50);
  const [closedToast, setClosedToast] = useState(null);

  const heroPositions = {
    NQ: { symbol: 'NQ 100 Futures', side: 'BUY 2x', entry: '19,812.50', current: '19,842.25', pnl: 1190.00, gain: '+1.45%' },
    ES: { symbol: 'E-mini S&P 500', side: 'BUY 4x', entry: '5,604.00', current: '5,614.50', pnl: 2100.00, gain: '+1.87%' },
    GC: { symbol: 'Gold COMEX', side: 'BUY 2x', entry: '2,510.10', current: '2,518.30', pnl: 820.00, gain: '+0.82%' }
  };

  const currentPos = heroPositions[activePositionTab];

  // Auto-rotate Trustpilot featured highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % trustpilotReviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Subtle Live Market Ticker animation
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setMarketPrices(prev => ({
        NQ: {
          price: +(prev.NQ.price + (Math.random() * 1.5 - 0.7)).toFixed(2),
          change: '+1.24%',
          up: Math.random() > 0.4
        },
        ES: {
          price: +(prev.ES.price + (Math.random() * 0.5 - 0.25)).toFixed(2),
          change: '+0.78%',
          up: Math.random() > 0.45
        },
        GC: {
          price: +(prev.GC.price + (Math.random() * 0.4 - 0.2)).toFixed(2),
          change: '+0.42%',
          up: Math.random() > 0.4
        }
      }));
    }, 2400);

    return () => clearInterval(tickInterval);
  }, []);

  const handleSimulateClose = () => {
    const profit = currentPos.pnl;
    setSimBalance(prev => prev + profit);
    setSimTodayPnL(prev => prev + profit);
    setClosedToast(`Take Profit Filled: Closed ${currentPos.symbol} for +$${profit.toFixed(2)}`);
    setTimeout(() => setClosedToast(null), 4000);
  };

  return (
    <div className="relative overflow-hidden">
      
      {/* ============================================================
          1. HERO MAIN SECTION
          ============================================================ */}
      <section id="home" className="relative pt-8 pb-14 md:pt-14 md:pb-24 overflow-hidden">
        
        {/* Radial-Masked Technical Grid Pattern */}
        <div className="hero-grid-pattern absolute inset-0 pointer-events-none -z-10" aria-hidden="true" />

        {/* Ambient Dark Neon Glow Orbs */}
        <div 
          className="w-[580px] h-[580px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none absolute -top-20 left-1/4 -z-10" 
          aria-hidden="true" 
        />
        <div 
          className="w-[500px] h-[500px] bg-[#C59A45]/8 rounded-full blur-[130px] pointer-events-none absolute top-20 right-8 -z-10" 
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
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-emerald-500/30 text-stone-200 text-xs font-bold uppercase tracking-wider shadow-neon-glow backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-white font-mono">CME Futures Prop Firm</span>
                <span className="text-stone-500 font-mono font-normal">|</span>
                <span className="text-emerald-400 font-semibold lowercase">100% of 1st $10k profit</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                Trade Institutional CME Futures. <br />
                <span className="gold-gradient-text italic font-normal">Keep 100% of First $10K</span> + 90% Split.
              </h1>

              {/* Sub-copy */}
              <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Execute directly on <strong className="text-white">TradingView</strong>, <strong className="text-white">Tradovate</strong>, or <strong className="text-white">NinjaTrader 8</strong> with zero data fees. Trade up to 20 accounts simultaneously with full trade copier support.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateToTab('pricing')}
                  className="shimmer-btn w-full sm:w-auto gold-gradient-bg text-obsidian-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg hover:shadow-brass-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Challenge Simulation</span>
                  <ArrowRight className="w-4 h-4 text-obsidian-950" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateToTab('rules')}
                  className="w-full sm:w-auto px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-stone-200 hover:text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <span>Explore Rules Blueprint</span>
                </motion.button>
              </div>

              {/* Live Financial Metrics Grid */}
              <div className="relative pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                
                {/* 3-Column Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 text-stone-300 relative z-10">
                  <div>
                    <span className="font-serif font-bold text-2xl text-white block tabular-nums">
                      <AnimatedCounter value={14.2} prefix="$" suffix="M+" />
                    </span>
                    <span className="text-xs text-stone-400 font-medium">Simulated Payouts</span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-2xl text-emerald-400 block font-mono">
                      0.0 Pips
                    </span>
                    <span className="text-xs text-stone-400 font-medium">Raw CME Spreads</span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-2xl text-white block">
                      &lt; 24 Hours
                    </span>
                    <span className="text-xs text-stone-400 font-medium">Avg. Payout Speed</span>
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
              <div className="relative p-6 sm:p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group">
                
                {/* Ambient Subtle Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header of Mockup */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                    <div>
                      <span className="font-serif font-bold text-white text-sm block">Growth Model #APX-104928</span>
                      <span className="text-[10px] text-stone-400 font-mono font-medium">$100,000 Master Account</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs">
                    SIMULATED LIVE
                  </span>
                </div>

                {/* Live Ticking Prices Strip */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-2 rounded-xl bg-obsidian-950/70 border border-white/5 font-mono text-[11px]">
                  <div className="text-center">
                    <span className="text-stone-400 block text-[9px]">NQ</span>
                    <span className="text-emerald-400 font-bold">{marketPrices.NQ.price}</span>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <span className="text-stone-400 block text-[9px]">ES</span>
                    <span className="text-emerald-400 font-bold">{marketPrices.ES.price}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-stone-400 block text-[9px]">GC</span>
                    <span className="text-emerald-400 font-bold">{marketPrices.GC.price}</span>
                  </div>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-2xl bg-obsidian-950/80 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Current Balance</span>
                    <div className="font-serif font-bold text-xl text-white font-mono mt-0.5">
                      <AnimatedCounter value={simBalance} prefix="$" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 block mt-0.5">+6.42% net return</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-obsidian-950/80 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Today's P&amp;L</span>
                    <div className="font-serif font-bold text-xl text-emerald-400 font-mono mt-0.5">
                      <AnimatedCounter value={simTodayPnL} prefix="+$" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-400 block mt-0.5">3 active positions</span>
                  </div>
                </div>

                {/* Interactive Dynamic SVG Equity Curve */}
                <div className="mb-4 p-3 rounded-2xl bg-obsidian-950/70 border border-white/10">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-stone-400 font-medium">Live Equity Curve (7D High Watermark)</span>
                    <span className="text-emerald-400 font-mono font-bold">Target: $110,000</span>
                  </div>
                  
                  <div className="h-16 w-full relative">
                    <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="heroCurveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00F59B" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00F59B" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Target Ceiling Line */}
                      <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="1" />
                      {/* Area Fill */}
                      <path d="M 0 60 Q 50 55, 100 45 T 200 30 T 300 14 L 300 70 L 0 70 Z" fill="url(#heroCurveGrad)" />
                      {/* Stroke Line */}
                      <path d="M 0 60 Q 50 55, 100 45 T 200 30 T 300 14" fill="none" stroke="#00F59B" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Glowing Apex Node */}
                      <circle cx="300" cy="14" r="4" fill="#00F59B" className="animate-pulse" />
                      <circle cx="300" cy="14" r="8" fill="rgba(0, 245, 155, 0.3)" />
                    </svg>
                  </div>
                </div>

                {/* Interactive Position Selector Tabs */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Live Active Positions
                    </span>
                    <div className="flex gap-1">
                      {['NQ', 'ES', 'GC'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActivePositionTab(tab)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            activePositionTab === tab 
                              ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' 
                              : 'bg-white/5 text-stone-400 hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Position Card */}
                  <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white">{currentPos.symbol}</strong>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          {currentPos.side}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        Entry: {currentPos.entry} • Cur: {currentPos.current}
                      </span>
                    </div>

                    <div className="text-right">
                      <strong className="font-mono font-bold text-emerald-400 block">
                        +${currentPos.pnl.toLocaleString()}
                      </strong>
                      <button
                        type="button"
                        onClick={handleSimulateClose}
                        className="text-[10px] font-mono text-brass-400 hover:text-brass-300 underline cursor-pointer"
                      >
                        Simulate Close
                      </button>
                    </div>
                  </div>

                  {closedToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono text-center font-semibold"
                    >
                      {closedToast}
                    </motion.div>
                  )}
                </div>

                {/* Dashboard CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/15 shadow-md cursor-pointer"
                >
                  <LineChart className="w-4 h-4 text-emerald-400" />
                  Launch Trader Terminal
                </motion.button>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================
          2. LIVE PAYOUT STREAM / MARQUEE (CONTINUOUS SOCIAL PROOF)
          ============================================================ */}
      <div className="w-full py-3.5 bg-obsidian-950 text-stone-100 border-y border-white/10 overflow-hidden relative shadow-2xl">
        
        {/* Left & Right Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-obsidian-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-obsidian-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex items-center gap-6 select-none">
          {/* Double array for seamless loop */}
          {[...livePayoutsStream, ...livePayoutsStream].map((payout, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={() => setSelectedPayoutForProof(payout)}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs shadow-xs shrink-0 hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group"
              title="Click to view verified disbursement certificate"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-stone-300 font-medium group-hover:text-white">{payout.country} {payout.trader}</span>
              <span className="text-emerald-400 font-mono font-bold">
                +${payout.amount.toLocaleString()}
              </span>
              <span className="text-stone-400 text-[11px]">via {payout.method}</span>
              <span className="text-brass-300 text-[10px] font-mono font-semibold bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-brass-400/50">
                {payout.timeAgo}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          3. SUPPORTED PLATFORMS SHOWCASE STRIP
          ============================================================ */}
      <div className="py-6 border-b border-white/10 bg-obsidian-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest font-bold">
              <span>Execution Terminals</span>
              <span className="text-stone-600">•</span>
              <span className="text-emerald-400 font-semibold lowercase">Zero Commission Routing</span>
            </div>

            {/* Platform Badges */}
            <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4">
              
              {/* TradingView */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-xs hover:border-sky-400/50 transition-colors">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center font-mono">
                  TV
                </div>
                <span className="text-xs font-bold text-white">TradingView</span>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-500/20 px-1.5 py-0.2 rounded">Direct</span>
              </div>

              {/* Tradovate */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-xs hover:border-blue-400/50 transition-colors">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center font-mono">
                  T
                </div>
                <span className="text-xs font-bold text-white">Tradovate</span>
              </div>

              {/* NinjaTrader */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-xs hover:border-stone-400/50 transition-colors">
                <div className="w-5 h-5 rounded-md bg-stone-800 text-white font-bold text-[10px] flex items-center justify-center font-mono border border-stone-600">
                  NT
                </div>
                <span className="text-xs font-bold text-white">NinjaTrader 8</span>
              </div>

              {/* MetaTrader 5 */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-xs hover:border-emerald-400/50 transition-colors">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
                  M5
                </div>
                <span className="text-xs font-bold text-white">MetaTrader 5</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          4. TRUSTPILOT 4.8/5 RATING STRIP & VERIFIED REVIEW CAROUSEL
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Trustpilot Score Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded bg-emerald-500 text-obsidian-950 flex items-center justify-center text-xs font-bold">
                  ★
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">Excellent 4.8 out of 5</span>
                <span className="text-xs text-stone-600">|</span>
                <span className="text-xs font-bold text-stone-300">1,240+ reviews on</span>
                <strong className="text-emerald-400 font-bold text-xs flex items-center gap-0.5">
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
                className="text-xs text-stone-300"
              >
                <span className="font-bold text-white">"{trustpilotReviews[activeReviewIdx].title}"</span> — {trustpilotReviews[activeReviewIdx].comment}
                <div className="mt-1 text-[11px] text-stone-400 flex items-center gap-2">
                  <span className="font-semibold text-brass-300">{trustpilotReviews[activeReviewIdx].author}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{trustpilotReviews[activeReviewIdx].fundedAmount}</span>
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
