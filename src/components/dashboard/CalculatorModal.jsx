import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, DollarSign, Percent, Scale, RefreshCw, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

export default function CalculatorModal({ isOpen, onClose }) {
  const [calcTab, setCalcTab] = useState('riskguard'); // 'riskguard' | 'lotsize' | 'pnl'

  // Pre-Trade Risk Guard State
  const [guardBalance, setGuardBalance] = useState(50000);
  const [dailyLossLimit, setDailyLossLimit] = useState(1250);
  const [guardInstrument, setGuardInstrument] = useState('NQ');
  const [guardLots, setGuardLots] = useState(2);
  const [guardStopLoss, setGuardStopLoss] = useState(15);

  // Lot Size State
  const [accountBalance, setAccountBalance] = useState(50000);
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [stopLossPips, setStopLossPips] = useState(15);
  const [instrument, setInstrument] = useState('NQ');

  // P&L State
  const [pnlInstrument, setPnlInstrument] = useState('NQ');
  const [lots, setLots] = useState(2);
  const [entryPrice, setEntryPrice] = useState(19812.50);
  const [exitPrice, setExitPrice] = useState(19842.25);
  const [tradeType, setTradeType] = useState('buy');

  if (!isOpen) return null;

  // Futures Point Values
  const pointValue = (instrument === 'NQ' ? 20 : instrument === 'ES' ? 50 : 10);
  const riskAmount = (accountBalance * (riskPercent / 100));
  const calculatedContracts = Math.max(1, Math.floor(riskAmount / (stopLossPips * pointValue)));

  // P&L calculations
  const pnlPointValue = (pnlInstrument === 'NQ' ? 20 : pnlInstrument === 'ES' ? 50 : (pnlInstrument === 'CL' ? 1000 : 100));
  const priceDiff = tradeType === 'buy' ? (exitPrice - entryPrice) : (entryPrice - exitPrice);
  const pnlResult = priceDiff * pnlPointValue * lots;

  // Risk Guard calculations
  const guardPointVal = (guardInstrument === 'NQ' ? 20 : guardInstrument === 'ES' ? 50 : 10);
  const guardTradeRisk = guardLots * guardStopLoss * guardPointVal;
  const guardDailyLimitPct = Math.min(100, Math.round((guardTradeRisk / dailyLossLimit) * 100));
  const remainingLossBuffer = Math.max(0, dailyLossLimit - guardTradeRisk);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-lg bg-obsidian-900/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white"
      >
        {/* Gold Trim Header */}
        <div className="h-1.5 w-full gold-gradient-bg"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-obsidian-950 text-emerald-400 flex items-center justify-center font-bold shadow-md border border-white/10">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Futures Position &amp; Risk Guard
              </h3>
              <p className="text-xs text-stone-400">
                Institutional CME Contract Calculators
              </p>
            </div>
          </div>

          {/* Calculator Tabs */}
          <div className="grid grid-cols-3 p-1 mb-6 rounded-2xl bg-obsidian-950 border border-white/10 text-xs font-semibold">
            {[
              { id: 'riskguard', label: 'Rule Risk Guard' },
              { id: 'lotsize', label: 'Contracts Sizer' },
              { id: 'pnl', label: 'P&L Calculator' }
            ].map((tab) => {
              const isSelected = calcTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCalcTab(tab.id)}
                  className={`relative py-2 rounded-xl transition-all cursor-pointer ${
                    isSelected ? 'text-obsidian-950 font-black' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="calcTabPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-emerald-500 rounded-xl shadow-neon-glow"
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
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
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
                  >
                    <option value={25000}>$25,000 Tier</option>
                    <option value={50000}>$50,000 Tier</option>
                    <option value={100000}>$100,000 Tier</option>
                    <option value={150000}>$150,000 Tier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Daily Loss Limit ($)
                  </label>
                  <input
                    type="number"
                    value={dailyLossLimit}
                    onChange={(e) => setDailyLossLimit(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Contract
                  </label>
                  <select
                    value={guardInstrument}
                    onChange={(e) => setGuardInstrument(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-semibold text-white text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
                  >
                    <option value="NQ">NQ ($20/pt)</option>
                    <option value="ES">ES ($50/pt)</option>
                    <option value="CL">CL ($10/tick)</option>
                    <option value="GC">GC ($10/tick)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Contracts
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={guardLots}
                    onChange={(e) => setGuardLots(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Stop Loss (Pts)
                  </label>
                  <input
                    type="number"
                    value={guardStopLoss}
                    onChange={(e) => setGuardStopLoss(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Risk Output & Safety Bar */}
              <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/10 shadow-2xl space-y-3 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">Trade Dollar Risk:</span>
                  <span className="font-mono font-bold text-base text-white">
                    ${guardTradeRisk.toFixed(2)}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-stone-400 mb-1">
                    <span>Daily Limit Consumed:</span>
                    <span className={`font-mono font-bold ${guardDailyLimitPct > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {guardDailyLimitPct}% of ${dailyLossLimit}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden border border-white/5">
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
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : guardDailyLimitPct <= 80
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {guardDailyLimitPct <= 50 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
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

          {/* 2. CONTRACT SIZE CALCULATOR */}
          {calcTab === 'lotsize' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Account Balance ($)
                  </label>
                  <input
                    type="number"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Risk Percent (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Stop Loss (Points)
                  </label>
                  <input
                    type="number"
                    value={stopLossPips}
                    onChange={(e) => setStopLossPips(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Instrument
                  </label>
                  <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-semibold text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
                  >
                    <option value="NQ">NQ (E-mini Nasdaq)</option>
                    <option value="ES">ES (E-mini S&P)</option>
                    <option value="CL">CL (Crude Oil)</option>
                    <option value="GC">GC (Gold Futures)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/10 shadow-2xl space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-semibold">Max Risk Capital:</span>
                  <span className="font-mono font-bold text-rose-400">
                    <AnimatedCounter value={riskAmount} prefix="$" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-white font-bold">Recommended Sizing:</span>
                  <span className="font-mono font-bold text-lg text-emerald-400">{calculatedContracts} Contracts</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. PNL CALCULATOR */}
          {calcTab === 'pnl' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Contract
                  </label>
                  <select
                    value={pnlInstrument}
                    onChange={(e) => {
                      const sym = e.target.value;
                      setPnlInstrument(sym);
                      if (sym === 'NQ') {
                        setEntryPrice(19812.50);
                        setExitPrice(19842.25);
                      } else if (sym === 'ES') {
                        setEntryPrice(5604.00);
                        setExitPrice(5614.50);
                      } else if (sym === 'CL') {
                        setEntryPrice(76.20);
                        setExitPrice(77.05);
                      } else if (sym === 'GC') {
                        setEntryPrice(2510.10);
                        setExitPrice(2518.30);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
                  >
                    <option value="NQ">NQ ($20/pt)</option>
                    <option value="ES">ES ($50/pt)</option>
                    <option value="CL">CL ($10/tick)</option>
                    <option value="GC">GC ($10/tick)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Contracts
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={lots}
                    onChange={(e) => setLots(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-xs focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Side
                  </label>
                  <div className="grid grid-cols-2 gap-1 p-0.5 bg-obsidian-950 rounded-xl border border-white/10 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setTradeType('buy')}
                      className={`py-1.5 rounded-lg cursor-pointer ${tradeType === 'buy' ? 'bg-emerald-500 text-obsidian-950 font-black' : 'text-stone-400'}`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeType('sell')}
                      className={`py-1.5 rounded-lg cursor-pointer ${tradeType === 'sell' ? 'bg-rose-500 text-white font-black' : 'text-stone-400'}`}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Target Exit Price
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 font-mono text-white text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/10 shadow-2xl space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-semibold">Estimated Gross P&amp;L:</span>
                  <span className={`font-mono font-bold text-lg ${pnlResult >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
