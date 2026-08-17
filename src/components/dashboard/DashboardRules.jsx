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
      <div className="p-6 rounded-3xl bg-white border border-[#E7E2DA] shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-950">
              Active Evaluation Parameters
            </h3>
            <p className="text-xs text-stone-500">
              {account.plan} • {account.platform}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ALL RULES COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>Profit Target: {account.profitTargetPct || 10}%</span>
              <span className="text-emerald-700 font-mono">${(startingBalance * ((account.profitTargetPct || 10) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-600">
              Reach the profit milestone in Phase 1 evaluation without exceeding loss boundaries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>Trailing Max Drawdown: {account.maxDrawdownPct || 6}%</span>
              <span className="text-rose-700 font-mono">${(startingBalance * ((account.maxDrawdownPct || 6) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-600">
              Calculated based on your recorded equity peak. Protects capital and locks profit steps.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>Daily Loss Limit: {account.dailyLossLimitPct || 5}%</span>
              <span className="text-rose-700 font-mono">${(startingBalance * ((account.dailyLossLimitPct || 5) / 100)).toFixed(2)}</span>
            </div>
            <p className="text-stone-600">
              Resets daily at 17:00 EST. Calculated based on previous day closing equity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>Leverage &amp; Weekend Holding</span>
              <span className="text-stone-900 font-mono">1:50 • Permitted</span>
            </div>
            <p className="text-stone-600">
              Overnight positions, weekend holding, and high-impact news trading are permitted.
            </p>
          </div>

        </div>
      </div>

      {/* Evaluation Reset Sandbox Simulation */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-card space-y-4">
        <div className="flex items-center gap-2 text-stone-950 font-serif font-bold text-lg">
          <RotateCcw className="w-5 h-5 text-brass-600" />
          <span>Challenge Simulation Reset</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
          Want to restart your evaluation from a clean slate? In our sandbox environment, you can reset your simulated balance back to the initial starting capital of <strong>${new Intl.NumberFormat('en-US').format(startingBalance)}</strong> at any time.
        </p>

        <div className="pt-2">
          <button
            onClick={handleResetClick}
            disabled={resetConfirmed}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 hover:bg-stone-850 text-brass-300 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
          >
            <RotateCcw className={`w-4 h-4 ${resetConfirmed ? 'animate-spin' : ''}`} />
            <span>{resetConfirmed ? 'Resetting Account...' : 'Reset Simulated Balance'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
