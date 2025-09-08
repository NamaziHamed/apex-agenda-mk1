import { create } from "zustand";

interface uiStoreProps {
  dashboardExpanded: boolean;
  toggleDashboardExpanded: () => void;

  isMobile: boolean;
  setIsMobile: (value: boolean) => void;

  isCategoryDialogOpen: boolean;
  setCategoryDialogClose: () => void;
  setCategoryDialogOpen: () => void;
  isEditMode: boolean;
  removeEditMode: () => void;
  setEditMode: () => void;

  selectedCategory: string;
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  setSelectedCategory: (title: string) => void;
  selectedCategoryIcon: string;
  setSelectedCategoryIcon: (icon: string) => void;
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
  isEditMode: false,
  setEditMode: () => set({ isEditMode: true }),
  removeEditMode: () => set({ isEditMode: false }),

  // Category selection variables
  selectedCategory: "Today",
  selectedCategoryId: "Today",
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setSelectedCategory: (title) => set({ selectedCategory: title }),
  selectedCategoryIcon: "Sun",
  setSelectedCategoryIcon: (icon) => set({ selectedCategoryIcon: icon }),
}));
