import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, DollarSign, Percent, Scale, RefreshCw, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

export default function CalculatorModal({ isOpen, onClose }) {
  const [calcTab, setCalcTab] = useState('riskguard'); // 'riskguard' | 'lotsize' | 'pnl'

  // Pre-Trade Risk Guard State
  const [guardBalance, setGuardBalance] = useState(50000);
  const [dailyLossLimit, setDailyLossLimit] = useState(1250);
  const [guardInstrument, setGuardInstrument] = useState('EURUSD');
  const [guardLots, setGuardLots] = useState(1.5);
  const [guardStopLoss, setGuardStopLoss] = useState(25);

  // Lot Size State
  const [accountBalance, setAccountBalance] = useState(50000);
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [stopLossPips, setStopLossPips] = useState(25);
  const [instrument, setInstrument] = useState('EURUSD');

  // P&L State
  const [lots, setLots] = useState(1.0);
  const [entryPrice, setEntryPrice] = useState(1.0850);
  const [exitPrice, setExitPrice] = useState(1.0920);
  const [tradeType, setTradeType] = useState('buy');

  if (!isOpen) return null;

  // Lot size calculations
  const riskAmount = (accountBalance * (riskPercent / 100));
  const pipValuePerLot = instrument.includes('JPY') ? 6.8 : 10;
  const calculatedLots = (riskAmount / (stopLossPips * pipValuePerLot)).toFixed(2);

  // P&L calculations
  const priceDiff = tradeType === 'buy' ? (exitPrice - entryPrice) : (entryPrice - exitPrice);
  const pnlResult = (priceDiff * 100000 * lots);

  // Risk Guard calculations
  const guardPipVal = guardInstrument.includes('JPY') ? 6.8 : guardInstrument === 'NQ' ? 20 : 10;
  const guardTradeRisk = guardLots * guardStopLoss * guardPipVal;
  const guardDailyLimitPct = Math.min(100, Math.round((guardTradeRisk / dailyLossLimit) * 100));
  const remainingLossBuffer = Math.max(0, dailyLossLimit - guardTradeRisk);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Gold Trim Header */}
        <div className="h-1.5 w-full gold-gradient-bg"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-stone-950 text-brass-400 flex items-center justify-center font-bold shadow-md border border-stone-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-950">
                Trader Calculators
              </h3>
              <p className="text-xs text-stone-500">
                Institutional Risk &amp; Position Sizing Tools
              </p>
            </div>
          </div>

          {/* Calculator Tabs */}
          <div className="grid grid-cols-3 p-1 mb-6 rounded-2xl bg-stone-200/70 border border-stone-300/60 text-xs font-semibold">
            {[
              { id: 'riskguard', label: 'Rule Risk Guard' },
              { id: 'lotsize', label: 'Position Sizer' },
              { id: 'pnl', label: 'P&L Calculator' }
            ].map((tab) => {
              const isSelected = calcTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCalcTab(tab.id)}
                  className={`relative py-2 rounded-xl transition-all cursor-pointer ${
                    isSelected ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="calcTabPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 1. PRE-TRADE RISK GUARD */}
          {calcTab === 'riskguard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Account Balance ($)
                  </label>
                  <select
                    value={guardBalance}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setGuardBalance(val);
                      if (val === 25000) setDailyLossLimit(600);
                      else if (val === 50000) setDailyLossLimit(1250);
                      else if (val === 100000) setDailyLossLimit(2500);
                      else if (val === 150000) setDailyLossLimit(3750);
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none cursor-pointer"
                  >
                    <option value={25000}>$25,000 Tier</option>
                    <option value={50000}>$50,000 Tier</option>
                    <option value={100000}>$100,000 Tier</option>
                    <option value={150000}>$150,000 Tier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Daily Loss Limit ($)
                  </label>
                  <input
                    type="number"
                    value={dailyLossLimit}
                    onChange={(e) => setDailyLossLimit(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Instrument
                  </label>
                  <select
                    value={guardInstrument}
                    onChange={(e) => setGuardInstrument(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-white border border-stone-300 font-semibold text-stone-900 text-xs focus:ring-2 focus:ring-brass-400 focus:outline-none cursor-pointer"
                  >
                    <option value="EURUSD">EURUSD</option>
                    <option value="NQ">NQ Futures</option>
                    <option value="XAUUSD">Gold Spot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Lots / Contracts
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={guardLots}
                    onChange={(e) => setGuardLots(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Stop Loss (Pips)
                  </label>
                  <input
                    type="number"
                    value={guardStopLoss}
                    onChange={(e) => setGuardStopLoss(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Risk Output & Safety Bar */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-card space-y-3 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">Trade Dollar Risk:</span>
                  <span className="font-mono font-bold text-base text-stone-950">
                    ${guardTradeRisk.toFixed(2)}
                  </span>
                </div>

                {/* Progress bar of daily loss */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-stone-600 mb-1">
                    <span>Daily Limit Consumed:</span>
                    <span className={`font-mono font-bold ${guardDailyLimitPct > 80 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {guardDailyLimitPct}% of ${dailyLossLimit}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        guardDailyLimitPct > 80 ? 'bg-rose-500' : guardDailyLimitPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, guardDailyLimitPct)}%` }}
                    />
                  </div>
                </div>

                {/* Status Indicator */}
                <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  guardDailyLimitPct <= 50 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : guardDailyLimitPct <= 80
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}>
                  {guardDailyLimitPct <= 50 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>
                    {guardDailyLimitPct <= 50 
                      ? `Rule Safe: You have $${remainingLossBuffer.toFixed(0)} room remaining.`
                      : guardDailyLimitPct <= 80
                      ? `Caution: This trade risks ${guardDailyLimitPct}% of your daily loss.`
                      : `Rule Danger: High risk of exceeding your $${dailyLossLimit} daily limit!`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. LOT SIZE CALCULATOR */}
          {calcTab === 'lotsize' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Account Balance ($)
                  </label>
                  <input
                    type="number"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Risk Percent (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Stop Loss (Pips)
                  </label>
                  <input
                    type="number"
                    value={stopLossPips}
                    onChange={(e) => setStopLossPips(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Instrument
                  </label>
                  <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-semibold text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none cursor-pointer"
                  >
                    <option value="EURUSD">EURUSD</option>
                    <option value="GBPUSD">GBPUSD</option>
                    <option value="USDJPY">USDJPY</option>
                    <option value="XAUUSD">XAUUSD (Gold)</option>
                    <option value="US30">US30 (Dow Jones)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-editorial space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-semibold">Max Risk Capital:</span>
                  <span className="font-mono font-bold text-rose-700">
                    <AnimatedCounter value={riskAmount} prefix="$" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                  <span className="text-stone-950 font-bold">Recommended Position:</span>
                  <span className="font-mono font-bold text-lg text-emerald-700">{calculatedLots} Lots</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. PNL CALCULATOR */}
          {calcTab === 'pnl' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Position Lots
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={lots}
                    onChange={(e) => setLots(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Trade Direction
                  </label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setTradeType('buy')}
                      className={`py-1.5 rounded-lg cursor-pointer ${tradeType === 'buy' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600'}`}
                    >
                      Buy / Long
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeType('sell')}
                      className={`py-1.5 rounded-lg cursor-pointer ${tradeType === 'sell' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-600'}`}
                    >
                      Sell / Short
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Target Exit Price
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-mono text-stone-900 text-sm focus:ring-2 focus:ring-brass-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-editorial space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-semibold">Estimated Gross P&amp;L:</span>
                  <span className={`font-mono font-bold text-lg ${pnlResult >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    <AnimatedCounter value={pnlResult} prefix={pnlResult >= 0 ? '+$' : '-$'} />
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
