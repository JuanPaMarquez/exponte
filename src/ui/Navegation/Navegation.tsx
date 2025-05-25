"use client"
import { ButtonMain } from "@/components/Buttons"
import LinksNav from "./LinksNav"
import { useMemo, useState, /* useRef */ } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Navegation() {
  const pathname = usePathname().split("/")[1];
  const isDashboard = useMemo(() => pathname === "dashboard" || pathname === "portfolio", [pathname]);
  const [navOpen, setNavOpen] = useState(false);
  // const renders = useRef(0);

  // renders.current++;
  // console.log("Render count: ", renders.current);

  function handleNav() {
    setNavOpen(!navOpen);
  }
  return (
    <nav className={`flex justify-between px-5 p-2 h-17 sticky top-0 left-0 w-full bg-[var(--color-background)] z-10 ${isDashboard ? "hidden": ""}`}>
      <div id="logo">
        <button className="titulo hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          EXPONTE
        </button>
      </div>

      <div id="navegation" className="flex gap-5 max-[600]:hidden">   
        <LinksNav />
      </div>
      <div className="hidden max-[600]:flex gap-5"
        onClick={handleNav}
      >
        <ButtonMain black={true} size="text-2xl">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </ButtonMain>
      </div>

      <AnimatePresence>
        {navOpen &&
          <motion.div key="modal" id="buttonNav"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}  
            onClick={handleNav}
            className="p-5 px-10 bg-[var(--color-background)] flex flex-col gap-2 absolute z-10 top-16 left-0 right-0 min-[600]:hidden"
          >
            <LinksNav />
          </motion.div>
        }
      </AnimatePresence>

    </nav>
  )
}