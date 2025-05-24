"use client";

import { useState } from "react";
import { RedSocial } from "@/schemas/schemas";
import Proyect from "@/ui/Portfolio/Proyect";
import { ButtonSection } from "@/components/Buttons";
import { useDataProyectStore, usePresentacionStore, useRedesStore } from "@/lib/store/DataStore";


export function Presentacion() {
  const [showElement, setShowElement] = useState(true);
  const { dataPresentacionStore, setDataPresentacionStore } = usePresentacionStore();

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
        onChange={(e) => {
          const newData = { ...dataPresentacionStore, foto: e.target.value };
          setDataPresentacionStore(newData);
        }}
      />

      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Nombre de presentacion"
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) => {
          const newData = { ...dataPresentacionStore, nombre: e.target.value };
          setDataPresentacionStore(newData);
        }}
      />

      <input
        id="titulos"
        name="titulos"
        type="text"
        placeholder="Titulo(s) personal(es)"
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) => {
          const newData = { ...dataPresentacionStore, titulos: e.target.value };
          setDataPresentacionStore(newData);
        }}
      />

      {/* Botón para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  );
}


export function Proyectos() {
  const { dataProyectStore, addProyecto } = useDataProyectStore();
  const [ showElement, setShowElement] = useState(true);

  return (
    <section id="proyectos" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Proyectos</h3>

      {dataProyectStore.map((proyecto, index) => (
        <Proyect 
          key={proyecto.id} 
          index={index} 
          proyecto={proyecto} 
          showElement={showElement} 
        />
      ))}

      <button
        type="button"
        onClick={addProyecto}
        className={`flex items-center justify-center gap-2 p-2 border rounded-2xl bg-gray-300 hover:bg-gray-400 cursor-pointer ${showElement ? "" : "hidden"}`}
      >
        Agregar Proyecto
      </button>
      { /* boton para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  )
}

export function Redes() {
  const [showElement, setShowElement] = useState(true);
  const { redesStore, setRedesStore } = useRedesStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const id = e.target.id.split("-")[0] as RedSocial;
    const newRedes = { ...redesStore };
    newRedes[id] = {
      ...newRedes[id],
      activo: checked,
    };
    setRedesStore(newRedes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0] as RedSocial;
    const newRedes = { ...redesStore };
    newRedes[id] = {
      ...newRedes[id],
      usuario: value,
    };
    setRedesStore(newRedes);
  };

  return (
    <section id="redes" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Redes</h3>

       <div className="flex flex-col gap-2">
        {Object.entries(redesStore).map(([key, value]) => (
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