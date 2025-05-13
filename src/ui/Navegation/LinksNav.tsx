import { ButtonMain, ButtonNav } from "@/components/Buttons";

export default function LinksNav() {
  return (
    <>
      <ButtonNav>Inicio</ButtonNav>        
      <ButtonNav href="/precios">Precios</ButtonNav>
      <ButtonMain>Entrar</ButtonMain>
    </>
  )
}