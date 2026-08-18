import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, History, ShieldAlert, Monitor } from 'lucide-react';

export default function DashboardNav({ activeSubTab, setActiveSubTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'history', label: 'History', icon: History },
    { id: 'rules', label: 'Rules & Reset', icon: ShieldAlert },
    { id: 'platform', label: 'Platform', icon: Monitor },
  ];

  return (
    <div className="border border-white/10 glass-panel-dark backdrop-blur-2xl rounded-2xl px-3 sm:px-4 shadow-xl">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive ? 'text-obsidian-950 font-black' : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSubTabPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl shadow-neon-glow"
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-obsidian-950' : 'text-stone-400'}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
