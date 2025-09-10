import { ApiService } from './api'
import { 
  LoginRequest, 
  SignupRequest, 
  AuthResponse, 
  LoginResponse, 
  SignupResponse,
  User
} from '@/types'

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token'
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private static readonly USER_KEY = 'user_data'
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await ApiService.post<LoginResponse>('/login', credentials)
      console.log('This is payload', response)
        if (!response.error && response.data?.accessToken) {
          this.setAccessToken(response.data.accessToken)
          this.setRefreshToken(response.data.refreshToken)
          
          try {
            const userResponse = await ApiService.get<UserProfile>('/user/profile')
            if (!userResponse.error && userResponse.data) {
              this.setUser(userResponse.data)
            }
          } catch (userError) {
            console.warn('Failed to fetch user profile after login:', userError)
          }
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  static async signup(userData: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await ApiService.post<SignupResponse>('/signup', userData)
      
      if (!response.error && response.data) {
        try {
          const loginResponse = await this.login({
            username: userData.username,
            password: userData.password
          })
          return loginResponse as SignupResponse
        } catch (loginError) {
          return response
        }
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  static async logout(): Promise<AuthResponse> {
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
    return !!this.getAccessToken()
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
