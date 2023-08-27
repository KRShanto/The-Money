import { create } from "zustand";

interface FileUploadState {
  progress: number;
  // submitTag is used to identify the submit button that was clicked
  submitTag: string;
  setProgress: (progress: number) => void;
  resetProgress: () => void;
}

export const useFileUploadProgressStore = create<FileUploadState>((set) => ({
  progress: 0,
  submitTag: "",
  setProgress: (progress) => {
    if (progress > 100) {
      set({ progress: 100 });
    } else if (progress < 0) {
      set({ progress: 0 });
    } else {
      set({ progress });
    }

    if (progress === 100) {
      setTimeout(() => {
        set({ progress: 0 });
      }, 2000);
    }
  },
  resetProgress: () => set({ progress: 0 }),
}));
