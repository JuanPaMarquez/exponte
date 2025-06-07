"use client";

import { useEffect, useState } from "react";
import { RedSocial } from "@/schemas/schemas";
import Proyect from "@/ui/Portfolio/Proyect";
import { ButtonMainBlack, ButtonSection } from "@/components/Buttons";
import { useDataProyectStore, usePresentacionStore, useRedesStore, useUserStore } from "@/lib/store/DataStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPresentacion, updatePresentacion } from "@/lib/api/presentacionAPI";
import { getProyectos, setProyectoEmpty } from "@/lib/api/proyectoAPI";
import { getRedesSociales, setRedesSociales } from "@/lib/api/redesAPI";

export function Presentacion() {
  const [showElement, setShowElement] = useState(true);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const { dataPresentacionStore, setDataPresentacionStore } = usePresentacionStore();
  const user = useUserStore(state => state.user)
  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['presentacion', userId],
    queryFn: () => getPresentacion(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false
  });

  
  useEffect(() => {
    if (data) setDataPresentacionStore(data);
  }, [data]);
  
  const { isPending, mutate } = useMutation({
    mutationFn: updatePresentacion,
    onSuccess: () => console.log("Actualizado con éxito"),
    onError: (error) => {
      setMutationError(error.message || "Error desconocido al actualizar");
    },
  });
  
  const handleSubmit = () => {
    mutate(dataPresentacionStore);
  };
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
        value={dataPresentacionStore.foto ?? ''}
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
        value={dataPresentacionStore.nombre ?? ''}
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
        value={dataPresentacionStore.titulos ?? ''}
        className={`border p-1 ${showElement ? "" : "hidden"}`}
        onChange={(e) => {
          const newData = { ...dataPresentacionStore, titulos: e.target.value };
          setDataPresentacionStore(newData);
        }}
      />

      {/* Botón para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
      { error && <p className="text-red-500">Error al cargar los datos: {error.message}</p>}
      { isLoading && <p>Cargando...</p>}
      { mutationError && <p className="text-red-500">Error al guardar: {mutationError}</p>}
      <div className="ml-auto mt-2 ">
        <ButtonMainBlack black={false} onClick={handleSubmit} >{isPending ? "Guardando..." : "Guardar Cambios"}</ButtonMainBlack>
      </div>
    </section>
  );
}


export function Proyectos() {
  const { dataProyectStore, setDataProyectStore } = useDataProyectStore();
  const [ showElement, setShowElement] = useState(true);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const user = useUserStore(state => state.user)
  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['proyectos', userId],
    queryFn: () => getProyectos(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (data) setDataProyectStore(data);
  }, [data]);

  const { isPending, mutate } = useMutation({
    mutationFn: setProyectoEmpty,
    onSuccess: (data) => {
      console.log("Actualizado con éxito")
      const newDataProyecto = [
        ...dataProyectStore, 
        {
          ...data.proyectos[0],
        }
      ]

      setDataProyectStore(newDataProyecto)
    },
    onError: (error) => {
      setMutationError(error.message || "Error desconocido al actualizar");
    },
  });
  
  const handleSubmit = () => {
    mutate(userId!);
  };

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
        onClick={handleSubmit}
        className={`flex items-center justify-center gap-2 p-2 border rounded-2xl bg-gray-300 hover:bg-gray-400 cursor-pointer ${showElement ? "" : "hidden"}`}
      >
        { isPending ? "Añadiendo proyecto..." : "Añadir Proyecto"}
      </button>
      { mutationError && <p className="text-red-500">Error al añadir proyecto: {mutationError}</p>}
      { /* boton para mostrar/ocultar elementos */}
      { isLoading && <p>Cargando proyectos...</p>}
      { error && <p className="text-red-500">Error al cargar los proyectos: {error.message}</p>}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  )
}

export function Redes() {
  const [showElement, setShowElement] = useState(true);
  const { redesStore, setRedesStore } = useRedesStore();
  const user = useUserStore(state => state.user)
  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['redes', userId],
    queryFn: () => getRedesSociales(userId!),
    enabled: !!redesStore,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!Array.isArray(data)) return;
    const newRedes = [];
    for (const red of data) {
      const newRed = {
        id: red.id,
        social: red.social.toLowerCase() as RedSocial,
        activo: red.activo === "0" ? false : true,
        usuario: red.usuario || "", 
      }
      newRedes.push(newRed);
    }
    setRedesStore(newRedes);
  }, [data]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const id = Number(e.target.id.split("-")[0]);
    const newRedes = redesStore.map(red =>
      red.id === id ? { ...red, activo: checked } : red
    );
    setRedesStore(newRedes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = Number(e.target.id.split("-")[0]);

    const newRedes = redesStore.map(red =>
      red.id === id ? { ...red, usuario: value } : red
    );
    setRedesStore(newRedes);  
  };

  const { isPending, mutate } = useMutation({
    mutationFn: setRedesSociales,
    onSuccess: () => console.log("Redes actualizadas con éxito"),
    onError: (error) => {
      console.error("Error al actualizar redes:", error);
    },
  });

  const handleSubmit = () => {
    mutate(redesStore);
  };

  return (
    <section id="redes" className={`flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative ${showElement ? "" : "text-gray-500"}`}>
      <h3 className="text-lg font-bold">Seccion de Redes</h3>

       <div className="flex flex-col gap-2">
        { redesStore.map(red => (
          <div key={red.id} className={`border border-gray-500 rounded-2xl p-2 ${red.activo ? "" : "text-gray-500"}`}>
            <label className="flex justify-between items-center cursor-pointer">
              <span className="capitalize font-bold">{red.social.toUpperCase()}</span>
              <input
                type="checkbox"
                id={`${red.id}-checkbox`}
                checked={red.activo}
                onChange={handleCheckboxChange}
              />
            </label>
            <input
              type="text"
              id={`${red.id}-input`}
              className="w-full border p-1"
              placeholder={`Usuario de ${red.social}`}
              value={red.usuario}
              onChange={handleInputChange}
              disabled={!red.activo}
            />
          </div>
        ))}

      </div>
      { isLoading && <p>Cargando redes sociales...</p>}
      { error && <p className="text-red-500">Error al cargar las redes sociales: {error.message}</p>}
      <div className="ml-auto mt-2 ">
        <ButtonMainBlack black={false} onClick={handleSubmit} >{isPending ? "Guardando..." : "Guardar Cambios"}</ButtonMainBlack>
      </div>

      { /* boton para mostrar/ocultar elementos */}
      <ButtonSection showElement={showElement} setShowElement={setShowElement} />
    </section>
  )
}