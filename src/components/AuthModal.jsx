import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Logo from './common/Logo';
import { X, Lock, Mail, User, ShieldCheck, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    pendingPlanAfterAuth
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [promoCode, setPromoCode] = useState('AUG');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please provide both email and password.');
      return;
    }

    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setLoginSuccess('Authentication successful! Welcome back.');
    } else {
      setLoginError(res.message);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!signupName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim()) {
      setSignupError('Please enter a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== signupConfirm) {
      setSignupError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setSignupError('You must agree to the simulated evaluation terms.');
      return;
    }

    const res = signup(signupName, signupEmail, signupPassword);
    if (res.success) {
      setSignupSuccess('Account created successfully! Redirecting...');
    } else {
      setSignupError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-md bg-obsidian-900/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white"
      >
        {/* Top Header Accent */}
        <div className="h-1.5 w-full gold-gradient-bg"></div>

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Brand Icon & Heading */}
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="mb-2">
              <Logo size="sm" showSubtitle={false} />
            </div>
            <h3 className="font-serif font-bold text-2xl text-white mt-1">
              {authModalMode === 'login' ? 'Welcome Back' : 'Create Trader Account'}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Institutional CME Futures Evaluation &amp; Trader Portal
            </p>
          </div>

          {/* Pending Plan Notice */}
          {pendingPlanAfterAuth && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-stone-200 text-xs flex items-start gap-2.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Selected Plan: </span>
                <span className="text-emerald-300 font-semibold">{pendingPlanAfterAuth.plan || pendingPlanAfterAuth.model} (${pendingPlanAfterAuth.size})</span>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Sign in or register to launch your instant challenge simulation.
                </p>
              </div>
            </div>
          )}

          {/* Tabs Switcher */}
          <div className="grid grid-cols-2 p-1 mb-6 rounded-2xl bg-obsidian-950 border border-white/10 text-xs font-semibold">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setLoginError('');
                setSignupError('');
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authModalMode === 'login'
                  ? 'bg-emerald-500 text-obsidian-950 font-black shadow-neon-glow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setLoginError('');
                setSignupError('');
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authModalMode === 'signup'
                  ? 'bg-emerald-500 text-obsidian-950 font-black shadow-neon-glow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* TAB 1: LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
              {loginSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{loginSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="trader@apexfunded.io"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1 font-medium">
                  Demo login: <code className="text-emerald-400 font-mono font-bold">trader@apexfunded.io</code> / <code className="text-emerald-400 font-mono font-bold">password123</code>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="shimmer-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-md mt-2 cursor-pointer"
              >
                Sign In to Account
              </motion.button>
            </form>
          )}

          {/* TAB 2: SIGNUP FORM */}
          {authModalMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {signupError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}
              {signupSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{signupSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                    Confirm
                  </label>
                  <input
                    type="password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Promo / Coupon Code (Optional)
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="AUG"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/15 text-emerald-400 text-sm font-mono placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 rounded border-stone-600 bg-obsidian-950 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-xs text-stone-400 cursor-pointer">
                  I understand this is an educational CME futures simulation platform and agree to the risk rules.
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="shimmer-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian-950 gold-gradient-bg hover:shadow-brass-glow transition-all shadow-md mt-2 cursor-pointer"
              >
                Create Free Account
              </motion.button>
            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
}
