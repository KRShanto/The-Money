import { create } from "zustand";
import { PopupType } from "@/types/popup";

interface PopupState {
  // Which popup is open
  popup: PopupType;
  // Data to pass to the popup
  data: any;
  // Whether the popup should close. This is used to trigger the animation
  shouldClose: boolean;
  // Open a popup
  openPopup: (popup: PopupType, data?: any) => void;
  // Close the popup. This will trigger the animation
  closePopup: () => void;
  // Actually close the popup. This will reset the state
  closeActually: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  popup: null,
  data: {},
  shouldClose: false,
  openPopup: (popup, data: any = {}) => set({ popup, data }),
  closePopup: () =>
    set({
      shouldClose: true,
    }),
  closeActually: () => set({ popup: null, data: null, shouldClose: false }),
}));
