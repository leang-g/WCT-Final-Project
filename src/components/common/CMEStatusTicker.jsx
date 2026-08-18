import React, { useState, useEffect } from 'react';
import { cmeInstruments } from '../../data/propFirmData';
import { Activity, Clock, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function CMEStatusTicker() {
  const [selectedExchange, setSelectedExchange] = useState('All');
  const [estTime, setEstTime] = useState('');
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  // Live EST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      const estStr = new Intl.DateTimeFormat('en-US', options).format(now);
      setEstTime(estStr + ' EST');

      const estDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const day = estDate.getDay(); // 0 = Sun, 6 = Sat
      const hour = estDate.getHours();

      if (day === 6) {
        setIsMarketOpen(false); // Saturday closed
      } else if (day === 5 && hour >= 17) {
        setIsMarketOpen(false); // Friday after 5pm closed
      } else if (day === 0 && hour < 18) {
        setIsMarketOpen(false); // Sunday before 6pm closed
      } else if (hour === 17) {
        setIsMarketOpen(false); // Daily 5pm-6pm maintenance
      } else {
        setIsMarketOpen(true);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredInstruments = selectedExchange === 'All'
    ? cmeInstruments
    : cmeInstruments.filter(inst => inst.category === selectedExchange || inst.exchange === selectedExchange);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12 relative z-20">
      <div className="p-4 sm:p-5 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl backdrop-blur-2xl">
        
        {/* Top Session Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pb-3.5 border-b border-white/10 text-xs">
          
          {/* Left: CME Live Status */}
          <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white font-mono font-semibold shadow-xs">
              <span className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>CME FUTURES: {isMarketOpen ? 'SESSION OPEN' : 'DAILY BREAK'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-stone-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-brass-400" />
              <span>{estTime || 'Loading EST...'}</span>
            </div>

            <span className="hidden sm:inline text-stone-600">•</span>

            <div className="text-emerald-400 font-semibold flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Level 1 &amp; Level 2 CME Data ($0 Free)</span>
            </div>
          </div>

          {/* Right: TradingView + NinjaTrader badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Routing:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[11px] font-mono font-bold">
              TradingView
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-bold">
              Tradovate
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-600 text-stone-200 text-[11px] font-mono font-bold">
              NinjaTrader 8
            </span>
          </div>

        </div>

        {/* Bottom Ticker: CME Tradable Instruments Grid */}
        <div className="pt-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Supported CME Group Assets (Futures &amp; Micros)
            </span>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-[11px]">
              {['All', 'Indices', 'Micros', 'Energy', 'Metals'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedExchange(cat)}
                  className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedExchange === cat
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Contracts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {filteredInstruments.map(inst => (
              <div 
                key={inst.symbol} 
                className="p-2.5 rounded-xl bg-obsidian-950/70 hover:bg-obsidian-900 border border-white/10 hover:border-emerald-500/50 transition-all shadow-xs group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-white group-hover:text-emerald-400 transition-colors">
                    {inst.symbol}
                  </span>
                  <span className="text-[9px] font-mono text-stone-400 uppercase px-1 py-0.2 rounded bg-white/5 border border-white/10">
                    {inst.exchange}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5" title={inst.name}>
                  {inst.name}
                </div>
                <div className="text-[10px] font-mono font-bold text-emerald-400 mt-1">
                  {inst.pointValue}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
