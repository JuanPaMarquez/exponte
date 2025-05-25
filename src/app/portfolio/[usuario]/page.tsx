"use client";
import { getDataPresentacion } from "@/lib/dataActions";
import { useColoresStore, usePresentacionStore } from "@/lib/store/DataStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PortafolioUsuarioPage() {
  const { coloresStore } = useColoresStore();
  const { dataPresentacionStore, setDataPresentacionStore } = usePresentacionStore();
  const pathname = usePathname().split("/")[2];
  
  useEffect(() => {
    getDataPresentacion().then((data) => {
      setDataPresentacionStore(data);
    });
  }, [pathname]);
  return (
    <main
      id="page-initial" 
      className="bg-[var(--color-foreground)] text-[var(--color-background)]"
    >
      <nav 
        style={{ backgroundColor: coloresStore.navegacionColor.color }}
        className="flex items-center justify-between px-5 p-2 h-17 absolute top-0 left-0 w-full z-10"
      >
        <h1 style={{ color: coloresStore.textoColor.color }} className="text-3xl font-bold">Portfolio</h1>
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
        className="flex flex-col items-center justify-center h-screen gap-2"
        style={{ backgroundColor: coloresStore.presentacionColor.color }}
      >
        <img className="rounded-[40%]  size-70 my-4" src={dataPresentacionStore.foto} alt="" />
        <h1 
          style={{ color: coloresStore.textoTituloColor.color }} 
          className="text-5xl font-bold">Hola, soy {dataPresentacionStore.nombre}</h1>
        <p style={{ color: coloresStore.textoColor.color }} className="text-3xl">{dataPresentacionStore.titulos}</p>
      </section>
    </main>
  );
}
