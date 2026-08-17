import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Download, Share2, Check, Sparkles, Printer, ShieldCheck, Edit3 } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, account, user }) {
  const [copied, setCopied] = useState(false);
  const [traderName, setTraderName] = useState('ZACK');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (user && user.name) {
      setTraderName(user.name.toUpperCase());
    }
  }, [user]);

  if (!isOpen) return null;

  // Account details with resilient fallbacks
  const currentAcc = account || {};
  const numericCapital = Number(currentAcc.startingBalance || currentAcc.numericSize || 50000);
  const modelName = currentAcc.model || 'Growth';
  const sizeLabel = currentAcc.size || `${(numericCapital / 1000).toFixed(0)}K`;
  const planDisplay = `${modelName} ${sizeLabel}`;
  const certId = `APX-CERT-${(numericCapital / 100).toFixed(0)}`;
  const issueDate = '2026-08-17';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://apexfunded.io/verify/${certId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `I am officially a Verified Funded Trader (${planDisplay}) with @ApexFunded! 🚀 Passed the evaluation with disciplined risk management.`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
        className="relative w-full max-w-3xl bg-[#141416] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white select-none"
      >
        {/* Subtle Top Accent Border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-stone-800 via-emerald-500 to-brass-400" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-20"
          aria-label="Close Certificate Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-4 pr-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400">
              Verified Credential #{certId}
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            Click name to edit
          </span>
        </div>

        {/* ============================================================
            LUCID / APEX PRO DARK-MODE CINEMATIC CERTIFICATE
            ============================================================ */}
        <div 
          id="certificate-print-area"
          className="relative aspect-[16/10] w-full rounded-2xl bg-[#0B0B0D] border border-stone-800/90 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden ring-1 ring-white/10"
        >
          {/* Background Technical Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          {/* Glowing Luminous Swoosh / Orbit Light Arc */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg 
              className="w-full h-full object-cover" 
              viewBox="0 0 800 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="arcGlow" x1="100" y1="50" x2="750" y2="450" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                  <stop offset="35%" stopColor="#E2E8F0" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#CBD5E1" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.1" />
                </linearGradient>
                <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* Ambient blur glow behind arc */}
              <path
                d="M 280 90 C 450 160 760 220 740 360 C 720 440 520 420 180 320"
                stroke="#FFFFFF"
                strokeWidth="12"
                strokeOpacity="0.15"
                filter="url(#blurFilter)"
              />

              {/* Multiple fine orbital swoosh lines */}
              <path
                d="M 300 95 C 460 165 745 220 730 355 C 710 435 530 415 190 325"
                stroke="url(#arcGlow)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 330 110 C 490 180 755 235 740 360 C 720 435 550 415 220 335"
                stroke="url(#arcGlow)"
                strokeWidth="1.8"
                strokeOpacity="0.8"
                strokeLinecap="round"
              />
              <path
                d="M 360 125 C 520 195 765 250 750 365 C 730 435 570 415 250 345"
                stroke="url(#arcGlow)"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <path
                d="M 400 145 C 560 215 775 270 760 370 C 740 435 600 415 300 360"
                stroke="url(#arcGlow)"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          {/* Radial ambient glow orbs */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* ============================================================
              TOP ROW: TITLE, RECIPIENT & DATE
              ============================================================ */}
          <div className="relative z-10 flex items-start justify-between">
            
            {/* Top Left Title & Awarded To */}
            <div className="space-y-1 text-left">
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                ApexPro Trader <br />
                <span className="text-stone-300 font-medium">Certificate</span>
              </h2>

              <div className="pt-2">
                <span className="text-xs sm:text-sm font-sans font-bold text-emerald-400 tracking-wider uppercase block">
                  IS AWARDED TO
                </span>

                {/* Recipient Name (Editable) */}
                <div className="mt-0.5 inline-flex items-center gap-2 group">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={traderName}
                      onChange={(e) => setTraderName(e.target.value.toUpperCase())}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                      autoFocus
                      className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-wide bg-stone-900 border-b-2 border-emerald-400 outline-none uppercase px-1 py-0.5 rounded"
                    />
                  ) : (
                    <h3
                      onClick={() => setIsEditingName(true)}
                      className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-wide uppercase cursor-pointer hover:text-emerald-300 transition-colors flex items-center gap-2"
                      title="Click to edit name"
                    >
                      <span>{traderName}</span>
                      <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 text-stone-400 transition-opacity" />
                    </h3>
                  )}
                </div>
              </div>
            </div>

            {/* Top Right Date */}
            <div className="text-right">
              <span className="font-mono text-xs sm:text-sm font-semibold text-stone-400 tracking-wider">
                {issueDate}
              </span>
            </div>

          </div>

          {/* ============================================================
              CENTER ROW: GIANT TIER BADGE
              ============================================================ */}
          <div className="relative z-10 py-6 text-center my-auto">
            <motion.h1 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
            >
              {planDisplay}
            </motion.h1>
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-stone-400 mt-2">
              Verified Capital Allocation • Institutional Sim Routing
            </p>
          </div>

          {/* ============================================================
              BOTTOM ROW: BRAND EMBLEM & FOUNDER SIGNATURE
              ============================================================ */}
          <div className="relative z-10 flex items-end justify-between pt-4">
            
            {/* Bottom Left: Brand Mark */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-700 via-stone-900 to-black border border-stone-600 flex items-center justify-center text-brass-400 shadow-md">
                <span className="font-serif font-bold text-xs">◆</span>
              </div>
              <div className="text-left">
                <span className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-white block leading-tight">
                  APEX FUNDED
                </span>
                <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">
                  PROPRIETARY FIRM
                </span>
              </div>
            </div>

            {/* Bottom Right: Signature */}
            <div className="text-right">
              <div className="font-serif italic text-lg sm:text-xl font-bold text-stone-200 tracking-wide select-none">
                A. Sterling
              </div>
              <span className="text-[10px] font-sans text-stone-400 font-semibold uppercase tracking-wider block">
                CEO, Founder
              </span>
            </div>

          </div>

        </div>

        {/* ============================================================
            BOTTOM ACTIONS
            ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-stone-400" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareTwitter}
              className="px-4 py-2.5 rounded-xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Share on X</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="shimmer-btn px-5 py-2.5 rounded-xl gold-gradient-bg text-stone-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm hover:shadow-brass-glow cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-950" />
            <span>Download / Print</span>
          </button>

        </div>

      </motion.div>
    </div>
  );
}
