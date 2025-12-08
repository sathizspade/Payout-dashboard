# Payout Dashboard

A modern HTML, CSS, and JavaScript dashboard application for managing and tracking payouts.

## Project Structure

```
src/
├── js/             # JavaScript files
├── styles/         # CSS stylesheets
├── index.html      # Entry point
```

## Features

- **Dashboard Overview**: View payout summary with total, pending, completed, and failed amounts
- **Payouts Table**: Display all payouts with status, amount, and date
- **Responsive Design**: Mobile-friendly layout
- **Dark Mode Support**: Automatic dark mode based on system preference
- **Navigation**: Multi-page navigation with sidebar
- **Modern Styling**: Clean and professional UI

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (v16 or higher) - optional, only needed for local development server

### Installation

1. No installation needed! Open `index.html` directly in your browser, or:

2. For local development with Vite server:
```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Features

### Dashboard
- Summary cards showing:
  - Total number of payouts
  - Pending amount
  - Completed amount
  - Failed payouts count

### Payouts Table
- Displays all payouts with:
  - Payout ID
  - Amount (formatted as currency)
  - Status (pending, completed, failed)
  - Date
  - Description

### Navigation
- Sidebar navigation with links to:
  - Dashboard
  - Payouts
  - Reports
  - Transactions
  - Settings

### Responsive Design
- Desktop layout with sidebar
- Tablet layout with optimized spacing
- Mobile layout with stacked navigation

## Customization

### Colors
Update CSS custom properties in `src/styles/global.css`:
```css
:root {
  --color-primary: #2c3e50;
  --color-secondary: #34495e;
  --color-accent: #3498db;
  /* ... more colors */
}
```

### Data
Mock data is stored in `src/js/main.js`. Update the `mockPayouts` array to change displayed data.

### Adding New Pages
1. Add a new `<div class="page">` in `index.html`
2. Add corresponding navigation link in sidebar
3. Update `setupNavigation()` in `main.js` if special handling is needed

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight - no large framework dependencies
- Fast load times
- Optimized CSS with CSS variables
- Vanilla JavaScript for maximum compatibility

## License

MIT
# Payout-dashboard
