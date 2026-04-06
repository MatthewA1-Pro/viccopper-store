'use client';
import { create } from 'zustand';
import { createClient } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role?: string;
  planId?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

function mapUser(sbUser: import('@supabase/supabase-js').User): User {
  return {
    id: sbUser.id,
    email: sbUser.email!,
    name:
      sbUser.user_metadata?.full_name ||
      sbUser.email?.split('@')[0] ||
      'User',
    avatarUrl: sbUser.user_metadata?.avatar_url,
    role: sbUser.user_metadata?.role ?? 'member',
    planId: sbUser.user_metadata?.plan_id,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    try {
      const supabase = createClient();
      const {
        data: { user: sbUser },
      } = await supabase.auth.getUser();

      if (sbUser) {
        set({ user: mapUser(sbUser), isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ isLoading: false });
      throw error;
    }
    const { fetchUser } = useAuthStore.getState();
    await fetchUser();
  },

  register: async (email, password, name) => {
    set({ isLoading: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
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
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  },

  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
