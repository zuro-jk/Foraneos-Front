import { create } from "zustand";

type SidebarUserState = {
  collapsable: boolean;
  setCollapsable: (collapsable: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (mobileOpen: boolean) => void;
};

export const useSidebarUserStore = create<SidebarUserState>((set) => ({
  collapsable: false,
  setCollapsable: (collapsable) => set({ collapsable }),
  mobileOpen: false,
  setMobileOpen: (mobileOpen) => set({ mobileOpen }),
}));
