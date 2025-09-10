import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse, ApiError } from '@/types'

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL:  'http://localhost:3000/api/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    (config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error) => {
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
        status: 500,
      }

      if (error.response) {
        const responseData = error.response.data
        apiError.message = responseData?.message || 'Server error occurred'
        apiError.status = error.response.status
      } else if (error.request) {
        apiError.message = 'Network error - please check your connection'
        apiError.status = 0
      } else {
        apiError.message = error.message || 'Request failed'
      }

      if (apiError.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_data')
        window.location.href = '/auth/login'
      }

      return Promise.reject(apiError)
    }
  )

  return instance
}

const api = createApiInstance()

export class ApiService {
  static async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.get<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  static async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  static async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  static async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }

  static async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw error as ApiError
    }
  }
}

// Export the configured axios instance for direct use if needed
export default api
