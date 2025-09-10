import { ApiService } from './api'
import { 
  LoginRequest, 
  SignupRequest, 
  AuthResponse, 
  LoginResponse, 
  SignupResponse,
  User,
  UserProfile,
  ApiResponse
} from '@/types'


export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token'
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private static readonly USER_KEY = 'user_data'
  static async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await ApiService.post<any>('/login', credentials)
      
      if (response.data?.accessToken) {
        this.setAccessToken(response.data?.accessToken)
        this.setRefreshToken(response.data?.refreshToken)
        
        // Fetch user profile after successful login
        try {
          const correlationId = generateUUID()
          const userResponse = await ApiService.get<UserProfile>('/user/profile', {
            headers: {
              'x-correlation-id': correlationId
            }
          });
          console.log('This is user response', userResponse)
          console.log('Request correlation ID:', correlationId)
          if (userResponse.data) {
            this.setUser(userResponse.data)
            console.log('User profile fetched and stored:', userResponse.data)
          } else {
            console.warn('Failed to fetch user profile:', userResponse.message)
          }
        } catch (userError) {
          console.warn('Failed to fetch user profile after login:', userError)
          // Don't clear tokens here as login was successful
        }
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  static async signup(userData: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    try {
      const response = await ApiService.post<SignupResponse>('/signup', userData)
      
      if (!response.error && response.data) {
        try {
          const loginResponse = await this.login({
            username: userData.username,
            password: userData.password
          })
          return loginResponse as ApiResponse<SignupResponse>
        } catch (loginError) {
          return response
        }
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  static async logout(): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await ApiService.post<AuthResponse>('/logout')
      this.clearAuth()
      return response
    } catch (error) {
      this.clearAuth()
      throw error
    }
  }

  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = this.getAccessToken()
    const user = this.getCurrentUser()
    // Check both token and user data exist for proper authentication
    return !!(token && user)
  }

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    try {
      const userData = localStorage.getItem(this.USER_KEY)
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  }

  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  private static setAccessToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  private static setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  private static setUser(user: User | UserProfile): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static clearAuth(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static updateUserData(user: Partial<User>): void {
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user }
      this.setUser(updatedUser)
    }
  }
}
