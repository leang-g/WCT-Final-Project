import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Activity, 
  DollarSign, 
  Zap, 
  RefreshCw,
  Sliders,
  ShieldAlert
} from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

export default function LiveTradeSimulator({ activeAccount, onTradeExecuted }) {
  const [instrument, setInstrument] = useState('EURUSD'); // 'EURUSD' | 'NQ' | 'XAUUSD'
  const [lotSize, setLotSize] = useState(1.0);
  const [openPositions, setOpenPositions] = useState([
    {
      id: 'POS-901',
      instrument: 'EURUSD',
      type: 'BUY',
      lots: 1.5,
      openPrice: 1.08640,
      currentPrice: 1.08715,
      pnl: 112.50,
      time: '14:23:05'
    }
  ]);
  const [lastNotification, setLastNotification] = useState(null);

  // Live Simulated Prices
  const [prices, setPrices] = useState({
    EURUSD: { bid: 1.08710, ask: 1.08715, spread: 0.1 },
    NQ: { bid: 20140.25, ask: 20140.75, spread: 0.5 },
    XAUUSD: { bid: 2642.80, ask: 2643.10, spread: 0.2 }
  });

  // Price Tick Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const deltaEUR = (Math.random() - 0.49) * 0.00015;
        const deltaNQ = (Math.random() - 0.49) * 1.5;
        const deltaGold = (Math.random() - 0.49) * 0.4;

        const newEUR = parseFloat((prev.EURUSD.bid + deltaEUR).toFixed(5));
        const newNQ = parseFloat((prev.NQ.bid + deltaNQ).toFixed(2));
        const newGold = parseFloat((prev.XAUUSD.bid + deltaGold).toFixed(2));

        // Update floating positions P&L
        setOpenPositions(currPositions => 
          currPositions.map(pos => {
            let curP = newEUR;
            let pointMult = 100000;

            if (pos.instrument === 'NQ') {
              curP = newNQ;
              pointMult = 20; // $20 per point on NQ
            } else if (pos.instrument === 'XAUUSD') {
              curP = newGold;
              pointMult = 100;
            }

            const diff = pos.type === 'BUY' ? (curP - pos.openPrice) : (pos.openPrice - curP);
            const livePnl = parseFloat((diff * pointMult * pos.lots).toFixed(2));

            return {
              ...pos,
              currentPrice: curP,
              pnl: livePnl
            };
          })
        );

        return {
          EURUSD: { bid: newEUR, ask: parseFloat((newEUR + 0.00005).toFixed(5)), spread: 0.1 },
          NQ: { bid: newNQ, ask: parseFloat((newNQ + 0.50).toFixed(2)), spread: 0.5 },
          XAUUSD: { bid: newGold, ask: parseFloat((newGold + 0.30).toFixed(2)), spread: 0.2 }
        };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleOpenOrder = (type) => {
    const curPriceObj = prices[instrument];
    const openPrice = type === 'BUY' ? curPriceObj.ask : curPriceObj.bid;

    const newPos = {
      id: `POS-${Math.floor(Math.random() * 899 + 100)}`,
      instrument,
      type,
      lots: lotSize,
      openPrice,
      currentPrice: openPrice,
      pnl: 0.00,
      time: new Date().toLocaleTimeString()
    };

    setOpenPositions(prev => [newPos, ...prev]);
    setLastNotification({
      type: 'success',
      msg: `Opened ${type} ${lotSize} lot ${instrument} @ ${openPrice}`
    });

    setTimeout(() => setLastNotification(null), 3500);
  };

  const handleClosePosition = (id) => {
    const posToClose = openPositions.find(p => p.id === id);
    if (!posToClose) return;

    setOpenPositions(prev => prev.filter(p => p.id !== id));
    
    if (onTradeExecuted) {
      onTradeExecuted(posToClose.pnl);
    }

    setLastNotification({
      type: posToClose.pnl >= 0 ? 'success' : 'alert',
      msg: `Closed ${posToClose.instrument} #${posToClose.id} with ${posToClose.pnl >= 0 ? '+' : ''}$${posToClose.pnl.toFixed(2)} P&L`
    });

    setTimeout(() => setLastNotification(null), 3500);
  };

  const totalFloatingPnl = openPositions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2DA] shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-950 text-brass-400 flex items-center justify-center font-bold shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-xl text-stone-950">
                Live Execution Simulator
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                TICKING LIVE
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Test execution speeds, floating drawdowns, and live positions in real time.
            </p>
          </div>
        </div>

        {/* Floating P&L Summary Pill */}
        <div className="text-right bg-stone-50 px-3.5 py-1.5 rounded-2xl border border-stone-200">
          <span className="text-[10px] font-bold text-stone-500 uppercase block">Floating P&amp;L</span>
          <span className={`font-mono font-bold text-base ${totalFloatingPnl >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {totalFloatingPnl >= 0 ? '+' : ''}${totalFloatingPnl.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notification Banner */}
      <AnimatePresence>
        {lastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs ${
              lastNotification.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                : 'bg-rose-50 text-rose-900 border border-rose-300'
            }`}
          >
            <span>{lastNotification.msg}</span>
            <button onClick={() => setLastNotification(null)} className="cursor-pointer">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Entry Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Instrument Selector */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Select Asset
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'EURUSD', name: 'EUR/USD', desc: 'Forex' },
              { key: 'NQ', name: 'NQ Futures', desc: 'Indices' },
              { key: 'XAUUSD', name: 'Gold Spot', desc: 'Commodity' }
            ].map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => setInstrument(item.key)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  instrument === item.key
                    ? 'bg-stone-950 text-brass-300 border-stone-950 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                }`}
              >
                <strong className="block text-xs">{item.name}</strong>
                <span className="text-[10px] opacity-75 font-mono">
                  {prices[item.key]?.bid}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lot Size Selection */}
        <div className="md:col-span-3 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Contracts / Lots
            </label>
            <span className="text-xs font-mono font-bold text-stone-900">{lotSize} lot</span>
          </div>
          <div className="flex gap-1.5">
            {[0.5, 1.0, 2.0, 5.0].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setLotSize(val)}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                  lotSize === val
                    ? 'bg-stone-800 text-brass-300 border-stone-800'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Execution Buy / Sell Buttons */}
        <div className="md:col-span-4 flex gap-2.5 pt-2 md:pt-6">
          <button
            type="button"
            onClick={() => handleOpenOrder('BUY')}
            className="flex-1 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center shadow-xs cursor-pointer"
          >
            <span>BUY / LONG</span>
            <span className="font-mono text-[11px] opacity-90">{prices[instrument]?.ask}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenOrder('SELL')}
            className="flex-1 py-3 px-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center shadow-xs cursor-pointer"
          >
            <span>SELL / SHORT</span>
            <span className="font-mono text-[11px] opacity-90">{prices[instrument]?.bid}</span>
          </button>
        </div>

      </div>

      {/* Active Live Positions Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
          <span>Active Open Positions ({openPositions.length})</span>
          <span>Zero Slippage Execution</span>
        </div>

        {openPositions.length === 0 ? (
          <div className="p-6 rounded-2xl bg-stone-50 border border-dashed border-stone-200 text-center text-xs text-stone-500">
            No active positions open. Click BUY or SELL above to simulate live trades.
          </div>
        ) : (
          <div className="space-y-2">
            {openPositions.map((pos) => (
              <div 
                key={pos.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs transition-all hover:border-stone-300"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                    pos.type === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {pos.type} {pos.lots}x
                  </span>
                  <div>
                    <strong className="text-stone-950 font-bold block">{pos.instrument}</strong>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Open: {pos.openPrice} • Cur: {pos.currentPrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`font-mono font-bold text-sm block ${pos.pnl >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{pos.time}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClosePosition(pos.id)}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-[11px] font-bold transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
