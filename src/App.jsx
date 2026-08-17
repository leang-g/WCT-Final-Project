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
        return <Home />;
      case 'pricing':
        return (
          <div className="pt-6">
            <Pricing />
          </div>
        );
      case 'rules':
        return <Rules />;
      case 'dashboard':
        return <Dashboard />;
      case 'help':
        return <HelpCenter />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] relative selection:bg-brass-400/20 selection:text-brass-900">
      {/* Subtle Global CSS SVG Noise Overlay Layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025] mix-blend-overlay bg-noise" 
        aria-hidden="true" 
      />

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
