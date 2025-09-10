'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  Shield,
  Key,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
import { User, UserProfile } from '@/types'
import { getInitials, formatDate, getErrorMessage } from '@/lib/utils'

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
  })

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setProfile(currentUser)
      setEditForm({
        username: currentUser.username,
        email: currentUser.email,
      })
    }
    
    // Load fresh profile data
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await UserService.getProfile()
      if (!response.error && response.data) {
        setProfile(response.data)
        setUser(response.data)
        setEditForm({
          username: response.data.username,
          email: response.data.email,
        })
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!editForm.username.trim() || !editForm.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await UserService.updateProfile(editForm)
      
      if (!response.error && response.data) {
        setProfile(response.data)
        setUser(response.data)
        AuthService.updateUserData(response.data)
        setIsEditing(false)
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
          variant: "success",
        })
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        username: profile.username,
        email: profile.email,
      })
    }
    setIsEditing(false)
  }

  const getAccountTypeBadge = (type: string) => {
    return type === 'OAuth' ? (
      <Badge variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400">
        OAuth
      </Badge>
    ) : (
      <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
        JWT
      </Badge>
    )
  }

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="loading-dots text-shadowai-500">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Profile Settings
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Manage your account information and preferences.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-shadow rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(user.username)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </p>
                  {getAccountTypeBadge(user.type)}
                </div>

                {/* Stats */}
                <div className="w-full pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        1,247
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        API Calls
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        18
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Projects
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        99.8%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Basic Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your account details and personal information.
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-shadow hover:shadow-glow"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Username</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="glass-effect"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-md">
                      {profile.username}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="glass-effect"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-md">
                      {profile.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Read-only fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member Since</span>
                  </Label>
                  <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-md">
                    {profile.createdAt ? formatDate(profile.createdAt) : 'Recently joined'}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Account Type</span>
                  </Label>
                  <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-md flex items-center space-x-2">
                    <span>{profile.type}</span>
                    {profile.type === 'JWT' && (
                      <Badge variant="success" className="text-xs">Verified</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Change Password
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Update your account password
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <div className="font-medium text-red-900 dark:text-red-100">
                      Delete Account
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300">
                      Permanently remove your account and all data
                    </div>
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
