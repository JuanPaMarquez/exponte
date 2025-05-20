"use client";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { DataPresentacion, DataProyect } from "@/schemas/schemas";
import Proyect from "@/ui/Portfolio/Proyect";
import { v4 as uuidv4 } from 'uuid';


export function Presentacion({ setDataPresentacion }: { setDataPresentacion: React.Dispatch<React.SetStateAction<DataPresentacion>> }) {
  const [showElement, setShowElement] = useState(true);
  return (
    <section id="presentacion" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Presentacion</h3>
      <input onChange={(e) => setDataPresentacion((prev) => ({...prev, foto: e.target.value }))} type="text" className={`border p-1 ${showElement ? "" : "hidden"}`} placeholder="Link de foto de perfil" />
      <input onChange={(e) => setDataPresentacion((prev) => ({...prev, nombre: e.target.value }))} type="text" className={`border p-1 ${showElement ? "" : "hidden"}`} placeholder="Nombre de presentacion" />
      <input onChange={(e) => setDataPresentacion((prev) => ({...prev, titulos: e.target.value }))} type="text" className={`border p-1 ${showElement ? "" : "hidden"}`} placeholder="Titulo(s) personal(es)" />
      <button
        type="button"
        onClick={() => setShowElement(!showElement)} 
        className="absolute right-2 top-2 p-2 flex justify-center items-center font-bold text-2xl w-10 hover:text-gray-500 cursor-pointer"
      >
        {showElement ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" />}
      </button>
    </section>
  )
}

export function Proyectos({ dataProyecto, setDataProyectos }: { dataProyecto: DataProyect[], setDataProyectos: React.Dispatch<React.SetStateAction<DataProyect[]>> }) {
  const [showElement, setShowElement] = useState(true);

  return (
    <section id="proyectos" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Proyectos</h3>

      {dataProyecto.map((proyecto, index) => (
        <Proyect key={index} index={index} proyecto={proyecto} setDataProyectos={setDataProyectos} showElement={showElement} />
      ))}
      <button
        type="button"
        onClick={() => setDataProyectos((prev) => [...prev, { 
          id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0, 
          titulo: "", 
          descripcion: "", 
          tecnologias: [{id: uuidv4(), nombre: ""}], 
          linkGithub: "", 
          linkDemo: "", 
          imagen: "" 
        }])}
        className={`flex items-center justify-center gap-2 p-2 border rounded-2xl bg-gray-300 hover:bg-gray-400 cursor-pointer ${showElement ? "" : "hidden"}`}
      >
        Agregar Proyecto
      </button>
      <button
        type="button"
        onClick={() => setShowElement(!showElement)} 
        className="absolute right-2 top-2 p-2 flex justify-center items-center font-bold text-2xl w-10 hover:text-gray-500 cursor-pointer"
      >
        {showElement ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" />}
      </button>
      
    </section>
  )
}