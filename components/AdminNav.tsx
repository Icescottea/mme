'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Briefcase, MessageSquare, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  const navItems = [
    {
      href: '/admin/jobs',
      label: 'Job Management',
      icon: Briefcase,
    },
    {
      href: '/admin/inquiries',
      label: 'Inquiries',
      icon: MessageSquare,
    },
  ];

  return (
    <nav className="bg-[#060709] text-white border-b-2 border-[#de261e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.jpeg" 
              alt="Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Global Recruitment</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#de261e] text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#fffc01] text-[#060709] hover:bg-[#fffc01]/90 rounded-lg transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t border-slate-800">
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#de261e] text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}