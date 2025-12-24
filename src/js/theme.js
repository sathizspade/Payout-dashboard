document.addEventListener('DOMContentLoaded', () => {
  const userMenu = document.querySelector('.user-menu');
  const themeToggleBtn = document.getElementById('themeToggle');
  
  // Theme Logic
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i, svg');
    const text = themeToggleBtn.querySelector('span');
    
    if (theme === 'dark') {
      if (icon) icon.setAttribute('data-lucide', 'sun');
      if (text) text.textContent = 'Light Mode';
    } else {
      if (icon) icon.setAttribute('data-lucide', 'moon');
      if (text) text.textContent = 'Dark Mode';
    }
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Init Theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  // Dropdown Logic
  if (userMenu) {
    const dropdown = userMenu.querySelector('.user-dropdown');
    
    userMenu.addEventListener('click', (e) => {
      // If clicking inside the dropdown, don't toggle the dropdown itself
      // This allows clicking items like the theme toggle without closing the menu immediately
      if (e.target.closest('.user-dropdown')) {
        return;
      }
      
      // Toggle the dropdown when clicking the trigger area
      if (dropdown) {
        dropdown.classList.toggle('show');
      }
    });

    // Close dropdown when clicking anywhere outside the user menu
    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) {
        if (dropdown && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    });
  }

  // Theme Toggle Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the userMenu click listener from firing
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
});