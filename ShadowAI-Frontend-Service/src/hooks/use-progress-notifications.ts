import { useState, useCallback } from 'react'
import { ProgressNotification } from '@/components/ui/progress-notification'

export function useProgressNotifications() {
  const [notifications, setNotifications] = useState<ProgressNotification[]>([])

  const addNotification = useCallback((notification: Omit<ProgressNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newNotification: ProgressNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])
    return id
  }, [])

  const updateNotification = useCallback((id: string, updates: Partial<ProgressNotification>) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, ...updates }
          : notification
      )
    )
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Helper functions for common notification patterns
  const showLoading = useCallback((title: string, description?: string) => {
    return addNotification({
      type: 'loading',
      title,
      description,
      autoClose: false
    })
  }, [addNotification])

  const showSuccess = useCallback((title: string, description?: string) => {
    return addNotification({
      type: 'success',
      title,
      description,
      autoClose: true,
      duration: 3000
    })
  }, [addNotification])

  const showError = useCallback((title: string, description?: string) => {
    return addNotification({
      type: 'error',
      title,
      description,
      autoClose: true,
      duration: 5000
    })
  }, [addNotification])

  const showProgress = useCallback((title: string, progress: number, description?: string) => {
    return addNotification({
      type: 'loading',
      title,
      description,
      progress,
      autoClose: false
    })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    updateNotification,
    removeNotification,
    clearAll,
    showLoading,
    showSuccess,
    showError,
    showProgress
  }
}
