"use client";
import { useEffect, useState } from "react";
import { useColoresStore, useUserStore } from "@/lib/store/DataStore";
import { ButtonMainBlack } from "@/components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getColores, updateColores } from "@/lib/api/coloresAPI";

export default function Colores() {
  const coloresStore = useColoresStore(state => state.coloresStore);
  const setColoresStore = useColoresStore(state => state.setColoresStore);
  const [errorUpdate, setErrorUpdate] = useState<string | null>(null);
  const user = useUserStore(state => state.user);
  const userId = user?.id;

  const labels: Record<keyof typeof coloresStore, string> = {
    textoColor: "Color del texto",
    textoTituloColor: "Color del título",
    navegacionColor: "Fondo de navegación",
    presentacionColor: "Fondo de presentación",
    proyectosColor: "Fondo de proyectos",
    redesColor: "Fondo de redes",
    id: "ID (no se muestra)" // si quieres excluir "id", usa Omit como antes
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['colores', userId],
    queryFn: () => getColores(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!data || isLoading) return;

    setColoresStore({
      id: data.id,
      textoColor: data.color_texto,
      textoTituloColor: data.color_titulo,
      navegacionColor: data.fondo_navegacion,
      presentacionColor: data.fondo_presentacion,
      proyectosColor: data.fondo_proyectos,
      redesColor: data.fondo_redes,
    });
  }, [data]);

  const { isPending, mutate } = useMutation({
    mutationFn: updateColores,
    onError: (error: any) => {
      setErrorUpdate(error.message || "Error desconocido al actualizar colores");
    },
  });

  const handleSubmit = () => {
    mutate(coloresStore);
  };

  return (
    <>
      <h3 className="font-bold text-2xl py-2">Colores:</h3>
      <div className="flex flex-col gap-2">
        {(Object.entries(labels) as [keyof typeof coloresStore, string][]).map(([key, label]) => {
          if (key === "id") return null;

          return (
            <div className="flex items-center justify-between" key={key}>
              <label htmlFor={`color-${key}`} className="mr-2">
                {label}
              </label>
              <input
                type="color"
                id={`color-${key}`}
                value={coloresStore[key]}
                onChange={(e) =>
                  setColoresStore({ ...coloresStore, [key]: e.target.value })
                }
              />
            </div>
          );
        })}
      </div>
      { isLoading && <p>Cargando colores...</p>}
      { error && <p className="text-red-500">Error al cargar los colores: {error.message}</p>}
      { errorUpdate && <p className="text-red-500">Error al actualizar los colores: {errorUpdate}</p>}
      <div className="mt-4 flex flex-col gap-2">
        <ButtonMainBlack black={false} onClick={handleSubmit}>
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </ButtonMainBlack>
      </div>
    </>
  );
}
