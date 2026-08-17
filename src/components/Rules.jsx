import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, CheckCircle, Scale, Flame, ArrowRight } from 'lucide-react';
import FAQ from './FAQ';

export default function Rules() {
  const { setActiveTab } = useApp();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass-100 border border-brass-300 text-brass-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Scale className="w-3.5 h-3.5 text-brass-700" />
          Trading Blueprint
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950">
          Evaluation &amp; Funded Rules
        </h1>
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
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Profit Target (6% - 10%)</strong>
                Reach the profit milestone for your chosen model with no maximum calendar day limit.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Daily Loss Limit (3% - 5%)</strong>
                Calculated based on starting balance of the trading day. Protects against excessive intraday risk.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Trailing Max Drawdown (4% - 6%)</strong>
                Trails your highest recorded equity mark, locking in profits while providing ample room to trade.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
              <CheckCircle className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">80% - 90% Profit Share</strong>
                Keep the lion's share of all generated profits with zero withdrawal fees.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Weekly Payout Cycles</strong>
                Request your first payout after 5 active trading days on funded status.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">100% Refund on First Payout</strong>
                Your entire evaluation fee is refunded alongside your very first withdrawal.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-semibold">Consistency Framework</strong>
                Model-specific limits (Growth: None, Select: 40%, Lightning: 20%) to reward disciplined execution.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Prohibited Trading Practices Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-sm">
        <div className="flex items-center gap-2.5 text-rose-800 font-serif font-bold text-lg mb-3">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
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

      {/* CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl gold-gradient-bg text-stone-950 text-center space-y-4 shadow-card">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl">
          Ready to Start Your Evaluation Challenge?
        </h3>
        <p className="text-stone-900 text-xs sm:text-sm max-w-xl mx-auto">
          Pick your preferred capital size from $25,000 to $150,000 and trade on Tradovate, MetaTrader 5, or NinjaTrader.
        </p>
        <div>
          <button
            onClick={() => {
              setActiveTab('pricing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-stone-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-900 transition-all hover:scale-[1.02] active:scale-95 shadow-md inline-flex items-center gap-2"
          >
            <span>View Pricing &amp; Plans</span>
            <ArrowRight className="w-4 h-4 text-brass-400" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

    </div>
  );
}
