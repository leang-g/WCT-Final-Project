import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Search } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'rules', label: 'Rules & Drawdown' },
    { id: 'payouts', label: 'Payouts & Scaling' },
    { id: 'platforms', label: 'Platforms & Trading' }
  ];

  const faqs = [
    {
      category: 'rules',
      q: "How does the End-of-Day (EOD) Trailing Max Drawdown work?",
      a: "The trailing drawdown is calculated exclusively at 5:00 PM EST daily market close based on your realized end-of-day equity. Unlike legacy firms that calculate drawdown on unrealized intraday high-water marks (which penalize open trade pullbacks), our EOD rule allows your trades breathing room throughout the active session."
    },
    {
      category: 'payouts',
      q: "When and how are simulated profit payouts processed?",
      a: "Payouts are unlocked once you successfully complete the evaluation stage. You keep 100% of your first $10,000 profit, and a 90% lifetime split thereafter. Withdrawals are processed within 24–48 hours via Direct Bank Wire, Deel, Wise, or Crypto (USDT/USDC/BTC) with $0 withdrawal fees."
    },
    {
      category: 'payouts',
      q: "Is the evaluation fee 100% refundable?",
      a: "Yes! 100% of your initial evaluation fee is refunded alongside your very first payout on your funded simulated account, meaning passing the challenge is completely reimbursed."
    },
    {
      category: 'platforms',
      q: "Can I trade up to 20 accounts with trade copiers?",
      a: "Yes! Apex Funded fully supports trade copiers including Replikanto and NinjaTrader Account Grouping across up to 20 accounts simultaneously, allowing you to maximize scaling efficiency across CME contracts."
    },
    {
      category: 'platforms',
      q: "What trading terminals and platforms are supported?",
      a: "We provide direct cloud execution for TradingView, Tradovate Web & Desktop, NinjaTrader 8, and MetaTrader 5 (MT5). Full CME Level 1 and Level 2 real-time market data is included for $0."
    },
    {
      category: 'rules',
      q: "Can I hold trades overnight and over weekends?",
      a: "Yes! Swing trading, overnight holding, and weekend holding are 100% permitted across all evaluation and funded account tiers without auto-liquidation traps."
    },
    {
      category: 'rules',
      q: "Is news trading allowed during red-folder announcements?",
      a: "Yes, you are fully permitted to trade during high-impact news releases such as CPI, NFP, FOMC, and interest rate decisions. There are no restrictions or forced close requirements."
    },
    {
      category: 'rules',
      q: "Are there any maximum calendar day limits to pass?",
      a: "No. All Apex Funded challenges have zero time limits. You can take as many days, weeks, or months as you need to achieve your profit target with disciplined risk management."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-neon-glow">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Clarity &amp; Transparency
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          Rules &amp; Drawdown FAQ
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2">
          Everything you need to know about our institutional evaluation rules, drawdown mechanics, and payouts.
        </p>
      </div>

      {/* Search Bar & Category Filter */}
      <div className="space-y-4 mb-8">
        
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, payouts, platforms, drawdown..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-obsidian-950 border border-white/10 rounded-full focus:outline-none focus:border-emerald-400 text-white placeholder:text-stone-500 shadow-xl font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected 
                    ? 'bg-emerald-500 text-obsidian-950 border-emerald-400 font-bold shadow-neon-glow' 
                    : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                layout
                key={idx}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'glass-panel-dark border-emerald-500/50 shadow-neon-glow'
                    : 'glass-panel-dark border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-emerald-500 border-emerald-400 text-obsidian-950 rotate-180 shadow-neon-glow'
                        : 'bg-white/5 border-white/10 text-stone-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-300 text-sm sm:text-base leading-relaxed border-t border-white/10">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="p-8 text-center glass-panel-dark rounded-2xl border border-white/10 text-stone-400 text-xs">
            No questions found matching "{searchQuery}". Try a different keyword or view All Questions.
          </div>
        )}
      </div>

    </section>
  );
}
