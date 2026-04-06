'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/lib/auth-store';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const router = useRouter();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        toast.error('Authentication failed');
        router.push('/login');
        return;
      }

      await fetchUser();
      router.push('/app');
    };

    handleCallback();
  }, [router, fetchUser]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080c14' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: 48, height: 48, border: '3px solid rgba(99,102,241,0.2)', 
          borderTopColor: '#6366f1', borderRadius: '50%', 
          animation: 'spin 1s linear infinite', margin: '0 auto 20px' 
        }} />
        <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Finalizing authentication...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
