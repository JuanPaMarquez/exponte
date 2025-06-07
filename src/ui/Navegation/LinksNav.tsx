import { ButtonMain, ButtonNav } from "@/components/Buttons";
import { useUserStore } from "@/lib/store/DataStore";

export default function LinksNav() {
  const user = useUserStore(state => state.user);

  return (
    <>
      <ButtonNav>Inicio</ButtonNav>        
      <ButtonNav href="/precios">Precios</ButtonNav>
      {user ? (
        <ButtonMain href="/dashboard/portfolio">{user.nombre_usuario}</ButtonMain>
      ) : (
        <ButtonMain href="/login">Entrar</ButtonMain>
      )}
    </>
  )
}