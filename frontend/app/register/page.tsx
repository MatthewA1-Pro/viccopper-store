'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Zap, Check, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

const PERKS = ['14-day free trial', 'No credit card needed', 'Cancel anytime'];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters',   pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number',           pass: /[0-9]/.test(password) },
  ];
  const strength = checks.filter(c => c.pass).length;
  const colors   = ['#f43f5e', '#f59e0b', '#34d399'];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < strength ? colors[strength - 1] : 'var(--border)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {checks.map(c => (
          <span key={c.label} style={{ fontSize: '0.75rem', color: c.pass ? '#34d399' : '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Check size={10} /> {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router    = useRouter();
  const register  = useAuthStore(s => s.register);
  const loginWithGoogle = useAuthStore(s => s.loginWithGoogle);
  const isLoading = useAuthStore(s => s.isLoading);

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      toast.success('Account created! Welcome aboard 🎉');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message ?? 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative',
    }} className="bg-grid">
      <div className="orb orb-violet" style={{ width: 400, height: 400, top: -100, right: -100 }} />
      <div className="orb orb-cyan"   style={{ width: 300, height: 300, bottom: -50, left: -50 }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
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
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            {PERKS.map(p => (
              <span key={p} style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#34d399' }}>✓</span> {p}
              </span>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="card responsive-card-padding">
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 8, textAlign: 'center' }}>Create your account</h1>
          <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.9375rem', textAlign: 'center' }}>Start your 14-day free trial today</p>

          {/* Google OAuth */}
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
              <label className="input-label">Full name</label>
              <input
                id="name" type="text" required autoComplete="name"
                className="input" placeholder="Jane Smith"
                value={name} onChange={e => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Email address</label>
              <input
                id="email" type="email" required autoComplete="email"
                className="input" placeholder="you@company.com"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password" type={showPwd ? 'text' : 'password'} required autoComplete="new-password"
                  className="input" placeholder="Create a strong password"
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
              <PasswordStrength password={password} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }} disabled={isLoading}>
              {isLoading ? 'Creating account…' : <>Create account <ArrowRight size={16} /></>}
            </button>

            <p style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'center', lineHeight: 1.6 }}>
              By creating an account you agree to our{' '}
              <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>Terms of Service</a>{' '}
              and{' '}
              <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, color: '#64748b', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
