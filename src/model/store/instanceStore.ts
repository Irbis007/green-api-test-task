import * as z from "zustand";
import { persist } from "zustand/middleware";

type InstanceStore = {
  idInstance?: string;
  apiTokenInstance?: string;
  setIdInstance: (v: string) => void;
  setApiTokenInstance: (v: string) => void;
};

export const useInstanceStore = z.create<InstanceStore>()(
  persist(
    (set) => ({
      setIdInstance: (idInstance) => set({ idInstance }),
      setApiTokenInstance: (apiTokenInstance) => set({ apiTokenInstance }),
    }),
    {
      name: "instance-storage",
      partialize: (state) => ({
        idInstance: state.idInstance,
        apiTokenInstance: state.apiTokenInstance,
      }),
    },
  ),
);
