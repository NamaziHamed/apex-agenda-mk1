import { create } from "zustand";

interface uiStoreProps {
  dashboardExpanded: boolean;
  toggleDashboardExpanded: () => void;

  isMobile: boolean;
  setIsMobile: (value: boolean) => void;

  isCategoryDialogOpen: boolean;
  setCategoryDialogClose: () => void;
  setCategoryDialogOpen: () => void;

  selectedCategory: string;
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  setSelectedCategory: (title: string) => void;
}

export const useUiStore = create<uiStoreProps>((set) => ({
  // controlling the dashboard collapse/expand on mobile
  dashboardExpanded: false,
  toggleDashboardExpanded: () =>
    set((state) => ({ dashboardExpanded: !state.dashboardExpanded })),

  // managing mobile size items
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),

  // controlling add category dialog
  isCategoryDialogOpen: false,
  setCategoryDialogClose: () => set({ isCategoryDialogOpen: false }),
  setCategoryDialogOpen: () => set({ isCategoryDialogOpen: true }),

  // Category selection variables
  selectedCategory: "Today",
  selectedCategoryId: "",
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setSelectedCategory: (title) => set({ selectedCategory: title }),
}));
