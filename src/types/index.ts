export interface Payout {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  date: Date
  description: string
}

export interface PayoutSummary {
  totalPayouts: number
  pendingAmount: number
  completedAmount: number
  failedCount: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}
