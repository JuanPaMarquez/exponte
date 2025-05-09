import { ButtonNav } from "@/components/Buttons"

export default function Navegation() {
  return (
    <nav className="flex justify-between px-5 p-2 absolute top-0 left-0 w-full bg-transparent ]">
      <div id="logo">
        <button className="titulo hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          EXPONTE
        </button>
      </div>

      <div id="navegation" className="flex gap-5">
        <ButtonNav>Inicio</ButtonNav>
        <ButtonNav>Precios</ButtonNav>
        <ButtonNav>Contacto</ButtonNav>
        <ButtonNav>Acceder</ButtonNav>
      </div>
      

    </nav>
  )
}