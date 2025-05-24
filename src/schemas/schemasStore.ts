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