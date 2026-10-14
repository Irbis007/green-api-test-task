import * as z from "zustand";
import { persist } from "zustand/middleware";

type ChatsStore = {
  chats: string[];
  activeChat?: string;
  setActiveChat: (val: string | undefined) => void;
  setChats: (phone: string) => void;
};

export const useChatsStore = z.create<ChatsStore>()(
  persist(
    (set, get) => ({
      chats: [],
      setActiveChat: (val) => set({ activeChat: val }),
      setChats: (phone) => {
        const chats = get().chats;
        if (!chats.includes(phone)) {
          set({ chats: [...chats, phone] });
        }
      },
    }),
    {
      name: "chats-storage",
      partialize: (state) => ({
        chats: state.chats,
        activeChat: state.activeChat,
      }),
    },
  ),
);
