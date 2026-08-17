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
    <div className="border border-stone-200/90 bg-white/80 backdrop-blur-xl rounded-2xl px-3 sm:px-4 shadow-sm">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive ? 'text-brass-300' : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/70'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSubTabPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-stone-950 rounded-xl shadow-sm"
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-brass-400' : 'text-stone-500'}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
