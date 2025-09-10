import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading-spinner'

export interface ProgressNotification {
  id: string
  type: 'loading' | 'success' | 'error' | 'info'
  title: string
  description?: string
  progress?: number
  autoClose?: boolean
  duration?: number
}

interface ProgressNotificationProps {
  notification: ProgressNotification
  onClose: (id: string) => void
}

export function ProgressNotificationComponent({ 
  notification, 
  onClose 
}: ProgressNotificationProps) {
  const { id, type, title, description, progress, autoClose = true, duration = 5000 } = notification

  React.useEffect(() => {
    if (autoClose && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, type, autoClose, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <LoadingSpinner size="sm" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'info':
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'loading':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
      default:
        return 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={cn(
        'p-4 rounded-lg border shadow-lg max-w-sm w-full',
        getStyles()
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {description}
            </p>
          )}
          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <motion.div
                  className="h-1.5 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

interface ProgressNotificationContainerProps {
  notifications: ProgressNotification[]
  onClose: (id: string) => void
}

export function ProgressNotificationContainer({ 
  notifications, 
  onClose 
}: ProgressNotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <ProgressNotificationComponent
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
