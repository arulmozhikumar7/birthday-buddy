import { create } from "zustand";

export const useUser = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  birthdays: [],
  setBirthdays: (birthdays) => set({ birthdays: birthdays }),
  formModal: false,
  setFormModal: (formModal) => set({ formModal }),
}));
