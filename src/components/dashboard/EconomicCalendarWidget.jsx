import React from 'react';
import { Calendar, AlertCircle, Clock, Globe } from 'lucide-react';

export default function EconomicCalendarWidget() {
  const events = [
    {
      time: '13:30 GMT',
      currency: 'USD',
      name: 'Core CPI (MoM)',
      impact: 'High',
      actual: '0.3%',
      forecast: '0.2%',
      previous: '0.1%'
    },
    {
      time: '15:00 GMT',
      currency: 'USD',
      name: 'Fed Chair Powell Speech',
      impact: 'High',
      actual: '—',
      forecast: '—',
      previous: '—'
    },
    {
      time: '18:00 GMT',
      currency: 'USD',
      name: 'FOMC Meeting Minutes',
      impact: 'High',
      actual: '—',
      forecast: '—',
      previous: '—'
    },
    {
      time: '09:00 GMT',
      currency: 'EUR',
      name: 'German Flash PMI',
      impact: 'Medium',
      actual: '49.1',
      forecast: '48.9',
      previous: '48.6'
    }
  ];

  return (
    <div className="p-5 rounded-2xl glass-panel-dark border border-white/10 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h4 className="font-serif font-bold text-sm text-white">
            Economic Calendar
          </h4>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
          Live Feed
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-obsidian-950/70 border border-white/5 hover:border-white/15 transition-colors flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-white/10 text-white shrink-0 border border-white/10">
                {ev.currency}
              </span>
              <div className="truncate">
                <span className="font-semibold text-stone-200 block truncate">{ev.name}</span>
                <span className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-brass-400" />
                  {ev.time}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  ev.impact === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {ev.impact}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] text-emerald-400 text-center font-medium border-t border-white/10 font-mono">
        News trading is 100% permitted across all challenges.
      </div>
    </div>
  );
}
