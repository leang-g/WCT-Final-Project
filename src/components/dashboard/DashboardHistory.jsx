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
          symbol: 'NQ',
          side: 'Buy',
          lots: 2.00,
          openPrice: '19,812.50',
          closePrice: '19,842.25',
          commission: '$4.00',
          grossPnL: 220.00,
          netPnL: 216.00,
          time: '14:23:10'
        },
        {
          id: 'TRD-9041',
          symbol: 'ES',
          side: 'Buy',
          lots: 2.00,
          openPrice: '5,604.00',
          closePrice: '5,614.50',
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
          symbol: 'NQ',
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
          symbol: 'ES',
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
          symbol: 'GC',
          side: 'Sell',
          lots: 1.00,
          openPrice: '2,518.50',
          closePrice: '2,508.50',
          commission: '$2.00',
          grossPnL: 100.00,
          netPnL: 98.00,
          time: '09:05:30'
        }
      ]
    },
    {
      date: '2026-08-13',
      totalDateTrades: 2,
      datePnL: 440.00,
      trades: [
        {
          id: 'TRD-8890',
          symbol: 'CL',
          side: 'Buy',
          lots: 2.00,
          openPrice: '78.20',
          closePrice: '79.10',
          commission: '$4.00',
          grossPnL: 290.00,
          netPnL: 286.00,
          time: '11:45:00'
        },
        {
          id: 'TRD-8889',
          symbol: 'NQ',
          side: 'Buy',
          lots: 1.00,
          openPrice: '19,750.00',
          closePrice: '19,820.00',
          commission: '$2.50',
          grossPnL: 154.00,
          netPnL: 151.50,
          time: '09:30:15'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Summary */}
      <div className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Execution Logs &amp; Fills
            </span>
            <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-400" />
              Complete Trade History
            </h3>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search symbol / ticket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder:text-stone-500 w-56"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 3 Metric Summary Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Gross Profit</span>
            <span className="font-mono font-bold text-xl text-emerald-400 block mt-0.5">+$1,677.40</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Total Commission</span>
            <span className="font-mono font-bold text-xl text-stone-300 block mt-0.5">$21.50</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">Net Realized PnL</span>
            <span className="font-mono font-bold text-xl text-emerald-400 block mt-0.5">+$1,655.90</span>
          </div>
        </div>
      </div>

      {/* Trades Grouped by Date */}
      <div className="space-y-4">
        {groupedTradeHistory.map((group, gIdx) => (
          <div key={gIdx} className="p-6 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-bold text-white text-sm">{group.date}</span>
                <span className="text-[11px] text-stone-400 font-mono">({group.totalDateTrades} trades executed)</span>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-400">
                +${group.datePnL.toFixed(2)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2">Ticket</th>
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Size</th>
                    <th className="pb-2">Entry</th>
                    <th className="pb-2">Exit</th>
                    <th className="pb-2 text-right">Net PnL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {group.trades.map((trd, tIdx) => (
                    <tr key={tIdx} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 text-stone-400">{trd.id}</td>
                      <td className="py-2.5 font-bold text-white">{trd.symbol}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trd.side === 'Buy' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                          {trd.side}
                        </span>
                      </td>
                      <td className="py-2.5 text-stone-300">{trd.lots} ctr</td>
                      <td className="py-2.5 text-stone-300">{trd.openPrice}</td>
                      <td className="py-2.5 text-stone-300">{trd.closePrice}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">
                        +${trd.netPnL.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
