import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { PresentacionStore, DataProyectStore, RedesStore } from "@/schemas/schemasStore";

export const usePresentacionStore = create<PresentacionStore>((set) => ({
  dataPresentacionStore: {
    foto: "",
    nombre: "",
    titulos: "",
  },
  setDataPresentacionStore: (newData) => set({ dataPresentacionStore: newData }),
}));

export const useDataProyectStore = create<DataProyectStore>((set, get) => ({
  dataProyectStore: [{
    id: uuidv4(),
    titulo: "",
    descripcion: "",
    tecnologias: [{id: uuidv4(), nombre: ""}],
    linkGithub: "",
    linkDemo: "",
    imagen: "",
  }],
  setDataProyectStore: (newData) => set({ dataProyectStore: newData }),
  addProyecto: () =>
    set({
      dataProyectStore: [
        ...get().dataProyectStore,
        {
          id: uuidv4(),
          titulo: "",
          descripcion: "",
          tecnologias: [{ id: uuidv4(), nombre: "" }],
          linkGithub: "",
          linkDemo: "",
          imagen: "",
        },
      ],
    }),
}));


export const useRedesStore = create<RedesStore>((set) => ({
  redesStore: {
    linkedin: { activo: false, usuario: "" },
    github: { activo: false, usuario: "" },
    twitter: { activo: false, usuario: "" },
    instagram: { activo: false, usuario: "" },
    facebook: { activo: false, usuario: "" },
    youtube: { activo: false, usuario: "" },
  },
  setRedesStore: (newRedes) => set({ redesStore: newRedes }),
}));

