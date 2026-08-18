import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Zap,
  Award,
  Copy
} from 'lucide-react';
import AnimatedCounter from './common/AnimatedCounter';

export default function ProfitCalculator() {
  const { triggerGetFunded } = useApp();

  // Futures Asset Definitions
  const futuresAssets = [
    { key: 'NQ', name: 'E-mini Nasdaq (NQ)', pointValue: 20, defaultPoints: 15, maxPoints: 50, step: 1, unit: 'pts' },
    { key: 'ES', name: 'E-mini S&P (ES)', pointValue: 50, defaultPoints: 6, maxPoints: 20, step: 0.5, unit: 'pts' },
    { key: 'MNQ', name: 'Micro Nasdaq (MNQ)', pointValue: 2, defaultPoints: 20, maxPoints: 80, step: 2, unit: 'pts' },
    { key: 'MES', name: 'Micro S&P (MES)', pointValue: 5, defaultPoints: 8, maxPoints: 30, step: 1, unit: 'pts' },
    { key: 'CL', name: 'Crude Oil (CL)', pointValue: 10, defaultPoints: 30, maxPoints: 100, step: 5, unit: 'ticks' },
    { key: 'GC', name: 'Gold Futures (GC)', pointValue: 10, defaultPoints: 25, maxPoints: 100, step: 5, unit: 'ticks' }
  ];

  const [selectedAssetKey, setSelectedAssetKey] = useState('NQ');
  const [contractsCount, setContractsCount] = useState(2);
  const [pointsTarget, setPointsTarget] = useState(15);
  const [tradingDays, setTradingDays] = useState(20);
  const [accountsCount, setAccountsCount] = useState(3); // 1 to 20 accounts

  const currentAsset = futuresAssets.find(a => a.key === selectedAssetKey) || futuresAssets[0];

  // Mathematical Calculations
  const dailyPnLPerAccount = pointsTarget * currentAsset.pointValue * contractsCount;
  const monthlyGrossPerAccount = dailyPnLPerAccount * tradingDays;
  
  // 100% of first $10,000, 90% thereafter
  const calculateTraderPayoutPerAccount = (gross) => {
    if (gross <= 10000) {
      return gross; // 100% of first $10K
    }
    return 10000 + (gross - 10000) * 0.90; // 10K + 90% of remainder
  };

  const traderTakeHomePerAccount = calculateTraderPayoutPerAccount(monthlyGrossPerAccount);
  const totalMultiAccountPayout = traderTakeHomePerAccount * accountsCount;
  const totalMultiAccountGross = monthlyGrossPerAccount * accountsCount;

  const handleClaim = () => {
    triggerGetFunded({
      model: 'Growth',
      size: '50K',
      numericSize: 50000,
      platform: 'Tradovate',
      price: 87,
      originalPrice: 145,
      discountCode: 'AUG'
    });
  };

  return (
    <section id="calculator" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brass-100/90 border border-brass-300 text-stone-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <Calculator className="w-3.5 h-3.5 text-brass-700" />
          Futures Points &amp; Multi-Account Calculator
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950 tracking-tight">
          Estimate Your CME Futures Payouts
        </h2>
        <p className="text-stone-700 text-sm sm:text-base mt-3 leading-relaxed">
          Calculate your net returns based on contracts, point targets, and trade copier multi-account scaling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ============================================================
            LEFT: INTERACTIVE FUTURES PARAMETERS (7 COLS)
            ============================================================ */}
        <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E2DA] shadow-card flex flex-col justify-between space-y-7">
          
          {/* 1. Asset Selection Pills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                1. Select Futures Instrument
              </label>
              <span className="text-xs font-mono font-bold text-brass-800 bg-brass-100/80 px-2 py-0.5 rounded">
                ${currentAsset.pointValue}.00 / {currentAsset.unit === 'pts' ? 'Point' : 'Tick'}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {futuresAssets.map(asset => (
                <button
                  key={asset.key}
                  onClick={() => {
                    setSelectedAssetKey(asset.key);
                    setPointsTarget(asset.defaultPoints);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedAssetKey === asset.key
                      ? 'bg-stone-950 text-brass-300 border-stone-900 shadow-sm font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  <div className="font-mono font-bold text-xs sm:text-sm">{asset.key}</div>
                  <div className="text-[9px] text-stone-400 font-mono mt-0.5">${asset.pointValue}/{asset.unit === 'pts' ? 'pt' : 'tk'}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Number of Contracts Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Contracts Traded Per Position
              </label>
              <span className="font-mono font-bold text-sm sm:text-base text-stone-950 bg-stone-100 px-3 py-0.5 rounded-lg border border-stone-200">
                {contractsCount} {contractsCount === 1 ? 'Contract' : 'Contracts'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={contractsCount}
              onChange={(e) => setContractsCount(Number(e.target.value))}
              className="w-full accent-stone-950 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-1">
              <span>1 Contract</span>
              <span>4 Contracts</span>
              <span>8 Contracts</span>
              <span>12 Contracts (Max)</span>
            </div>
          </div>

          {/* 3. Daily Target in Points/Ticks Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                3. Daily Target ({currentAsset.unit.toUpperCase()})
              </label>
              <span className="font-mono font-bold text-sm sm:text-base text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-lg border border-emerald-200">
                +{pointsTarget} {currentAsset.unit} / day
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={currentAsset.maxPoints}
              step={currentAsset.step}
              value={pointsTarget}
              onChange={(e) => setPointsTarget(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-1">
              <span>1 {currentAsset.unit}</span>
              <span>{Math.round(currentAsset.maxPoints / 2)} {currentAsset.unit}</span>
              <span>{currentAsset.maxPoints} {currentAsset.unit}</span>
            </div>
          </div>

          {/* 4. Multi-Account Copier Slider (1 to 20 Accounts) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-brass-700" />
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  4. Multi-Account Trade Copier
                </label>
              </div>
              <span className="font-mono font-bold text-sm text-stone-950 bg-brass-100 text-brass-950 px-2.5 py-0.5 rounded-md border border-brass-300">
                {accountsCount} {accountsCount === 1 ? 'Master Account' : 'Synced Accounts'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={accountsCount}
              onChange={(e) => setAccountsCount(Number(e.target.value))}
              className="w-full accent-brass-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-1">
              <span>1 Account</span>
              <span>5 Accounts</span>
              <span>10 Accounts</span>
              <span>20 Accounts (Max)</span>
            </div>
          </div>

        </div>

        {/* ============================================================
            RIGHT: PROJECTED PAYOUT & CASHFLOW CARD (5 COLS)
            ============================================================ */}
        <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-stone-950 text-white border border-stone-800 shadow-2xl flex flex-col justify-between relative overflow-hidden space-y-6">
          
          {/* Subtle Ambient Gold Glow */}
          <div 
            className="w-48 h-48 bg-[#C59A45]/20 rounded-full blur-3xl pointer-events-none absolute -top-10 -right-10" 
            aria-hidden="true" 
          />

          <div className="relative z-10 space-y-5">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% 1st $10K • 90% Split
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {tradingDays} Trading Days / mo
              </span>
            </div>

            {/* Estimated Total Take-Home Payout */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block">
                Total Projected Trader Payout
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-brass-300 tracking-tight">
                  $<AnimatedCounter value={totalMultiAccountPayout} />
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  / month
                </span>
              </div>
              {accountsCount > 1 && (
                <p className="text-[11px] text-emerald-400 font-mono mt-1">
                  Includes ${Math.round(traderTakeHomePerAccount).toLocaleString()} per account across {accountsCount} accounts
                </p>
              )}
            </div>

            {/* Breakdown Stats */}
            <div className="space-y-3 pt-3 border-t border-stone-800 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-300">
                <span>Daily PnL / Account:</span>
                <span className="font-mono font-bold text-white">${dailyPnLPerAccount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Monthly Gross / Account:</span>
                <span className="font-mono font-bold text-white">${monthlyGrossPerAccount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Profit Split Policy:</span>
                <span className="font-mono font-bold text-emerald-400">100% first $10K, 90% after</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Withdrawal Fee:</span>
                <span className="font-mono font-bold text-emerald-400">$0 (Free Weekly Payouts)</span>
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClaim}
              className="shimmer-btn w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest gold-gradient-bg text-stone-950 hover:shadow-brass-glow transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Launch Evaluation Challenge</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </motion.button>
            <p className="text-[10px] text-stone-500 text-center font-mono mt-2">
              Level 1 &amp; Level 2 CME Market Data Included with Challenge
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
