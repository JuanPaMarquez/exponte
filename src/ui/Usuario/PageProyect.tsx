import { DataProyect } from "@/schemas/schemas";
import { useEffect } from "react";
import Tecnologias from "./Tecnologias";

export default function PageProyect({ 
  proyecto,
  setProyectOpen
}:{ 
  proyecto: DataProyect | undefined,
  setProyectOpen: (open: boolean) => void; 
}) {
  useEffect(() => {
    console.log(proyecto);
    const imgContent = document.getElementById("imgContent");
    const imagen = document.getElementById(`imagen-${proyecto?.id}`);
    if (imagen && imgContent && !imgContent.querySelector(`#clon-${proyecto?.id}`)) {
      const clon = imagen.cloneNode(true) as HTMLImageElement;
      clon.className = "flex-1 w-78 h-88 max-[358px]:h-58 max-[358px]:w-48 object-cover rounded-t-md"
      clon.id = `clon-${proyecto?.id}`
      imgContent.appendChild(clon);
    }
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "auto"
      const imagenClonada = document.getElementById(`clon-${proyecto?.id}`);
      if (imagenClonada) {
        imagenClonada.remove();
      }
    }
  }, []);
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-100">
      <div className="bg-white p-6  max-w-[90%] max-h-[90vh] overflow-auto rounded-lg shadow-lg">
        <div id="cabezero" className="flex justify-between mb-3">
          <h1 className="text-2xl font-bold">{proyecto?.titulo}</h1>
          <button className="cursor-pointer" onClick={() => setProyectOpen(false)}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
        </div>
        <div id="content" className="flex justify-between gap-4 max-[684px]:flex-col max-[684px]:items-center">
          <div id="textContent" className="flex-1 flex flex-col justify-between max-w-[500px] overflow-hidden">
            <div>
              <h5 className="text-lg font-bold text-center italic">Descripcion:</h5>
              <p>{proyecto?.descripcion}</p>
            </div>
            <div>
              <h5 className="text-lg font-bold py-2 text-center italic">Tecnologias:</h5>
              <Tecnologias proyecto={proyecto} />
            </div>
            <div className="flex items-center gap-2 p-1 mt-2 justify-center">
              <a href={proyecto?.linkGithub} target="_blank" rel="noopener noreferrer" className="flex justify-center w-full">
                <button className="py-1 text-white bg-[#0d2a3f] w-full font-bold text-lg cursor-pointer">
                  Github
                </button>
              </a>
              {
                proyecto?.linkDemo === "" ? null : (
                  <a href={proyecto?.linkDemo} target="_blank" rel="noopener noreferrer" className="flex justify-center w-full">
                    <button className="py-1 bg-[#35a6fd] w-full font-bold text-lg cursor-pointer">
                      Ver Proyecto
                    </button>
                  </a>
                )
              }
            </div>
          </div>
          <div id="imgContent" className="flex-1 flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}