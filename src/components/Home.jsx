import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import Hero from './Hero';
import Pricing from './Pricing';
import FAQ from './FAQ';

export default function Home() {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-20 sm:space-y-32">
      
      {/* ============================================================
          1. EDITORIAL LUXURY HERO SECTION (Layered Architecture)
          ============================================================ */}
      <Hero />

      {/* ============================================================
          2. THREE-STEP EVALUATION PIPELINE
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass-100 border border-brass-300 text-brass-900 text-xs font-bold uppercase tracking-widest mb-3">
            Execution Roadmap
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950">
            How Apex Funded Works
          </h2>
          <p className="text-stone-700 text-sm sm:text-base mt-2">
            A straightforward 3-phase path from simulation to verified profit withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-[#E7E2DA] shadow-card hover:shadow-editorial-hover hover:border-brass-300/80 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-brass-300 flex items-center justify-center font-serif font-bold text-xl shadow-md border border-stone-800">
              01
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-950">
              Select Your Challenge
            </h3>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              Choose your starting account balance ($25K up to $150K) and preferred terminal (Tradovate, MetaTrader 5, or NinjaTrader).
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-[#E7E2DA] shadow-card hover:shadow-editorial-hover hover:border-brass-300/80 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-brass-300 flex items-center justify-center font-serif font-bold text-xl shadow-md border border-stone-800">
              02
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-950">
              Prove Market Edge
            </h3>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              Trade your strategy with zero minimum days restriction. Respect the daily loss limit and trailing max drawdown.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-[#E7E2DA] shadow-card hover:shadow-editorial-hover hover:border-brass-300/80 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-stone-950 flex items-center justify-center font-serif font-bold text-xl shadow-md">
              03
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-950">
              Receive Profit Splits
            </h3>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              Transition to a funded status with 80%–90% profit split, full refund of evaluation fees, and weekly payout access.
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass-100 border border-brass-300 text-brass-900 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brass-700" />
            Trading Blueprint
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950">
            Evaluation &amp; Funded Rules
          </h2>
          <p className="text-stone-700 text-sm sm:text-base mt-3 leading-relaxed">
            Clear, mathematically defined rules designed to protect capital and reward consistent market execution.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Phase 1 Evaluation */}
          <div className="p-8 rounded-3xl bg-white border border-[#E7E2DA] shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-2xl text-stone-950">
                Phase 1: Evaluation Rules
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-bold">
                Verification
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Profit Target (6% - 10%)</strong>
                  Reach the profit milestone for your chosen model with no maximum calendar day limit.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Daily Loss Limit (3% - 5%)</strong>
                  Calculated based on starting balance of the trading day. Protects against excessive intraday risk.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Trailing Max Drawdown (4% - 6%)</strong>
                  Trails your highest recorded equity mark, locking in profits while providing ample room to trade.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Trading Style Freedom</strong>
                  Scalping, day trading, swing trading, and SMC concepts are 100% permitted.
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: Funded Stage */}
          <div className="p-8 rounded-3xl bg-white border border-[#E7E2DA] shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-2xl text-stone-950">
                Phase 2: Funded Account Rules
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-brass-100 text-brass-900 text-xs font-mono font-bold">
                Live Simulated
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">80% - 90% Profit Share</strong>
                  Keep the lion's share of all generated profits with zero withdrawal fees.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Weekly Payout Cycles</strong>
                  Request your first payout after 5 active trading days on funded status.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">100% Refund on First Payout</strong>
                  Your entire evaluation fee is refunded alongside your very first withdrawal.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Consistency Guard</strong>
                  No single trading day or trade should account for more than 30% of total profit generated.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Prohibited Trading Practices Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-sm">
          <div className="flex items-center gap-2.5 text-rose-800 font-serif font-bold text-lg mb-3">
            <Lock className="w-5 h-5 text-rose-600" />
            Prohibited Trading Practices
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
            To protect fairness and execution integrity across all accounts, the following behaviors are strictly disallowed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-800">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="text-stone-950 block mb-1">Latency Arbitrage</strong>
              Exploiting delayed price feeds between broker terminals.
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="text-stone-950 block mb-1">Account Hedging / Cross-Trading</strong>
              Simultaneously opening opposite positions across multiple accounts.
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="text-stone-950 block mb-1">Hyper-High Frequency EA Bots</strong>
              Executing hundreds of sub-second spam transactions per minute.
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================
          5. COMPARISON BOARD: APEX VS OTHERS
          ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E2DA] shadow-card">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950">
              Why Institutional Traders Choose Apex
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Transparent, trader-first rules built without hidden trap clauses.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3">Prop Firm Feature</th>
                  <th className="pb-3 text-brass-700 font-bold text-sm">◆ Apex Funded</th>
                  <th className="pb-3 text-stone-500">Typical Legacy Firms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                <tr>
                  <td className="py-3.5 font-medium">Profit Split Ceiling</td>
                  <td className="py-3.5 font-bold text-emerald-700 font-mono">Up to 90%</td>
                  <td className="py-3.5 text-stone-500">75% - 80%</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Payout Frequency</td>
                  <td className="py-3.5 font-bold text-emerald-700">Weekly / Bi-Weekly</td>
                  <td className="py-3.5 text-stone-500">Monthly Only (30 Days)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">News &amp; Weekend Holding</td>
                  <td className="py-3.5 font-bold text-emerald-700">100% Permitted</td>
                  <td className="py-3.5 text-stone-500">Restricted / Auto-Close</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Supported Platforms</td>
                  <td className="py-3.5 font-bold text-stone-950">Tradovate, MetaTrader 5, NinjaTrader</td>
                  <td className="py-3.5 text-stone-500">Proprietary / Legacy Only</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Withdrawal &amp; Refund Fee</td>
                  <td className="py-3.5 font-bold text-emerald-700">$0 (100% Refunded on First Payout)</td>
                  <td className="py-3.5 text-stone-500">Processing fees deducted</td>
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
