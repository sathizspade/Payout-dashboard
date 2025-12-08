# Payout Dashboard - Copilot Instructions

This document provides custom instructions for GitHub Copilot when working on the Payout Dashboard project.

## Project Overview

A React TypeScript dashboard application built with Vite for managing and tracking payouts with a modern, responsive UI.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **Linting**: ESLint with TypeScript support

## Key Conventions

### Component Structure
- Functional components with hooks only
- One component per file
- Component name matches filename (PascalCase)
- Each component has an associated `.css` file in the same directory

### File Organization
```
src/
├── components/    # Reusable UI components
├── pages/        # Full page components
├── services/     # API calls and business logic
├── types/        # TypeScript interfaces and types
├── hooks/        # Custom React hooks
├── utils/        # Helper functions
└── styles/       # Global styles
```

### TypeScript Practices
- Strict mode enabled
- All functions should have explicit return types
- Use `interface` for object types
- Define types in `src/types/` directory

### Naming Conventions
- Components: PascalCase (`Dashboard.tsx`)
- Utilities/Services: camelCase (`payoutService.ts`)
- Types/Interfaces: PascalCase (`Payout`, `PayoutSummary`)
- CSS Classes: kebab-case (`.dashboard-card`)

### API Integration
- All API calls in `src/services/payoutService.ts`
- Use Axios for HTTP requests
- Error handling with try-catch blocks
- Environment variables for API base URL

### Styling
- CSS Modules or plain CSS files
- Mobile-first responsive design
- Dark mode support with `prefers-color-scheme` media query
- No inline styles

## Development Guidelines

1. **New Components**: Create in `src/components/`, include `.css` file
2. **New Pages**: Create in `src/pages/`, include `.css` file
3. **New API Calls**: Add to `src/services/payoutService.ts`
4. **New Types**: Define in `src/types/index.ts`
5. **State Management**: Use React hooks (useState, useEffect, useContext)

## Code Quality

- Run `npm run lint` before committing
- All TypeScript errors must be resolved
- Functions should be concise and focused
- Comments for complex logic only

## Testing

- Unit tests should be placed in `src/__tests__/` (to be set up)
- E2E tests in `e2e/` directory (to be set up)
- Test files match component names: `Component.test.tsx`

## Deployment

Build output: `dist/`
Build command: `npm run build`
Preview: `npm run preview`

## Dependencies

- Always check if a package already exists before suggesting new ones
- Prefer packages with good TypeScript support
- Keep dependencies up to date

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add TypeScript interface in `src/types/`
3. Add route in `App.tsx`
4. Add navigation link in `Sidebar.tsx`

### Consuming API Data
1. Add method to `payoutService.ts`
2. Use `useEffect` hook to fetch data
3. Manage state with `useState`
4. Handle loading and error states

### Creating a Table Component
1. Define table row interface in `src/types/`
2. Create component with sortable columns
3. Add pagination if needed
4. Apply responsive styling

## Performance Considerations

- Use `React.memo()` for expensive components
- Lazy load pages with `React.lazy()`
- Avoid unnecessary re-renders with proper dependency arrays
- Optimize images in public folder

## When You're Stuck

- Check existing components for patterns
- Review `README.md` for architecture details
- Look at `payoutService.ts` for API call patterns
- Check CSS files for styling patterns
