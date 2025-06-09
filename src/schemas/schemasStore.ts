import { Colores, DataPresentacion, DataProyect, RedesState } from "./schemas";

export interface PresentacionStore {
  dataPresentacionStore: DataPresentacion;
  setDataPresentacionStore: (newData: DataPresentacion) => void;
}

export interface DataProyectStore {
  dataProyectStore: DataProyect[];
  setDataProyectStore: (newData: DataProyect[]) => void;
}

export interface RedesStore {
  redesStore: RedesState;
  setRedesStore: (newRedes: RedesState) => void;
}

export interface ColoresStore {
  coloresStore: Colores;
  setColoresStore: (newColores: Colores) => void;
}

interface User {
  id: number;
  email: string;
  nombre_usuario: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}