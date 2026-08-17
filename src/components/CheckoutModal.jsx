import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Shield, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
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
    price: 299,
    platform: 'MetaTrader 5'
  };

  const handleStartChallenge = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newAcc = createAccount({
        model: plan.model,
        size: plan.size,
        numericSize: plan.numericSize || 50000,
        platform: plan.platform || 'MetaTrader 5',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E7E2DA] rounded-3xl shadow-2xl overflow-hidden"
      >
        
        {/* Gold Trim Header */}
        <div className="h-1.5 w-full gold-gradient-bg"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            setCheckoutModalOpen(false);
            setCreatedAccountResult(null);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
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
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-brass-100 border border-brass-300 text-brass-900 shadow-xs">
                    Instant Simulation
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-950">
                  Complete Evaluation Checkout
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Launch your simulated prop trading challenge in seconds.
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-editorial mb-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3.5 mb-3.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">Selected Challenge</span>
                    <h4 className="font-serif font-bold text-xl text-stone-950">
                      {plan.model} ${plan.size}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">Fee (100% Refundable)</span>
                    <div className="font-mono font-bold text-xl text-stone-950">
                      <AnimatedCounter value={plan.price} prefix="$" decimals={0} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Starting Capital</span>
                    <strong className="text-stone-950 font-mono font-bold">${new Intl.NumberFormat('en-US').format(plan.numericSize || 50000)}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Platform</span>
                    <strong className="text-stone-950 font-bold">{plan.platform || 'MetaTrader 5'}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">Profit Split</span>
                    <strong className="text-emerald-700 font-mono font-bold">Up to 90%</strong>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleStartChallenge} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                    Trader Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brass-400 focus:border-brass-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                    Email for Terminal Credentials
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brass-400 focus:border-brass-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                    Payment Method (Simulation Sandbox)
                  </label>
                  <div className="p-3.5 rounded-xl bg-stone-100/90 border border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-stone-900 font-semibold">
                      <CreditCard className="w-4 h-4 text-brass-700" />
                      <span>Instant Simulation Activation (Zero Risk)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                      FREE DEMO
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing}
                  className="shimmer-btn w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Generating Institutional Credentials...</span>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Start Challenge Simulation</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <h3 className="font-serif font-bold text-2xl text-stone-950 mb-1">
                Challenge Account Activated!
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Your simulated evaluation account has been provisioned and added to your trader profile.
              </p>

              {/* Account Card Details */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-left mb-6 shadow-editorial">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2.5">
                  <span className="text-xs text-stone-500 font-medium">Account ID</span>
                  <span className="font-mono font-bold text-stone-950 text-sm">
                    #{createdAccountResult.id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2.5">
                  <span className="text-xs text-stone-500 font-medium">Evaluation Plan</span>
                  <span className="font-bold text-stone-950 text-xs">
                    {createdAccountResult.plan} ({createdAccountResult.platform})
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2.5">
                  <span className="text-xs text-stone-500 font-medium">Starting Capital</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ${new Intl.NumberFormat('en-US').format(createdAccountResult.startingBalance)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Account Status</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    LIVE SIMULATED - ACTIVE
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoToDashboard}
                  className="shimmer-btn w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </motion.button>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setCreatedAccountResult(null);
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Close &amp; Keep Browsing
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
