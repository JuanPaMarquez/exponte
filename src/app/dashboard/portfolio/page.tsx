"use client";

import { ButtonMainBlack } from "@/components/Buttons";
import { Presentacion, Proyectos, Redes } from "@/ui/Portfolio/Elements";
import { useState } from "react";
import { DataPresentacion, DataProyect, RedesState } from "@/schemas/schemas";
import { v4 as uuidv4 } from 'uuid';

export default function PortfolioPage() {

  const [hasProject, setHasProject] = useState(false);

  const [dataPresentacion, setDataPresentacion] = useState<DataPresentacion>({
    foto: "",
    nombre: "",
    titulos: "",
  });
  const [dataProyectos, setDataProyectos] = useState<DataProyect[]>([{
    id: uuidv4(),
    titulo: "",
    descripcion: "",
    tecnologias: [{id: uuidv4(), nombre: ""}],
    linkGithub: "",
    linkDemo: "",
    imagen: "",
  }]);

  const [redes, setRedes] = useState<RedesState>({
    linkedin: { activo: false, usuario: "" },
    github: { activo: false, usuario: "" },
    twitter: { activo: false, usuario: "" },
  });

  const handleSubmit = () => {
    console.log(dataPresentacion);
    console.log(dataProyectos);
    console.log(redes);
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

            <Presentacion setDataPresentacion={setDataPresentacion} />
            <Proyectos dataProyecto={dataProyectos} setDataProyectos={setDataProyectos} />
            <Redes setRedes={setRedes} redes={redes} />

            <button onClick={handleSubmit}>Guardar Cambios</button>
          </div>
        )
      }


    </div>
  )
}