import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Target,
  ShieldAlert,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import EconomicCalendarWidget from './EconomicCalendarWidget';
import LiveTradeSimulator from './LiveTradeSimulator';
import AnimatedCounter from '../common/AnimatedCounter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardOverview({ account }) {
  const [timeframe, setTimeframe] = useState('7d'); // '1d' | '7d' | '30d' | 'all'
  const [hoveredDot, setHoveredDot] = useState(null);

  if (!account) return null;

  const startingBalance = account.startingBalance || 50000;
  const currentBalance = account.currentBalance || 50317.40;
  const netPnL = currentBalance - startingBalance;
  const profitTargetPct = account.profitTargetPct || 10.0;
  const targetAmount = startingBalance * (profitTargetPct / 100);
  const targetProgress = Math.min(Math.max((netPnL / targetAmount) * 100, 0), 100);

  const maxLossPct = account.maxDrawdownPct || 6.0;
  const maxLossFloorAmount = startingBalance * (maxLossPct / 100);
  const currentDrawdownAmount = startingBalance * ((account.drawdownPct || 2.1) / 100);
  const remainingBuffer = Math.max(maxLossFloorAmount - currentDrawdownAmount, 0);

  // Timeframe chart datasets
  const chartLabelsByTf = {
    '1d': ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
    '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30d': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    'all': ['Day 1', 'Day 3', 'Day 6', 'Day 9', 'Day 12', 'Day 15', 'Now']
  };

  const chartDataByTf = {
    '1d': [currentBalance - 120, currentBalance - 60, currentBalance + 140, currentBalance - 20, currentBalance + 190, currentBalance + 160, currentBalance],
    '7d': account.chartData || [startingBalance, startingBalance + 150, startingBalance + 280, startingBalance + 120, startingBalance + 350, startingBalance + 290, currentBalance],
    '30d': [startingBalance, startingBalance + 420, startingBalance + 210, currentBalance],
    'all': [startingBalance, startingBalance + 180, startingBalance + 320, startingBalance + 160, startingBalance + 410, startingBalance + 280, currentBalance]
  };

  const labels = chartLabelsByTf[timeframe] || chartLabelsByTf['7d'];
  const activeCurve = chartDataByTf[timeframe] || chartDataByTf['7d'];

  // Target & Loss Floor values for horizontal threshold lines
  const profitTargetThreshold = startingBalance + targetAmount;
  const maxLossThreshold = startingBalance - maxLossFloorAmount;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Account Equity',
        data: activeCurve,
        borderColor: '#C59A45',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(197, 154, 69, 0.4)');
          gradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.12)');
          gradient.addColorStop(1, 'rgba(197, 154, 69, 0)');
          return gradient;
        },
        borderWidth: 2.5,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.35,
        fill: true,
      },
      {
        label: 'Profit Target ($' + new Intl.NumberFormat('en-US').format(profitTargetThreshold) + ')',
        data: labels.map(() => profitTargetThreshold),
        borderColor: '#059669',
        borderWidth: 1.5,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Max Loss Floor ($' + new Intl.NumberFormat('en-US').format(maxLossThreshold) + ')',
        data: labels.map(() => maxLossThreshold),
        borderColor: '#E11D48',
        borderWidth: 1.5,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 10,
          color: '#57534E',
          font: { size: 10, family: 'Inter', weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 18, 16, 0.95)',
        titleColor: '#C59A45',
        bodyColor: '#FFFFFF',
        borderColor: 'rgba(197, 154, 69, 0.35)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: $${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(context.parsed.y)}`
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        ticks: {
          color: '#78716C',
          font: { family: 'JetBrains Mono', size: 10 },
          callback: (val) => `$${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`
        }
      },
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.02)' },
        ticks: {
          color: '#78716C',
          font: { family: 'Inter', size: 10 }
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 2-Column Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ============================================================
            LEFT COLUMN: 5 OBJECTIVE & RULE PROGRESS GAUGES
            ============================================================ */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-brass-600" />
              Evaluation Objectives &amp; Limits
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
              5 of 5 Rules Compliant
            </span>
          </div>

          {/* GAUGE 1: Profit Target Gauge */}
          <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-950">Profit Target</h4>
                  <span className="text-[11px] text-stone-500 font-mono">Target: ${new Intl.NumberFormat('en-US').format(targetAmount)}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sm text-emerald-700 block">
                  <AnimatedCounter value={netPnL} prefix={netPnL >= 0 ? '+$' : '-$'} />
                </span>
                <span className="text-[10px] font-bold text-stone-500 font-mono">
                  {targetProgress.toFixed(1)}% Completed
                </span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-stone-100 border border-stone-200/80 overflow-hidden relative">
              <div
                className="h-full rounded-full gold-gradient-bg transition-all duration-700"
                style={{ width: `${Math.max(targetProgress, 4)}%` }}
              ></div>
            </div>
          </div>

          {/* GAUGE 2: Max Loss / Drawdown Limit */}
          <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shadow-xs">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-950">Max Loss Floor</h4>
                  <span className="text-[11px] text-stone-500 font-mono">Floor: ${new Intl.NumberFormat('en-US').format(maxLossFloorAmount)} ({maxLossPct}%)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sm text-stone-950 block">
                  <AnimatedCounter value={remainingBuffer} prefix="$" />
                </span>
                <span className="text-[10px] font-bold text-emerald-700 font-mono">
                  Remaining Buffer
                </span>
              </div>
            </div>

            {/* Safety Indicator Bar */}
            <div className="w-full h-2.5 rounded-full bg-stone-100 border border-stone-200/80 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700 shadow-emerald-glow"
                style={{ width: `${Math.max((remainingBuffer / maxLossFloorAmount) * 100, 8)}%` }}
              ></div>
            </div>
          </div>

          {/* GAUGE 3: Consistency Rule Meter */}
          <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brass-100/70 text-brass-800 flex items-center justify-center font-bold shadow-xs">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-950">Consistency Meter</h4>
                  <span className="text-[11px] text-stone-500">Max Single-Day Cap: 40%</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Score: 31.46% (Passed)
              </span>
            </div>
            <p className="text-[11px] text-stone-600">
              No individual trading session accounts for more than 40% of total profit generated.
            </p>
          </div>

          {/* GAUGE 4: Max Inactive Days (Dot Matrix with Hover Tooltips) */}
          <div className="p-5 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-950">30-Day Activity Matrix</h4>
                  <span className="text-[11px] text-stone-500">Account Inactivity Limit</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-stone-800">
                12 Traded / 18 Idle
              </span>
            </div>

            {/* 30-Day Activity Dot Matrix Grid */}
            <div className="grid grid-cols-10 gap-1.5 pt-1 relative">
              {Array.from({ length: 30 }).map((_, i) => {
                const isTraded = i < 12;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredDot(i + 1)}
                    onMouseLeave={() => setHoveredDot(null)}
                    className={`h-3.5 rounded-md transition-all cursor-pointer ${
                      isTraded
                        ? 'bg-emerald-500 shadow-xs hover:scale-110'
                        : 'bg-stone-200 hover:bg-stone-300'
                    }`}
                  ></div>
                );
              })}
            </div>

            {hoveredDot && (
              <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-xl border border-stone-200 text-center font-mono">
                Day {hoveredDot}: {hoveredDot <= 12 ? 'Active Trading Day • Rules Compliant' : 'Inactive Session'}
              </div>
            )}
          </div>

          {/* GAUGE 5: Clarity / Scalping Rule */}
          <div className="p-4 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <h5 className="text-xs font-bold text-stone-950">Trading Clarity &amp; Scalping Rule</h5>
                <span className="text-[10px] text-stone-500">No automated latency arbitrage or toxic spikes</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Clean / Passed
            </span>
          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: BALANCE SUMMARY & STEPPED REFERENCE CHART
            ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Current Balance Summary Card */}
          <div className="p-7 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Current Account Balance
                </span>
                <h3 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 tabular-nums mt-0.5">
                  <AnimatedCounter value={currentBalance} prefix="$" />
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-[10px] uppercase text-stone-500 font-sans font-bold">Initial Balance</span>
                  <strong className="text-stone-950 font-bold">${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(startingBalance)}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-800">
                  <span className="block text-[10px] uppercase text-emerald-700 font-sans font-bold">Net P&amp;L</span>
                  <strong className="font-bold">
                    <AnimatedCounter value={netPnL} prefix={netPnL >= 0 ? '+$' : '-$'} />
                  </strong>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase font-bold">Floating Equity</span>
                <strong className="font-mono text-stone-950 font-bold">
                  <AnimatedCounter value={account.equity || currentBalance} prefix="$" />
                </strong>
              </div>
              <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase font-bold">Current Drawdown</span>
                <strong className="font-mono text-rose-700 font-bold">-{account.drawdownPct || 2.1}%</strong>
              </div>
              <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-500 block uppercase font-bold">Win Rate</span>
                <strong className="font-mono text-emerald-700 font-bold">{account.winRate || '68%'}</strong>
              </div>
            </div>
          </div>

          {/* Interactive Account Status Chart */}
          <div className="p-7 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-950">
                  Equity Curve &amp; Target Limits
                </h4>
                <p className="text-xs text-stone-500">
                  Live performance tracking against Profit Target &amp; Max Loss threshold lines
                </p>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-semibold">
                {['1d', '7d', '30d', 'all'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-xl uppercase transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-stone-950 text-brass-300 shadow-sm font-bold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-64 sm:h-72 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>

          </div>

          {/* Open Trades Table */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7E2DA] shadow-editorial space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h4 className="font-serif font-bold text-base text-stone-950 flex items-center gap-2">
                <span>Open Simulated Positions</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brass-100 text-brass-900 border border-brass-300">
                  {account.openPositions ? account.openPositions.length : 0} Active
                </span>
              </h4>
              <span className="text-xs text-stone-500 font-mono">Live MetaTrader Stream</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">SMC Setup</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Volume</th>
                    <th className="pb-2 text-right">Floating P&amp;L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {account.openPositions && account.openPositions.map((pos, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 font-bold text-stone-900">{pos.symbol}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brass-50 border border-brass-200 text-brass-850">
                          {pos.setup}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`font-bold ${pos.side === 'Buy' ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {pos.side}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-stone-700">{pos.vol} Lots</td>
                      <td className={`py-2.5 text-right font-mono font-bold ${pos.pnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {pos.pnl >= 0 ? `+$${pos.pnl.toFixed(2)}` : `-$${Math.abs(pos.pnl).toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Interactive Trade Execution Simulator */}
          <LiveTradeSimulator 
            activeAccount={account} 
            onTradeExecuted={(pnl) => {
              // Real-time notification feedback
            }} 
          />

          {/* Economic Calendar Widget */}
          <EconomicCalendarWidget />

        </div>

      </div>

    </div>
  );
}
