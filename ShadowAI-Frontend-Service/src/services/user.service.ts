import { ApiService } from './api'
import { UserProfile, ApiResponse } from '@/types'

export class UserService {
  /**
   * Get user profile
   */
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await ApiService.get<UserProfile>('/user/profile')
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
      const response = await ApiService.put<UserProfile>('/user/profile', userData)
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
      const response = await ApiService.delete<void>('/user/profile')
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
      const response = await ApiService.put<void>('/user/password', data)
      return response
    } catch (error) {
      throw error
    }
  }
}

