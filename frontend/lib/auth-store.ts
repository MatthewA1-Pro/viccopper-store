import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  subscription?: {
    status: string;
    plan: { name: string; priceCents: number };
    currentPeriodEnd: string;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await api.post<{ user: User; accessToken: string }>(
            '/auth/login',
            { email, password }
          );
          set({ user: res.user, accessToken: res.accessToken });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const res = await api.post<{ user: User; accessToken: string }>(
            '/auth/register',
            { name, email, password }
          );
          set({ user: res.user, accessToken: res.accessToken });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        await api.post('/auth/logout', {}).catch(() => {});
        set({ user: null, accessToken: null });
      },

      refreshToken: async () => {
        try {
          const res = await api.post<{ accessToken: string }>('/auth/refresh', {});
          set({ accessToken: res.accessToken });
        } catch {
          set({ user: null, accessToken: null });
        }
      },

      fetchMe: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        try {
          const res = await api.get<{ user: User }>('/auth/me', accessToken);
          set({ user: res.user });
        } catch {
          await get().refreshToken();
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
