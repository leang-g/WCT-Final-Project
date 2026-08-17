import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Search, HelpCircle as QuestionIcon } from 'lucide-react';

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
      a: "The trailing drawdown is calculated based on your maximum recorded account balance or equity high-water mark at the end of the trading day. For example, on a $100,000 Growth account with a 6% trailing drawdown ($6,000 buffer), if your balance grows to $105,000, your new breach threshold locks at $99,000. It provides ample room to trade during intraday swings while securing your profits."
    },
    {
      category: 'payouts',
      q: "When and how are simulated profit payouts processed?",
      a: "Payouts are unlocked once you successfully pass Phase 1 evaluation and transition to a funded account. Depending on your chosen model (Growth, Select, or Lightning), payouts are distributed weekly or bi-weekly with a $0 withdrawal fee directly via Deel, Wise, Direct Bank Wire, or Crypto (USDT/USDC/BTC)."
    },
    {
      category: 'payouts',
      q: "Is the evaluation fee 100% refundable?",
      a: "Yes! 100% of your initial evaluation fee is refunded alongside your very first withdrawal on your funded simulated account, meaning a successful challenge costs you $0."
    },
    {
      category: 'platforms',
      q: "What trading terminals and platforms are supported?",
      a: "We provide seamless high-speed routing for Tradovate (Futures / CME), MetaTrader 5 (MT5), and NinjaTrader. You can select your preferred platform directly during challenge checkout."
    },
    {
      category: 'rules',
      q: "Can I hold trades overnight and over weekends?",
      a: "Yes! Swing trading, overnight holding, and weekend holding are 100% permitted across all evaluation and funded account tiers without auto-liquidation traps."
    },
    {
      category: 'rules',
      q: "Is news trading allowed during red-folder announcements?",
      a: "Yes, you are fully permitted to trade during high-impact news releases such as CPI, NFP, FOMC, and interest rate decisions. There are no restrictions on holding positions through news."
    },
    {
      category: 'rules',
      q: "Are there any maximum calendar day limits to pass?",
      a: "No. All Apex Funded challenges have zero time limits. You can take as many days, weeks, or months as you need to achieve your profit target with disciplined risk management."
    },
    {
      category: 'payouts',
      q: "What is the maximum profit split ceiling?",
      a: "Traders receive up to 90% profit split on funded simulated accounts across our 25K, 50K, 100K, and 150K tiers with access to account scaling up to $2,000,000 in capital."
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass-100/90 border border-brass-300 text-brass-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <HelpCircle className="w-3.5 h-3.5 text-brass-700" />
          Clarity &amp; Transparency
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950 tracking-tight">
          Rules &amp; Drawdown FAQ
        </h2>
        <p className="text-stone-700 text-sm sm:text-base mt-2">
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
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:border-brass-400 shadow-xs"
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
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-stone-950 text-brass-300 shadow-xs' 
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
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
                    ? 'bg-white border-brass-400/90 shadow-editorial'
                    : 'bg-white/90 border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-stone-950">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-stone-950 border-stone-950 text-brass-300 rotate-180 shadow-xs'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
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
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-700 text-sm sm:text-base leading-relaxed border-t border-stone-100">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
            No questions found matching "{searchQuery}". Try a different keyword or view All Questions.
          </div>
        )}
      </div>

    </section>
  );
}
