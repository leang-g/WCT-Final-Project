import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Download, Share2, Check, Sparkles, ShieldCheck, ExternalLink, QrCode } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, account, user }) {
  const [copied, setCopied] = useState(false);
  const [traderName, setTraderName] = useState(user ? user.name : 'Alex Mercer');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const currentAcc = account || {
    accountNumber: 'APX-104928',
    size: '100K',
    numericSize: 100000,
    model: 'Growth',
    platform: 'Tradovate'
  };

  const certId = `APX-CERT-2026-${(currentAcc.numericSize / 100).toFixed(0)}`;
  const issueDate = 'August 17, 2026';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://apexfunded.io/verify/${certId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`I am officially a $${(currentAcc.numericSize).toLocaleString()} Verified Funded Trader with @ApexFunded! 🚀 Certified execution and weekly payouts.`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
      >
        {/* Gold Trim Header */}
        <div className="absolute top-0 inset-x-0 h-1.5 gold-gradient-bg" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 bg-stone-200/60 hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title Bar */}
        <div className="flex items-center justify-between mb-5 pr-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brass-700 block">
              Official Achievement
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-950">
              Funded Trader Certificate
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
            #{certId}
          </span>
        </div>

        {/* ============================================================
            PRINTABLE / SHARABLE LUXURY CERTIFICATE CARD
            ============================================================ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-brass-400/90 shadow-card text-center space-y-4 relative overflow-hidden ring-4 ring-brass-400/10">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial from-brass-100/30 via-transparent to-transparent pointer-events-none" />

          {/* Certificate Header Emblem */}
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-2xl bg-stone-950 text-brass-400 flex items-center justify-center font-serif font-bold text-2xl shadow-md border border-stone-800">
              ◆
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brass-800 font-bold block">
              Apex Funded Trading Proprietary Firm
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 tracking-tight">
              Certificate of Funded Trading
            </h2>
            <p className="text-stone-500 text-xs italic">
              This official credential certifies that
            </p>
          </div>

          {/* Trader Name & Account */}
          <div className="py-2 border-y border-stone-200/80 my-3">
            {isEditingName ? (
              <input
                type="text"
                value={traderName}
                onChange={(e) => setTraderName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                autoFocus
                className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 text-center border-b-2 border-brass-500 bg-transparent outline-none w-full max-w-sm mx-auto"
              />
            ) : (
              <h3 
                onClick={() => setIsEditingName(true)}
                className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 tracking-tight cursor-pointer hover:text-brass-800 transition-colors"
                title="Click to edit name"
              >
                {traderName}
              </h3>
            )}

            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              has successfully proven market edge, risk discipline, and execution consistency on the{' '}
              <strong className="text-stone-900 font-semibold">{currentAcc.model} {currentAcc.size}</strong> challenge model.
            </p>
          </div>

          {/* Allocated Capital Box */}
          <div className="inline-block p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">
              Verified Capital Allocation
            </span>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-emerald-700 font-mono">
              ${(currentAcc.numericSize).toLocaleString()}.00 USD
            </div>
            <span className="text-[10px] text-stone-600 font-mono">
              Platform: {currentAcc.platform || 'Tradovate CME'} • Up to 90% Profit Split
            </span>
          </div>

          {/* Footer Signature & Date */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 text-left text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Date Certified</span>
              <strong className="text-stone-900 font-semibold">{issueDate}</strong>
            </div>

            {/* Official Gold Seal Emblem */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gold-gradient-bg text-stone-950 flex items-center justify-center font-bold text-[10px] shadow-sm ring-2 ring-brass-400/40">
                SEAL
              </div>
            </div>

            <div className="text-right">
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Chief Risk Officer</span>
              <strong className="text-stone-900 font-serif italic text-sm">V. Sterling</strong>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-stone-600" />}
              <span>{copied ? 'Verification Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareTwitter}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Share on X / Twitter</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrintCertificate}
            className="shimmer-btn px-5 py-2.5 rounded-xl gold-gradient-bg text-stone-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm hover:shadow-brass-glow cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>Download PDF / Print</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
