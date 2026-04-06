'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, BarChart3, CreditCard, Settings, FolderKanban,
  LogOut, Zap, Bell, User, Menu, X,
} from 'lucide-react';
import type { Route } from 'next';
import { useState } from 'react';

interface NavItem {
  href: Route;
  icon: React.ReactElement;
  label: string;
}

const NAV: NavItem[] = [
  { href: '/app',         icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { href: '/app/analytics', icon: <BarChart3 size={18} />,       label: 'Analytics' },
  { href: '/app/projects',  icon: <FolderKanban size={18} />,    label: 'Projects' },
  { href: '/app/billing',   icon: <CreditCard size={18} />,     label: 'Billing' },
  { href: '/app/settings',  icon: <Settings size={18} />,       label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const user      = useAuthStore(s => s.user);
  const logout    = useAuthStore(s => s.logout);
  const fetchUser  = useAuthStore(s => s.fetchUser);
  const [sideOpen, setSideOpen] = useState(false);

  useState(() => { fetchUser(); });

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar overlay (mobile) */}
      {sideOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 39, backdropFilter: 'blur(4px)' }}
          onClick={() => setSideOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sideOpen ? 'open' : ''}`}>
        <div style={{ padding: '20px 16px 16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={20} color="#fff" />
            </div>
            <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#f1f5f9' }}>Nova<span className="text-gradient">SaaS</span></span>
          </Link>
        </div>

        <div className="divider" style={{ margin: '0 16px 16px' }} />

        {/* User info */}
        <div style={{ padding: '0 16px 20px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10,
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <User size={16} color="#fff" />
            </div>
            <div style={{ overflow: 'hidden' }} className="desktop-only">
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name ?? 'User'}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 8px 8px' }} className="desktop-only">Navigation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link${active ? ' active' : ''}`}
                  onClick={() => setSideOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Plan badge */}
        <div style={{ padding: '16px 16px 12px' }}>
          <div style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
            border: '1px solid rgba(99,102,241,0.2)',
            marginBottom: 12,
          }} className="desktop-only">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#a5b4fc' }}>
                {(user?.planId ? user.planId.charAt(0).toUpperCase() + user.planId.slice(1) : 'Free')} Plan
              </span>
            </div>
            <Link href="/app/billing" style={{ fontSize: '0.75rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
              Upgrade →
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="sidebar-link"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e' }}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content" style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Topbar */}
        <header style={{
          height: 64, padding: '0 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(8,12,20,0.8)',
          backdropFilter: 'blur(20px)',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSideOpen(s => !s)}
            style={{
              display: 'none', background: 'none', border: 'none',
              color: '#94a3b8', cursor: 'pointer',
            }}
            className="header-mobile-toggle"
          >
            <Menu size={22} />
          </button>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button aria-label="Notifications" style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b', position: 'relative',
            }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute', top: 6, right: 6, width: 7, height: 7,
                borderRadius: '50%', background: '#6366f1',
                border: '1.5px solid var(--bg-elevated)',
              }} />
            </button>

            <Link href="/app/settings" style={{
              width: 34, height: 34, borderRadius: '50%',
              background: user?.avatarUrl ? `url(${user.avatarUrl})` : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', textDecoration: 'none',
            }}>
              {!user?.avatarUrl && <User size={15} color="#fff" />}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px 28px', maxWidth: 1200 }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar-toggle { display: flex !important; }
          div[style*="margin-left: 260px"] { margin-left: 0 !important; }
        }
        .sidebar.open, [style*="transform: none"] { transform: none !important; }
      `}</style>
    </div>
  );
}
