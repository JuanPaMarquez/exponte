"use client"

import { useState } from "react";
import { ButtonMain, ButtonMainBlack } from "@/components/Buttons";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

export default function DashboardLayout({ children }:{ children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="flex flex-col bg-[var(--color-foreground)] text-[var(--color-background)] h-screen relative">
      { /* Header */ }
      <nav className="bg-[var(--color-background)] text-[var(--color-foreground)] p-1 px-2 flex justify-between items-center gap-3">
        <Link href={"/"} className="titulo hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          EXPONTE
        </Link>
        <h1 className="text-2xl font-bold hidden min-[424px]:block">Dashboard</h1>
        <ButtonMainBlack
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </ButtonMainBlack>
      </nav>
      { /* Menu desplegable */ }
        <AnimatePresence>
        {menuOpen &&
          <motion.div key="modal" id="buttonNav"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col w-50 bg-gray-300 absolute right-0 top-[62px]"
          >
            <Link className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" href={"/dashboard/portfolio"}>Portafolio</Link>
            <Link className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" href={"/dashboard/ajustes"}>Ajustes</Link>
            <Link className="p-3 text-center font-bold border-t-2 cursor-pointer border-gray-400 hover:bg-gray-400" href={""}>Cerrar sesion</Link>
          </motion.div>
        }
        </AnimatePresence>
      { /* Contenido principal */ }
      <div className="h-full">
        {children}
      </div>
    </main>
  )
}