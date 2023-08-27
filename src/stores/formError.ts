import { create } from "zustand";

interface FormErrorState {
  error: string | null;
  showError: (error: string) => void;
  clearError: () => void;
}

export const useFormErrorStore = create<FormErrorState>((set) => ({
  error: null,
  showError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
