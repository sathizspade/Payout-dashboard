import { useEffect, useState } from 'react'
import { PayoutSummary } from '../types'
import { payoutService } from '../services/payoutService'
import './Dashboard.css'

export default function Dashboard() {
  const [summary, setSummary] = useState<PayoutSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true)
        const data = await payoutService.getSummary()
        setSummary(data)
        setError(null)
      } catch (err) {
        setError('Failed to load payout summary')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  if (loading) return <div className="dashboard">Loading...</div>
  if (error) return <div className="dashboard error">{error}</div>

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      {summary && (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Payouts</h3>
            <p className="value">{summary.totalPayouts}</p>
          </div>
          <div className="dashboard-card">
            <h3>Pending Amount</h3>
            <p className="value">${summary.pendingAmount.toFixed(2)}</p>
          </div>
          <div className="dashboard-card">
            <h3>Completed Amount</h3>
            <p className="value">${summary.completedAmount.toFixed(2)}</p>
          </div>
          <div className="dashboard-card">
            <h3>Failed Payouts</h3>
            <p className="value">{summary.failedCount}</p>
          </div>
        </div>
      )}
    </div>
  )
}
