import React from 'react';
import { Monitor, Download, ExternalLink, Shield, Server, Smartphone, Laptop } from 'lucide-react';

export default function DashboardPlatform({ account, onOpenLoginInfo }) {
  if (!account) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Active Platform Banner */}
      <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-obsidian-950 border border-white/10 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-sm">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Connected
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                {account.platform} Terminal
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Institutional CME order routing enabled on {account.platform}.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLoginInfo}
          className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider gold-gradient-bg text-obsidian-950 hover:shadow-brass-glow transition-all shadow-md shrink-0 cursor-pointer"
        >
          View Connection Keys
        </button>
      </div>

      {/* Platform Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TradingView / Tradovate */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 flex items-center justify-center font-mono font-bold text-base">
              TV
            </div>
            <h4 className="font-serif font-bold text-lg text-white">
              TradingView &amp; Tradovate
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Direct TradingView chart integration with cloud order routing, custom DOM ladders, and real-time CME feeds.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <a
              href="https://trader.tradovate.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/15"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Launch WebTrader
            </a>
          </div>
        </div>

        {/* NinjaTrader 8 */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-600 text-stone-200 flex items-center justify-center font-mono font-bold text-sm">
              NT
            </div>
            <h4 className="font-serif font-bold text-lg text-white">
              NinjaTrader 8
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Industry-standard desktop terminal with full Replikanto trade copier support and multi-account group trading.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <a
              href="https://ninjatrader.com/download"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/15"
            >
              <Download className="w-3.5 h-3.5" />
              Download NinjaTrader
            </a>
          </div>
        </div>

        {/* MT5 */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
              M5
            </div>
            <h4 className="font-serif font-bold text-lg text-white">
              MetaTrader 5
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Desktop application for Windows &amp; macOS with ultra-low latency execution and custom algorithmic indicators.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <a
              href="https://www.metatrader5.com/en/download"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/15"
            >
              <Download className="w-3.5 h-3.5" />
              Download Desktop MT5
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
