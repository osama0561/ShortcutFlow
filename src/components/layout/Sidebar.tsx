'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Building2,
  FileVideo,
  Truck,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  Zap,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Creators', href: '/creators', icon: Users },
  { name: 'Clients', href: '/clients', icon: Building2 },
  { name: 'Content', href: '/content', icon: FileVideo },
  { name: 'Shipping', href: '/shipping', icon: Truck },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-primary-900 to-primary-800">
          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-primary-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ShortcutFlow</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 space-y-1 px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-primary-700/50 text-white'
                        : 'text-primary-100 hover:bg-primary-700/30 hover:text-white',
                      'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-accent-400' : 'text-primary-300 group-hover:text-white',
                        'h-5 w-5 flex-shrink-0 transition-colors'
                      )}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Secondary Navigation */}
            <div className="mt-auto px-3 space-y-1">
              <div className="border-t border-primary-700/50 pt-4 mb-2" />
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-primary-700/50 text-white'
                        : 'text-primary-100 hover:bg-primary-700/30 hover:text-white',
                      'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-accent-400' : 'text-primary-300 group-hover:text-white',
                        'h-5 w-5 flex-shrink-0 transition-colors'
                      )}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
