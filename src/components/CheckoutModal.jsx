import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Shield, CreditCard, Sparkles, ArrowRight, Zap } from 'lucide-react';
import AnimatedCounter from './common/AnimatedCounter';

export default function CheckoutModal() {
  const {
    checkoutModalOpen,
    setCheckoutModalOpen,
    selectedPlanForCheckout,
    createAccount,
    setActiveTab,
    user
  } = useApp();

  const [fullName, setFullName] = useState(user ? user.name : 'Alex Mercer');
  const [email, setEmail] = useState(user ? user.email : 'trader@apexfunded.io');
  const [createdAccountResult, setCreatedAccountResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!checkoutModalOpen) return null;

  const plan = selectedPlanForCheckout || {
    model: 'Growth',
    size: '50K',
    numericSize: 50000,
    price: 99,
    platform: 'Tradovate'
  };

  const handleStartChallenge = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newAcc = createAccount({
        model: plan.model,
        size: plan.size,
        numericSize: plan.numericSize || 50000,
        platform: plan.platform || 'Tradovate',
        price: plan.price
      });

      setCreatedAccountResult(newAcc);
      setIsProcessing(false);
    }, 600);
  };

  const handleGoToDashboard = () => {
    setCheckoutModalOpen(false);
    setCreatedAccountResult(null);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-lg bg-obsidian-900/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white"
      >
        
        {/* Gold Trim Header */}
        <div className="h-1.5 w-full gold-gradient-bg"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            setCheckoutModalOpen(false);
            setCreatedAccountResult(null);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {!createdAccountResult ? (
            <>
              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shadow-neon-glow">
                    Instant CME Simulation
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-white">
                  Complete Evaluation Checkout
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Launch your simulated futures prop trading challenge in seconds.
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="p-5 rounded-2xl bg-obsidian-950/80 border border-white/10 shadow-2xl mb-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-3.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Selected Challenge</span>
                    <h4 className="font-serif font-bold text-xl text-white">
                      {plan.model} ${plan.size}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Evaluation Fee (100% Refundable)</span>
                    <div className="font-mono font-bold text-xl text-emerald-400">
                      <AnimatedCounter value={plan.price} prefix="$" decimals={0} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">Capital</span>
                    <strong className="text-white font-mono font-bold">${new Intl.NumberFormat('en-US').format(plan.numericSize || 50000)}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">Platform</span>
                    <strong className="text-white font-bold">{plan.platform || 'Tradovate'}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="block text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Profit Split</span>
                    <strong className="text-emerald-400 font-mono font-bold">100% 1st $10K</strong>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleStartChallenge} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                    Trader Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
                    required
                  />
                </div>

                {/* Promo Code Callout */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Promo Code <strong className="text-white font-bold">AUG</strong> Applied
                  </span>
                  <span className="font-bold text-emerald-400">-40% DISCOUNT</span>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="shimmer-btn w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <span>{isProcessing ? 'Provisioning Simulated Feed...' : `Instant Launch ($${plan.price})`}</span>
                    <ArrowRight className="w-4 h-4 text-obsidian-950" />
                  </motion.button>
                </div>
              </form>
            </>
          ) : (
            /* Success Step */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-neon-glow">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  Challenge Provisioned
                </span>
                <h3 className="font-serif font-bold text-2xl text-white mt-1">
                  Account #{createdAccountResult.id} is Live!
                </h3>
                <p className="text-xs text-stone-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your simulated evaluation capital has been deployed. CME Level 1 &amp; Level 2 feeds are connected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10 text-xs font-mono space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-stone-400">Account ID:</span>
                  <strong className="text-emerald-400 font-bold">{createdAccountResult.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Starting Balance:</span>
                  <strong className="text-white">${createdAccountResult.startingBalance.toLocaleString()}.00</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Trading Terminal:</span>
                  <strong className="text-white">{createdAccountResult.platform}</strong>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoToDashboard}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Trader Dashboard</span>
                <ArrowRight className="w-4 h-4 text-obsidian-950" />
              </motion.button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
