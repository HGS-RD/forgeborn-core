import { create } from 'zustand'

type State = {
  results: string[]
  isLoading: boolean
  error: string | null
  addResult: (r: string) => void
  setLoading: (b: boolean) => void
  setError: (e: string | null) => void
}

export const useAgentStore = create<State>((set) => ({
  results: [],
  isLoading: false,
  error: null,
  addResult: (r) => set((s) => ({ results: [...s.results, r] })),
  setLoading: (b) => set({ isLoading: b }),
  setError: (e) => set({ error: e }),
}))
