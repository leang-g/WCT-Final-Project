document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('balanceChart');
  if (!ctx) return;

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, 'rgba(0, 255, 102, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 255, 102, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Equity',
        data: [50000, 50200, 50500, 51000, 51800, 52400, 54230],
        borderColor: '#00ff66',
        backgroundColor: gradient,
        borderWidth: 2,
        pointBackgroundColor: '#00ff66',
        pointBorderColor: '#00ff66',
        pointRadius: 3,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0a0a0a',
          titleColor: '#00ff66',
          bodyColor: '#e2e8f0',
          borderColor: '#00ff66',
          borderWidth: 1,
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { callback: value => '$' + value }
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      }
    }
  });
});