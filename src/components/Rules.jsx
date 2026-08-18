import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, CheckCircle, Scale, Flame, ArrowRight, Sparkles } from 'lucide-react';
import FAQ from './FAQ';

export default function Rules() {
  const { navigateToTab } = useApp();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3 shadow-neon-glow">
          <Scale className="w-3.5 h-3.5 text-emerald-400" />
          Trading Blueprint
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          Evaluation &amp; Funded Rules
        </h1>
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
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Profit Target (6% - 10%)</strong>
                Reach the profit milestone for your chosen model with no maximum calendar day limit.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Daily Loss Limit (3% - 5%)</strong>
                Calculated based on starting balance of the trading day. Protects against excessive intraday risk.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Trailing Max Drawdown (EOD)</strong>
                Trails only at 5:00 PM EST daily market close, eliminating intraday high-water mark traps.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
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
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">100% of 1st $10K (Then 90%)</strong>
                Receive 100% of your first $10,000 in payouts, and 90% lifetime split thereafter.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Weekly Payout Cycles</strong>
                Request your first payout after 5 active trading days on funded status.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">100% Fee Refund</strong>
                Your entire evaluation fee is refunded alongside your very first withdrawal.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Consistency Framework</strong>
                Model-specific limits (Growth: None, Select: 40%, Lightning: 20%) to reward disciplined execution.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Prohibited Trading Practices Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 text-rose-400 font-serif font-bold text-lg mb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
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

      {/* CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl gold-gradient-bg text-obsidian-950 text-center space-y-4 shadow-2xl">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl">
          Ready to Start Your Evaluation Challenge?
        </h3>
        <p className="text-stone-900 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          Pick your preferred capital size from $25,000 to $250,000 and trade on Tradovate, TradingView, or NinjaTrader 8.
        </p>
        <div>
          <button
            onClick={() => navigateToTab('pricing')}
            className="px-8 py-3.5 rounded-full bg-obsidian-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-900 transition-all hover:scale-[1.02] active:scale-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Pricing &amp; Plans</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

    </div>
  );
}
