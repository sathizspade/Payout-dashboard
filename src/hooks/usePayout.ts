import { useEffect, useState } from 'react'
import { Payout } from '../types'
import { payoutService } from '../services/payoutService'

export function usePayouts() {
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setLoading(true)
        const data = await payoutService.getAllPayouts()
        setPayouts(data)
        setError(null)
      } catch (err) {
        setError('Failed to load payouts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayouts()
  }, [])

  return { payouts, loading, error }
}
