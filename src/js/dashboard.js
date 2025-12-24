// Dashboard Specific Logic

// Mock data
const mockPayouts = [
  { id: 'PAY001', amount: 5000, status: 'completed', date: '2025-12-01', description: 'Monthly salary' },
  { id: 'PAY002', amount: 3500, status: 'pending', date: '2025-12-05', description: 'Contractor payment' },
  { id: 'PAY003', amount: 2000, status: 'failed', date: '2025-12-03', description: 'Vendor payment' },
  { id: 'PAY004', amount: 1500, status: 'completed', date: '2025-12-02', description: 'Service fee' },
  { id: 'PAY005', amount: 4200, status: 'completed', date: '2025-11-28', description: 'Bonus payment' },
];

// API Service (Simulated)
const dashboardService = {
  getSummary: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      totalPayouts: mockPayouts.length,
      pendingAmount: mockPayouts
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0),
      completedAmount: mockPayouts
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
      failedCount: mockPayouts.filter(p => p.status === 'failed').length,
      pendingCount: mockPayouts.filter(p => p.status === 'pending').length,
      completedCount: mockPayouts.filter(p => p.status === 'completed').length,
    };
  },

  getWallet: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      balance: 5240.00,
      accountNumber: '**** **** 4582',
      ifscCode: 'HDFC0001234',
    };
  },

  getRecentTransactions: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const names = ['Ravi Singh', 'Meera Patel', 'Vikram Desai', 'Anjali Sharma', 'Karan Mehta', 'Sonal Verma'];
    const statuses = ['successful', 'pending', 'failed'];
    const types = ['sent', 'received'];
    
    return Array.from({ length: 6 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const name = names[i % names.length];
      const amount = Math.floor(Math.random() * 150000) + 10000;
      const date = new Date();
      date.setHours(date.getHours() - i * 2); // Spread over the day
      
      return {
        name,
        amount,
        status,
        type,
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' • ' + 
              date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
    });
  },

  getVirtualAccounts: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { merchant: 'Ravi Retail Pvt. Ltd.', account: 'XXXXXX1234', ifsc: 'ICIC0001234', status: 'successful', statusLabel: 'Active' },
      { merchant: 'Meera Online Services', account: 'XXXXXX5678', ifsc: 'HDFC0005678', status: 'pending', statusLabel: 'Pending' },
      { merchant: 'Desai Fintech Solutions', account: 'XXXXXX9012', ifsc: 'SBIN0009012', status: 'failed', statusLabel: 'Suspended' },
    ];
  }
};

// Utils
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Render Functions
function renderRecentTransactions(transactions) {
  const timeline = document.getElementById('recentTransactionsTimeline');
  if (!timeline) return;

  timeline.innerHTML = transactions.map(tx => {
    const isSent = tx.type === 'sent';
    const markerIcon = tx.status === 'successful' 
      ? (isSent ? 'check-circle-2' : 'arrow-down-circle') 
      : (tx.status === 'pending' ? 'clock' : 'x-circle');
    
    const markerClass = `timeline-marker-${tx.status}`;

    return `
      <li class="timeline-item">
        <div class="timeline-marker ${markerClass}">
          <i data-lucide="${markerIcon}"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-main-row">
            <div>
              <div class="timeline-name">${tx.name}</div>
              <div class="timeline-amount">${formatCurrency(tx.amount)}</div>
            </div>
            <span class="status-chip status-chip-${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)} ${isSent ? 'Successfully' : ''}</span>
          </div>
          <div class="timeline-meta">${tx.date}</div>
        </div>
      </li>
    `;
  }).join('');
  
  if (window.lucide) lucide.createIcons();
}

function renderVirtualAccounts(accounts) {
  const table = document.getElementById('latestVirtualAccountsTable');
  if (!table) return;

  table.innerHTML = accounts.map(acc => `
    <tr>
      <td>${acc.merchant}</td>
      <td>
        <div class="va-account">
          <span class="va-account-number">${acc.account}</span>
          <span class="va-ifsc">${acc.ifsc}</span>
        </div>
      </td>
      <td>
        <span class="status-chip status-chip-${acc.status}">${acc.statusLabel}</span>
      </td>
    </tr>
  `).join('');
}

function renderWalletDetails(details) {
  const balanceEl = document.getElementById('walletBalance');
  const accountEl = document.getElementById('walletAccountNumber');
  const ifscEl = document.getElementById('walletIfsc');
  const copyBtn = document.getElementById('btnCopyWallet');

  if (balanceEl) balanceEl.textContent = formatCurrency(details.balance);
  if (accountEl) accountEl.textContent = details.accountNumber;
  if (ifscEl) ifscEl.textContent = details.ifscCode;

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`Account: ${details.accountNumber}, IFSC: ${details.ifscCode}`);
    };
  }
}

function renderDashboardCards(summary) {
  // Using InsightCard component if available
  const cards = [
    {
      title: 'Successful Payouts',
      value: formatCurrency(summary.completedAmount),
      transactionCount: summary.completedCount,
      icon: '/public/dashboard.svg',
      trend: '+12.5% vs last 30 days',
      trendDirection: 'up'
    },
    {
      title: 'Pending Payouts',
      value: formatCurrency(summary.pendingAmount),
      transactionCount: summary.pendingCount,
      icon: '/public/merchants.svg',
      trend: '-2.4% vs last 30 days',
      trendDirection: 'down'
    },
    {
      title: 'Failed Payouts',
      value: summary.failedCount,
      transactionCount: summary.failedCount,
      icon: '/public/dashboard.svg',
      trend: '+0.0% vs last 30 days',
      trendDirection: 'up'
    },
  ];

  if (typeof InsightCard !== 'undefined') {
    InsightCard.renderAll('insightGrid', cards);
  }
}

// Trends Logic
let trendsChartInstance = null;

function generateTrendsData(range) {
  const data = [];
  const today = new Date();
  let count = 7; // default

  if (range === 'this-month') {
    count = today.getDate();
  } else {
    count = parseInt(range) || 7;
  }

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Mock data generation
    const success = Math.floor(Math.random() * 50) + 20;
    const pending = Math.floor(Math.random() * 15);
    const failed = Math.floor(Math.random() * 5);

    data.push({
      date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      success,
      pending,
      failed
    });
  }
  return data.reverse(); // Oldest to newest
}

function updateTrends(range) {
  const data = generateTrendsData(range);
  
  // 1. Update Table (Newest first)
  const tbody = document.querySelector('#trendsTable tbody');
  if (tbody) {
    const tableData = [...data].reverse();
    tbody.innerHTML = tableData.map(row => {
      const total = row.success + row.pending + row.failed;
      return `
        <tr>
          <td>${row.date}</td>
          <td>${total}</td>
          <td><span style="color: #27ae60; font-weight: bold;">${row.success}</span></td>
          <td><span style="color: #f39c12; font-weight: bold;">${row.pending}</span></td>
          <td><span style="color: #e74c3c; font-weight: bold;">${row.failed}</span></td>
        </tr>
      `;
    }).join('');
  }

  // 2. Update Chart
  const ctx = document.getElementById('trendsChart');
  if (ctx && window.Chart) {
    const chartData = {
      labels: data.map(d => d.date),
      datasets: [
        {
          label: 'Success',
          data: data.map(d => d.success),
          backgroundColor: '#27ae60',
          borderRadius: 4,
        },
        {
          label: 'Pending',
          data: data.map(d => d.pending),
          backgroundColor: '#f39c12',
          borderRadius: 4,
        },
        {
          label: 'Failed',
          data: data.map(d => d.failed),
          backgroundColor: '#e74c3c',
          borderRadius: 4,
        }
      ]
    };

    if (trendsChartInstance) {
      trendsChartInstance.data = chartData;
      trendsChartInstance.update();
    } else {
      trendsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          },
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }
}

function setupViewToggles() {
  const btnViewChart = document.getElementById('btnViewChart');
  const btnViewTable = document.getElementById('btnViewTable');
  const chartContainer = document.getElementById('trendsChartContainer');
  const table = document.getElementById('trendsTable');

  if (btnViewChart && btnViewTable && chartContainer && table) {
    btnViewChart.addEventListener('click', () => {
      btnViewChart.classList.add('active');
      btnViewTable.classList.remove('active');
      chartContainer.style.display = 'block';
      table.style.display = 'none';
    });

    btnViewTable.addEventListener('click', () => {
      btnViewTable.classList.add('active');
      btnViewChart.classList.remove('active');
      chartContainer.style.display = 'none';
      table.style.display = 'table';
    });
  }
}

function setupDateFilter() {
  const filterSelect = document.getElementById('trendsDateFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      updateTrends(e.target.value);
    });
    // Initial Load
    updateTrends(filterSelect.value);
  } else {
    // Fallback if no filter found
    updateTrends(7);
  }
}

// Initialization
async function initDashboard() {
  try {
    const summary = await dashboardService.getSummary();
    renderDashboardCards(summary);

    const wallet = await dashboardService.getWallet();
    renderWalletDetails(wallet);

    const transactions = await dashboardService.getRecentTransactions();
    renderRecentTransactions(transactions);

    const accounts = await dashboardService.getVirtualAccounts();
    renderVirtualAccounts(accounts);

    setupDateFilter();
    setupViewToggles();
  } catch (err) {
    console.error('Dashboard init failed', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dashboard-container')) {
    initDashboard();
  }
  // Setup Tabs (Trends vs Insights)
  const tabButtons = document.querySelectorAll('.trends-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.dashboard-trends-section .tab-content');
  
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabTarget;
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  }
});
