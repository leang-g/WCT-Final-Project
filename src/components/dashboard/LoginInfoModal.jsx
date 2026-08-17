import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Shield, Key, Server, User, Globe } from 'lucide-react';

export default function LoginInfoModal({ isOpen, onClose, account }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !account) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const loginId = account.id ? account.id.replace('APX-', '104') : '104928';
  const server = account.platform === 'Tradovate' ? 'ApexFunded-TradovateLive' : 'ApexFunded-MT5SimLive';
  const masterPass = 'Tr4d3r_Ap3x#2026';
  const investorPass = 'Inv_V13w0nly$99';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl shadow-2xl overflow-hidden"
      >
        
        {/* Top Gold Trim */}
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
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-950">
                Terminal Credentials
              </h3>
              <p className="text-xs text-stone-500">
                {account.plan} • {account.platform}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-brass-50 border border-brass-200 text-stone-800 text-xs mb-5 flex items-start gap-2.5 shadow-xs">
            <Shield className="w-4 h-4 text-brass-700 shrink-0 mt-0.5" />
            <span>
              Use these credentials to connect your simulated evaluation account directly to {account.platform}.
            </span>
          </div>

          <div className="space-y-3">
            
            {/* Server */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Server Name</span>
                <span className="font-mono font-bold text-stone-900 text-xs">{server}</span>
              </div>
              <button
                onClick={() => copyToClipboard(server, 'server')}
                className="p-1.5 px-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
              >
                {copiedField === 'server' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'server' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Login / Account Number */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Login / Account ID</span>
                <span className="font-mono font-bold text-stone-950 text-sm">{loginId}</span>
              </div>
              <button
                onClick={() => copyToClipboard(loginId, 'login')}
                className="p-1.5 px-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
              >
                {copiedField === 'login' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'login' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Master Password */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Master Trader Password</span>
                <span className="font-mono font-bold text-stone-900 text-xs">{masterPass}</span>
              </div>
              <button
                onClick={() => copyToClipboard(masterPass, 'master')}
                className="p-1.5 px-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
              >
                {copiedField === 'master' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'master' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Investor Password */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Read-Only Investor Password</span>
                <span className="font-mono font-bold text-stone-900 text-xs">{investorPass}</span>
              </div>
              <button
                onClick={() => copyToClipboard(investorPass, 'investor')}
                className="p-1.5 px-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
              >
                {copiedField === 'investor' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'investor' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

          </div>

          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-950 hover:bg-stone-900 text-brass-300 transition-colors cursor-pointer shadow-sm"
            >
              Done
            </motion.button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
