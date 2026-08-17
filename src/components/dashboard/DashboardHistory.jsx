import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  History,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Percent,
  Layers,
  Search,
  Calendar
} from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

export default function DashboardHistory({ account }) {
  const [selectedSymbol, setSelectedSymbol] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const startingBalance = account ? account.startingBalance : 50000;
  const currentBalance = account ? account.currentBalance : 50317.40;

  const groupedTradeHistory = [
    {
      date: '2026-08-17',
      totalDateTrades: 2,
      datePnL: 317.40,
      trades: [
        {
          id: 'TRD-9042',
          symbol: 'EURUSD',
          side: 'Buy',
          lots: 1.00,
          openPrice: '1.08420',
          closePrice: '1.08640',
          commission: '$4.00',
          grossPnL: 220.00,
          netPnL: 216.00,
          time: '14:23:10'
        },
        {
          id: 'TRD-9041',
          symbol: 'US30',
          side: 'Buy',
          lots: 0.50,
          openPrice: '39,450.00',
          closePrice: '39,645.00',
          commission: '$3.50',
          grossPnL: 97.40,
          netPnL: 93.90,
          time: '10:15:42'
        }
      ]
    },
    {
      date: '2026-08-14',
      totalDateTrades: 3,
      datePnL: 920.00,
      trades: [
        {
          id: 'TRD-8921',
          symbol: 'MNQU6',
          side: 'Buy',
          lots: 2.00,
          openPrice: '19,820.50',
          closePrice: '19,945.00',
          commission: '$5.00',
          grossPnL: 498.00,
          netPnL: 493.00,
          time: '15:40:02'
        },
        {
          id: 'TRD-8920',
          symbol: 'MESU6',
          side: 'Buy',
          lots: 2.00,
          openPrice: '5,540.25',
          closePrice: '5,572.50',
          commission: '$5.00',
          grossPnL: 322.00,
          netPnL: 317.00,
          time: '13:12:18'
        },
        {
          id: 'TRD-8919',
          symbol: 'XAUUSD',
          side: 'Sell',
          lots: 0.10,
          openPrice: '2,420.50',
          closePrice: '2,410.50',
          commission: '$2.00',
          grossPnL: 100.00,
          netPnL: 98.00,
          time: '09:05:30'
        }
      ]
    },
    {
      date: '2026-08-13',
      totalDateTrades: 4,
      datePnL: -840.80,
      trades: [
        {
          id: 'TRD-8812',
          symbol: 'MNQU6',
          side: 'Sell',
          lots: 2.00,
          openPrice: '19,980.00',
          closePrice: '20,090.00',
          commission: '$5.00',
          grossPnL: -440.00,
          netPnL: -445.00,
          time: '16:05:12'
        },
        {
          id: 'TRD-8811',
          symbol: 'US30',
          side: 'Sell',
          lots: 1.00,
          openPrice: '39,780.00',
          closePrice: '39,980.00',
          commission: '$4.00',
          grossPnL: -400.80,
          netPnL: -404.80,
          time: '14:30:00'
        }
      ]
    }
  ];

  const filteredGroups = groupedTradeHistory.map(group => {
    const filteredTrades = group.trades.filter(t => {
      const matchesSymbol = selectedSymbol === 'ALL' || t.symbol === selectedSymbol;
      const matchesQuery = searchQuery === '' || t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSymbol && matchesQuery;
    });

    return {
      ...group,
      trades: filteredTrades
    };
  }).filter(group => group.trades.length > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 5 Top Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Card 1: Balance */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Balance</span>
          <div className="font-serif font-bold text-xl text-stone-950 font-mono tabular-nums mt-1">
            <AnimatedCounter value={currentBalance} prefix="$" />
          </div>
          <span className="text-[10px] text-stone-400 font-mono block mt-1">Live Capital</span>
        </div>

        {/* Card 2: Profit Factor */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Profit Factor</span>
          <div className="font-serif font-bold text-xl text-emerald-700 font-mono mt-1">
            <AnimatedCounter value={1.32} decimals={2} />
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">Profitable Edge</span>
        </div>

        {/* Card 3: Win Rate */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Win Rate</span>
          <div className="font-serif font-bold text-xl text-stone-950 font-mono mt-1">
            66.67%
          </div>
          <span className="text-[10px] text-stone-500 font-mono block mt-1">6 Won / 3 Lost</span>
        </div>

        {/* Card 4: Avg Profit / Loss Ratio */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Avg Win / Loss</span>
          <div className="font-serif font-bold text-xl text-stone-950 font-mono mt-1">
            0.66
          </div>
          <span className="text-[10px] text-stone-500 font-mono block mt-1">R:R Ratio</span>
        </div>

        {/* Card 5: Total Trades */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Total Executed</span>
          <div className="font-serif font-bold text-xl text-stone-950 font-mono mt-1">
            9 Trades
          </div>
          <span className="text-[10px] text-stone-500 font-mono block mt-1">Simulated Volume</span>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Symbol Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {['ALL', 'EURUSD', 'US30', 'MNQU6', 'MESU6', 'XAUUSD'].map((sym) => (
            <button
              key={sym}
              onClick={() => setSelectedSymbol(sym)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedSymbol === sym
                  ? 'bg-stone-950 text-brass-300 shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-950'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Trade ID or Symbol..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300/80 text-xs font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brass-400"
          />
        </div>

      </div>

      {/* Grouped Daily Trade Tables */}
      <div className="space-y-6">
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial overflow-hidden">
            
            {/* Date Group Header */}
            <div className="p-4 bg-stone-50/90 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brass-600" />
                <span className="font-mono font-bold text-xs text-stone-900">{group.date}</span>
                <span className="text-[11px] text-stone-500 font-mono">• {group.trades.length} Executed Trades</span>
              </div>
              <span className={`font-mono font-bold text-xs ${group.datePnL >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                Day Net: {group.datePnL >= 0 ? `+$${group.datePnL.toFixed(2)}` : `-$${Math.abs(group.datePnL).toFixed(2)}`}
              </span>
            </div>

            {/* Trades Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-500 font-bold uppercase tracking-wider text-[10px] bg-white">
                    <th className="py-3 px-4">Trade ID</th>
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Side</th>
                    <th className="py-3 px-4">Volume</th>
                    <th className="py-3 px-4">Open Price</th>
                    <th className="py-3 px-4">Close Price</th>
                    <th className="py-3 px-4">Comm.</th>
                    <th className="py-3 px-4 text-right">Gross P&amp;L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {group.trades.map((t, tIdx) => {
                    const isProfit = t.grossPnL >= 0;
                    return (
                      <tr key={tIdx} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-stone-600 text-[11px]">
                          {t.id}
                        </td>
                        <td className="py-3 px-4 font-bold text-stone-950 font-mono">
                          {t.symbol}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              t.side === 'Buy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {t.side}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-800">{t.lots} Lots</td>
                        <td className="py-3 px-4 font-mono text-stone-600">{t.openPrice}</td>
                        <td className="py-3 px-4 font-mono text-stone-600">{t.closePrice}</td>
                        <td className="py-3 px-4 font-mono text-stone-400">{t.commission}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`font-mono font-bold text-xs inline-flex items-center gap-1 ${
                              isProfit ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {isProfit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {isProfit ? `+$${t.grossPnL.toFixed(2)}` : `-$${Math.abs(t.grossPnL).toFixed(2)}`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
