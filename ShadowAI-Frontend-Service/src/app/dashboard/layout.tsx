import DashboardLayout from '@/components/layout/dashboard-layout'

interface DashboardLayoutWrapperProps {
  children: React.ReactNode
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}


