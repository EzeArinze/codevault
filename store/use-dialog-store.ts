"use client";

import { create } from "zustand";

type DialogStore = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (val: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (val: boolean) => void;
  isViewOpen: boolean;
  setIsViewOpen: (val: boolean) => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (val: boolean) => void;
};

export const useDialogStore = create<DialogStore>((set) => ({
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: (val) => set({ isDeleteDialogOpen: val }),
  isEditDialogOpen: false,
  setIsEditDialogOpen: (val) => set({ isEditDialogOpen: val }),
  isViewOpen: false,
  setIsViewOpen: (val) => set({ isViewOpen: val }),
  isCreateDialogOpen: false,
  setIsCreateDialogOpen: (val) => set({ isCreateDialogOpen: val }),
}));
