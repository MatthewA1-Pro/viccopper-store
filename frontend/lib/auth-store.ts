import { create } from 'zustand';
import { createClient } from './supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  subscription?: {
    plan: { name: string };
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    const supabase = createClient();
    const { data: { user: sbUser } } = await supabase.auth.getUser();

    if (sbUser) {
      // In a real app, you might fetch additional profile data from a 'profiles' table
      const user: User = {
        id: sbUser.id,
        email: sbUser.email!,
        name: sbUser.user_metadata.full_name || sbUser.email?.split('@')[0] || 'User',
        avatarUrl: sbUser.user_metadata.avatar_url,
      };
      set({ user, isLoading: false });
    } else {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ isLoading: false });
      throw error;
    }
    const { fetchUser } = useAuthStore.getState();
    await fetchUser();
  },

  loginWithGoogle: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) throw error;
  },

  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
