import { ApiService } from './api'
import { HealthResponse, ApiResponse } from '@/types'

export class HealthService {
  /**
   * Check system health
   */
  static async checkHealth(): Promise<ApiResponse<HealthResponse>> {
    try {
      const response = await ApiService.get<HealthResponse>('/health')
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Get system status with timeout for loading states
   */
  static async getSystemStatus(timeout = 5000): Promise<HealthResponse> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await ApiService.get<HealthResponse>('/health')
      
      clearTimeout(timeoutId)
      
      // Handle your backend's response format
      if (!response.error && response.data.data) {
        return response.data.data
      }
      
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return {
          status: 'unhealthy',
          timestamp: new Date().toISOString()
        }
      }
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      }
    }
  }
}
