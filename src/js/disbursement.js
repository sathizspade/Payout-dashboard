// Disbursement Page Logic

// Mock Data Generation
const DisbursementStatus = {
  SUCCESSFUL: 'Successful',
  ON_HOLD: 'On Hold',
  PENDING: 'Pending',
  FAILED: 'Failed',
};

const mockDisbursements = Array.from({ length: 50 }, (_, i) => {
  const statusOptions = [
    DisbursementStatus.SUCCESSFUL,
    DisbursementStatus.ON_HOLD,
    DisbursementStatus.PENDING,
    DisbursementStatus.FAILED,
  ];
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const amount = parseFloat((Math.random() * 1000 + 50).toFixed(2));

  return {
    refNumber: `REF-${1000 + i}`,
    requestedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
    merchantName: `Merchant ${Math.floor(Math.random() * 10) + 1}`,
    transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    status: randomStatus,
    accountName: `Account ${Math.floor(Math.random() * 20) + 1}`,
    accountNumber: `ACC-${Math.random().toString(36).substr(2, 12)}`,
    ifscCode: `IFSC${Math.floor(Math.random() * 10000)}`,
    txnAmount: amount,
    utrMessage: `UTR for ${amount}`,
    merchOrderId: `MOC-${10000 + i}`,
    multipleUtr: i % 5 === 0 ? `MUT-${i}` : '',
    updatedAt: new Date(),
    responseMessage: randomStatus === DisbursementStatus.FAILED ? 'Transaction failed' : 'Success',
    errorMessage: randomStatus === DisbursementStatus.FAILED ? 'Bank declined' : '',
    responseCode: randomStatus === DisbursementStatus.FAILED ? '500' : '200',
    paymentDetails: `Paid via ${i % 2 === 0 ? 'NEFT' : 'RTGS'}`,
    sender: {
      name: `Sender ${i + 1}`,
      mobile: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
      email: `sender${i + 1}@payout.com`
    },
    receiver: {
      name: `Account ${Math.floor(Math.random() * 20) + 1}`,
      mobile: `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
      email: `receiver${i + 1}@merchant.com`
    }
  };
});

// State
let state = {
  disbursements: [],
  filteredDisbursements: [],
  filters: {
    status: 'all', // 'all', 'success', 'on-hold', 'pending', 'failed'
    searchText: '',
    dateRange: 'all',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
  }
};

// Formatting Utilities
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Service Logic (Simulated)
const disbursementService = {
  getDisbursements: async (filters) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...mockDisbursements];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      // Map 'success' (lowercase from tab) to 'Successful' (Title Case from data)
      const statusMap = {
        'success': DisbursementStatus.SUCCESSFUL,
        'on-hold': DisbursementStatus.ON_HOLD,
        'pending': DisbursementStatus.PENDING,
        'failed': DisbursementStatus.FAILED,
      };
      const mappedStatus = statusMap[filters.status];
      if (mappedStatus) {
        filteredData = filteredData.filter((d) => d.status === mappedStatus);
      }
    }

    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filteredData = filteredData.filter((d) =>
        Object.values(d).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchLower)
        )
      );
    }

    // Filter by date range (Simplified implementation)
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      let days = 0;
      if (filters.dateRange === 'last-7-days') days = 7;
      if (filters.dateRange === 'last-10-days') days = 10;
      if (filters.dateRange === 'last-30-days') days = 30;
      if (filters.dateRange === 'last-2-months') days = 60;
      if (filters.dateRange === 'last-3-months') days = 90;

      if (days > 0) {
        const cutoff = new Date(now.setDate(now.getDate() - days));
        filteredData = filteredData.filter(d => d.requestedAt >= cutoff);
      } else if (filters.dateRange === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filteredData = filteredData.filter(d => d.requestedAt >= today);
      }
    }

    return filteredData;
  },

  getSummary: async () => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const summary = {
      [DisbursementStatus.SUCCESSFUL]: { count: 0, amount: 0 },
      [DisbursementStatus.ON_HOLD]: { count: 0, amount: 0 },
      [DisbursementStatus.PENDING]: { count: 0, amount: 0 },
      [DisbursementStatus.FAILED]: { count: 0, amount: 0 },
    };

    mockDisbursements.forEach((d) => {
      if (summary[d.status]) {
        summary[d.status].count++;
        summary[d.status].amount += d.txnAmount;
      }
    });

    return summary;
  }
};

// UI Rendering
const renderPagination = () => {
  const { currentPage, itemsPerPage } = state.pagination;
  const totalItems = state.filteredDisbursements.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  state.pagination.totalPages = totalPages;

  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const startEl = document.getElementById('paginationStart');
  const endEl = document.getElementById('paginationEnd');
  const totalEl = document.getElementById('paginationTotal');

  if (startEl) startEl.textContent = start;
  if (endEl) endEl.textContent = end;
  if (totalEl) totalEl.textContent = totalItems;

  const pagesContainer = document.getElementById('paginationPages');
  if (!pagesContainer) return;

  let pagesHtml = '';
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesHtml += `<button class="page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  pagesContainer.innerHTML = pagesHtml;

  // Update button states
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  // Add event listeners to page numbers
  pagesContainer.querySelectorAll('.page-num').forEach(btn => {
    btn.addEventListener('click', () => {
      state.pagination.currentPage = parseInt(btn.dataset.page);
      renderTableAndPagination();
    });
  });
};

const renderTable = (data) => {
  const tbody = document.querySelector('#disbursementTable tbody');
  if (!tbody) return;

  const { currentPage, itemsPerPage } = state.pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="18" style="text-align:center; padding: 20px;">No records found</td></tr>';
    return;
  }

  tbody.innerHTML = paginatedData.map((row) => `
    <tr class="clickable-row" data-ref="${row.refNumber}" style="cursor: pointer;">
      <td>${row.refNumber}</td>
      <td>${formatDate(row.requestedAt)}</td>
      <td>${row.merchantName}</td>
      <td>${row.transactionId}</td>
      <td>
        <span class="status-chip status-chip-${row.status.toLowerCase().replace(' ', '-')}">
          ${row.status}
        </span>
      </td>
      <td>${row.accountName}</td>
      <td>${row.accountNumber}</td>
      <td>${row.ifscCode}</td>
      <td>${formatCurrency(row.txnAmount)}</td>
      <td>${row.utrMessage}</td>
      <td>${row.responseMessage}</td>
      <td>${row.merchOrderId}</td>
      <td>${row.multipleUtr || '-'}</td>
      <td>${formatDate(row.updatedAt)}</td>
      <td>${row.responseMessage || '-'}</td>
      <td>${row.errorMessage || '-'}</td>
      <td>${row.responseCode || '-'}</td>
      <td>${row.paymentDetails}</td>
    </tr>
  `).join('');

  // Add click listeners to rows
  tbody.querySelectorAll('.clickable-row').forEach(rowEl => {
    rowEl.addEventListener('click', () => {
      const ref = rowEl.dataset.ref;
      const transaction = mockDisbursements.find(d => d.refNumber === ref);
      if (transaction) {
        openModal(transaction);
      }
    });
  });
};

// Modal Logic
const openModal = (tx) => {
  const modal = document.getElementById('disbursementModal');
  if (!modal) return;

  // Update Status Card Background
  const statusCard = modal.querySelector('.transaction-status-card');
  const statusClass = `status-${tx.status.toLowerCase().replace(' ', '-')}`;
  if (statusCard) {
    // Remove any existing status classes
    statusCard.classList.remove('status-successful', 'status-pending', 'status-on-hold', 'status-failed');
    statusCard.classList.add(statusClass);
  }

  // Populate fields
  const statusBadge = document.getElementById('modalStatusBadge');
  if (statusBadge) {
    statusBadge.textContent = tx.status;
    statusBadge.className = `status-chip status-chip-${tx.status.toLowerCase().replace(' ', '-')}`;
  }

  const setModalText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '-';
  };

  setModalText('modalStatusAmount', formatCurrency(tx.txnAmount));
  
  // Sender info (labeled "Sent to:" per request)
  setModalText('modalSenderName', tx.sender.name);
  setModalText('modalSenderMeta', `${tx.sender.mobile} • ${tx.sender.email}`);

  // Receiver info (labeled "Received by:" per request)
  setModalText('modalReceiverName', tx.receiver.name);
  setModalText('modalReceiverMeta', `${tx.receiver.mobile} • ${tx.receiver.email}`);

  setModalText('modalRef', tx.refNumber);
  setModalText('modalTxnId', tx.transactionId);
  setModalText('modalUtr', tx.utrMessage);
  setModalText('modalRequestedAt', formatDate(tx.requestedAt));
  setModalText('modalAccountName', tx.accountName);
  setModalText('modalAccountNumber', tx.accountNumber);
  setModalText('modalIfsc', tx.ifscCode);
  setModalText('modalMerchOrderId', tx.merchOrderId);
  setModalText('modalMessage', tx.responseMessage);

  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  if (window.lucide) lucide.createIcons();
};

const closeModal = () => {
  const modal = document.getElementById('disbursementModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

// Event Listeners
const setupEventListeners = () => {
  // Modal close listeners
  const closeBtn = document.getElementById('closeModal');
  const overlay = document.getElementById('modalOverlay');
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Status Tabs
  const tabs = document.querySelectorAll('.disbursement-status-tabs .status-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked
      tab.classList.add('active');

      // Update filter
      state.filters.status = tab.getAttribute('data-status-filter');
      updateUI();
    });
  });

  // Search Input
  const searchInput = document.getElementById('disbSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.searchText = e.target.value;
      updateUI(); // Debouncing could be added here for optimization
    });
  }

  // Date Filter
  const dateFilter = document.getElementById('disbDateFilter');
  if (dateFilter) {
    dateFilter.addEventListener('change', (e) => {
      state.filters.dateRange = e.target.value;
      updateUI();
    });
  }

  // Refresh Button
  const refreshBtn = document.getElementById('disbRefreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      updateUI();
    });
  }

  // Export Button
  const exportBtn = document.getElementById('disbExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert('Export functionality coming soon!');
    });
  }

  // Pagination Buttons
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.pagination.currentPage > 1) {
        state.pagination.currentPage--;
        renderTableAndPagination();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.pagination.currentPage < state.pagination.totalPages) {
        state.pagination.currentPage++;
        renderTableAndPagination();
      }
    });
  }
};

// Initialization
const initDisbursement = () => {
  setupEventListeners();
  updateUI();
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on a page that needs this (or just let it run if selectors don't match)
  if (document.getElementById('disbursementTable')) {
    initDisbursement();
  }
});

// Expose for debugging if needed
window.disbursementApp = {
  state,
  init: initDisbursement
};
