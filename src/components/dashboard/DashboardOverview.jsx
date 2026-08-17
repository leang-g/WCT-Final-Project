import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Layers
} from 'lucide-react';
import EconomicCalendarWidget from './EconomicCalendarWidget';
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

  if (!account) return null;

  const startingBalance = account.startingBalance || 50000;
  const currentBalance = account.currentBalance || 54230.00;
  const netPnL = currentBalance - startingBalance;
  const netPnLPct = ((netPnL / startingBalance) * 100).toFixed(2);

  const profitTargetPct = account.profitTargetPct || 10.0;
  const targetAmount = startingBalance * (profitTargetPct / 100);
  const remainingToTarget = Math.max(0, targetAmount - netPnL);
  const targetProgress = Math.min(Math.max((netPnL / targetAmount) * 100, 0), 100);

  const maxLossPct = account.maxDrawdownPct || 6.0;
  const maxLossFloorAmount = startingBalance * (maxLossPct / 100);
  const currentDrawdownAmount = startingBalance * ((account.drawdownPct || 2.1) / 100);
  const remainingBuffer = Math.max(maxLossFloorAmount - currentDrawdownAmount, 0);
  const bufferProgress = Math.max(0, Math.min(100, (remainingBuffer / maxLossFloorAmount) * 100));

  // Timeframe chart datasets
  const chartLabelsByTf = {
    '1d': ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
    '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30d': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    'all': ['Day 1', 'Day 3', 'Day 6', 'Day 9', 'Day 12', 'Day 15', 'Now']
  };

  const chartDataByTf = {
    '1d': [currentBalance - 140, currentBalance - 60, currentBalance + 120, currentBalance - 30, currentBalance + 190, currentBalance + 160, currentBalance],
    '7d': account.chartData || [startingBalance, startingBalance + 200, startingBalance + 500, startingBalance + 1000, startingBalance + 1800, startingBalance + 2400, currentBalance],
    '30d': [startingBalance, startingBalance + 800, startingBalance + 1900, currentBalance],
    'all': [startingBalance, startingBalance + 400, startingBalance + 1200, startingBalance + 2100, startingBalance + 3400, currentBalance]
  };

  const labels = chartLabelsByTf[timeframe] || chartLabelsByTf['7d'];
  const activeCurve = chartDataByTf[timeframe] || chartDataByTf['7d'];

  const profitTargetThreshold = startingBalance + targetAmount;
  const maxLossThreshold = startingBalance - maxLossFloorAmount;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Equity Curve',
        data: activeCurve,
        borderColor: '#C59A45',
        backgroundColor: (context) => {
          const ctx = context.chart?.ctx;
          if (!ctx) return 'rgba(197, 154, 69, 0.1)';
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(197, 154, 69, 0.35)');
          gradient.addColorStop(0.6, 'rgba(5, 150, 105, 0.08)');
          gradient.addColorStop(1, 'rgba(197, 154, 69, 0)');
          return gradient;
        },
        borderWidth: 2.5,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.32,
        fill: true,
      },
      {
        label: 'Profit Target ($' + new Intl.NumberFormat('en-US').format(profitTargetThreshold) + ')',
        data: labels.map(() => profitTargetThreshold),
        borderColor: '#059669',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Max Loss Floor ($' + new Intl.NumberFormat('en-US').format(maxLossThreshold) + ')',
        data: labels.map(() => maxLossThreshold),
        borderColor: '#E11D48',
        borderWidth: 1.5,
        borderDash: [5, 4],
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
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          color: '#78716C',
          font: { size: 11, family: 'Inter', weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 18, 16, 0.95)',
        titleColor: '#C59A45',
        bodyColor: '#FFFFFF',
        borderColor: 'rgba(197, 154, 69, 0.3)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 12,
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: $${Number(context.raw).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#A8A29E', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(231, 226, 218, 0.6)' },
        ticks: {
          color: '#A8A29E',
          font: { size: 11 },
          callback: function(value) {
            return '$' + (value / 1000).toFixed(0) + 'k';
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ============================================================
          1. TOP KPI METRICS STRIP (4 CLEAN, SPACIOUS CARDS)
          ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Current Account Balance */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Account Balance</span>
            <span className="text-[10px] font-mono font-semibold bg-stone-100 px-2 py-0.5 rounded-full text-stone-700">
              Live Equity
            </span>
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 font-mono tracking-tight">
            <AnimatedCounter value={currentBalance} prefix="$" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-100 font-mono">
            <span>Starting Capital</span>
            <span className="font-bold text-stone-800">${startingBalance.toLocaleString()}.00</span>
          </div>
        </div>

        {/* KPI 2: Net Profit & Return */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Net Profit / Loss</span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${netPnL >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {netPnL >= 0 ? `+${netPnLPct}%` : `${netPnLPct}%`}
            </span>
          </div>
          <div className={`font-serif font-bold text-2xl sm:text-3xl font-mono tracking-tight ${netPnL >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            <AnimatedCounter value={netPnL} prefix={netPnL >= 0 ? '+$' : '-$'} />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-100 font-mono">
            <span>Win Rate</span>
            <span className="font-bold text-emerald-700">{account.winRate || '68%'} (4 Trades)</span>
          </div>
        </div>

        {/* KPI 3: Profit Target Progress */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Profit Target ({profitTargetPct}%)</span>
            <span className="text-[10px] font-mono font-bold text-emerald-700">
              {targetProgress.toFixed(1)}% Completed
            </span>
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 font-mono tracking-tight">
            ${targetAmount.toLocaleString()}
          </div>
          {/* Target Progress Bar */}
          <div className="mt-2.5">
            <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200/80">
              <div 
                className="h-full rounded-full gold-gradient-bg transition-all duration-700" 
                style={{ width: `${targetProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>{remainingToTarget === 0 ? 'Target Achieved!' : `$${remainingToTarget.toFixed(0)} remaining`}</span>
              <span>Target: ${profitTargetThreshold.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Drawdown Safety Buffer */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Max Drawdown Cushion</span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {account.drawdownPct || 2.1}% Used
            </span>
          </div>
          <div className="font-serif font-bold text-2xl sm:text-3xl text-emerald-700 font-mono tracking-tight">
            <AnimatedCounter value={remainingBuffer} prefix="$" />
          </div>
          {/* Cushion Bar */}
          <div className="mt-2.5">
            <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200/80">
              <div 
                className="h-full rounded-full bg-emerald-500 transition-all duration-700" 
                style={{ width: `${bufferProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>Safe Buffer</span>
              <span>Breach Floor: ${maxLossThreshold.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================
          2. MAIN PERFORMANCE CHART & POSITIONS (2-COLUMN GRID)
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8-Columns: High-Resolution Equity Curve & Clean Positions */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Equity Curve Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-card space-y-4">
            
            {/* Chart Header & Timeframe Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-950 flex items-center gap-2">
                  <span>Performance Equity Curve</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Live Stream
                  </span>
                </h3>
                <p className="text-xs text-stone-500">
                  Account equity progression with profit target and loss floor thresholds.
                </p>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold">
                {['1d', '7d', '30d', 'all'].map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-white text-stone-950 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <Line data={chartData} options={chartOptions} />
            </div>

          </div>

          {/* Active Open Positions Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2DA] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brass-700" />
                <h4 className="font-serif font-bold text-base text-stone-950">
                  Active Open Positions
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brass-100 text-brass-900 border border-brass-300">
                  {account.openPositions ? account.openPositions.length : 0} Live
                </span>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Tradovate / MT5 Execution
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Strategy Setup</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Volume</th>
                    <th className="pb-2 text-right">Floating P&amp;L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {account.openPositions && account.openPositions.map((pos, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 font-bold text-stone-900">{pos.symbol}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brass-50 border border-brass-200 text-brass-850">
                          {pos.setup}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`font-bold ${pos.side === 'Buy' ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {pos.side}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-stone-700">{pos.vol} Lots</td>
                      <td className={`py-3 text-right font-mono font-bold ${pos.pnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {pos.pnl >= 0 ? `+$${pos.pnl.toFixed(2)}` : `-$${Math.abs(pos.pnl).toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 4-Columns: Consolidated Rule Health & Macro News */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Challenge Health & Rule Compliance Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brass-100 text-brass-800 flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-950">Rule Compliance</h4>
                  <span className="text-[11px] text-stone-500">Risk Guard Active</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                100% Passed
              </span>
            </div>

            {/* Rule 1: Daily Loss Limit */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-semibold">Daily Loss Limit</span>
                <span className="font-mono font-bold text-emerald-700">$0.00 / ${account.startingBalance * 0.05}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '8%' }}></div>
              </div>
              <span className="text-[10px] text-stone-500 block">Resets automatically at 17:00 EST</span>
            </div>

            {/* Rule 2: Max Trailing Drawdown */}
            <div className="space-y-1.5 text-xs pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-semibold">Max Drawdown (EOD)</span>
                <span className="font-mono font-bold text-stone-950">{account.drawdownPct || 2.1}% / {maxLossPct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(account.drawdownPct / maxLossPct) * 100}%` }}></div>
              </div>
              <span className="text-[10px] text-stone-500 block">${remainingBuffer.toFixed(0)} safety cushion remaining</span>
            </div>

            {/* Rule 3: Consistency Metric */}
            <div className="space-y-1.5 text-xs pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-semibold">Consistency Score</span>
                <span className="font-mono font-bold text-emerald-700">31.4% (Max 40%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '78%' }}></div>
              </div>
              <span className="text-[10px] text-stone-500 block">No single day dominates total profit</span>
            </div>

          </div>

          {/* Compact Economic Calendar Feed */}
          <EconomicCalendarWidget />

        </div>

      </div>

    </div>
  );
}
