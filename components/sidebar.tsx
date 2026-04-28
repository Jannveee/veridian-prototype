'use client';

import { Home, Zap, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Sidebar({ activeTab = 'dashboard', onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'audit', label: 'Audit', icon: Zap },
    { id: 'history', label: 'History', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="glass-dark fixed left-0 top-0 h-screen w-20 border-r border-primary/20 flex flex-col items-center py-8 gap-8 z-50">
      {/* Logo */}
      <div className="flex items-center justify-center w-14 h-14 rounded-lg glass neon-glow mb-4">
        <span className="text-xl font-bold text-primary">V</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                'relative w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300',
                isActive
                  ? 'glass neon-glow text-primary'
                  : 'text-foreground/50 hover:text-foreground hover:glass'
              )}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <div className="absolute right-0 w-1 h-8 bg-primary rounded-l-full neon-glow" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer accent */}
      <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary/30 rounded-full neon-glow" />
    </div>
  );
}
