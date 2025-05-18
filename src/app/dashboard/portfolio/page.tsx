"use client";

import { ButtonMainBlack } from "@/components/Buttons";
import { useState } from "react";

export default function PortfolioPage() {
  const [hasProject, setHasProject] = useState(false);
  const [project, setProject] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem("proyect") === null) {
  //     setProject([]);
  //   } else {
  //     const projects = JSON.parse(localStorage.getItem("proyect") || "[]");
  //     setProject(projects);
  //   }
  // }, [])


  return (
    <div className="flex flex-col items-center h-full gap-2">
      { !hasProject && 
        <div id="page-initial" className="flex flex-col items-center justify-center h-full gap-2">
          <h1 className="text-2xl font-bold">Portafolio</h1>
          <p className="text-lg">Bienvenido a la página de portafolio. No has creado ningún proyecto todavía. </p>
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

            <section id="presentacion" className="flex flex-col bg-gray-200 w-full gap-1 p-3 border rounded-2xl relative">
              <h3 className="text-lg font-bold p-2">Seccion de Presentacion</h3>
              <input type="text" className="border p-1" placeholder="Link de foto de perfil" />
              <input type="text" className="border p-1" placeholder="Nombre de presentacion" />
              <input type="text" className="border p-1" placeholder="Titulo(s) personal(es)" />
              <button className="absolute right-2 top-2 border p-2 rounded-full flex justify-center items-center font-bold text-2xl w-10 hover:bg-red-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
              </button>
            </section>

          </div>
        )
      }

    </div>
  )
}