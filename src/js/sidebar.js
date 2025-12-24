document.addEventListener('DOMContentLoaded', () => {
  /* ==============================
     1. Sidebar Toggle Logic
     ============================== */
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });

    // Restore sidebar state from localStorage
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }

  /* ==============================
     2. Active Menu Highlighting
     ============================== */
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

  navLinks.forEach(link => {
    // Clean up any pre-existing active classes
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // Extract filename from href (e.g., "disbursement.html" from "/disbursement.html")
    const linkFile = href.split('/').pop().split('#')[0];
    const currentFile = currentPath.split('/').pop();

    // Logic for Dashboard (root or index.html)
    if ((currentFile === '' || currentFile === 'index.html') && linkFile === 'index.html') {
      link.classList.add('active');
    }
    // Logic for other pages
    else if (currentFile === linkFile) {
      link.classList.add('active');
    }
  });
});
