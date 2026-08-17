// ============================================================
// APEX FUNDED — Pricing Calculator & Plan Configuration
// ============================================================

const propFirmData = {
    growth: {
        label: 'Growth',
        tiers: [{
            size: '25K',
            price: 149,
            originalPrice: 249,
            mostPopular: false,
            evaluation: {
                profitTarget: '10%',
                drawdown: '6%',
                dailyLoss: '5%',
                profitSplit: '80%',
                leverage: '1:30',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Bi-Weekly',
                maxPayout: '$10,000',
                consistencyRule: '30% max per trade',
                minDays: '5',
                profitShare: '80%',
                withdrawalFee: 'None'
            }
        }, {
            size: '50K',
            price: 299,
            originalPrice: 449,
            mostPopular: true,
            evaluation: {
                profitTarget: '10%',
                drawdown: '6%',
                dailyLoss: '5%',
                profitSplit: '85%',
                leverage: '1:50',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$15,000',
                consistencyRule: '25% max per trade',
                minDays: '5',
                profitShare: '85%',
                withdrawalFee: 'None'
            }
        }, {
            size: '100K',
            price: 599,
            originalPrice: 899,
            mostPopular: false,
            evaluation: {
                profitTarget: '10%',
                drawdown: '6%',
                dailyLoss: '5%',
                profitSplit: '90%',
                leverage: '1:100',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$25,000',
                consistencyRule: '20% max per trade',
                minDays: '5',
                profitShare: '90%',
                withdrawalFee: 'None'
            }
        }]
    },
    select: {
        label: 'Select',
        tiers: [{
            size: '25K',
            price: 199,
            originalPrice: 299,
            mostPopular: false,
            evaluation: {
                profitTarget: '8%',
                drawdown: '5%',
                dailyLoss: '4%',
                profitSplit: '80%',
                leverage: '1:30',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Bi-Weekly',
                maxPayout: '$8,000',
                consistencyRule: '30% max per trade',
                minDays: '5',
                profitShare: '80%',
                withdrawalFee: 'None'
            }
        }, {
            size: '50K',
            price: 399,
            originalPrice: 599,
            mostPopular: true,
            evaluation: {
                profitTarget: '8%',
                drawdown: '5%',
                dailyLoss: '4%',
                profitSplit: '85%',
                leverage: '1:50',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$12,000',
                consistencyRule: '25% max per trade',
                minDays: '5',
                profitShare: '85%',
                withdrawalFee: 'None'
            }
        }, {
            size: '100K',
            price: 799,
            originalPrice: 1199,
            mostPopular: false,
            evaluation: {
                profitTarget: '8%',
                drawdown: '5%',
                dailyLoss: '4%',
                profitSplit: '90%',
                leverage: '1:100',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$20,000',
                consistencyRule: '20% max per trade',
                minDays: '5',
                profitShare: '90%',
                withdrawalFee: 'None'
            }
        }]
    },
    lightning: {
        label: 'Lightning',
        tiers: [{
            size: '25K',
            price: 249,
            originalPrice: 399,
            mostPopular: false,
            evaluation: {
                profitTarget: '6%',
                drawdown: '4%',
                dailyLoss: '3%',
                profitSplit: '80%',
                leverage: '1:30',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$7,000',
                consistencyRule: '30% max per trade',
                minDays: '3',
                profitShare: '80%',
                withdrawalFee: 'None'
            }
        }, {
            size: '50K',
            price: 499,
            originalPrice: 749,
            mostPopular: false,
            evaluation: {
                profitTarget: '6%',
                drawdown: '4%',
                dailyLoss: '3%',
                profitSplit: '85%',
                leverage: '1:50',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$10,000',
                consistencyRule: '25% max per trade',
                minDays: '3',
                profitShare: '85%',
                withdrawalFee: 'None'
            }
        }, {
            size: '100K',
            price: 999,
            originalPrice: 1499,
            mostPopular: true,
            evaluation: {
                profitTarget: '6%',
                drawdown: '4%',
                dailyLoss: '3%',
                profitSplit: '90%',
                leverage: '1:100',
                platform: 'MetaTrader 5'
            },
            funded: {
                payoutFrequency: 'Weekly',
                maxPayout: '$18,000',
                consistencyRule: '20% max per trade',
                minDays: '3',
                profitShare: '90%',
                withdrawalFee: 'None'
            }
        }]
    }
};

// Platform mapping
const platformMap = {
    mt5: 'MetaTrader 5',
    mt4: 'MetaTrader 4',
    tradovate: 'Tradovate',
    ctrader: 'Tradovate',
};

// ============================================================
// RENDER FUNCTION — WITH INTEGRATED PURCHASE GATE
// ============================================================
function renderPricingCards() {
    const container = document.getElementById('pricingCardsContainer');
    if (!container) return;

    const activeAccount = document.querySelector('#accountToggle .toggle-option.active');
    const activePlatform = document.querySelector('#platformToggle .toggle-option.active');
    if (!activeAccount || !activePlatform) return;

    const accountType = activeAccount.dataset.type;
    const platformKey = activePlatform.dataset.platform;
    const platformName = platformMap[platformKey] || 'MetaTrader 5';

    const accountData = propFirmData[accountType];
    if (!accountData) return;

    const { label: accountLabel, tiers } = accountData;

    let cardsHtml = '';
    tiers.forEach((tier) => {
        const isMostPopular = tier.mostPopular;
        const flipCardClass = isMostPopular ? 'flip-card most-popular' : 'flip-card';
        const badgeHtml = isMostPopular ?
            '<span class="badge-most-popular">Most Popular</span>' :
            '';

        const evalRules = tier.evaluation;
        const fundedRules = tier.funded;

        // Build Evaluation rules (front)
        const evalRulesHtml = [
            { label: 'Profit Target', value: evalRules.profitTarget },
            { label: 'Trailing Max Drawdown', value: evalRules.drawdown },
            { label: 'Daily Loss Limit', value: evalRules.dailyLoss },
            { label: 'Profit Split', value: evalRules.profitSplit },
            { label: 'Leverage', value: evalRules.leverage },
            { label: 'Platform', value: platformName }
        ].map(r =>
            `<div class="rule-row"><span class="rule-label">${r.label}</span><span class="rule-value">${r.value}</span></div>`
        ).join('');

        // Build Funded rules (back)
        const fundedRulesHtml = [
            { label: 'Payout Frequency', value: fundedRules.payoutFrequency },
            { label: 'Max Payout', value: fundedRules.maxPayout },
            { label: 'Consistency Rule', value: fundedRules.consistencyRule },
            { label: 'Min Trading Days', value: fundedRules.minDays },
            { label: 'Profit Share', value: fundedRules.profitShare },
            { label: 'Withdrawal Fee', value: fundedRules.withdrawalFee }
        ].map(r =>
            `<div class="funded-rule-row"><span class="funded-rule-label">${r.label}</span><span class="funded-rule-value">${r.value}</span></div>`
        ).join('');

        const flipId = `${accountType}-${tier.size.replace('K', '').replace('$', '').replace(',', '')}`;
        const planFullName = `${accountLabel} $${tier.size} (${platformName}) - $${tier.price}`;

        cardsHtml += `
            <div class="col-md-6 col-lg-4">
                <div class="${flipCardClass} pricing-card-wrapper h-100 text-center position-relative">
                    ${badgeHtml}
                    <div class="flip-card-inner" data-flip-id="${flipId}">
                        <!-- FRONT: Evaluation -->
                        <div class="flip-card-front">
                            <div class="card-body d-flex flex-column p-4">
                                <!-- HEADER GROUP -->
                                <div class="header-group">
                                    <div class="evaluation-badge">Evaluation</div>
                                    <div class="tier-label">${accountLabel}</div>
                                    <h3 class="card-title">$${tier.size}</h3>
                                    <p class="mb-1">
                                        <span class="price-current">$${tier.price}</span>
                                        <span class="price-original">$${tier.originalPrice}</span>
                                    </p>
                                </div>
                                <!-- RULES CONTAINER -->
                                <div class="rules-container">
                                    <div class="pricing-rules">
                                        ${evalRulesHtml}
                                    </div>
                                </div>
                                <!-- FOOTER ACTIONS -->
                                <div class="card-footer-actions">
                                    <button type="button" class="btn-link-neon flip-trigger" data-flip-id="${flipId}">
                                        <i class="bi bi-arrow-right-circle"></i> View Funded Rules
                                    </button>
                                    <button type="button" class="btn btn-brass buy-btn w-100" data-plan="${escapeHtml(planFullName)}">
                                        <i class="bi bi-lightning-charge me-1"></i> Get Funded
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- BACK: Funded -->
                        <div class="flip-card-back">
                            <div class="card-body d-flex flex-column p-4">
                                <!-- HEADER GROUP (matches front height) -->
                                <div class="header-group">
                                    <div class="funded-badge">Funded</div>
                                    <div class="tier-label">${accountLabel}</div>
                                    <h3 class="card-title">$${tier.size}</h3>
                                    <p class="mb-1">
                                        <span class="price-current">$${tier.price}</span>
                                        <span class="price-original">$${tier.originalPrice}</span>
                                    </p>
                                </div>
                                <!-- RULES CONTAINER -->
                                <div class="rules-container">
                                    <div class="funded-rules">
                                        ${fundedRulesHtml}
                                    </div>
                                </div>
                                <!-- FOOTER ACTIONS -->
                                <div class="back-footer-actions">
                                    <button type="button" class="btn-link-neon flip-trigger" data-flip-id="${flipId}">
                                        <i class="bi bi-arrow-left-circle"></i> View Evaluation Rules
                                    </button>
                                    <button type="button" class="btn btn-brass buy-btn w-100" data-plan="${escapeHtml(planFullName)}">
                                        <i class="bi bi-lightning-charge me-1"></i> Get Funded
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = cardsHtml;

    // ===== BIND FLIP TRIGGERS =====
    container.querySelectorAll('.flip-trigger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const flipId = this.dataset.flipId;
            const inner = container.querySelector(`.flip-card-inner[data-flip-id="${flipId}"]`);
            if (inner) {
                inner.classList.toggle('flipped');
            }
        });
    });

    // ===== BIND GET FUNDED BUY BUTTONS =====
    container.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const plan = this.getAttribute('data-plan');
            if (typeof handlePurchaseGate === 'function') {
                handlePurchaseGate(plan);
            }
        });
    });
}

// Helper to escape HTML attributes safely
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// ============================================================
// INITIAL RENDER & TOGGLE ATTACHMENT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('pricingCardsContainer')) {
        renderPricingCards();

        document.querySelectorAll('.toggle-option').forEach(option => {
            option.addEventListener('click', function() {
                const group = this.parentElement;
                group.querySelectorAll('.toggle-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                renderPricingCards();
            });
        });
    }
});