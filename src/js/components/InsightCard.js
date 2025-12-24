/**
 * InsightCard Component
 * A reusable card component for displaying insight statistics
 */

const InsightCard = {
  /**
   * Creates an insight card element
   * @param {Object} options - Card options
   * @param {string} options.title - Card title
   * @param {string|number} options.value - Card value to display
   * @param {string} [options.icon] - Optional Lucide icon name
   * @param {string} [options.trend] - Optional trend indicator (e.g., "+5%")
   * @param {string} [options.trendDirection] - 'up' or 'down' for trend styling
   * @param {boolean} [options.showTrend=true] - Whether to show the trend indicator
   * @returns {string} HTML string for the card
   */
  create: function ({ title, value, icon, trend, trendDirection, transactionCount, showTrend = true }) {
    // Check if icon is a path (contains / or .) or a simple name
    const isPath = icon && (icon.includes('/') || icon.includes('.'));
    const iconHtml = icon ? (
      isPath
        ? `<img src="${icon}" class="card-icon" alt="${title} icon" />`
        : `<i data-lucide="${icon}" class="card-icon"></i>`
    ) : '';
    
    const trendClass = trendDirection === 'up' ? 'positive' : trendDirection === 'down' ? 'negative' : '';
    const trendHtml = (trend && showTrend) ? `
      <div class="card-trend ${trendClass}">
        ${trendDirection ? `<i data-lucide="trending-${trendDirection}"></i>` : ''}
        <span>${trend}</span>
      </div>
    ` : '';

    // Add transaction count display if provided
    const txCountHtml = transactionCount ? `
      <span class="transaction-count">
        (${transactionCount})
      </span>
    ` : '';

    return `
      <div class="insight-card">
        <div class="card-header">
          ${iconHtml}
          <h3>${title}<span>${txCountHtml}</span></h3>
        </div>
        <p class="value">${value}</p>
        ${trendHtml}
      </div>
    `;
  },

  /**
   * Renders multiple cards into a container
   * @param {string} containerId - ID of the container element
   * @param {Array} cards - Array of card option objects
   */
  renderAll: function (containerId, cards) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = cards.map(card => this.create(card)).join('');
      // Re-initialize Lucide icons for any new icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }
};

// Export for use in other files (works with module pattern)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InsightCard;
}
