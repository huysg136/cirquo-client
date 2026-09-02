import { create } from 'zustand'
import { loginRequest } from '@/features/auth/services/auth.api'

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
  login: async (credentials, rememberMe) => {
    set({ status: 'loading', error: null })
    try {
      const session = await loginRequest(credentials)
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('cirquo_auth', JSON.stringify(session))
      set({ user: session.user, accessToken: session.accessToken, status: 'authenticated' })
      return session
    } catch (error) {
      set({ status: 'error', error: error.message })
      throw error
    }
  },
}))
