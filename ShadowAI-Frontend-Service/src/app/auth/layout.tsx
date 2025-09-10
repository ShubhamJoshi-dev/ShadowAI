'use client'

import { motion } from 'framer-motion'
import { Bot, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shadowai-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-shadow rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-shadow p-3 rounded-full">
                  <Bot className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-gradient-shadow">Shadow</span>AI
              </h1>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Welcome to the Future of
                <span className="text-gradient-shadow block">Artificial Intelligence</span>
              </h2>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-md">
                Experience cutting-edge AI technology with enterprise-grade security 
                and lightning-fast performance.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Advanced AI Models</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300">Real-time Processing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-shadow rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-shadow p-2 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-white">
              <span className="text-gradient-shadow">Shadow</span>AI
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


