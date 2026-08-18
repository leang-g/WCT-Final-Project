import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';

export default function DashboardRules({ account, onResetSimulation }) {
  const [resetConfirmed, setResetConfirmed] = useState(false);

  if (!account) return null;

  const startingBalance = account.startingBalance || 50000;
  const currentBalance = account.currentBalance || 50317.40;

  const handleResetClick = () => {
    setResetConfirmed(true);
    setTimeout(() => {
      if (onResetSimulation) onResetSimulation();
      setResetConfirmed(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Active Rules Compliance Card */}
      <div className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif font-bold text-xl text-white">
              Active Evaluation Parameters
            </h3>
            <p className="text-xs text-stone-400">
              {account.plan} • {account.platform}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-neon-glow">
            ALL RULES COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Profit Target: {account.profitTargetPct || 10}%</span>
              <span className="text-emerald-400 font-mono">${(startingBalance * ((account.profitTargetPct || 10) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-400">
              Reach the profit milestone in Phase 1 evaluation without breaching loss limits.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Trailing Max Drawdown (EOD): {account.maxDrawdownPct || 6}%</span>
              <span className="text-rose-400 font-mono">${(startingBalance * ((account.maxDrawdownPct || 6) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-400">
              Calculates only at 5:00 PM EST daily market close. No intraday unrealized traps.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Daily Loss Limit: {account.dailyLossLimitPct || 5}%</span>
              <span className="text-rose-400 font-mono">${(startingBalance * ((account.dailyLossLimitPct || 5) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-400">
              Resets daily at 17:00 EST. Calculated based on previous day closing equity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Multi-Account Copier &amp; Weekend</span>
              <span className="text-emerald-400 font-mono">20 Accounts • Allowed</span>
            </div>
            <p className="text-stone-400">
              Trade copiers (Replikanto, NinjaTrader) and news holding are 100% permitted.
            </p>
          </div>

        </div>
      </div>

      {/* Evaluation Reset Sandbox Simulation */}
      <div className="p-7 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
          <RotateCcw className="w-5 h-5 text-emerald-400" />
          <span>Challenge Simulation Reset</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
          Want to restart your evaluation from a clean slate? In our sandbox environment, you can reset your simulated balance back to the initial starting capital of <strong className="text-white">${new Intl.NumberFormat('en-US').format(startingBalance)}</strong> at any time.
        </p>

        <div className="pt-2">
          <button
            onClick={handleResetClick}
            disabled={resetConfirmed}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
          >
            <RotateCcw className={`w-4 h-4 text-emerald-400 ${resetConfirmed ? 'animate-spin' : ''}`} />
            <span>{resetConfirmed ? 'Resetting Account Balance...' : 'Instant Account Reset'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
