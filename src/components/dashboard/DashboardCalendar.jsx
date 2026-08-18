import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw, TrendingUp, TrendingDown, Info, Activity } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardCalendar({ account }) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(7); // August (0-indexed)
  const [hoveredDay, setHoveredDay] = useState(null);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleResetToCurrent = () => {
    setCurrentYear(2026);
    setCurrentMonthIndex(7); // August 2026
  };

  // Generate calendar days dynamically
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const firstDayOfWeek = (new Date(currentYear, currentMonthIndex, 1).getDay() + 6) % 7;

    const days = [];

    // Leading empty padding
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, date: '', pnl: null, trades: 0, isWeekend: false });
    }

    const startBal = account ? (account.startingBalance || 50000) : 50000;
    const factor = startBal / 50000;

    const simRefYear = 2026;
    const simRefMonth = 7; // August
    const simRefDay = 17;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = (firstDayOfWeek + d - 1) % 7;
      const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
      const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      const isToday = currentYear === simRefYear && currentMonthIndex === simRefMonth && d === simRefDay;
      const isPastOrToday = (currentYear < simRefYear) ||
                            (currentYear === simRefYear && currentMonthIndex < simRefMonth) ||
                            (currentYear === simRefYear && currentMonthIndex === simRefMonth && d <= simRefDay);

      let pnl = null;
      let trades = 0;

      if (isPastOrToday && !isWeekend) {
        const seed = Math.sin((currentYear * 1000) + ((currentMonthIndex + 1) * 37) + (d * 13)) * 10000;
        const pseudoRand = Math.abs(seed - Math.floor(seed));

        const isWin = pseudoRand < 0.68;
        trades = Math.floor(pseudoRand * 4) + 1;

        if (isWin) {
          pnl = Math.round((220 + (pseudoRand * 680)) * factor * 100) / 100;
        } else {
          pnl = -Math.round((140 + (pseudoRand * 520)) * factor * 100) / 100;
        }

        if (isToday) {
          pnl = account && account.todayPnL !== undefined ? account.todayPnL : 317.40;
          trades = 2;
        }
      }

      days.push({
        day: d,
        date: dateStr,
        pnl: pnl,
        trades: trades,
        isWeekend: isWeekend,
        isToday: isToday
      });
    }

    return days;
  }, [currentYear, currentMonthIndex, account]);

  const tradingDaysList = calendarDays.filter(d => d.pnl !== null);
  const winningDays = tradingDaysList.filter(d => d.pnl > 0);
  const losingDays = tradingDaysList.filter(d => d.pnl < 0);
  const totalMonthPnL = tradingDaysList.reduce((acc, curr) => acc + curr.pnl, 0);
  const totalTradesCount = tradingDaysList.reduce((acc, curr) => acc + curr.trades, 0);
  const winRate = tradingDaysList.length > 0 ? ((winningDays.length / tradingDaysList.length) * 100).toFixed(0) : 0;

  const currentMonthLabel = `${monthNames[currentMonthIndex]} ${currentYear}`;
  const isViewingCurrentSimMonth = currentYear === 2026 && currentMonthIndex === 7;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Month Header & Summary Statistics */}
      <div className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Trading Performance Log
            </span>
            <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-400" />
              P&amp;L Trading Calendar
            </h3>
          </div>

          {/* Month Selector Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer shadow-xs"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <span className="font-serif font-bold text-sm text-white px-3 min-w-[140px] text-center select-none font-mono">
              {currentMonthLabel}
            </span>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer shadow-xs"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {!isViewingCurrentSimMonth && (
              <button
                onClick={handleResetToCurrent}
                className="px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                title="Return to Current Month"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Today</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Quick Month KPI Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Month Net P&amp;L</span>
            <span className={`font-mono font-bold text-xl block mt-0.5 ${totalMonthPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              <AnimatedCounter value={totalMonthPnL} prefix={totalMonthPnL >= 0 ? '+$' : '-$'} />
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">Winning Days</span>
            <span className="font-mono font-bold text-xl text-emerald-400 block mt-0.5">
              {winningDays.length} Days ({winRate}%)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Losing Days</span>
            <span className="font-mono font-bold text-xl text-rose-400 block mt-0.5">
              {losingDays.length} Days
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Executed Trades</span>
            <span className="font-mono font-bold text-xl text-white block mt-0.5">
              {totalTradesCount} Trades
            </span>
          </div>
        </div>

      </div>

      {/* 7-Column Calendar Grid */}
      <div className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl relative">
        
        {/* Days of Week Headers */}
        <div className="grid grid-cols-7 gap-2 mb-3 text-center">
          {weekHeaders.map((dayName, idx) => (
            <div key={idx} className="py-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Day Tiles */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {calendarDays.map((item, idx) => {
            if (!item.day) {
              return (
                <div key={idx} className="h-20 sm:h-24 rounded-2xl bg-transparent border border-dashed border-white/5"></div>
              );
            }

            const hasPnl = item.pnl !== null;
            const isProfit = item.pnl > 0;
            const isLoss = item.pnl < 0;

            return (
              <div
                key={idx}
                onMouseEnter={() => hasPnl && setHoveredDay(item)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`relative h-20 sm:h-24 p-2.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  item.isToday
                    ? 'border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-400/40 shadow-neon-glow'
                    : hasPnl
                    ? (isProfit
                        ? 'bg-emerald-500/15 border-emerald-500/40 hover:bg-emerald-500/25 hover:border-emerald-400 shadow-xs'
                        : 'bg-rose-500/15 border-rose-500/40 hover:bg-rose-500/25 hover:border-rose-400 shadow-xs')
                    : (item.isWeekend
                        ? 'bg-white/[0.02] border-white/5 text-stone-600'
                        : 'bg-obsidian-950/60 border-white/10 hover:border-white/20')
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${item.isToday ? 'text-emerald-300' : 'text-stone-300'}`}>
                    {item.day}
                  </span>
                  {item.isToday && (
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-emerald-400 text-obsidian-950 uppercase font-mono">
                      Today
                    </span>
                  )}
                  {hasPnl && (
                    <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
                      {item.trades} trds
                    </span>
                  )}
                </div>

                {/* Day P&L */}
                <div className="text-center sm:text-left">
                  {hasPnl ? (
                    <div>
                      <span className={`font-mono font-bold text-xs sm:text-sm block ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isProfit ? `+$${item.pnl.toFixed(2)}` : `-$${Math.abs(item.pnl).toFixed(2)}`}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-stone-600 font-mono">—</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Hover Popover Breakdown */}
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-8 bg-obsidian-950/95 backdrop-blur-xl text-white p-3.5 rounded-2xl shadow-2xl border border-white/20 text-xs font-mono z-20 pointer-events-none"
          >
            <div className="text-emerald-400 font-bold mb-1">{hoveredDay.date} Session Logs</div>
            <div className="flex items-center gap-3">
              <span>Executed: {hoveredDay.trades} Trades</span>
              <span className={hoveredDay.pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                Net: {hoveredDay.pnl >= 0 ? `+$${hoveredDay.pnl.toFixed(2)}` : `-$${Math.abs(hoveredDay.pnl).toFixed(2)}`}
              </span>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
