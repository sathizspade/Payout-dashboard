import axios from 'axios'
import { Payout, PayoutSummary } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const payoutService = {
  getAllPayouts: async (): Promise<Payout[]> => {
    const response = await apiClient.get('/payouts')
    return response.data
  },

  getPayoutById: async (id: string): Promise<Payout> => {
    const response = await apiClient.get(`/payouts/${id}`)
    return response.data
  },

  getSummary: async (): Promise<PayoutSummary> => {
    const response = await apiClient.get('/payouts/summary')
    return response.data
  },

  createPayout: async (payout: Omit<Payout, 'id'>): Promise<Payout> => {
    const response = await apiClient.post('/payouts', payout)
    return response.data
  },

  updatePayout: async (id: string, payout: Partial<Payout>): Promise<Payout> => {
    const response = await apiClient.put(`/payouts/${id}`, payout)
    return response.data
  },

  deletePayout: async (id: string): Promise<void> => {
    await apiClient.delete(`/payouts/${id}`)
  },
}
