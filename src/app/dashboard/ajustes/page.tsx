"use client"
import { ButtonMainBlack } from "@/components/Buttons"
import { useColoresStore } from "@/lib/store/DataStore"
import Colores from "@/ui/Ajustes/Colores"
import Usuario from "@/ui/Ajustes/Usuario"

export default function AjustesPage() {
  const { coloresStore } = useColoresStore()

  const handleColor = () => {
    console.log(coloresStore)
  }

  return (
    <div className="flex flex-col items-center h-full ">
      <h1 className="text-3xl font-bold p-3">Ajustes</h1>
      <div className="border max-w-[500px] w-full p-4 rounded-lg">
        <Colores />
      </div>
      <div className="my-4 flex flex-col gap-2">
        <ButtonMainBlack black={false} onClick={handleColor}>Guardar colores</ButtonMainBlack>
      </div>
      <div className="border max-w-[500px] w-full p-4 rounded-lg">
        <Usuario />
      </div>
      <div className="my-4 flex flex-col gap-2">
        <ButtonMainBlack black={false}>Guardar usuario</ButtonMainBlack>
      </div>
    </div>
  )
}