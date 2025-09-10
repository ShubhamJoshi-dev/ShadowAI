'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Users, 
  Zap, 
  TrendingUp, 
  Brain, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Server,
  Database,
  Cpu
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingSpinner, LoadingDots } from '@/components/ui/loading-spinner'
import { ProgressNotificationContainer } from '@/components/ui/progress-notification'
import { useProgressNotifications } from '@/hooks/use-progress-notifications'
import { HealthService } from '@/services/health.service'
import { AuthService } from '@/services/auth.service'
import { HealthResponse, User } from '@/types'
import { formatDateTime } from '@/lib/utils'

// Stats data
const stats = [
  {
    title: 'Total Requests',
    value: '12,847',
    change: '+24.5%',
    trend: 'up',
    icon: BarChart3,
    color: 'blue'
  },
  {
    title: 'Active Users',
    value: '2,349',
    change: '+18.7%',
    trend: 'up',
    icon: Users,
    color: 'green'
  },
  {
    title: 'Success Rate',
    value: '99.9%',
    change: '+0.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'emerald'
  },
  {
    title: 'Avg Response',
    value: '180ms',
    change: '-12%',
    trend: 'up',
    icon: Zap,
    color: 'orange'
  },
]

// Recent activity data
const recentActivity = [
  {
    id: 1,
    title: 'System Health Check',
    description: 'All systems operational',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'completed',
    icon: Shield
  },
  {
    id: 2,
    title: 'Database Backup',
    description: 'Daily backup completed successfully',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: 'completed',
    icon: Database
  },
  {
    id: 3,
    title: 'Model Training',
    description: 'AI model training in progress (85%)',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: 'in_progress',
    icon: Brain
  },
  {
    id: 4,
    title: 'Security Scan',
    description: 'Weekly security audit completed',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: 'completed',
    icon: Shield
  }
]

// Quick actions data
const quickActions = [
  { title: 'Train Model', icon: Brain, color: 'blue' },
  { title: 'Run Analysis', icon: BarChart3, color: 'green' },
  { title: 'System Check', icon: Shield, color: 'orange' },
  { title: 'View Logs', icon: Activity, color: 'purple' }
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [isLoadingHealth, setIsLoadingHealth] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)
  
  const {
    notifications,
    removeNotification,
    showLoading,
    showSuccess,
    showError,
    updateNotification
  } = useProgressNotifications()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    const loadingId = showLoading('Loading Dashboard', 'Fetching your dashboard data...')
    
    try {
      setIsLoadingData(true)
      
      // Simulate progress updates
      updateNotification(loadingId, { progress: 30 })
      
      await loadHealthStatus()
      updateNotification(loadingId, { progress: 70 })
      
      // Simulate additional data loading
      await new Promise(resolve => setTimeout(resolve, 500))
      updateNotification(loadingId, { progress: 100 })
      
      showSuccess('Dashboard Loaded', 'Your dashboard is ready!')
      removeNotification(loadingId)
    } catch (error) {
      showError('Loading Failed', 'Failed to load dashboard data')
      removeNotification(loadingId)
    } finally {
      setIsLoadingData(false)
    }
  }

  const loadHealthStatus = async () => {
    const loadingId = showLoading('Health Check', 'Checking system status...')
    setIsLoadingHealth(true)
    
    try {
      // Simulate progress
      updateNotification(loadingId, { progress: 25 })
      await new Promise(resolve => setTimeout(resolve, 300))
      
      updateNotification(loadingId, { progress: 75 })
      const healthData = await HealthService.getSystemStatus()
      
      updateNotification(loadingId, { progress: 100 })
      setHealth(healthData)
      
      showSuccess('System Healthy', 'All systems are operational')
      removeNotification(loadingId)
    } catch (error) {
      console.error('Failed to load health status:', error)
      setHealth({
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      })
      showError('Health Check Failed', 'Unable to retrieve system status')
      removeNotification(loadingId)
    } finally {
      setIsLoadingHealth(false)
    }
  }

  const handleQuickAction = async (actionName: string) => {
    const loadingId = showLoading(`${actionName}`, `Executing ${actionName.toLowerCase()}...`)
    
    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 20) {
        updateNotification(loadingId, { progress: i })
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      showSuccess(`${actionName} Complete`, `${actionName} executed successfully`)
      removeNotification(loadingId)
    } catch (error) {
      showError(`${actionName} Failed`, `Failed to execute ${actionName.toLowerCase()}`)
      removeNotification(loadingId)
    }
  }

  const getStatusIcon = (status: string) => {
    const iconClass = "w-4 h-4"
    switch (status) {
      case 'completed':
        return <CheckCircle className={`${iconClass} text-green-600`} />
      case 'in_progress':
        return <RefreshCw className={`${iconClass} text-blue-600 animate-spin`} />
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-600`} />
      default:
        return <Clock className={`${iconClass} text-gray-500`} />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Completed</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Running</Badge>
      case 'error':
        return <Badge variant="destructive" className="text-xs">Error</Badge>
      default:
        return <Badge variant="secondary" className="text-xs">Pending</Badge>
    }
  }

  const getHealthBadge = () => {
    if (isLoadingHealth) {
      return (
        <Badge variant="secondary" className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          Checking...
        </Badge>
      )
    }
    
    if (!health) {
      return <Badge variant="destructive">Unknown</Badge>
    }
    
    return health.status === 'healthy' 
      ? <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
      : <Badge variant="destructive">Unhealthy</Badge>
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white',
      emerald: 'bg-emerald-500 text-white'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-500 text-white'
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" className="text-blue-600" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Loading Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300">Preparing your workspace...</p>
          </div>
          <LoadingDots className="text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <>
      <ProgressNotificationContainer 
        notifications={notifications}
        onClose={removeNotification}
      />
      <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.username || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Here's what's happening with your AI platform today.
          </p>
        </div>

        {/* User Info Card */}
        {user && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{user.username}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {user.type} Account
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* System Status Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-green-600" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription className="mt-1">Real-time health monitoring</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {getHealthBadge()}
              <Button
                variant="outline"
                size="sm"
                onClick={loadHealthStatus}
                disabled={isLoadingHealth}
                className="flex-shrink-0"
              >
                {isLoadingHealth ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-gray-900 dark:text-white">Security</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">All systems secure</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Server className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-gray-900 dark:text-white">Uptime</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">99.9% (30 days)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <Cpu className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-gray-900 dark:text-white">Performance</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Excellent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${getColorClasses(stat.color)} flex-shrink-0`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest system events and processes</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`p-2 rounded-lg ${getColorClasses('blue')}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {activity.title}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      {formatDateTime(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-20 flex-col gap-2 p-4 hover:shadow-sm transition-all duration-200"
                  onClick={() => handleQuickAction(action.title)}
                >
                  <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">System Resources</CardTitle>
          <CardDescription>Current system utilization</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">CPU Usage</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">32%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 bg-green-500 rounded-full transition-all duration-300" style={{ width: '32%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Memory</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">68%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 bg-yellow-500 rounded-full transition-all duration-300" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Storage</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">45%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">99.9%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Uptime</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">180ms</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Avg Response</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">2.1k</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Requests/min</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  )
}