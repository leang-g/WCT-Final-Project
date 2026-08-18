import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Rules from './components/Rules';
import Dashboard from './components/Dashboard';
import HelpCenter from './components/HelpCenter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';

function MainContent() {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
      case 'pricing':
      case 'rules':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'help':
        return <HelpCenter />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080A0F] text-stone-100 relative selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden">
      {/* Subtle Global CSS SVG Noise Overlay Layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-screen bg-noise" 
        aria-hidden="true" 
      />

      {/* Global Ambient Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#C59A45]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-cyan-500/4 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        {/* Main Content View with top spacing for fixed navbar */}
        <main className="pt-20">
          {renderActiveView()}
        </main>
      </div>

      <Footer />

      {/* Global Modals */}
      <AuthModal />
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
