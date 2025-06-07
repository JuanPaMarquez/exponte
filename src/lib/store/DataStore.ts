"use client";

import { create } from "zustand";
import { 
  PresentacionStore, 
  DataProyectStore, 
  RedesStore, 
  ColoresStore, 
  UserStore 
} from "@/schemas/schemasStore";
import { persist } from "zustand/middleware";

export const usePresentacionStore = create<PresentacionStore>((set) => ({
  dataPresentacionStore: {
    id: 0,
    foto: "",
    nombre: "",
    titulos: "",
  },
  setDataPresentacionStore: (newData) => set({ dataPresentacionStore: newData }),
}));

export const useDataProyectStore = create<DataProyectStore>((set, get) => ({
  dataProyectStore: [{
    id: 0,
    titulo: "",
    descripcion: "",
    tecnologias: [{id: 0, nombre_tecnologia: ""}],
    linkGithub: "",
    linkDemo: "",
    imagen: "",
  }],
  setDataProyectStore: (newData) => set({ dataProyectStore: newData })
}));


export const useRedesStore = create<RedesStore>((set) => ({
  redesStore: [
    { id: 0, social: "linkedin", activo: false, usuario: "" },
    { id: 1, social: "github", activo: false, usuario: "" },
    { id: 2, social: "gmail", activo: false, usuario: "" },
    { id: 3, social: "instagram", activo: false, usuario: "" },
    { id: 4, social: "facebook", activo: false, usuario: "" },
    { id: 5, social: "youtube", activo: false, usuario: "" },
  ],
  setRedesStore: (newRedes) => set({ redesStore: newRedes }),
}));

export const useColoresStore = create<ColoresStore>((set) => ({
  coloresStore: {
    id: 0,
    textoColor: "#ffffff",
    textoTituloColor: "#8fdaff",
    navegacionColor: "#287dbe",
    presentacionColor: "#0d2a3f",
    proyectosColor: "#21689e",
    redesColor: "#0d2a3f",
  },
  setColoresStore: (newPartialColores) => set((state) => ({
    coloresStore: {
      ...state.coloresStore,
      ...newPartialColores,
    }
  }))
}));

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserStore["user"]) => set({ user }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "usuario", // unique name for the storage
      partialize: (state) => ({ user: state.user }), // use localStorage as the storage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);