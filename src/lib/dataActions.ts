import { DataPresentacion } from "@/schemas/schemas";

export function getDataPresentacion(): Promise<DataPresentacion> {
  return fetch("/mocks/presentacionMock.json")
    .then((response) => response.json())
}