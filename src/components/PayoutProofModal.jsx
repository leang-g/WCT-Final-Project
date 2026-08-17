import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ExternalLink, ArrowDownRight, Award, DollarSign } from 'lucide-react';

export default function PayoutProofModal({ payout, isOpen, onClose }) {
  if (!isOpen || !payout) return null;

  const payoutId = `APX-PAY-${Math.abs(Math.sin(payout.amount) * 899999 + 100000).toFixed(0)}`;
  const txRef = `0x${Math.abs(Math.cos(payout.amount) * 1e16).toString(16).slice(0, 12)}...${payout.method.toLowerCase().replace(/[^a-z]/g, '')}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-stone-300 p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Gold Header Trim */}
          <div className="absolute top-0 inset-x-0 h-1.5 gold-gradient-bg" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-stone-500 hover:text-stone-900 bg-stone-200/60 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded border border-emerald-200">
                  Verified Payout
                </span>
                <span className="text-[10px] text-stone-400 font-mono">#{payoutId}</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-950 mt-0.5">
                Payout Disbursement Slip
              </h3>
            </div>
          </div>

          {/* Payout Amount Highlight */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-center mb-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Disbursed Profit Share
            </span>
            <div className="font-serif font-bold text-3xl sm:text-4xl text-emerald-700 font-mono mt-1">
              ${payout.amount.toLocaleString()}.00 USD
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-600 mt-1 font-medium">
              <span>Recipient:</span>
              <strong className="text-stone-950">{payout.country} {payout.trader}</strong>
              <span className="text-stone-400">•</span>
              <span className="text-emerald-700 font-bold">{payout.timeAgo}</span>
            </div>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="space-y-2.5 text-xs bg-white p-4 rounded-2xl border border-stone-200/80 mb-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-stone-500">Account Tier:</span>
              <span className="font-mono font-bold text-stone-900">{payout.account || '$100K Simulated Master'}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-stone-500">Payout Rail:</span>
              <span className="font-semibold text-stone-900">{payout.method}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-stone-500">Settlement Status:</span>
              <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed &amp; Settled
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Payment Reference:</span>
              <span className="font-mono text-stone-700 text-[11px]">{txRef}</span>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-stone-950 text-brass-300 hover:bg-stone-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Verification
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
