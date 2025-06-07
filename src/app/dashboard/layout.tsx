"use client"

import { useEffect, useState } from "react";
import { ButtonMainBlack } from "@/components/Buttons";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useUserStore } from "@/lib/store/DataStore";
import { redirect } from "next/navigation";
import { AlertConfirm } from "@/components/Notification";

export default function DashboardLayout({ children }:{ children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Alert, setAlert] = useState(false);
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const hasHydrated = useUserStore((state) => state.hasHydrated)

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      redirect("/login");
    }
    
  }, [user, hasHydrated]);

  const handleLeaveSession = () => {
    setAlert(false);
    console.log("Cerrar sesión");
    setUser(null);
    redirect("/login");
  }

  return (
    <main className="flex flex-col bg-[var(--color-foreground)] text-[var(--color-background)] min-h-screen relative">
      { /* Header */ }
      <nav className="bg-[var(--color-background)] text-[var(--color-foreground)] p-1 px-2 flex justify-between items-center gap-3 sticky top-0 w-full z-20">
        <Link href={"/"} className="titulo hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          EXPONTE
        </Link>
        <h1 className="text-2xl font-bold hidden min-[424px]:block">Dashboard</h1>
        <ButtonMainBlack
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </ButtonMainBlack>
        { /* Menu desplegable */ }
        <AnimatePresence>
        {menuOpen &&
          <motion.div key="modal" id="buttonNav"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col w-50 bg-gray-300 text-black absolute right-0 top-[62px] z-10"
          >
            <Link className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" href={"/dashboard/portfolio"} prefetch={true}>Portafolio</Link>
            <Link className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" href={"/dashboard/ajustes"} prefetch={true}>Ajustes</Link>
            <button className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" onClick={() => setAlert(true)}>Cerrar sesion</button>
          </motion.div>
        }
        </AnimatePresence>
      </nav>
      
      { /* Contenido principal */ }
      <div className="h-full my-auto">
        {children}
      </div>

      { Alert && (
        <AlertConfirm message={"¿Quieres cerrar sesión?"} onAccept={handleLeaveSession} onCancel={() => setAlert(false)} />
      )}
    </main>
  )
}