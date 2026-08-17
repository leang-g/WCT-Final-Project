import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Award
} from 'lucide-react';
import AnimatedCounter from './common/AnimatedCounter';

export default function ProfitCalculator() {
  const { triggerGetFunded } = useApp();

  const [accountSize, setAccountSize] = useState(100000); // 25000, 50000, 100000, 150000
  const [monthlyReturnPct, setMonthlyReturnPct] = useState(6.0); // 2% to 15%
  const [splitPct, setSplitPct] = useState(90); // 80% to 90%

  const accountTiers = [
    { label: '$25,000', value: 25000, sizeStr: '25K', fee: 59 },
    { label: '$50,000', value: 50000, sizeStr: '50K', fee: 87 },
    { label: '$100,000', value: 100000, sizeStr: '100K', fee: 153 },
    { label: '$150,000', value: 150000, sizeStr: '150K', fee: 221 }
  ];

  const currentTierObj = accountTiers.find(t => t.value === accountSize) || accountTiers[2];

  // Mathematical Calculations
  const monthlyGrossProfit = accountSize * (monthlyReturnPct / 100);
  const traderTakeHome = monthlyGrossProfit * (splitPct / 100);
  const evaluationRefund = currentTierObj.fee;
  const firstMonthTotal = traderTakeHome + evaluationRefund;
  const roiMultiplier = ((firstMonthTotal / currentTierObj.fee) * 100).toFixed(0);

  const handleClaim = () => {
    triggerGetFunded({
      model: 'Growth',
      size: currentTierObj.sizeStr,
      numericSize: currentTierObj.value,
      platform: 'Tradovate',
      price: currentTierObj.fee,
      originalPrice: Math.round(currentTierObj.fee * 1.6),
      discountCode: 'AUG'
    });
  };

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brass-100/90 border border-brass-300 text-stone-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <Calculator className="w-3.5 h-3.5 text-brass-700" />
          Interactive Profit &amp; Payout Engine
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950 tracking-tight">
          Calculate Your Monthly Payout Potential
        </h2>
        <p className="text-stone-700 text-sm sm:text-base mt-3 leading-relaxed">
          See how simulated capital multiplies your trading returns compared to risking personal savings. Keep up to 90% of all generated profits with weekly payouts.
        </p>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-editorial ring-1 ring-white/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left 7 Columns: Interactive Controls & Sliders */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Control 1: Account Capital Tier Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  1. Select Simulated Capital Tier
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  ${(accountSize / 1000).toFixed(0)}K Account
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {accountTiers.map((tier) => {
                  const isSelected = accountSize === tier.value;

                  return (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setAccountSize(tier.value)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-950 text-brass-300 border-stone-950 shadow-md ring-2 ring-brass-400/30'
                          : 'bg-stone-50/80 border-stone-200/90 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span className="block font-serif font-bold text-base sm:text-lg">
                        {tier.label}
                      </span>
                      <span className={`block text-[10px] font-mono mt-0.5 ${isSelected ? 'text-brass-400' : 'text-stone-500'}`}>
                        Fee: ${tier.fee} (Refundable)
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Expected Monthly Return % Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  2. Expected Monthly Return Rate
                </label>
                <span className="text-lg font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-xl border border-emerald-200">
                  {monthlyReturnPct.toFixed(1)}% / month
                </span>
              </div>

              <input
                type="range"
                min="2.0"
                max="15.0"
                step="0.5"
                value={monthlyReturnPct}
                onChange={(e) => setMonthlyReturnPct(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#C59A45]"
              />

              <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1.5">
                <span>Conservative (2%)</span>
                <span>Realistic (6%–8%)</span>
                <span>High Performance (15%)</span>
              </div>
            </div>

            {/* Control 3: Profit Split Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  3. Trader Profit Share
                </label>
                <span className="text-xs font-mono font-bold text-stone-900">
                  {splitPct}% Split
                </span>
              </div>

              <div className="flex gap-3">
                {[80, 85, 90].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setSplitPct(pct)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                      splitPct === pct
                        ? 'bg-stone-950 text-brass-300 border-stone-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {pct}% Profit Split
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Dynamic Financial Summary Card */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-3xl bg-[#FAF8F5] border border-stone-300/80 shadow-card space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Calculated Projection
                  </span>
                  <h4 className="font-serif font-bold text-xl text-stone-950">
                    Your Take-Home Payout
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-300 shadow-xs">
                  {splitPct}% Trader Share
                </span>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Monthly Simulated Profit ({monthlyReturnPct}%):</span>
                  <span className="font-mono font-bold text-stone-950">
                    <AnimatedCounter value={monthlyGrossProfit} prefix="$" />
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Your {splitPct}% Profit Share:</span>
                  <span className="font-mono font-bold text-emerald-700 text-base">
                    <AnimatedCounter value={traderTakeHome} prefix="$" />
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-stone-600 flex items-center gap-1">
                    <span>100% Evaluation Fee Refund:</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 rounded">Bonus</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    +${evaluationRefund}
                  </span>
                </div>

                {/* Total Highlight */}
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Total Estimated First Month Payout
                  </span>
                  <div className="font-serif font-bold text-3xl text-emerald-700 font-mono mt-0.5">
                    <AnimatedCounter value={firstMonthTotal} prefix="$" />
                  </div>
                  <span className="text-[11px] text-stone-600 font-medium block mt-1">
                    An astonishing <strong className="text-stone-950 font-bold">{roiMultiplier}% return</strong> on your ${currentTierObj.fee} one-time evaluation fee.
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClaim}
                  className="shimmer-btn w-full py-4 rounded-2xl gold-gradient-bg text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-brass-glow cursor-pointer"
                >
                  <span>Start ${currentTierObj.sizeStr} Challenge — ${currentTierObj.fee}</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </motion.button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
