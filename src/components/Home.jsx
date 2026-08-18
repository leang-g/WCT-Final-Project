import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import Hero from './Hero';
import CMEStatusTicker from './common/CMEStatusTicker';
import FuturesFeatureGrid from './FuturesFeatureGrid';
import Pricing from './Pricing';
import FAQ from './FAQ';

export default function Home() {
  const { activeTab, setActiveTab, isNavigatingRef } = useApp();

  // ScrollSpy: Automatically update navbar active pill as user scrolls on the landing page
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef && isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const pricingEl = document.getElementById('pricing');
      const rulesEl = document.getElementById('rules');

      const pricingTop = pricingEl ? pricingEl.offsetTop - 220 : 700;
      const rulesTop = rulesEl ? rulesEl.offsetTop - 220 : 1800;

      if (scrollY < pricingTop) {
        if (activeTab !== 'home') setActiveTab('home');
      } else if (scrollY >= pricingTop && scrollY < rulesTop) {
        if (activeTab !== 'pricing') setActiveTab('pricing');
      } else {
        if (activeTab !== 'rules') setActiveTab('rules');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isNavigatingRef, setActiveTab]);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* ============================================================
          1. EDITORIAL LUXURY HERO SECTION
          ============================================================ */}
      <Hero />

      {/* ============================================================
          1b. LIVE CME FUTURES STATUS & INSTRUMENTS STRIP
          ============================================================ */}
      <CMEStatusTicker />

      {/* ============================================================
          2. FUTURES PROP ADVANTAGE GRID (20 ACCOUNTS, TRADINGVIEW, EOD)
          ============================================================ */}
      <FuturesFeatureGrid />

      {/* ============================================================
          2b. HOW IT WORKS 3-STEP ROADMAP
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-neon-glow">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Execution Roadmap
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            How Apex Funded Works
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            A straightforward 3-phase path from simulation to verified profit withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 hover:shadow-card-dark-hover transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-obsidian-950 text-emerald-400 flex items-center justify-center font-serif font-bold text-xl shadow-md border border-white/10">
              01
            </div>
            <h3 className="font-serif font-bold text-xl text-white">
              Select Your Challenge
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Choose your starting account balance ($25K up to $250K) and preferred terminal (Tradovate, TradingView, or NinjaTrader 8).
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 hover:shadow-card-dark-hover transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-obsidian-950 text-emerald-400 flex items-center justify-center font-serif font-bold text-xl shadow-md border border-white/10">
              02
            </div>
            <h3 className="font-serif font-bold text-xl text-white">
              Prove Market Edge
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Trade your strategy with zero minimum days restriction. Respect the daily loss limit and trailing max drawdown (EOD).
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 hover:shadow-card-dark-hover transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-obsidian-950 flex items-center justify-center font-serif font-bold text-xl shadow-md">
              03
            </div>
            <h3 className="font-serif font-bold text-xl text-white">
              Receive Profit Splits
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Transition to funded status with 100% of the first $10,000 profit (then 90%), full fee refund, and weekly payouts.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ============================================================
          3. EMBEDDED PRICING SECTION
          ============================================================ */}
      <Pricing />

      {/* ============================================================
          4. RULES & GUIDELINES BLUEPRINT (SCROLLABLE ON HOMEPAGE)
          ============================================================ */}
      <section id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-neon-glow">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Trading Blueprint
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Evaluation &amp; Funded Rules
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            Clear, mathematically defined rules designed to protect capital and reward consistent market execution.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Phase 1 Evaluation */}
          <div className="p-8 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-2xl text-white">
                Phase 1: Evaluation Rules
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-stone-300 text-xs font-mono font-bold border border-white/10">
                Verification
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Profit Target (6% - 10%)</strong>
                  Reach the profit milestone for your chosen model with no maximum calendar day limit.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Daily Loss Limit (3% - 5%)</strong>
                  Calculated based on starting balance of the trading day. Protects against excessive intraday risk.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Trailing Max Drawdown (EOD)</strong>
                  Trails only at 5:00 PM EST daily market close, eliminating intraday high-water mark traps.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Trading Style Freedom</strong>
                  Scalping, day trading, swing trading, and SMC concepts are 100% permitted.
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: Funded Stage */}
          <div className="p-8 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif font-bold text-2xl text-white">
                Phase 2: Funded Account Rules
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                Live Simulated
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">100% of First $10K (Then 90%)</strong>
                  Receive 100% of your first $10,000 in payouts, and 90% lifetime split thereafter.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Weekly Payout Cycles</strong>
                  Request your first payout after 5 active trading days on funded status.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">100% Fee Refund</strong>
                  Your entire evaluation fee is refunded alongside your very first withdrawal.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Consistency Guard</strong>
                  No single trading day or trade should account for more than 40% of total profit generated.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Prohibited Trading Practices Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5 text-rose-400 font-serif font-bold text-lg mb-3">
            <Lock className="w-5 h-5 text-rose-400" />
            Prohibited Trading Practices
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
            To protect fairness and execution integrity across all accounts, the following behaviors are strictly disallowed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
            <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5">
              <strong className="text-white block mb-1">Latency Arbitrage</strong>
              Exploiting delayed price feeds between broker terminals.
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5">
              <strong className="text-white block mb-1">Account Hedging / Cross-Trading</strong>
              Simultaneously opening opposite positions across multiple accounts.
            </div>
            <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5">
              <strong className="text-white block mb-1">Hyper-High Frequency EA Bots</strong>
              Executing hundreds of sub-second spam transactions per minute.
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================
          5. COMPARISON BOARD: APEX VS OTHERS
          ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Why Futures Traders Choose Apex
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Transparent, trader-first rules built without hidden trap clauses.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3">Prop Firm Feature</th>
                  <th className="pb-3 text-emerald-400 font-bold text-sm">◆ Apex Funded</th>
                  <th className="pb-3 text-stone-500">Typical Legacy Firms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-300">
                <tr>
                  <td className="py-3.5 font-medium">First Payout Policy</td>
                  <td className="py-3.5 font-bold text-emerald-400 font-mono">100% of 1st $10,000 (Then 90%)</td>
                  <td className="py-3.5 text-stone-500">75% - 80% with no 100% bonus</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Drawdown Calculation</td>
                  <td className="py-3.5 font-bold text-emerald-400">End-of-Day (EOD) at 5:00 PM EST</td>
                  <td className="py-3.5 text-stone-500">Intraday Live Trailing (Unrealized peak)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Multi-Account Sizing</td>
                  <td className="py-3.5 font-bold text-emerald-400">Up to 20 Accounts (Trade Copier Ready)</td>
                  <td className="py-3.5 text-stone-500">1 to 3 Accounts Max (No copiers)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Supported Terminals</td>
                  <td className="py-3.5 font-bold text-white">TradingView, Tradovate, NinjaTrader 8</td>
                  <td className="py-3.5 text-stone-500">Proprietary / Restricted Only</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">CME Market Data Fees</td>
                  <td className="py-3.5 font-bold text-emerald-400">$0 (Level 1 &amp; Level 2 Included)</td>
                  <td className="py-3.5 text-stone-500">$55 - $120 / month added fees</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">News &amp; Overnight Holding</td>
                  <td className="py-3.5 font-bold text-emerald-400">100% Permitted (No auto-flatten)</td>
                  <td className="py-3.5 text-stone-500">Mandatory close before high impact news</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ============================================================
          6. EMBEDDED FAQ SECTION
          ============================================================ */}
      <FAQ />

    </div>
  );
}
