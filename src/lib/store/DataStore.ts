import { DataProyect } from "@/schemas/schemas";
import { create } from "zustand";

interface DataProyectStore {
  dataProyectStore: DataProyect[];
  setDataProyectStore: (data: DataProyect[]) => void;
}

export const useDataProyectStore = create<DataProyectStore>((set) => ({
  dataProyectStore: [],
  setDataProyectStore: (data) => set({ dataProyectStore: data }),
}))