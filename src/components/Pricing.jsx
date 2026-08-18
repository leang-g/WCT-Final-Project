import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { propFirmData, platforms } from '../data/propFirmData';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  CheckCircle2, 
  X, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  RotateCw,
  Info,
  DollarSign
} from 'lucide-react';

export default function Pricing() {
  const { triggerGetFunded } = useApp();
  const [selectedModel, setSelectedModel] = useState('growth'); // 'growth' | 'select' | 'lightning'
  const [selectedPlatform, setSelectedPlatform] = useState('tradovate');
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [flippedCards, setFlippedCards] = useState({}); // { [tierKey]: boolean }

  const currentModelData = propFirmData[selectedModel] || propFirmData.growth;
  const currentPlatformObj = platforms.find(p => p.key === selectedPlatform) || platforms[0];

  const toggleFlip = (tierSize) => {
    setFlippedCards(prev => ({
      ...prev,
      [tierSize]: !prev[tierSize]
    }));
  };

  const handleStartChallenge = (tier) => {
    triggerGetFunded({
      model: currentModelData.label,
      size: tier.size,
      numericSize: tier.numericSize,
      platform: currentPlatformObj.name,
      price: tier.discountPrice,
      originalPrice: tier.originalPrice,
      discountCode: 'AUG'
    });
  };

  return (
    <section id="pricing" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-neon-glow">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Evaluation Tiers &amp; Rules Matrix
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          Choose Your Challenge Tier
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
          Select your evaluation model, capital size, and platform. Zero hidden rules, weekly payouts, and 100% fee refund.
        </p>
      </div>

      {/* ============================================================
          1. MODEL SELECTOR TABS (DARK FINTECH)
          ============================================================ */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-full max-w-4xl p-2 rounded-3xl bg-obsidian-950/80 border border-white/10 shadow-2xl backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-2">
          {Object.keys(propFirmData).map((key) => {
            const isSelected = selectedModel === key;
            const model = propFirmData[key];

            return (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={`text-left p-4 rounded-2xl transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white/10 border border-emerald-500/50 shadow-card-dark ring-1 ring-emerald-500/30'
                    : 'border border-transparent hover:bg-white/5 text-stone-300'
                }`}
              >
                {/* Header Row: Label + Badge */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-serif font-bold text-base sm:text-lg tracking-tight ${
                    isSelected ? 'text-white' : 'text-stone-200'
                  }`}>
                    {model.label}
                  </span>
                  
                  {model.badgeType === 'instant' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs">
                      {model.badge}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-stone-300 bg-white/5 border border-white/10 font-mono">
                      {model.badge}
                    </span>
                  )}
                </div>

                {/* Subtitle */}
                <p className="text-stone-400 text-xs sm:text-[13px] font-normal leading-relaxed">
                  {model.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          2. PLATFORM SELECTOR BAR
          ============================================================ */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">Platform:</span>
        {platforms.map((plat) => {
          const isSelected = selectedPlatform === plat.key;

          return (
            <button
              key={plat.key}
              onClick={() => setSelectedPlatform(plat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                isSelected
                  ? 'bg-white/15 text-white border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-white/5 text-stone-300 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {plat.key === 'tradovate' && (
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-[11px] font-mono">
                  T
                </div>
              )}
              {plat.key === 'tradingview' && (
                <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-[10px] font-mono">
                  TV
                </div>
              )}
              {plat.key === 'ninjatrader' && (
                <div className="w-5 h-5 rounded-md bg-stone-800 flex items-center justify-center text-white font-bold text-[10px] font-mono border border-stone-600">
                  NT
                </div>
              )}
              {plat.key === 'mt5' && (
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] font-mono">
                  M5
                </div>
              )}

              <span>{plat.name}</span>
              {plat.badge && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-emerald-400 text-obsidian-950' : 'bg-white/10 text-stone-300'
                }`}>
                  {plat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================
          3. 3D FLIP CARD 5-TIER PRICING & RULES MATRIX ($25K - $250K)
          ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {currentModelData.tiers.map((tier, idx) => {
          const isFlipped = !!flippedCards[tier.size];
          const isMostPopular = tier.mostPopular;

          return (
            <div
              key={tier.size}
              className="perspective-1000 min-h-[580px] flex flex-col"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="preserve-3d relative w-full flex-1 flex flex-col"
              >
                
                {/* --------------------------------------------------------
                    FRONT FACE: EVALUATION RULES
                    -------------------------------------------------------- */}
                <div 
                  className={`backface-hidden w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    isMostPopular
                      ? 'glass-panel-dark-glow border-2 border-emerald-500/60 shadow-card-dark-hover'
                      : 'glass-panel-dark border border-white/10 shadow-2xl hover:border-white/20'
                  }`}
                >
                  {/* MOST POPULAR Glowing Badge */}
                  {isMostPopular && (
                    <div className="absolute top-3 left-5">
                      <span className="bg-emerald-500 text-obsidian-950 font-black text-[9px] tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow-neon-glow">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col flex-1">
                    
                    {/* Header Group */}
                    <div className={`border-b border-white/10 pb-3 mb-3 ${isMostPopular ? 'pt-5' : 'pt-1'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10">
                          Phase 1: Evaluation
                        </span>
                        <span className="text-xs font-semibold text-brass-300 font-serif">
                          {currentModelData.label}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {tier.title}
                      </h3>

                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-stone-500 line-through text-sm font-mono">
                          ${tier.originalPrice}
                        </span>
                        <span className="text-emerald-400 font-bold text-2xl font-mono">
                          ${tier.discountPrice}
                        </span>
                        <span className="text-stone-400 text-[10px] font-normal ml-1">
                          one-time
                        </span>
                      </div>
                    </div>

                    {/* Rules Parameters List */}
                    <div className="flex-1 flex flex-col justify-between space-y-1.5 mb-3 text-xs min-h-[210px]">
                      {tier.rules.map((rule, rIdx) => {
                        const isLast = rIdx === tier.rules.length - 1;

                        return (
                          <div 
                            key={rIdx}
                            className={`flex items-center justify-between py-1 ${!isLast ? 'border-b border-white/5' : ''}`}
                          >
                            {/* Left Label */}
                            <div className="flex items-center gap-1 text-stone-300 font-normal">
                              <span>{rule.label}</span>
                              {rule.hasTooltip && (
                                <div className="relative inline-block">
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveTooltip(`${tier.size}-${rIdx}`)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    onClick={() => setActiveTooltip(activeTooltip === `${tier.size}-${rIdx}` ? null : `${tier.size}-${rIdx}`)}
                                    className="text-stone-400 hover:text-white cursor-pointer ml-0.5"
                                    aria-label="Rule information"
                                  >
                                    <HelpCircle className="w-3 h-3" />
                                  </button>
                                  
                                  {activeTooltip === `${tier.size}-${rIdx}` && (
                                    <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 rounded-xl bg-obsidian-950 text-stone-100 text-[11px] shadow-2xl border border-white/20 z-30 pointer-events-none">
                                      {rule.tooltip}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Right Value */}
                            <div className="text-right">
                              {rule.originalValue && (
                                <span className="line-through text-stone-500 mr-1 font-mono text-[11px]">
                                  {rule.originalValue}
                                </span>
                              )}
                              <span className={`font-mono ${
                                rule.isHighlight 
                                  ? 'text-emerald-400 font-bold' 
                                  : 'text-white font-semibold'
                              }`}>
                                {rule.value}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Flip Card Link Button */}
                    <div className="h-7 flex items-center justify-center mb-3">
                      <button
                        type="button"
                        onClick={() => toggleFlip(tier.size)}
                        className="text-[11px] font-bold text-brass-300 hover:text-brass-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>View Funded Stage Rules</span>
                      </button>
                    </div>

                  </div>

                  {/* Start Challenge CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartChallenge(tier)}
                    className="shimmer-btn w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider gold-gradient-bg text-obsidian-950 hover:shadow-brass-glow transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
                  </motion.button>

                </div>

                {/* --------------------------------------------------------
                    BACK FACE: FUNDED ACCOUNT STAGE RULES
                    -------------------------------------------------------- */}
                <div 
                  className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden glass-panel-dark border border-white/20 shadow-2xl bg-obsidian-900"
                >
                  <div className="flex flex-col flex-1">
                    
                    {/* Header */}
                    <div className="border-b border-white/10 pb-3 mb-3 pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Phase 2: Live Funded
                        </span>
                        <span className="text-xs font-semibold text-brass-300 font-serif">
                          {currentModelData.label}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {tier.title} (Funded)
                      </h3>

                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="text-emerald-400 font-bold text-lg font-mono">
                          100% First $10,000 Profit
                        </span>
                      </div>
                    </div>

                    {/* Funded Rules List */}
                    <div className="flex-1 flex flex-col justify-between space-y-1.5 mb-3 text-xs min-h-[210px]">
                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Payout Frequency</span>
                        <span className="font-mono font-bold text-emerald-400">{tier.fundedRules.payoutFrequency}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Max Payout / Cycle</span>
                        <span className="font-mono font-bold text-white">{tier.fundedRules.maxPayout}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Trader Profit Share</span>
                        <span className="font-mono font-bold text-emerald-400">{tier.fundedRules.profitShare}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Consistency Rule</span>
                        <span className="font-semibold text-white">{tier.fundedRules.consistency}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-stone-400">Fee Refund</span>
                        <span className="font-mono font-bold text-emerald-400">{tier.fundedRules.refund}</span>
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <span className="text-stone-400">Withdrawal Fee</span>
                        <span className="font-mono font-bold text-emerald-400">$0 (Free)</span>
                      </div>
                    </div>

                    {/* Flip Back Link */}
                    <div className="h-7 flex items-center justify-center mb-3">
                      <button
                        type="button"
                        onClick={() => toggleFlip(tier.size)}
                        className="text-[11px] font-bold text-stone-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Flip Back to Phase 1</span>
                      </button>
                    </div>

                  </div>

                  {/* Start Challenge CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartChallenge(tier)}
                    className="shimmer-btn w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider gold-gradient-bg text-obsidian-950 hover:shadow-brass-glow transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Start Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
                  </motion.button>

                </div>

              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Auto-applied discount banner */}
      <div className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-stone-300 text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Promo Code <strong className="text-emerald-400">AUG</strong> Auto-Applied: 40% OFF Evaluation Fees</span>
        </span>
      </div>

    </section>
  );
}
