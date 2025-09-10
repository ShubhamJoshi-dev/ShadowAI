import { ApiService } from './api'
import { UserProfile, ApiResponse } from '@/types'
import { generateUUID } from './auth.service'

export class UserService {
  /**
   * Get user profile
   */
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const correlationId = generateUUID()
      const response = await ApiService.get<UserProfile>('/user/profile', {
        headers: {
          'x-correlation-id': correlationId
        }
      })
      console.log('User profile fetch correlation ID:', correlationId)
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const correlationId = generateUUID()
      const response = await ApiService.put<UserProfile>('/user/profile', userData, {
        headers: {
          'x-correlation-id': correlationId
        }
      })
      console.log('User profile update correlation ID:', correlationId)
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete user account
   */
  static async deleteAccount(): Promise<ApiResponse<void>> {
    try {
      const correlationId = generateUUID()
      const response = await ApiService.delete<void>('/user/profile', {
        headers: {
          'x-correlation-id': correlationId
        }
      })
      console.log('User profile delete correlation ID:', correlationId)
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Change password
   */
  static async changePassword(data: {
    currentPassword: string
    newPassword: string
  }): Promise<ApiResponse<void>> {
    try {
      const correlationId = generateUUID()
      const response = await ApiService.put<void>('/user/password', data, {
        headers: {
          'x-correlation-id': correlationId
        }
      })
      console.log('Password change correlation ID:', correlationId)
      return response
    } catch (error) {
      throw error
    }
  }
}


