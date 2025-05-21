"use client";

import { useState } from "react";
import { DataPresentacion, DataProyect, RedesState, RedSocial } from "@/schemas/schemas";
import Proyect from "@/ui/Portfolio/Proyect";
import { v4 as uuidv4 } from 'uuid';
import { ButtonSection } from "@/components/Buttons";


export function Presentacion({ setDataPresentacion }: { setDataPresentacion: React.Dispatch<React.SetStateAction<DataPresentacion>> }) {
  const [showElement, setShowElement] = useState(true);

  return (
    <section
      id="presentacion"
      className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${
        showElement ? "" : "text-gray-500"
      }`}
    >
      <h3 className="text-lg font-bold">Seccion de Presentacion</h3>

      <input
        id="foto"
        name="foto"
        type="text"
        placeholder="Link de foto de perfil"
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) =>
          setDataPresentacion((prev) => ({ ...prev, foto: e.target.value }))
        }
      />

      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Nombre de presentacion"
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) =>
          setDataPresentacion((prev) => ({ ...prev, nombre: e.target.value }))
        }
      />

      <input
        id="titulos"
        name="titulos"
        type="text"
        placeholder="Titulo(s) personal(es)"
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) =>
          setDataPresentacion((prev) => ({ ...prev, titulos: e.target.value }))
        }
      />

      {/* Botón para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  );
}


export function Proyectos({ dataProyecto, setDataProyectos }: { dataProyecto: DataProyect[], setDataProyectos: React.Dispatch<React.SetStateAction<DataProyect[]>> }) {
  const [showElement, setShowElement] = useState(true);

  return (
    <section id="proyectos" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Proyectos</h3>

      {dataProyecto.map((proyecto, index) => (
        <Proyect 
          key={proyecto.id} 
          index={index} 
          proyecto={proyecto} 
          setDataProyectos={setDataProyectos} 
          showElement={showElement} 
        />
      ))}

      <button
        type="button"
        onClick={() => setDataProyectos((prev) => [...prev, { 
          id: uuidv4(), 
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
      { /* boton para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  )
}

export function Redes({ 
  redes, 
  setRedes
}: {
  redes: RedesState,
  setRedes: React.Dispatch<React.SetStateAction<RedesState>>
}) {
  const [showElement, setShowElement] = useState(true);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const id = e.target.id.split("-")[0] as RedSocial;
    setRedes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        activo: checked,
      },
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0] as RedSocial;
    setRedes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        usuario: value,
      },
    }));
  };

  return (
    <section id="redes" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Redes</h3>

       <div className="flex flex-col gap-2">
        {Object.entries(redes).map(([key, value]) => (
          <div key={key} className={`border border-gray-500 rounded-2xl p-2 ${value.activo ? "" : "text-gray-500"}`}>
            <label className="flex justify-between items-center cursor-pointer">
              <span className="capitalize font-bold">{key.toUpperCase()}</span>
              <input
                type="checkbox"
                id={`${key}-checkbox`}
                checked={value.activo}
                onChange={handleCheckboxChange}
              />
            </label>
            <input
              type="text"
              id={`${key}-input`}
              className="w-full border p-1"
              placeholder={`Usuario de ${key}`}
              value={value.usuario}
              onChange={handleInputChange}
              disabled={!value.activo}
            />
          </div>
        ))}

      </div>

      { /* boton para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  )
}