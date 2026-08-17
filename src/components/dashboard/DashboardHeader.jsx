import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Key, PlusCircle, Calendar, ShieldCheck, ChevronDown, Calculator, Award } from 'lucide-react';

export default function DashboardHeader({
  account,
  accounts,
  onSwitchAccount,
  onOpenLoginInfo,
  onOpenCalculator,
  onOpenCertificate,
  onBuyNew
}) {
  if (!account) return null;

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-4">
      
      {/* Top Meta Line: Breadcrumb & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Badges & Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Gold Account Badge */}
          <div className="gold-gradient-bg px-3.5 py-1.5 rounded-full text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="font-serif font-extrabold">◆</span>
            <span>{account.plan} - CHALLENGE</span>
          </div>

          {/* Account Selector Dropdown */}
          <div className="relative inline-block">
            <select
              value={account.id}
              onChange={(e) => {
                if (e.target.value === '__BUY_NEW__') {
                  onBuyNew();
                } else {
                  onSwitchAccount(e.target.value);
                }
              }}
              className="appearance-none pl-4 pr-9 py-1.5 rounded-full bg-stone-100/90 border border-stone-300 font-mono font-bold text-xs text-stone-950 focus:outline-none focus:ring-2 focus:ring-brass-400 cursor-pointer shadow-xs"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  Account: #{acc.id} (${new Intl.NumberFormat('en-US').format(acc.startingBalance)})
                </option>
              ))}
              <option value="__BUY_NEW__">+ Buy New Account...</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Badge */}
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
            ACTIVE
          </span>

          {/* Platform Tag */}
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800 border border-stone-200 shadow-xs">
            {account.platform}
          </span>
        </div>

        {/* Right Tools: Login Info, Certificate, Trading Cycle & Calculators */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Certificate of Funding Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenCertificate}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brass-100/90 border border-brass-300 text-stone-950 hover:bg-brass-200 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="View & Download Official Funded Trader Certificate"
          >
            <Award className="w-3.5 h-3.5 text-brass-800" />
            <span>Certificate</span>
          </motion.button>

          {/* Login Info Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenLoginInfo}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-stone-950 hover:bg-stone-900 text-brass-300 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-brass-400" />
            <span>Login Info</span>
          </motion.button>

          {/* Calculator Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCalculator}
            className="p-2 rounded-full border border-stone-300 hover:border-stone-400 bg-white text-stone-700 hover:text-stone-950 transition-colors shadow-sm cursor-pointer"
            title="Open Risk & Lot Size Calculator"
          >
            <Calculator className="w-4 h-4" />
          </motion.button>

        </div>

      </div>

    </div>
  );
}
