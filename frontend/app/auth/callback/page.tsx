'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error(error === 'access_denied' ? 'Access denied' : 'Authentication failed');
      router.push('/login');
      return;
    }

    if (token) {
      setAccessToken(token);
      fetchMe().then(() => {
        toast.success('Logged in successfully!');
        router.push('/dashboard');
      }).catch(() => {
        toast.error('Failed to load user profile');
        router.push('/login');
      });
    } else {
      router.push('/login');
    }
  }, [searchParams, setAccessToken, fetchMe, router]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      background: 'var(--bg-main)', color: '#f1f5f9'
    }}>
      <Loader2 size={40} className="animate-spin" style={{ color: '#6366f1' }} />
      <p style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>Authenticating...</p>
    </div>
  );
}
