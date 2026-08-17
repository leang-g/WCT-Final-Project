export const propFirmData = {
  growth: {
    key: 'growth',
    label: 'Growth',
    badge: 'Pass in 1 day',
    badgeType: 'default',
    tagline: 'Quick evaluation • 5 day payouts',
    tiers: [
      {
        size: '25K',
        title: '25K Evaluation',
        numericSize: 25000,
        originalPrice: 99,
        discountPrice: 59,
        saveAmount: 40,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$1,500' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$1,000' },
          { label: 'Daily Loss Limit', value: '$600', hasTooltip: true, tooltip: 'Calculated on the day starting balance. Protects against excessive intraday risk.' },
          { label: 'Reset Fee', value: '$60', originalValue: '$70' },
          { label: 'Consistency', value: 'None', isHighlight: true },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '1 minis / 10 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$10,000',
          profitShare: 'Up to 90%',
          consistency: 'None',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '50K',
        title: '50K Evaluation',
        numericSize: 50000,
        originalPrice: 145,
        discountPrice: 87,
        saveAmount: 58,
        mostPopular: true,
        rules: [
          { label: 'Profit Target', value: '$3,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$2,000' },
          { label: 'Daily Loss Limit', value: '$1,250', hasTooltip: true, tooltip: 'Calculated on the day starting balance. Protects against excessive intraday risk.' },
          { label: 'Reset Fee', value: '$95' },
          { label: 'Consistency', value: 'None', isHighlight: true },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '4 minis / 40 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$15,000',
          profitShare: 'Up to 90%',
          consistency: 'None',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '100K',
        title: '100K Evaluation',
        numericSize: 100000,
        originalPrice: 255,
        discountPrice: 153,
        saveAmount: 102,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$6,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$3,500' },
          { label: 'Daily Loss Limit', value: '$2,500', hasTooltip: true, tooltip: 'Calculated on the day starting balance. Protects against excessive intraday risk.' },
          { label: 'Reset Fee', value: '$169' },
          { label: 'Consistency', value: 'None', isHighlight: true },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '8 minis / 80 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$25,000',
          profitShare: 'Up to 90%',
          consistency: 'None',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '150K',
        title: '150K Evaluation',
        numericSize: 150000,
        originalPrice: 369,
        discountPrice: 221,
        saveAmount: 148,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$9,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$5,000' },
          { label: 'Daily Loss Limit', value: '$3,750', hasTooltip: true, tooltip: 'Calculated on the day starting balance. Protects against excessive intraday risk.' },
          { label: 'Reset Fee', value: '$229' },
          { label: 'Consistency', value: 'None', isHighlight: true },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '12 minis / 120 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$35,000',
          profitShare: 'Up to 90%',
          consistency: 'None',
          refund: '100% on Payout #1'
        }
      }
    ]
  },
  select: {
    key: 'select',
    label: 'Select',
    badge: 'Pass in 3 days',
    badgeType: 'default',
    tagline: 'Daily payouts • Flexible funded rules',
    tiers: [
      {
        size: '25K',
        title: '25K Evaluation',
        numericSize: 25000,
        originalPrice: 109,
        discountPrice: 65,
        saveAmount: 44,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$1,500' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$1,000' },
          { label: 'Daily Loss Limit', value: 'None', isHighlight: true },
          { label: 'Reset Fee', value: '$75', hasTooltip: true, tooltip: 'Cost to reset evaluation balance.' },
          { label: 'Consistency', value: '40%' },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '1 mini / 10 micros' }
        ],
        fundedRules: {
          payoutFrequency: 'Daily / Flexible',
          maxPayout: '$10,000',
          profitShare: 'Up to 90%',
          consistency: '40% max per day',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '50K',
        title: '50K Evaluation',
        numericSize: 50000,
        originalPrice: 165,
        discountPrice: 99,
        saveAmount: 66,
        mostPopular: true,
        rules: [
          { label: 'Profit Target', value: '$3,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$2,000' },
          { label: 'Daily Loss Limit', value: 'None', isHighlight: true },
          { label: 'Reset Fee', value: '$109', hasTooltip: true, tooltip: 'Cost to reset evaluation balance.' },
          { label: 'Consistency', value: '40%' },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '4 minis / 40 micros' }
        ],
        fundedRules: {
          payoutFrequency: 'Daily / Flexible',
          maxPayout: '$15,000',
          profitShare: 'Up to 90%',
          consistency: '40% max per day',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '100K',
        title: '100K Evaluation',
        numericSize: 100000,
        originalPrice: 265,
        discountPrice: 159,
        saveAmount: 106,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$6,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$3,000' },
          { label: 'Daily Loss Limit', value: 'None', isHighlight: true },
          { label: 'Reset Fee', value: '$169', hasTooltip: true, tooltip: 'Cost to reset evaluation balance.' },
          { label: 'Consistency', value: '40%' },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '8 minis / 80 micros' }
        ],
        fundedRules: {
          payoutFrequency: 'Daily / Flexible',
          maxPayout: '$25,000',
          profitShare: 'Up to 90%',
          consistency: '40% max per day',
          refund: '100% on Payout #1'
        }
      },
      {
        size: '150K',
        title: '150K Evaluation',
        numericSize: 150000,
        originalPrice: 369,
        discountPrice: 221,
        saveAmount: 148,
        mostPopular: false,
        rules: [
          { label: 'Profit Target', value: '$9,000' },
          { label: 'Trailing Max Drawdown (EOD)', value: '$4,500' },
          { label: 'Daily Loss Limit', value: 'None', isHighlight: true },
          { label: 'Reset Fee', value: '$239', hasTooltip: true, tooltip: 'Cost to reset evaluation balance.' },
          { label: 'Consistency', value: '40%' },
          { label: 'Activation Fee', value: 'None', isHighlight: true },
          { label: 'Max Contracts', value: '12 minis / 120 micros' }
        ],
        fundedRules: {
          payoutFrequency: 'Daily / Flexible',
          maxPayout: '$35,000',
          profitShare: 'Up to 90%',
          consistency: '40% max per day',
          refund: '100% on Payout #1'
        }
      }
    ]
  },
  lightning: {
    key: 'lightning',
    label: 'Lightning',
    badge: 'Instant',
    badgeType: 'instant',
    tagline: 'Instant funding • 5 day payouts',
    tiers: [
      {
        size: '25K',
        title: '25K Funded',
        numericSize: 25000,
        originalPrice: 345,
        discountPrice: 207,
        saveAmount: 138,
        mostPopular: false,
        isInstantFunding: true,
        rules: [
          { label: 'Payout Frequency', value: '5 Days' },
          { label: 'Max Accounts', value: '5' },
          { label: 'Consistency', value: '20%', hasTooltip: true, tooltip: 'Max 20% of total profit earned on any single day.' },
          { label: 'Daily Loss Limit', value: 'None', isHighlight: true },
          { label: 'Max Drawdown (EOD)', value: '$1,000' },
          { label: 'Max Contracts', value: '1 mini / 10 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$7,000',
          profitShare: 'Up to 90%',
          consistency: '20% rule',
          refund: 'Instant Funded'
        }
      },
      {
        size: '50K',
        title: '50K Funded',
        numericSize: 50000,
        originalPrice: 492,
        discountPrice: 295,
        saveAmount: 197,
        mostPopular: false,
        isInstantFunding: true,
        rules: [
          { label: 'Payout Frequency', value: '5 Days' },
          { label: 'Max Accounts', value: '5' },
          { label: 'Consistency', value: '20%', hasTooltip: true, tooltip: 'Max 20% of total profit earned on any single day.' },
          { label: 'Daily Loss Limit', value: '$1,250' },
          { label: 'Max Drawdown (EOD)', value: '$2,000' },
          { label: 'Max Contracts', value: '4 minis / 40 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$10,000',
          profitShare: 'Up to 90%',
          consistency: '20% rule',
          refund: 'Instant Funded'
        }
      },
      {
        size: '100K',
        title: '100K Funded',
        numericSize: 100000,
        originalPrice: 660,
        discountPrice: 396,
        saveAmount: 264,
        mostPopular: false,
        isInstantFunding: true,
        rules: [
          { label: 'Payout Frequency', value: '5 Days' },
          { label: 'Max Accounts', value: '5' },
          { label: 'Consistency', value: '20%', hasTooltip: true, tooltip: 'Max 20% of total profit earned on any single day.' },
          { label: 'Daily Loss Limit', value: '$2,500' },
          { label: 'Max Drawdown (EOD)', value: '$4,000' },
          { label: 'Max Contracts', value: '8 minis / 80 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$18,000',
          profitShare: 'Up to 90%',
          consistency: '20% rule',
          refund: 'Instant Funded'
        }
      },
      {
        size: '150K',
        title: '150K Funded',
        numericSize: 150000,
        originalPrice: 796,
        discountPrice: 478,
        saveAmount: 318,
        mostPopular: true,
        isInstantFunding: true,
        rules: [
          { label: 'Payout Frequency', value: '5 Days' },
          { label: 'Max Accounts', value: '5' },
          { label: 'Consistency', value: '20%', hasTooltip: true, tooltip: 'Max 20% of total profit earned on any single day.' },
          { label: 'Daily Loss Limit', value: '$3,000' },
          { label: 'Max Drawdown (EOD)', value: '$5,250' },
          { label: 'Max Contracts', value: '12 minis / 120 micros' }
        ],
        fundedRules: {
          payoutFrequency: '5 Days',
          maxPayout: '$30,000',
          profitShare: 'Up to 90%',
          consistency: '20% rule',
          refund: 'Instant Funded'
        }
      }
    ]
  }
};

export const platforms = [
  { 
    key: 'tradovate', 
    name: 'Tradovate', 
    iconType: 'tradovate'
  },
  { 
    key: 'mt5', 
    name: 'MetaTrader 5', 
    iconType: 'mt5'
  },
  { 
    key: 'ninjatrader', 
    name: 'NinjaTrader', 
    iconType: 'ninjatrader'
  }
];

export const livePayoutsStream = [
  { trader: 'David L.', amount: 5670, method: 'Deel', timeAgo: '2m ago', country: '🇺🇸', account: '$100K Growth' },
  { trader: 'Sarah K.', amount: 12450, method: 'Crypto (USDT)', timeAgo: '4m ago', country: '🇬🇧', account: '$150K Select' },
  { trader: 'Marcus V.', amount: 8190, method: 'Wise', timeAgo: '7m ago', country: '🇩🇪', account: '$100K Lightning' },
  { trader: 'Elena R.', amount: 15300, method: 'Bank Wire', timeAgo: '11m ago', country: '🇨🇦', account: '$150K Growth' },
  { trader: 'Liam W.', amount: 4850, method: 'Deel', timeAgo: '14m ago', country: '🇦🇺', account: '$50K Growth' },
  { trader: 'Kenji T.', amount: 22400, method: 'Crypto (BTC)', timeAgo: '18m ago', country: '🇯🇵', account: '$150K Select' },
  { trader: 'Chloe B.', amount: 6780, method: 'Rise', timeAgo: '21m ago', country: '🇫🇷', account: '$100K Growth' },
  { trader: 'Mateo S.', amount: 9240, method: 'Deel', timeAgo: '25m ago', country: '🇪🇸', account: '$100K Lightning' }
];

export const trustpilotReviews = [
  {
    author: 'Alexander M.',
    rating: 5,
    title: 'Fastest Payouts in the Industry',
    comment: 'Requested $8,400 withdrawal on Tuesday morning via Deel, received funds the very same evening. Spreads on EURUSD and US30 are literally raw 0.0 pips with zero slippage.',
    date: 'Verified Trader • 2 days ago',
    verified: true,
    fundedAmount: '$100K Funded Trader'
  },
  {
    author: 'Jessica H.',
    rating: 5,
    title: 'No hidden consistency traps',
    comment: 'Passed the 1-Step Lightning challenge in 4 days. The dashboard rules meter makes it crystal clear what your drawdown floor is at every second. 10/10 recommend.',
    date: 'Verified Trader • 4 days ago',
    verified: true,
    fundedAmount: '$50K Funded Trader'
  },
  {
    author: 'Ryan P.',
    rating: 5,
    title: 'Tradovate execution is flawless',
    comment: 'Trading NQ and ES futures through Tradovate has been seamless. Up to 90% profit split and fee refund on the very first payout covered my evaluation fee completely.',
    date: 'Verified Trader • 1 week ago',
    verified: true,
    fundedAmount: '$150K Funded Trader'
  },
  {
    author: 'Daniel K.',
    rating: 5,
    title: 'Customer support answered in 40 seconds',
    comment: 'Had a question regarding holding positions over CPI news release. Support confirmed within 1 minute that all news trading is 100% permitted. Outstanding firm.',
    date: 'Verified Trader • 1 week ago',
    verified: true,
    fundedAmount: '$100K Funded Trader'
  }
];
