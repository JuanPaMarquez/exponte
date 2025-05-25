import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { 
  PresentacionStore, 
  DataProyectStore, 
  RedesStore, 
  ColoresStore, 
  UserStore 
} from "@/schemas/schemasStore";

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
    gmail: { activo: false, usuario: "" },
    instagram: { activo: false, usuario: "" },
    facebook: { activo: false, usuario: "" },
    youtube: { activo: false, usuario: "" },
  },
  setRedesStore: (newRedes) => set({ redesStore: newRedes }),
}));

export const useColoresStore = create<ColoresStore>((set) => ({
  coloresStore: {
    textoColor: { label: "Color de texto:", color: "#ffffff" },
    textoTituloColor: { label: "Color de título:", color: "#8fdaff" },
    navegacionColor: { label: "Fondo de navegación:", color: "#287dbe" },
    presentacionColor: { label: "Fondo de presentación:", color: "#0d2a3f" },
    proyectosColor: { label: "Fondo de proyectos:", color: "#21689e" },
    redesColor: { label: "Fondo de redes:", color: "#0d2a3f" },
  },
  setColoresStore: (newColores) => set({ coloresStore: newColores }),
}));

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));