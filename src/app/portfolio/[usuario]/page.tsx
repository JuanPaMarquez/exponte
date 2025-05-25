"use client";
import { getDataPresentacion, getDataProyects, getDataRedes } from "@/lib/dataActions";
import { useColoresStore, useDataProyectStore, usePresentacionStore, useRedesStore } from "@/lib/store/DataStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { redesIcon } from "@/utils/redIcons";

export default function PortafolioUsuarioPage() {
  const { coloresStore } = useColoresStore();
  const { dataPresentacionStore, setDataPresentacionStore } = usePresentacionStore();
  const { dataProyectStore, setDataProyectStore } = useDataProyectStore();
  const { redesStore, setRedesStore } = useRedesStore();
  const pathname = usePathname().split("/")[2];
  
  useEffect(() => {
    getDataPresentacion().then((data) => {
      setDataPresentacionStore(data);
    });
    getDataProyects().then((data) => {
      setDataProyectStore(data);
    });
    getDataRedes().then((data) => {
      setRedesStore(data);
    });
  }, [pathname]);
  return (
    <main
      id="page-initial" 
      className="bg-[var(--color-foreground)] text-[var(--color-background)]"
    >
      <nav 
        style={{ backgroundColor: coloresStore.navegacionColor.color }}
        className="flex flex-col md:flex-row items-center justify-between px-3 py-5 fixed top-0 left-0 w-full z-10 gap-2"
      >
        <h1 style={{ color: coloresStore.textoColor.color }} className="text-3xl font-bold">Portafolio</h1>
        <div
          style={{ color: coloresStore.textoColor.color }} 
          className="flex gap-10 text-lg"
        >
          <a href="#welcome">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contacts">CONTACTS</a>
        </div>
      </nav>
      <section 
        id="welcome" 
        className="flex flex-col items-center justify-center h-screen gap-2 pt-20 md:pt-0"
        style={{ backgroundColor: coloresStore.presentacionColor.color }}
      >
        <img className="rounded-[40%] size-70 my-4" src={dataPresentacionStore.foto || "/fallback-image.webp"} alt="" />
        <h1 
          style={{ color: coloresStore.textoTituloColor.color }} 
          className="text-5xl font-bold text-center">Hola, soy {dataPresentacionStore.nombre}</h1>
        <p style={{ color: coloresStore.textoColor.color }} className="text-3xl">{dataPresentacionStore.titulos}</p>
      </section>
      <section
        id="projects"
      >
        <div 
          style={{ backgroundColor: coloresStore.presentacionColor.color }} 
          className="h-25 md:h-18"></div>
        <h1 
          style={{ 
            color: coloresStore.textoColor.color, 
            backgroundColor: coloresStore.navegacionColor.color 
          }} 
          className="text-3xl text-center font-bold p-4"
        >
          Proyectos
        </h1>
        <div
          style={{ backgroundColor: coloresStore.proyectosColor.color }} 
          className="py-5 max-w-[1900px] mx-auto"
        >
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(385px,386px))] max-[400px]:grid-cols-[auto] gap-4 place-content-center">
            {dataProyectStore.map((proyecto) => (
              <div key={proyecto.id} className="flex flex-col justify-center border-2 rounded-[20px]">
                <div id="img-container" className="relative">
                  <img className="w-100 h-80 object-cover rounded-t-[20px]" src={proyecto.imagen || "/fallback-image.webp"} alt="" />
                  <div className="flex justify-center absolute bg-[#24232381] overflow-hidden backdrop-blur-sm w-full bottom-0">
                    <h1 
                      style={{ color: coloresStore.textoColor.color }} 
                      className="text-2xl font-bold">{proyecto.titulo}
                    </h1>
                  </div>
                </div>
                <a href={proyecto.linkGithub} target="_blank" rel="noopener noreferrer">
                  <button  
                    className="px-4 py-2 rounded-lg text-white"
                  >
                    Ver Proyecto
                  </button>
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>
      <section id="contacts" className="bg-[#0d2a3f] text-white flex flex-col items-center text-center py-10">
      <div className="contenido">
        <h1 className="text-4xl font-bold p-5">CONTACTAME:</h1>
        <p className="text-2xl">Desarrollador apasionado con un fuerte compromiso con la adquisición de conocimientos.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap py-10">
          {
            Object.entries(redesStore)
              .filter(([, red]) => red.activo)
              .map(([key, red]) => (
                <a 
                  key={key} 
                  href={red.usuario} 
                  id="profile-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-2xl hover:bg-blue-600 p-2 rounded-2xl"
                >
                  {redesIcon[key as keyof typeof redesIcon]}
                  {key.toUpperCase()}
                </a>
              ))
          }
        </div>
      </div>
    </section>
    </main>
  );
}
