"use client";

import { ButtonMainBlack } from "@/components/Buttons";
import { Presentacion, Proyectos, Redes } from "@/ui/Portfolio/Elements";
import { useState } from "react";
import { useDataProyectStore, usePresentacionStore, useRedesStore } from "@/lib/store/DataStore";

export default function PortfolioPage() {
  const { dataProyectStore } = useDataProyectStore();
  const { dataPresentacionStore } = usePresentacionStore();
  const { redesStore } = useRedesStore();

  const [hasProject, setHasProject] = useState(false);

  const handleSubmit = () => {
    console.log(dataPresentacionStore);
    console.log(dataProyectStore);
    console.log(redesStore);
  }


  return (
    <div className="flex flex-col items-center h-full gap-2">
      { !hasProject && 
        <div id="page-initial" className="flex flex-col items-center justify-center h-full gap-2">
          <h1 className="text-2xl font-bold">Portafolio</h1>
          <p className="text-lg text-center">Bienvenido a la página de portafolio. No has creado ningún proyecto todavía. </p>
          <p className="text-lg font-bold">¿Quieres crear uno?</p>
          <ButtonMainBlack black={false} onClick={() => setHasProject(true)}>
            Crear proyecto
          </ButtonMainBlack>
        </div>
      }

      {
        hasProject && (
          <div id="page-content" className="flex flex-col items-center h-full gap-2 pt-2 max-w-[800px] w-full">
            <h1 className="text-2xl font-bold">Mi Portafolio</h1>
            <p className="text-lg">Aquí puedes ver todos los elementos de un portafolio:</p>

            <Presentacion />
            <Proyectos />
            <Redes />

            <button onClick={handleSubmit}>Guardar Cambios</button>
          </div>
        )
      }


    </div>
  )
}