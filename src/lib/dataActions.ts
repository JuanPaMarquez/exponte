import { DataPresentacion, DataProyect, RedesState } from "@/schemas/schemas";

export function getDataPresentacion(): Promise<DataPresentacion> {
  return fetch("/mocks/presentacionMock.json")
    .then((response) => response.json())
}

export function getDataProyects(): Promise<DataProyect[]> {
  return fetch("/mocks/proyectosMock.json")
    .then((response) => response.json())
}

export function getDataRedes(): Promise<RedesState> {
  return fetch("/mocks/redesMock.json")
    .then((response) => response.json())
}