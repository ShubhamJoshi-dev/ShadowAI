// API Response Types
export interface ApiResponse<T = any> {
  message: string
  data?: T
  statusCode: number
  error: boolean
  'x-correlation-id'?: string
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

// User Types
export interface User {
  _id: string
  username: string
  email: string
  type: 'JWT' | 'OAuth'
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  _id?: string
  username: string
  email: string
  type: 'JWT' | 'OAuth'
  createdAt?: string
  updatedAt?: string
}

// Auth Types
export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  statusCode: number
  error: boolean
}

export interface SignupResponse extends AuthResponse {
  data?: User
}

export interface LoginResponse extends AuthResponse {
  data?: {
    accessToken: string
    refreshToken: string
  }
}

// Health Check Types
export interface HealthResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  version?: string
  uptime?: number
}

// Form Types
export interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
}

// Navigation Types
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  disabled?: boolean
}

// Theme Types
export type Theme = 'dark' | 'light' | 'system'

// Toast Types
export interface ToastData {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Loading States
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Pagination Types
export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Filter Types
export interface FilterParams {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number
  totalRequests: number
  systemHealth: 'healthy' | 'warning' | 'error'
  uptime: number
}

// Animation Types
export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
}

// Layout Types
export interface LayoutProps extends BaseComponentProps {
  showSidebar?: boolean
  showHeader?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}
