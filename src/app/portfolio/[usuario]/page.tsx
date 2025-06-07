"use client";
import { getDataPresentacion, getDataProyects, getDataRedes } from "@/lib/dataActions";
import { useColoresStore, useDataProyectStore, usePresentacionStore, useRedesStore } from "@/lib/store/DataStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { redesIcon } from "@/utils/redIcons";
import PageProyect from "@/ui/Usuario/PageProyect";
import { DataProyect, RedSocial } from "@/schemas/schemas";
import Tecnologias from "@/ui/Usuario/Tecnologias";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioId } from "@/lib/api/usuarioAPI";
import { getPresentacion } from "@/lib/api/presentacionAPI";
import { getColores } from "@/lib/api/coloresAPI";
import { getProyectos } from "@/lib/api/proyectoAPI";
import { getRedesSociales } from "@/lib/api/redesAPI";
import { UserLoadError, UserLoading, UserNotFound } from "@/ui/Fallback/FallbackPage";

export default function PortafolioUsuarioPage() {
  const { coloresStore, setColoresStore } = useColoresStore();
  const { dataPresentacionStore, setDataPresentacionStore } = usePresentacionStore();
  const { dataProyectStore, setDataProyectStore } = useDataProyectStore();
  const { redesStore, setRedesStore } = useRedesStore();
  const [proyectOpen, setProyectOpen] = useState(false);
  const [currentProyect, setCurrentProyect] = useState<DataProyect>();
  const pathname = usePathname().split("/")[2];

  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: ['usuarioId', pathname],
    queryFn: () => getUsuarioId(pathname),
    refetchOnWindowFocus: false,
  });

  const coloresQuery = useQuery({
    queryKey: ['colores', data?.id],
    queryFn: () => getColores(data?.id),
    enabled: isSuccess && !!data?.id,
    refetchOnWindowFocus: false,
  });

  const presentacionQuery = useQuery({
    queryKey: ['presentacion', data?.id],
    queryFn: () => getPresentacion(data?.id),
    enabled: isSuccess && !!data?.id,
    refetchOnWindowFocus: false,
  });

  const proyectosQuery = useQuery({
    queryKey: ['proyectos', data?.id],
    queryFn: () => getProyectos(data?.id),
    enabled: isSuccess && !!data?.id,
    refetchOnWindowFocus: false,
  });

  const redesQuery = useQuery({
    queryKey: ['redes', data?.id],
    queryFn: () => getRedesSociales(data?.id),
    enabled: isSuccess && !!data?.id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (coloresQuery.isSuccess) {
      console.log("Colores:", coloresQuery.data);
      setColoresStore({
        id: coloresQuery.data.id,
        textoColor: coloresQuery.data.color_texto,
        textoTituloColor: coloresQuery.data.color_titulo,
        navegacionColor: coloresQuery.data.fondo_navegacion,
        presentacionColor: coloresQuery.data.fondo_presentacion,
        proyectosColor: coloresQuery.data.fondo_proyectos,
        redesColor: coloresQuery.data.fondo_redes,
      });
    }
  }, [coloresQuery.isSuccess, coloresQuery.data, setColoresStore]);

  useEffect(() => {
    if (presentacionQuery.isSuccess) {
      setDataPresentacionStore(presentacionQuery.data);
    }
  }, [presentacionQuery.isSuccess, presentacionQuery.data, setDataPresentacionStore]);

  useEffect(() => {
    if (proyectosQuery.isSuccess) {
      setDataProyectStore(proyectosQuery.data);
    }
  }, [proyectosQuery.isSuccess, proyectosQuery.data, setDataProyectStore]);

  useEffect(() => {
    if (redesQuery.isSuccess) {
      const newRedes = [];
      for (const red of redesQuery.data) {
        const newRed = {
          id: red.id,
          social: red.social.toLowerCase() as RedSocial,
          activo: red.activo === "0" ? false : true,
          usuario: red.usuario || "", 
        }
        newRedes.push(newRed);
      }
      setRedesStore(newRedes);
    }
  }, [redesQuery.isSuccess, redesQuery.data, setRedesStore]);

  const handleShowProyect = (proyecto: DataProyect) => {
    setCurrentProyect(proyecto);
    setProyectOpen(true);
  }

  if (isLoading) {
    return <UserLoading />;
  }

  if (!isSuccess || !data) {
    return <UserNotFound />;
  }

  if (error) {
    return <UserLoadError errorMessage={error} />;
  }
  return (
    <main
      id="page-initial" 
      className="bg-[var(--color-foreground)] text-[var(--color-background)]"
    >
      <nav 
        style={{ backgroundColor: coloresStore.navegacionColor }}
        className="flex flex-col md:flex-row items-center justify-between px-6 py-5 fixed top-0 left-0 w-full z-10 gap-2"
      >
        <h1 style={{ color: coloresStore.textoColor }} className="text-3xl font-bold">Portafolio</h1>
        <div
          style={{ color: coloresStore.textoColor }} 
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
        style={{ backgroundColor: coloresStore.presentacionColor }}
      >
        <img className="rounded-[40%] size-70 my-4" src={dataPresentacionStore.foto || "/fallback-image.webp"} alt="" />
        <h1 
          style={{ color: coloresStore.textoTituloColor }} 
          className="text-5xl font-bold text-center">Hola, soy {dataPresentacionStore.nombre}</h1>
        <p style={{ color: coloresStore.textoColor }} className="text-3xl">{dataPresentacionStore.titulos}</p>
      </section>
      <section
        id="projects"
      >
        <div 
          style={{ backgroundColor: coloresStore.presentacionColor }} 
          className="h-25 md:h-18"></div>
        <h1 
          style={{ 
            color: coloresStore.textoColor, 
            backgroundColor: coloresStore.navegacionColor 
          }} 
          className="text-3xl text-center font-bold p-4"
        >
          Proyectos
        </h1>
        <div
          style={{ backgroundColor: coloresStore.proyectosColor }} 
          className="py-5 max-w-[1900px] mx-auto"
        >
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(385px,386px))] max-[400px]:grid-cols-[auto] gap-4 place-content-center">
            {dataProyectStore.map((proyecto) => (
              <div key={proyecto.id} className="flex flex-col justify-center border-2 rounded-[20px] overflow-hidden hover:scale-102 transition-all duration-100 ease-in-out">
                <div className="relative">
                  <img 
                    id={`imagen-${proyecto.id}`} 
                    onClick={()=> handleShowProyect(proyecto)} 
                    className="w-100 h-80 object-cover rounded-t-[20px] cursor-pointer" 
                    src={proyecto.imagen || "/fallback-image.webp"} 
                    alt="" 
                  />
                  <div className="flex flex-col justify-center absolute bg-[#24232381] overflow-hidden backdrop-blur-sm w-full bottom-0">
                    <h3 
                      style={{ color: coloresStore.textoColor }} 
                      className="text-2xl font-bold text-center pt-2"
                    >
                      {proyecto.titulo}
                    </h3>
                    <Tecnologias proyecto={proyecto} />
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <a href={proyecto.linkGithub} target="_blank" rel="noopener noreferrer" className="flex justify-center w-full">
                    <button className="py-1 text-white bg-[#0d2a3f] w-full font-bold text-lg cursor-pointer">
                      Github
                    </button>
                  </a>
                  {
                    proyecto.linkDemo === "" ? null : (
                      <a href={proyecto.linkDemo} target="_blank" rel="noopener noreferrer" className="flex justify-center w-full">
                        <button className="py-1 bg-[#35a6fd] w-full font-bold text-lg cursor-pointer">
                          Ver Proyecto
                        </button>
                      </a>
                    )
                  }
                </div>
              </div>
            ))}
          </div>
          { proyectOpen && (
            <PageProyect setProyectOpen={setProyectOpen} proyecto={currentProyect} />
          )}
        </div>
      </section>
      <section id="contacts" className="bg-[#0d2a3f] text-white flex flex-col items-center text-center py-10">
        <div className="contenido">
          <h1 className="text-4xl font-bold p-5">CONTACTAME:</h1>
          <p className="text-2xl">Desarrollador apasionado con un fuerte compromiso con la adquisición de conocimientos.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap py-10">
            {
              redesStore
                .filter(red => red.activo)
                .map((red) => (
                  <a 
                    key={red.id} 
                    href={red.usuario} 
                    id="profile-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-2xl hover:bg-blue-600 p-2 rounded-2xl"
                  >
                    {redesIcon[red.social as keyof typeof redesIcon]}
                    {red.social.toUpperCase()}
                  </a>
                ))
            }
          </div>
        </div>
      </section>
    </main>
  );
}
