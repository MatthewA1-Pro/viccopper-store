import { createClient } from '../supabase';
import { User } from '../auth-store';

export const userService = {
  async updateProfile(data: { name: string; avatarUrl?: string }) {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.updateUser({
      data: {
        full_name: data.name,
        avatar_url: data.avatarUrl
      }
    });

    if (error) throw error;
    if (!user) throw new Error('Failed to update profile');

    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.full_name || user.email?.split('@')[0] || 'User',
      avatarUrl: user.user_metadata.avatar_url,
      role: user.user_metadata.role ?? 'member',
      planId: user.user_metadata.plan_id
    } as User;
  },

  async changePassword(data: { newPassword?: string }) {
    if (!data.newPassword) return;
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword
    });
    if (error) throw error;
  },

  async uploadAvatar(file: File) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('public')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);

    return { avatarUrl: publicUrl };
  }
};
