// Mock data for demonstration
const mockPayouts = [
  { id: 'PAY001', amount: 5000, status: 'completed', date: '2025-12-01', description: 'Monthly salary' },
  { id: 'PAY002', amount: 3500, status: 'pending', date: '2025-12-05', description: 'Contractor payment' },
  { id: 'PAY003', amount: 2000, status: 'failed', date: '2025-12-03', description: 'Vendor payment' },
  { id: 'PAY004', amount: 1500, status: 'completed', date: '2025-12-02', description: 'Service fee' },
  { id: 'PAY005', amount: 4200, status: 'completed', date: '2025-11-28', description: 'Bonus payment' },
];

// API Service
const apiService = {
  getPayoutSummary: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const summary = {
      totalPayouts: mockPayouts.length,
      pendingAmount: mockPayouts
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0),
      completedAmount: mockPayouts
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
      failedCount: mockPayouts.filter(p => p.status === 'failed').length,
    };
    
    return summary;
  },

  getAllPayouts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPayouts;
  },
};

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

const getStatusClass = (status) => {
  return `status-${status}`;
};

// Dashboard initialization
async function initializeDashboard() {
  try {
    const summary = await apiService.getPayoutSummary();
    renderDashboardCards(summary);
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    document.getElementById('dashboardGrid').innerHTML = 
      '<div class="error">Failed to load dashboard data</div>';
  }
}

function renderDashboardCards(summary) {
  const grid = document.getElementById('dashboardGrid');
  const cards = [
    { title: 'Total Payouts', value: summary.totalPayouts },
    { title: 'Pending Amount', value: formatCurrency(summary.pendingAmount) },
    { title: 'Completed Amount', value: formatCurrency(summary.completedAmount) },
    { title: 'Failed Payouts', value: summary.failedCount },
  ];

  grid.innerHTML = cards.map(card => `
    <div class="dashboard-card">
      <h3>${card.title}</h3>
      <p class="value">${card.value}</p>
    </div>
  `).join('');
}

// Payouts table initialization
async function initializePayoutsTable() {
  try {
    const payouts = await apiService.getAllPayouts();
    renderPayoutsTable(payouts);
  } catch (error) {
    console.error('Failed to load payouts:', error);
    document.getElementById('payoutsBody').innerHTML = 
      '<tr><td colspan="5" class="error">Failed to load payouts</td></tr>';
  }
}

function renderPayoutsTable(payouts) {
  const tbody = document.getElementById('payoutsBody');
  tbody.innerHTML = payouts.map(payout => `
    <tr>
      <td>${payout.id}</td>
      <td>${formatCurrency(payout.amount)}</td>
      <td>
        <span class="status-badge ${getStatusClass(payout.status)}">
          ${payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
        </span>
      </td>
      <td>${formatDate(payout.date)}</td>
      <td>${payout.description}</td>
    </tr>
  `).join('');
}

// Navigation handling
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links and pages
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      // Add active class to clicked link and corresponding page
      link.classList.add('active');
      const pageId = link.getAttribute('href').substring(1);
      const page = document.getElementById(pageId);
      if (page) {
        page.classList.add('active');
        
        // Load data if it's the payouts page
        if (pageId === 'payouts') {
          initializePayoutsTable();
        }
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
  setupNavigation();
});
