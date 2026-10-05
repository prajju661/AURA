'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  History, 
  Settings, 
  Plus, 
  Sliders
} from 'lucide-react';

const OPERATIONS_NAV = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Requests', href: '/requests', icon: FileText },
  { name: 'Approvals', href: '/approvals', icon: CheckCircle2, badge: '1' },
  { name: 'Policies', href: '/policies', icon: BookOpen },
  { name: 'Audit Trail', href: '/audit', icon: History },
];

const SYSTEM_NAV = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || '/dashboard';

  const renderNavGroup = (items) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-[#EFE8DC] text-[#292722] font-semibold'
                : 'text-[#716B61] hover:bg-[#F5F0E8] hover:text-[#292722]'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {/* Terracotta Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#B85C38]"></span>
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#B85C38]' : 'text-[#716B61] group-hover:text-[#292722]'}`} />
              <span className="tracking-tight">{item.name}</span>
            </div>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-[#B85C38]/10 text-[#B85C38] border border-[#B85C38]/20">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 bg-[#FBF8F2] h-screen flex flex-col fixed left-0 top-0 z-30 border-r border-[#DDD4C7]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#DDD4C7] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-md bg-[#292722] text-[#F5F0E8] flex items-center justify-center font-bold text-xs font-mono">
            A
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#292722] uppercase">
              AURA
            </h1>
            <p className="text-[10px] text-[#716B61] font-mono uppercase tracking-wider">Operations Agent</p>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="p-4 border-b border-[#DDD4C7]">
        <Link 
          href="/requests/new"
          className="w-full py-2 px-3 rounded-md bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Request</span>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div>
          <h2 className="px-3 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#716B61]">
            Operations
          </h2>
          {renderNavGroup(OPERATIONS_NAV)}
        </div>

        <div>
          <h2 className="px-3 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#716B61]">
            System
          </h2>
          {renderNavGroup(SYSTEM_NAV)}
        </div>
      </nav>

      {/* User / Persona Footer */}
      <div className="p-4 border-t border-[#DDD4C7] bg-[#EFE8DC]/50 flex items-center space-x-2.5">
        <div className="w-7 h-7 rounded bg-[#DDD4C7] text-[#292722] font-mono font-bold text-xs flex items-center justify-center">
          MM
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-semibold text-[#292722] truncate">Morgan Manager</p>
          <span className="text-[10px] font-mono text-[#716B61]">Role: Approver</span>
        </div>
      </div>
    </aside>
  );
}
