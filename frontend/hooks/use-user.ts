import { useState } from 'react';
import { userService } from '../lib/services/user.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useUser() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (name: string, avatarUrl?: string) => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile({ name, avatarUrl });
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    try {
      const { avatarUrl } = await userService.uploadAvatar(file);
      await updateProfile(user?.name || '', avatarUrl);
      return avatarUrl;
    } catch (err) {
      toast.error('Avatar upload failed');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword?: string) => {
    setLoading(true);
    try {
      await userService.changePassword({ newPassword });
      toast.success('Password changed successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, updateProfile, uploadAvatar, changePassword };
}
