import React from 'react';
import { useApp } from '../context/AppContext';
import Logo from './common/Logo';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { activeTab, navigateToTab } = useApp();

  const handleNavClick = (tabId) => {
    navigateToTab(tabId);
  };

  return (
    <footer className="mt-20 border-t border-white/10 glass-panel-dark pt-16 pb-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1-5: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => handleNavClick('home')} 
              className="cursor-pointer inline-block"
            >
              <Logo size="md" />
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Empowering disciplined futures traders worldwide with institutional CME simulation models, transparent evaluation metrics, 100% first $10K payouts, and trade copier support.
            </p>
            <div className="pt-1 flex items-center gap-2 text-stone-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational • CME Feeds, Tradovate, TradingView &amp; NinjaTrader 8</span>
            </div>
          </div>

          {/* Col 6-8: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Evaluation Plans &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('rules')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trading Rules &amp; Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Trader Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('help')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Support &amp; Help Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Platforms & Badges */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Trading Connectivity
            </h4>
            <p className="text-stone-400 leading-relaxed text-xs">
              Execute seamlessly on institutional futures platforms with zero CME market data fees:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-200 font-semibold font-mono text-[11px]">
                Tradovate
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-200 font-semibold font-mono text-[11px]">
                TradingView
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-200 font-semibold font-mono text-[11px]">
                NinjaTrader 8
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-200 font-semibold font-mono text-[11px]">
                MetaTrader 5
              </span>
            </div>
          </div>

        </div>

        {/* Regulatory & Simulation Risk Disclaimer */}
        <div className="py-8 text-[11px] text-stone-400 leading-relaxed space-y-2 border-b border-white/10">
          <p>
            <strong className="text-stone-300">Risk Disclosure &amp; Simulation Notice:</strong> Apex Funded is an educational evaluation technology platform. All accounts provided to customers are simulated accounts operated with virtual currency within simulated market conditions. None of the activities on the platform involve real financial deposits, portfolio management, or real-money securities transactions.
          </p>
          <p>
            Past simulated performance is not indicative of future results. Simulated trading in financial markets involves substantial risk of loss and is not suitable for every individual.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Apex Funded Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Risk Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
