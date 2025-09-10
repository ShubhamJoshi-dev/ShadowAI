import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'ShadowAI - Advanced AI Platform',
    template: '%s | ShadowAI'
  },
  description: 'Experience the future of AI with ShadowAI - A powerful, intuitive platform for advanced artificial intelligence solutions.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'ShadowAI', 'Technology'],
  authors: [{ name: 'ShadowAI Team' }],
  creator: 'ShadowAI',
  metadataBase: new URL('https://shadowai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shadowai.com',
    title: 'ShadowAI - Advanced AI Platform',
    description: 'Experience the future of AI with ShadowAI',
    siteName: 'ShadowAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShadowAI - Advanced AI Platform',
    description: 'Experience the future of AI with ShadowAI',
    creator: '@shadowai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body 
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


