'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

export default function LoginPage() {
  const router   = useRouter();
  const login    = useAuthStore(s => s.login);
  const loginWithGoogle = useAuthStore(s => s.loginWithGoogle);
  const isLoading = useAuthStore(s => s.isLoading);

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/app');
    } catch (err: any) {
      toast.error(err.message ?? 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative',
    }} className="bg-grid">
      <div className="orb orb-indigo" style={{ width: 400, height: 400, top: -100, left: -100 }} />
      <div className="orb orb-violet" style={{ width: 300, height: 300, bottom: -50, right: -50 }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={24} color="#fff" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9' }}>Nova<span className="text-gradient">SaaS</span></span>
          </Link>
        </div>

        {/* Card */}
        <div className="card responsive-card-padding">
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 8, textAlign: 'center' }}>Welcome back</h1>
          <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.9375rem', textAlign: 'center' }}>Sign in to your account</p>

          {/* OAuth */}
          <button
            onClick={async () => {
              try {
                await loginWithGoogle();
              } catch (err: any) {
                toast.error(err.message || 'Google login failed');
              }
            }}
            className="btn btn-secondary"
            style={{ width: '100%', marginBottom: 24 }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: '#475569', fontSize: '0.8125rem' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="input-label">Email address</label>
              <input
                id="email" type="email" required autoComplete="email"
                className="input"
                placeholder="you@company.com"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label className="input-label" style={{ margin: 0 }}>Password</label>
                <a href="#" style={{ fontSize: '0.8125rem', color: '#6366f1', textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password" type={showPwd ? 'text' : 'password'} required autoComplete="current-password"
                  className="input"
                  placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button" onClick={() => setShowPwd(s => !s)}
                  aria-label="Toggle password visibility"
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                  }}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }} disabled={isLoading}>
              {isLoading ? 'Signing in…' : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: '0.875rem' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
