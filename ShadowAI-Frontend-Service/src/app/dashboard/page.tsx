'use client'

import { useState, useEffect } from 'react'
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
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HealthService } from '@/services/health.service'
import { AuthService } from '@/services/auth.service'
import { HealthResponse, User } from '@/types'
import { formatDateTime } from '@/lib/utils'

const stats = [
  {
    title: 'AI Requests',
    value: '12,847',
    change: '+24.5%',
    trend: 'up',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Processing Speed',
    value: '0.18s',
    change: '-32.1%',
    trend: 'up',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Success Rate',
    value: '99.9%',
    change: '+0.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Active Users',
    value: '2,349',
    change: '+18.7%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
]

const recentActivity = [
  {
    id: 1,
    action: 'GPT-4 Model Integration',
    description: 'Advanced language model successfully deployed',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 2,
    action: 'Real-time Image Analysis',
    description: 'Processed 847 images with 99.8% accuracy',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 3,
    action: 'Neural Network Training',
    description: 'Deep learning model epoch 125/200 completed',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    status: 'in_progress'
  },
  {
    id: 4,
    action: 'API Rate Limit Optimization',
    description: 'Increased throughput by 340% with smart caching',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 5,
    action: 'Security Scan',
    description: 'Zero vulnerabilities detected across all endpoints',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 6,
    action: 'Database Optimization',
    description: 'Query performance improved by 78%',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: 'completed'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [isLoadingHealth, setIsLoadingHealth] = useState(true)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    loadHealthStatus()
  }, [])

  const loadHealthStatus = async () => {
    setIsLoadingHealth(true)
    try {
      const healthData = await HealthService.getSystemStatus()
      setHealth(healthData)
    } catch (error) {
      console.error('Failed to load health status:', error)
      setHealth({
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoadingHealth(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getHealthBadge = () => {
    if (isLoadingHealth) {
      return <Badge variant="secondary">Checking...</Badge>
    }
    
    if (!health) {
      return <Badge variant="destructive">Unknown</Badge>
    }
    
    return health.status === 'healthy' 
      ? <Badge variant="success">Healthy</Badge>
      : <Badge variant="destructive">Unhealthy</Badge>
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Welcome back, {user?.username || 'User'}! 🚀
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Your AI platform is performing exceptionally today. Here's your real-time analytics.
        </motion.p>
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="w-12 h-12 bg-gradient-shadow rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-medium">{user.type} Account</p>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Activity className="w-6 h-6 text-green-500" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription className="text-base">Real-time system health monitoring</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              {getHealthBadge()}
              <Button
                variant="outline"
                size="sm"
                onClick={loadHealthStatus}
                disabled={isLoadingHealth}
                className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingHealth ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800">
                <Shield className="w-6 h-6 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Security</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">All systems secure</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
                <Activity className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Uptime</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">99.9% (30 days)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
                <Zap className="w-6 h-6 text-purple-500" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Response</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">< 200ms avg</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Performance Analytics
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Real-time insights into your AI platform's performance and user engagement
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-3">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <motion.div 
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      vs last month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and processes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800/50 dark:to-slate-700/30 hover:from-gray-100 hover:to-gray-200 dark:hover:from-slate-700/50 dark:hover:to-slate-600/30 transition-all duration-300 border border-gray-200 dark:border-slate-700/50"
              >
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {activity.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{formatDateTime(activity.timestamp)}</span>
                  </div>
                </div>
                {activity.status === 'completed' && (
                  <div className="flex-shrink-0">
                    <Badge variant="success" className="text-xs">
                      Done
                    </Badge>
                  </div>
                )}
                {activity.status === 'in_progress' && (
                  <div className="flex-shrink-0">
                    <Badge variant="warning" className="text-xs">
                      Running
                    </Badge>
                  </div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>API Usage Trends</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Image Processing', 'Text Analysis', 'Model Training', 'Data Mining'].map((service, index) => {
                  const usagePercent = [85, 72, 91, 67][index]
                  const color = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'][index]
                  return (
                    <div key={service} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">{service}</span>
                        <span className="text-gray-600 dark:text-gray-300">{usagePercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${usagePercent}%` }}
                          transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
              <CardDescription>Current utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">CPU Usage</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-green-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '32%' }}
                      transition={{ delay: 1.2, duration: 1 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Memory</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-yellow-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      transition={{ delay: 1.3, duration: 1 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Storage</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ delay: 1.4, duration: 1 }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">0ms</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Downtime</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Brain className="w-6 h-6" />
                <span className="text-sm">Train Model</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Zap className="w-6 h-6" />
                <span className="text-sm">Run Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Shield className="w-6 h-6" />
                <span className="text-sm">Security Scan</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <RefreshCw className="w-6 h-6" />
                <span className="text-sm">Backup Data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}