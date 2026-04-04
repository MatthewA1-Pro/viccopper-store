import { useState } from 'react';
import { userService } from '../lib/services/user.service';
import { useAuthStore } from '../lib/auth-store';
import toast from 'react-hot-toast';

export function useUser() {
  const { user, setUser, accessToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (name: string, avatarUrl?: string) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile({ name, avatarUrl }, accessToken);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const { avatarUrl } = await userService.uploadAvatar(file, accessToken);
      await updateProfile(user?.name || '', avatarUrl);
      return avatarUrl;
    } catch (err) {
      toast.error('Avatar upload failed');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword?: string, newPassword?: string) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      await userService.changePassword({ oldPassword, newPassword }, accessToken);
      toast.success('Password changed successfully!');
    } catch (err) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, updateProfile, uploadAvatar, changePassword };
}
