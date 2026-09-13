import { CreateNote } from "@/types/note";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: CreateNote;
  setDraft: (note: CreateNote) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}
export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "draft-store",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
