import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, HelpCircle, BookOpen, Shield, CreditCard, Monitor, MessageSquare, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import FAQ from './FAQ';

export default function HelpCenter() {
  const { navigateToTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started & Accounts",
      desc: "Instant credential setup, account activation, and CME data feeds.",
      articles: 12
    },
    {
      icon: Shield,
      title: "Rules & Risk Management",
      desc: "End-of-Day trailing drawdown logic, daily loss calculation, and trade copier limits.",
      articles: 18
    },
    {
      icon: CreditCard,
      title: "Payouts & Profit Splits",
      desc: "100% first $10K bonus, weekly payout cycles, KYC verification, and crypto withdrawals.",
      articles: 15
    },
    {
      icon: Monitor,
      title: "Trading Platforms",
      desc: "Tradovate, TradingView, and NinjaTrader 8 connection troubleshooting.",
      articles: 9
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
    }, 2000);
  };

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Header & Search Bar */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest shadow-neon-glow">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Support Desk
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          How Can We Assist You?
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Search our comprehensive knowledge base or reach out to our institutional support team 24/7.
        </p>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, drawdown rules, payout cycles, Tradovate..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-obsidian-950 border border-white/15 text-white text-sm placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 shadow-2xl transition-all font-mono"
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel-dark border border-white/10 shadow-2xl hover:border-emerald-500/40 hover:shadow-card-dark-hover transition-all space-y-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-obsidian-950 border border-white/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                {cat.title}
              </h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-emerald-400 font-mono">
                {cat.articles} Articles Available →
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact & Support Form */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            24/7 Trader Help Desk
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Submit a Direct Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Our institutional support engineers review evaluation inquiries, payout verification requests, and platform setup questions around the clock.
          </p>
          <div className="pt-2 space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Email: <strong className="text-white font-mono">support@apexfunded.io</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Average Response Time: <strong className="text-emerald-400 font-semibold">&lt; 15 Minutes</strong></span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            {ticketSent && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Inquiry submitted successfully! A support engineer will reply shortly.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Inquiry Subject
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Question regarding Tradovate / TradingView connection"
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Message Details
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your question or issue in detail..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono transition-all"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian-950 gold-gradient-bg hover:shadow-brass-glow transition-all hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer"
            >
              Submit Support Ticket
            </button>
          </form>
        </div>

      </div>

      {/* Embedded FAQ Section */}
      <FAQ />

      {/* Back to Plans Banner */}
      <div className="p-8 sm:p-10 rounded-3xl gold-gradient-bg text-obsidian-950 text-center space-y-4 shadow-2xl">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl">
          Ready to Start Your Trading Challenge?
        </h3>
        <p className="text-stone-900 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          Explore our evaluation tiers starting at $25K up to $250K with weekly payouts and 100% fee refund.
        </p>
        <div>
          <button
            onClick={() => navigateToTab('pricing')}
            className="px-8 py-3.5 rounded-full bg-obsidian-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-900 transition-all hover:scale-[1.02] active:scale-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Pricing &amp; Plans</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

    </div>
  );
}
