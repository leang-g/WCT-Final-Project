import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet } from 'lucide-react';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardNav from './dashboard/DashboardNav';
import DashboardOverview from './dashboard/DashboardOverview';
import DashboardCalendar from './dashboard/DashboardCalendar';
import DashboardHistory from './dashboard/DashboardHistory';
import DashboardRules from './dashboard/DashboardRules';
import DashboardPlatform from './dashboard/DashboardPlatform';
import LoginInfoModal from './dashboard/LoginInfoModal';
import CalculatorModal from './dashboard/CalculatorModal';
import CertificateModal from './CertificateModal';

export default function Dashboard() {
  const { user, accounts, activeAccount, switchAccount, updateAccount, navigateToTab, setAuthModalOpen } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'calendar' | 'history' | 'rules' | 'platform'
  const [loginInfoModalOpen, setLoginInfoModalOpen] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Empty state handling
  if (!accounts || accounts.length === 0) {
    return (
      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 text-center animate-in fade-in duration-300">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-dark border border-white/10 shadow-2xl">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-neon-glow">
            <Wallet className="w-10 h-10" />
          </div>

          <h2 className="font-serif font-bold text-3xl text-white mb-3">
            No Active Evaluation Accounts Found
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            {user
              ? "You don't have any active challenge accounts yet. Pick an institutional model to activate your live simulated terminal."
              : "Sign in to access your trading terminal or browse our challenge evaluation tiers to get funded."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateToTab('pricing')}
              className="w-full sm:w-auto gold-gradient-bg text-obsidian-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-brass-glow transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Browse Evaluation Plans &amp; Get Funded
            </button>

            {!user && (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-stone-200 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sign In to Existing Account
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const current = activeAccount || accounts[0];

  const handleResetSimulation = () => {
    // Reset simulated balance to starting balance with persistent storage
    if (updateAccount) {
      updateAccount(current.id, {
        currentBalance: current.startingBalance,
        equity: current.startingBalance,
        todayPnL: 0,
        drawdownPct: 0.0,
        chartData: [
          current.startingBalance,
          current.startingBalance,
          current.startingBalance,
          current.startingBalance,
          current.startingBalance,
          current.startingBalance,
          current.startingBalance
        ]
      });
    }
  };

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return <DashboardOverview account={current} />;
      case 'calendar':
        return <DashboardCalendar account={current} />;
      case 'history':
        return <DashboardHistory account={current} />;
      case 'rules':
        return <DashboardRules account={current} onResetSimulation={handleResetSimulation} />;
      case 'platform':
        return (
          <DashboardPlatform
            account={current}
            onOpenLoginInfo={() => setLoginInfoModalOpen(true)}
          />
        );
      default:
        return <DashboardOverview account={current} />;
    }
  };

  return (
    <div className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* 1. Header & Switcher */}
      <DashboardHeader
        account={current}
        accounts={accounts}
        onSwitchAccount={switchAccount}
        onOpenLoginInfo={() => setLoginInfoModalOpen(true)}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
        onOpenCertificate={() => setCertificateModalOpen(true)}
        onBuyNew={() => navigateToTab('pricing')}
      />

      {/* 2. Sub-Tab Navigation Bar */}
      <DashboardNav
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* 3. Sub-Tab Active View Content */}
      <main className="min-h-[500px]">
        {renderSubTabContent()}
      </main>

      {/* 4. Global Dashboard Modals */}
      <LoginInfoModal
        isOpen={loginInfoModalOpen}
        onClose={() => setLoginInfoModalOpen(false)}
        account={current}
      />

      <CalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
      />

      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        account={current}
        user={user}
      />

    </div>
  );
}
