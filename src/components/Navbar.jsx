import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
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
  const { user, logout, activeTab, setActiveTab, setAuthModalOpen, setAuthModalMode, triggerGetFunded } = useApp();
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
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleGetFundedClick = () => {
    triggerGetFunded({
      model: 'Growth',
      size: '50K',
      numericSize: 50000,
      platform: 'Tradovate',
      price: 87,
      originalPrice: 145,
      discountCode: 'AUG'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E7E2DA] shadow-xs transition-all duration-300 select-none">
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
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-950 flex items-center justify-center text-brass-400 font-serif font-bold text-lg shadow-md border border-stone-800 group-hover:border-brass-500/50 transition-colors shrink-0">
                ◆
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-stone-950 leading-none">
                  Apex Funded
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brass-700 font-mono mt-1 font-bold">
                  Institutional Simulation
                </span>
              </div>
            </motion.div>
          </div>

          {/* ============================================================
              2. CENTER: UNIFIED NAVIGATION PILL (Zero-CLS Spring Layout)
              ============================================================ */}
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-stone-200/60 border border-stone-300/80 backdrop-blur-md shadow-inner">
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
                        className="absolute inset-0 bg-stone-950 rounded-full shadow-xs"
                      />
                    )}
                    <span className={`relative z-10 whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-brass-300 font-bold' : 'text-stone-700 hover:text-stone-950'
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-stone-200 text-stone-800 text-xs font-medium shadow-xs max-w-[130px]"
                  title={user.name}
                >
                  <User className="w-3.5 h-3.5 text-brass-700 shrink-0" />
                  <span className="truncate text-stone-950 font-semibold">{user.name}</span>
                </div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={logout}
                  className="p-2 rounded-full border border-stone-300 hover:border-rose-300 hover:bg-rose-50 text-stone-600 hover:text-rose-700 transition-colors shadow-xs cursor-pointer shrink-0"
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
                  className="px-3.5 py-2 rounded-full text-xs font-bold text-stone-800 hover:text-stone-950 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGetFundedClick}
                  className="shimmer-btn gold-gradient-bg text-stone-950 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-brass-glow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Get Funded</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================
          4. MOBILE DRAWER MENU (RESPONSIVE)
          ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF8F5] border-b border-[#E7E2DA] shadow-xl overflow-hidden px-4 py-5 space-y-4"
          >
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-stone-950 text-brass-300 font-bold shadow-xs' 
                        : 'text-stone-700 hover:bg-stone-200/60 hover:text-stone-950'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-brass-400"></span>}
                  </button>
                );
              })}
            </div>

            {/* Mobile Auth / User Section */}
            <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs">
                    <span className="text-stone-600">Logged in as:</span>
                    <strong className="text-stone-950 font-bold">{user.name}</strong>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2.5 rounded-xl border border-rose-300 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="flex-1 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs font-bold hover:bg-stone-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleGetFundedClick();
                    }}
                    className="flex-1 py-2.5 rounded-xl gold-gradient-bg text-stone-950 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-brass-glow transition-all"
                  >
                    Get Funded
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
