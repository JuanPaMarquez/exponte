import { DataPresentacion, DataProyect, RedesState } from "./schemas";

export interface PresentacionStore {
  dataPresentacionStore: DataPresentacion;
  setDataPresentacionStore: (newData: DataPresentacion) => void;
}

export interface DataProyectStore {
  dataProyectStore: DataProyect[];
  setDataProyectStore: (newData: DataProyect[]) => void;
  addProyecto: () => void;
}

export interface RedesStore {
  redesStore: RedesState;
  setRedesStore: (newRedes: RedesState) => void;
}

export interface Colores {
  textoColor: { label: string; color: string };
  textoTituloColor: { label: string; color: string };
  navegacionColor: { label: string; color: string };
  presentacionColor: { label: string; color: string };
  proyectosColor: { label: string; color: string };
  redesColor: { label: string; color: string };
}

export interface ColoresStore {
  coloresStore: Colores;
  setColoresStore: (newColores: Colores) => void;
}

interface User {
  idUsuario: number;
  email: string;
  password: string;
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}