'use client';
import { useState, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { 
  User, Mail, Shield, Camera, Key, Lock, 
  Trash2, Bell, Loader2, Save, LogOut 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, loading, updateProfile, uploadAvatar, changePassword } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || '');
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await updateProfile(name);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    await changePassword(passwordForm.new);
    setPasswordForm({ old: '', new: '', confirm: '' });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      await uploadAvatar(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.02em' }}>
          Account Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Manage your personal details and security preferences.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'start' }}>
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Profile Section */}
          <section className="card responsive-card-padding">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ 
                width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1'
              }}>
                <User size={18} />
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>Profile Information</h2>
            </div>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: user?.avatarUrl ? `url(${user.avatarUrl})` : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid var(--border)'
                }}>
                  {!user?.avatarUrl && <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 800 }}>{user?.name?.[0] ?? 'U'}</span>}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    position: 'absolute', bottom: -4, right: -4, width: 34, height: 34,
                    borderRadius: '50%', background: '#6366f1', border: '3px solid var(--bg-card)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    cursor: 'pointer', transition: 'transform 0.2s'
                  }}
                  className="hover-pop"
                >
                  <Camera size={16} />
                </button>
                <input 
                  type="file" ref={fileInputRef} onChange={handleFileChange}
                  accept="image/*" style={{ display: 'none' }}
                />
              </div>

              <form onSubmit={handleProfileSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                  <div>
                    <label className="input-label">Full Name</label>
                    <input 
                      className="input" value={name} onChange={e => setName(e.target.value)}
                      placeholder="e.g. John Doe" required
                    />
                  </div>
                  <div>
                    <label className="input-label">Email Address</label>
                    <input 
                      className="input" value={user?.email || ''} readOnly
                      style={{ color: '#444', backgroundColor: 'rgba(0,0,0,0.1)', cursor: 'not-allowed' }}
                    />
                    <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: 6 }}><Shield size={10} /> Email changes require support verification.</p>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> Save Profile</>}
                </button>
              </form>
            </div>
          </section>

          {/* Security Section */}
          <section className="card responsive-card-padding">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ 
                width: 32, height: 32, borderRadius: 8, background: 'rgba(236,72,153,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899'
              }}>
                <Lock size={18} />
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>Security & Password</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <label className="input-label">Old Password</label>
                  <input 
                    type="password" className="input" placeholder="••••••••"
                    value={passwordForm.old} onChange={e => setPasswordForm(p => ({ ...p, old: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="input-label">New Password</label>
                  <input 
                    type="password" className="input" placeholder="••••••••"
                    value={passwordForm.new} onChange={e => setPasswordForm(p => ({ ...p, new: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="input-label">Confirm New Password</label>
                  <input 
                    type="password" className="input" placeholder="••••••••"
                    value={passwordForm.confirm} onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <><Key size={16} /> Update Password</>}
              </button>
            </form>
          </section>
        </div>

        {/* Sidebar Info */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05))' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Account Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: '#475569' }}>User ID</span>
                <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{user?.id?.slice(0, 8)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: '#475569' }}>Role</span>
                <span className="badge badge-indigo">{user?.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: '#475569' }}>Two-Factor Auth</span>
                <span style={{ color: '#f43f5e', fontWeight: 600 }}>Disabled</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24, border: '1px solid rgba(244,63,94,0.2)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f43f5e', marginBottom: 12 }}>Danger Zone</h3>
            <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: 16, lineHeight: 1.5 }}>
              Proceed with caution. Account deletion is permanent and cannot be undone.
            </p>
            <button className="btn btn-outline-danger" style={{ width: '100%', fontSize: '0.8125rem' }}>
              <Trash2 size={14} /> Delete Account
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hover-pop:hover { transform: scale(1.1); }
        .btn-outline-danger { 
          background: rgba(244,63,94,0.05); color: #f43f5e; border: 1px solid rgba(244,63,94,0.2);
          padding: 8px 16px; borderRadius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-outline-danger:hover { background: rgba(244,63,94,0.1); border-color: #f43f5e; }
      `}</style>
    </div>
  );
}
