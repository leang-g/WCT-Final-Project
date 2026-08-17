import React from 'react';
import { Monitor, Download, ExternalLink, Shield, Server, Smartphone, Laptop } from 'lucide-react';

export default function DashboardPlatform({ account, onOpenLoginInfo }) {
  if (!account) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Active Platform Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E7E2DA] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-brass-400 flex items-center justify-center font-bold text-xl shadow-sm">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-brass-100 text-brass-900 px-2 py-0.5 rounded border border-brass-200">
                Connected
              </span>
              <h3 className="font-serif font-bold text-xl text-stone-950">
                {account.platform} Terminal
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Institutional order routing enabled on {account.platform}.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLoginInfo}
          className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider gold-gradient-bg text-stone-950 hover:shadow-brass-glow transition-all shadow-sm shrink-0 cursor-pointer"
        >
          View Connection Keys
        </button>
      </div>

      {/* Platform Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tradovate */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-base">
              T
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-950">
              Tradovate Web &amp; Desktop
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cloud-based futures trading with TradingView charts, custom DOM ladders, and real-time CME market data.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <a
              href="https://trader.tradovate.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 rounded-xl bg-stone-900 text-brass-300 hover:bg-stone-850 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Launch WebTrader
            </a>
          </div>
        </div>

        {/* MT5 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-sm">
              M5
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-950">
              MetaTrader 5
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Desktop application for Windows &amp; macOS with ultra-low latency execution and custom SMC indicators.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <a
              href="https://www.metatrader5.com/en/download"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 rounded-xl bg-stone-900 text-brass-300 hover:bg-stone-850 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download Desktop MT5
            </a>
          </div>
        </div>

        {/* NinjaTrader */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-sm border border-stone-700">
              NT
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-950">
              NinjaTrader 8
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Industry-standard futures trading terminal featuring SuperDOM, advanced charting, and automated strategy execution.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <a
              href="https://ninjatrader.com/download"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 rounded-xl bg-stone-900 text-brass-300 hover:bg-stone-850 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download NinjaTrader
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
