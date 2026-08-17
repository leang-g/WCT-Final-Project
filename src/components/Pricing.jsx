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
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brass-100/90 border border-brass-300 text-stone-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brass-700" />
          Evaluation Tiers &amp; Rules Matrix
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-950 tracking-tight">
          Choose Your Challenge Tier
        </h2>
        <p className="text-stone-700 text-sm sm:text-base mt-3 leading-relaxed">
          Select your evaluation model, balance, and platform. Zero hidden rules, weekly payouts, and 100% refund on first payout.
        </p>
      </div>

      {/* ============================================================
          1. MODEL SELECTOR TABS (WARM EDITORIAL THEME)
          ============================================================ */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-full max-w-4xl p-2 rounded-3xl bg-stone-200/60 border border-stone-300/80 shadow-inner backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-2">
          {Object.keys(propFirmData).map((key) => {
            const isSelected = selectedModel === key;
            const model = propFirmData[key];

            return (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={`text-left p-4 rounded-2xl transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border border-stone-300 shadow-editorial ring-1 ring-brass-400/30'
                    : 'border border-transparent hover:bg-white/50 text-stone-700'
                }`}
              >
                {/* Header Row: Label + Badge */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-serif font-bold text-base sm:text-lg tracking-tight ${
                    isSelected ? 'text-stone-950' : 'text-stone-800'
                  }`}>
                    {model.label}
                  </span>
                  
                  {model.badgeType === 'instant' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                      {model.badge}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-stone-700 bg-stone-100 border border-stone-200">
                      {model.badge}
                    </span>
                  )}
                </div>

                {/* Subtitle */}
                <p className="text-stone-600 text-xs sm:text-[13px] font-normal leading-relaxed">
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
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1">Platform:</span>
        {platforms.map((plat) => {
          const isSelected = selectedPlatform === plat.key;

          return (
            <button
              key={plat.key}
              onClick={() => setSelectedPlatform(plat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer border ${
                isSelected
                  ? 'bg-stone-950 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {plat.key === 'tradovate' && (
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-[11px]">
                  T
                </div>
              )}
              {plat.key === 'mt5' && (
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                  M5
                </div>
              )}
              {plat.key === 'ninjatrader' && (
                <div className="w-5 h-5 rounded-md bg-stone-900 flex items-center justify-center text-white font-bold text-[10px] border border-stone-700">
                  NT
                </div>
              )}

              <span>{plat.name}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================
          3. 3D FLIP CARD 4-TIER PRICING & RULES MATRIX (25K, 50K, 100K, 150K)
          ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {currentModelData.tiers.map((tier, idx) => {
          const isFlipped = !!flippedCards[tier.size];
          const isMostPopular = tier.mostPopular;

          return (
            <div
              key={tier.size}
              className="perspective-1000 min-h-[590px] flex flex-col"
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
                  className={`backface-hidden w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    isMostPopular
                      ? 'bg-white/95 backdrop-blur-md border-2 border-brass-400 shadow-editorial-hover ring-2 ring-brass-400/20'
                      : 'bg-white/85 backdrop-blur-md border border-stone-200/80 ring-1 ring-white/60 shadow-editorial hover:shadow-editorial-hover'
                  }`}
                >
                  {/* Top-Right Ambient Warm Glow for Most Popular */}
                  {isMostPopular && (
                    <div 
                      className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-brass-400/20 via-emerald-500/10 to-transparent pointer-events-none rounded-tr-3xl"
                      aria-hidden="true" 
                    />
                  )}

                  {/* MOST POPULAR Luxury Gold Badge */}
                  {isMostPopular && (
                    <div className="absolute top-3.5 left-6">
                      <span className="gold-gradient-bg text-stone-950 font-black text-[10px] tracking-wider px-3 py-1 rounded-full uppercase shadow-xs">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col flex-1">
                    
                    {/* Standardized Header Group (Matched to Back Face) */}
                    <div className={`border-b border-stone-100 pb-4 mb-4 ${isMostPopular ? 'pt-6' : 'pt-1'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                          Phase 1: Evaluation
                        </span>
                        <span className="text-xs font-semibold text-brass-700 font-serif">
                          {currentModelData.label}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 tracking-tight">
                        {tier.title}
                      </h3>

                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className="text-stone-400 line-through text-base sm:text-lg font-mono">
                          ${tier.originalPrice}
                        </span>
                        <span className="text-emerald-700 font-bold text-2xl sm:text-3xl font-mono">
                          ${tier.discountPrice}
                        </span>
                        <span className="text-stone-500 text-xs font-normal ml-1">
                          one time payment
                        </span>
                      </div>
                    </div>

                    {/* Explicit Rules Parameters List (Matched Height) */}
                    <div className="flex-1 flex flex-col justify-between space-y-2 mb-4 text-xs sm:text-[13px] min-h-[220px]">
                      {tier.rules.map((rule, rIdx) => {
                        const isLast = rIdx === tier.rules.length - 1;

                        return (
                          <div 
                            key={rIdx}
                            className={`flex items-center justify-between py-1 ${!isLast ? 'border-b border-stone-100' : ''}`}
                          >
                            {/* Left Label */}
                            <div className="flex items-center gap-1 text-stone-600 font-normal">
                              <span>{rule.label}</span>
                              {rule.hasTooltip && (
                                <div className="relative inline-block">
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveTooltip(`${tier.size}-${rIdx}`)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    onClick={() => setActiveTooltip(activeTooltip === `${tier.size}-${rIdx}` ? null : `${tier.size}-${rIdx}`)}
                                    className="text-stone-400 hover:text-stone-700 cursor-pointer ml-0.5"
                                    aria-label="Rule information"
                                  >
                                    <HelpCircle className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  {activeTooltip === `${tier.size}-${rIdx}` && (
                                    <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 rounded-xl bg-stone-950 text-stone-100 text-[11px] shadow-2xl border border-stone-800 z-30 pointer-events-none">
                                      {rule.tooltip}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Right Value */}
                            <div className="text-right">
                              {rule.originalValue && (
                                <span className="line-through text-stone-400 mr-1.5 font-mono">
                                  {rule.originalValue}
                                </span>
                              )}
                              <span className={`font-mono font-medium ${
                                rule.isHighlight 
                                  ? 'text-emerald-700 font-bold' 
                                  : 'text-stone-950 font-bold'
                              }`}>
                                {rule.value}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Standardized Flip Link Box */}
                    <div className="h-8 flex items-center justify-center mb-3.5">
                      <button
                        type="button"
                        onClick={() => toggleFlip(tier.size)}
                        className="inline-flex items-center justify-center gap-1.5 text-stone-700 hover:text-brass-800 font-semibold text-xs py-1 px-3 rounded-full hover:bg-stone-100 transition-colors cursor-pointer group whitespace-nowrap"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-brass-600 transition-transform group-hover:rotate-180 duration-500 shrink-0" />
                        <span className="underline underline-offset-2">View Funded Rules</span>
                      </button>
                    </div>

                    {/* Standardized Primary CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleStartChallenge(tier)}
                      className={`shimmer-btn h-12 w-full px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                        isMostPopular
                          ? 'gold-gradient-bg text-stone-950 hover:shadow-brass-glow'
                          : 'bg-stone-950 hover:bg-stone-900 text-brass-300'
                      }`}
                    >
                      <span>{tier.isInstantFunding ? `Get Funded with ${tier.size}` : `Start with ${tier.size}`}</span>
                    </motion.button>

                    {/* Subtext */}
                    <p className="text-[11px] text-stone-500 text-center font-medium mt-2.5">
                      Save ${tier.saveAmount} with code AUG
                    </p>

                  </div>
                </div>

                {/* --------------------------------------------------------
                    BACK FACE: FUNDED STAGE RULES (ROTATED 180 DEG)
                    -------------------------------------------------------- */}
                <div 
                  className={`backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    isMostPopular
                      ? 'bg-[#FAF8F5] border-2 border-brass-400 shadow-editorial-hover ring-2 ring-brass-400/20'
                      : 'bg-[#FAF8F5] border border-stone-300 shadow-editorial'
                  }`}
                >
                  {/* Subtle Background Glow on Back */}
                  <div 
                    className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
                    aria-hidden="true" 
                  />

                  <div className="flex flex-col flex-1 relative z-10">
                    
                    {/* Standardized Back Header Group (Matches Front Face exactly) */}
                    <div className={`border-b border-stone-200 pb-4 mb-4 ${isMostPopular ? 'pt-6' : 'pt-1'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brass-100 text-brass-900 border border-brass-300 shadow-xs">
                          Phase 2: Funded
                        </span>
                        <span className="text-xs font-bold text-emerald-700">
                          Simulated Master
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-950 tracking-tight">
                        {tier.size} Funded Account
                      </h3>

                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className="text-stone-500 text-xs font-normal">
                          Included with challenge:
                        </span>
                        <span className="text-emerald-700 font-bold text-xl sm:text-2xl font-mono">
                          ${tier.discountPrice}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase">
                          100% Refundable
                        </span>
                      </div>
                    </div>

                    {/* Funded Stage Parameter Matrix (Matches Front Face Height) */}
                    <div className="flex-1 flex flex-col justify-between space-y-2 mb-4 text-xs sm:text-[13px] min-h-[220px]">
                      
                      <div className="flex items-center justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-600 font-medium">Payout Frequency</span>
                        <span className="font-mono font-bold text-emerald-700">{tier.fundedRules.payoutFrequency}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-600 font-medium">Max Payout / Cycle</span>
                        <span className="font-mono font-bold text-stone-950">{tier.fundedRules.maxPayout}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-600 font-medium">Trader Profit Share</span>
                        <span className="font-mono font-bold text-emerald-700">{tier.fundedRules.profitShare}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-600 font-medium">Consistency Rule</span>
                        <span className="font-semibold text-stone-900">{tier.fundedRules.consistency}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-600 font-medium">Evaluation Fee Refund</span>
                        <span className="font-mono font-bold text-emerald-700">{tier.fundedRules.refund}</span>
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <span className="text-stone-600 font-medium">Withdrawal Fee</span>
                        <span className="font-mono font-bold text-emerald-700">$0 (Free)</span>
                      </div>

                    </div>

                    {/* Standardized Flip Back Button Container */}
                    <div className="h-8 flex items-center justify-center mb-3.5">
                      <button
                        type="button"
                        onClick={() => toggleFlip(tier.size)}
                        className="inline-flex items-center justify-center gap-1.5 text-stone-700 hover:text-brass-800 font-semibold text-xs py-1 px-3 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer group whitespace-nowrap"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-brass-600 transition-transform group-hover:-rotate-180 duration-500 shrink-0" />
                        <span className="underline underline-offset-2">View Evaluation Rules</span>
                      </button>
                    </div>

                    {/* Standardized Back CTA Button (Same height, text & offset) */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleStartChallenge(tier)}
                      className={`shimmer-btn h-12 w-full px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                        isMostPopular
                          ? 'gold-gradient-bg text-stone-950 hover:shadow-brass-glow'
                          : 'bg-stone-950 hover:bg-stone-900 text-brass-300'
                      }`}
                    >
                      <span>{tier.isInstantFunding ? `Get Funded with ${tier.size}` : `Start with ${tier.size}`}</span>
                    </motion.button>

                    {/* Subtext */}
                    <p className="text-[11px] text-stone-500 text-center font-medium mt-2.5">
                      Save ${tier.saveAmount} with code AUG
                    </p>

                  </div>
                </div>

              </motion.div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
