import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { activeTab, setActiveTab } = useApp();

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#E7E2DA] bg-[#FAF8F5]/90 pt-16 pb-12 text-stone-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-200/70">
          
          {/* Col 1-5: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-brass-400 font-serif font-bold text-lg shadow-sm">
                ◆
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-stone-950">
                Apex Funded
              </span>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
              Empowering disciplined traders worldwide with institutional simulation models, transparent evaluation metrics, and up to 90% profit splits.
            </p>
            <div className="pt-1 flex items-center gap-2 text-stone-500 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All Systems Operational • Tradovate, MetaTrader 5 &amp; NinjaTrader</span>
            </div>
          </div>

          {/* Col 6-8: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-950 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-stone-950 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="hover:text-stone-950 transition-colors"
                >
                  Evaluation Plans &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('rules')}
                  className="hover:text-stone-950 transition-colors"
                >
                  Trading Rules &amp; Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="hover:text-stone-950 transition-colors"
                >
                  Live Trader Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('help')}
                  className="hover:text-stone-950 transition-colors"
                >
                  Support &amp; Help Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Platforms & Payment Badges */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-950 uppercase tracking-wider">
              Trading Connectivity
            </h4>
            <p className="text-stone-600 leading-relaxed text-xs">
              Execute seamlessly on institutional platforms with ultra-low latency:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-semibold font-mono text-[11px] shadow-sm">
                MetaTrader 5
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-semibold font-mono text-[11px] shadow-sm">
                MetaTrader 4
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-semibold font-mono text-[11px] shadow-sm">
                Tradovate
              </span>
            </div>
          </div>

        </div>

        {/* Regulatory & Simulation Risk Disclaimer */}
        <div className="py-8 text-[11px] text-stone-500 leading-relaxed space-y-2 border-b border-stone-200/70">
          <p>
            <strong>Risk Disclosure &amp; Simulation Notice:</strong> Apex Funded (apexfunded.io) is an educational evaluation technology platform. All accounts provided to customers are simulated accounts operated with virtual currency within simulated market conditions. None of the activities on the platform involve real financial deposits, portfolio management, or real-money securities transactions.
          </p>
          <p>
            Past simulated performance is not indicative of future results. Simulated trading in financial markets involves substantial risk of loss and is not suitable for every individual.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Apex Funded Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-900 cursor-pointer">Risk Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
