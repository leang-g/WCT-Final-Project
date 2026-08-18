import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Monitor, 
  DollarSign, 
  CheckCircle2,
  Copy,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FuturesFeatureGrid() {
  const { navigateToTab } = useApp();

  const features = [
    {
      icon: Layers,
      tag: 'Multi-Account Power',
      title: 'Trade Up To 20 Accounts',
      desc: 'Copy trade across up to 20 evaluation and funded accounts simultaneously using Replikanto, NinjaTrader, or Tradovate Group Trading.',
      metric: '20 Accounts Max',
      highlight: 'Full Copier Support'
    },
    {
      icon: ShieldCheck,
      tag: 'Drawdown Clarity',
      title: 'EOD Trailing Drawdown',
      desc: 'Drawdown calculates only at 5:00 PM EST market close. Zero intraday trailing traps—your floating unrealized profits will never pull your drawdown floor up mid-trade.',
      metric: 'End of Day Only',
      highlight: 'No Live Trailing Traps'
    },
    {
      icon: DollarSign,
      tag: 'Trader-First Splits',
      title: '100% of First $10,000',
      desc: 'Keep 100% of your first $10,000 in profits with $0 withdrawal fees, and a 90% profit split on all subsequent weekly payout cycles.',
      metric: '100% 1st $10K',
      highlight: '90% Lifetime Thereafter'
    },
    {
      icon: Monitor,
      tag: 'TradingView & Tradovate',
      title: 'Direct Chart Execution',
      desc: 'Execute directly on TradingView with real-time Level 1 & Level 2 CME data included at zero extra monthly cost.',
      metric: '$0 Data Fees',
      highlight: 'TradingView + NinjaTrader 8'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-neon-glow">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          The Modern Futures Prop Edge
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          Built Specifically for Futures Traders
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
          Say goodbye to restrictive rules. Trade CME futures with institutional order routing, trade copiers, and guaranteed weekly payouts.
        </p>
      </div>

      {/* 4-Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 hover:shadow-card-dark-hover transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                
                {/* Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-obsidian-950 text-emerald-400 flex items-center justify-center shadow-md border border-white/10 group-hover:scale-105 group-hover:border-emerald-500/50 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {feat.tag}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="font-serif font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {/* Bottom Metric Pill */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-emerald-400">
                  {feat.metric}
                </span>
                <span className="text-[10px] font-semibold text-stone-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                  {feat.highlight}
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Multi-Account Banner Callout */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 text-white border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Copy className="w-3.5 h-3.5" />
            Trade Copier Certified
          </div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Scale Up to 20 Simulated Accounts Under One Master Login
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
            Pass multiple accounts with a single master click. Trade $1,000,000+ in simulated capital across Tradovate &amp; NinjaTrader simultaneously.
          </p>
        </div>

        <button
          onClick={() => navigateToTab('pricing')}
          className="shimmer-btn gold-gradient-bg text-obsidian-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg hover:shadow-brass-glow transition-all whitespace-nowrap cursor-pointer shrink-0 relative z-10"
        >
          <span>Choose Your Challenge</span>
        </button>
      </div>

    </section>
  );
}
