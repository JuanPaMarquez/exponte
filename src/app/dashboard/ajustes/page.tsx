"use client"
import Colores from "@/ui/Ajustes/Colores"
import Usuario from "@/ui/Ajustes/Usuario"

export default function AjustesPage() {

  return (
    <div className="flex flex-col items-center h-full mb-4">
      <h1 className="text-3xl font-bold p-3">Ajustes</h1>
      <div className="border max-w-[500px] w-full p-4 rounded-lg mb-4">
        <Colores />
      </div>
      <div className="border max-w-[500px] w-full p-4 rounded-lg">
        <Usuario />
      </div>
    </div>
  )
}