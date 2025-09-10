'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Shield, Zap, Sparkles, Eye, Bot } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Models',
    description: 'State-of-the-art machine learning algorithms powering intelligent solutions.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with end-to-end encryption and privacy protection.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with real-time processing and instant responses.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Eye,
    title: 'Intelligent Vision',
    description: 'Advanced computer vision capabilities for image and video analysis.',
    color: 'from-purple-500 to-pink-500'
  }
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shadowai-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            {/* Logo/Brand */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-shadow rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-shadow p-4 rounded-full">
                  <Bot className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <Badge variant="secondary" className="glass-effect px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Next Generation AI Platform
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="text-gradient-shadow">Shadow</span>
              <span className="text-white">AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 leading-relaxed"
            >
              Unleash the power of artificial intelligence with our cutting-edge platform. 
              Experience seamless integration, advanced analytics, and intelligent automation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-shadow hover:shadow-glow-lg transition-all duration-300 text-white border-0 px-8 py-4 text-lg font-semibold group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass-effect hover:bg-white/10 border-white/20 text-white px-8 py-4 text-lg font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Discover the advanced capabilities that make ShadowAI the ultimate AI platform
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-effect border-white/10 h-full group hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-r ${feature.color} p-4 rounded-full`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Join thousands of companies already using ShadowAI to revolutionize their operations
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="bg-gradient-shadow hover:shadow-glow-lg transition-all duration-300 text-white border-0 px-12 py-6 text-xl font-semibold group"
              >
                Start Your Journey
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
