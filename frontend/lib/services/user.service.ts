import { api } from '../api';
import { User } from '../auth-store';

export const userService = {
  async updateProfile(data: { name: string; avatarUrl?: string }, token: string) {
    const res = await api.patch<{ user: User }>('/auth/profile', data, token);
    return res.user;
  },

  async changePassword(data: { oldPassword?: string; newPassword?: string }, token: string) {
    await api.patch('/auth/change-password', data, token);
  },

  async uploadAvatar(file: File, token: string) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    // Using native fetch for FormData
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!res.ok) throw new Error('Avatar upload failed');
    return res.json() as Promise<{ avatarUrl: string }>;
  }
};
