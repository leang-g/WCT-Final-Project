import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Logo from './common/Logo';
import { 
  LogOut, 
  Menu, 
  X, 
  User, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, activeTab, navigateToTab, setAuthModalOpen, setAuthModalMode, triggerGetFunded } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact same unified navigation links on EVERY page/tab
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'rules', label: 'Rules & FAQ' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'help', label: 'Help Center' }
  ];

  const handleNavClick = (tabId) => {
    setMobileMenuOpen(false);
    navigateToTab(tabId);
  };

  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleGetFundedClick = () => {
    setMobileMenuOpen(false);
    navigateToTab('pricing');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-obsidian-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 select-none">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full gap-4">
          
          {/* ============================================================
              1. LEFT: FIXED BRAND LOGO (Reserved width to prevent CLS)
              ============================================================ */}
          <div className="w-56 shrink-0 flex items-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <Logo size="md" />
            </motion.div>
          </div>

          {/* ============================================================
              2. CENTER: UNIFIED NAVIGATION PILL (Zero-CLS Spring Layout)
              ============================================================ */}
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-neon-glow"
                      />
                    )}
                    <span className={`relative z-10 whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-obsidian-950 font-black' : 'text-stone-300 hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* ============================================================
              3. RIGHT: USER AUTH & CTA (Reserved width to prevent CLS)
              ============================================================ */}
          <div className="w-56 shrink-0 hidden md:flex items-center justify-end gap-2.5">
            {user ? (
              <div className="flex items-center gap-2.5">
                {/* User Name Pill */}
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-200 text-xs font-medium shadow-xs max-w-[130px]"
                  title={user.name}
                >
                  <User className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                  <span className="truncate text-stone-100 font-semibold">{user.name}</span>
                </div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={logout}
                  className="p-2 rounded-full border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 text-stone-400 hover:text-rose-400 transition-colors shadow-xs cursor-pointer shrink-0"
                  title="Sign out of account"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenAuth('login')}
                  className="px-3.5 py-2 rounded-full text-xs font-bold text-stone-200 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGetFundedClick}
                  className="shimmer-btn gold-gradient-bg text-obsidian-950 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-brass-glow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Get Funded</span>
                  <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
                </motion.button>
              </div>
            )}
          </div>

          {/* ============================================================
              4. MOBILE HAMBURGER BUTTON
              ============================================================ */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================
          5. MOBILE EXPANDABLE MENU DRAWER
          ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-obsidian-900/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-6 space-y-4">
              
              {/* Navigation Links */}
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeTab === link.id;

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                          : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <Sparkles className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Auth & CTA */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-stone-200 text-xs">
                      <User className="w-4 h-4 text-brass-400" />
                      <span className="font-semibold">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleOpenAuth('login')}
                      className="w-full py-3 rounded-xl border border-white/15 bg-white/5 text-stone-100 font-bold text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Sign In to Portal
                    </button>
                    <button
                      onClick={handleGetFundedClick}
                      className="w-full py-3 rounded-xl gold-gradient-bg text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Start Challenge Simulation</span>
                      <ArrowRight className="w-4 h-4 text-obsidian-950" />
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
