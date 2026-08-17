import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, Shield, CreditCard, Monitor, MessageSquare, Mail, CheckCircle2 } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started & Accounts",
      desc: "Instant credential setup, account activation, and trader profile settings.",
      articles: 12
    },
    {
      icon: Shield,
      title: "Rules & Risk Management",
      desc: "Trailing drawdown logic, daily loss calculation, and permitted strategies.",
      articles: 18
    },
    {
      icon: CreditCard,
      title: "Payouts & Profit Splits",
      desc: "Weekly payout requirements, KYC verification, and cryptocurrency withdrawal guides.",
      articles: 15
    },
    {
      icon: Monitor,
      title: "Trading Platforms",
      desc: "MetaTrader 5, MetaTrader 4, and Tradovate connection troubleshooting.",
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass-100 border border-brass-300 text-brass-900 text-xs font-semibold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-brass-700" />
          Support Desk
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950">
          How Can We Assist You?
        </h1>

        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          Search our comprehensive knowledge base or reach out to our institutional support team 24/7.
        </p>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, drawdown rules, payout cycles, MT5..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brass-400 focus:border-brass-500 shadow-sm transition-all"
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
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-card hover:shadow-card-hover hover:border-brass-400/60 transition-all space-y-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-brass-300 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-950 group-hover:text-brass-800 transition-colors">
                {cat.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-brass-700 font-mono">
                {cat.articles} Articles Available →
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact & Support Form */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E2DA] shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 text-brass-700 font-bold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            24/7 Trader Help Desk
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950">
            Submit a Direct Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Our institutional support team reviews evaluation inquiries, payout requests, and platform connection questions around the clock.
          </p>
          <div className="pt-2 space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brass-600" />
              <span>Email: <strong className="text-stone-900">support@apexfunded.io</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Average Response Time: <strong className="text-emerald-700 font-semibold">&lt; 15 Minutes</strong></span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            {ticketSent && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>Inquiry submitted successfully! A support engineer will reply shortly.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                Inquiry Subject
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Question regarding Tradovate connection"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400 focus:border-brass-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                Message Details
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your question or issue in detail..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400 focus:border-brass-500 transition-all"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 gold-gradient-bg hover:shadow-brass-glow transition-all hover:scale-[1.01] active:scale-95 shadow-sm"
            >
              Submit Support Ticket
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
