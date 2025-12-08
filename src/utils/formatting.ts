export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: '#f39c12',
    completed: '#27ae60',
    failed: '#e74c3c',
  }
  return colors[status] || '#95a5a6'
}
