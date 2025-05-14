/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import InicioSesion from "@/ui/Login/InicioSesion";
import Register from "@/ui/Login/Register";
import { ButtonLogin } from "@/components/Buttons";

const WIDTH = "560px"

export default function Login() {

  const [register, setRegister] = useState(false)


  
  return (
    <div id="loginComponent" className={`max-w-200 h-120 max-[${WIDTH}]:max-w-80 w-full flex bg-[var(--color-foreground)] text-[var(--color-background)] rounded-lg overflow-hidden shadow-lg transition-all duration-300`}>
      <div 
        className={`flex-1 z-8 max-[${WIDTH}]:hidden transition-transform duration-300 
        ${register ? `min-[${WIDTH}]:translate-x-full` : `min-[${WIDTH}]:translate-x-0`}`}
      >
        <img className="w-full h-full object-cover" src={`/${register ? "imgRegister" : "imgLogin"}.webp`} alt="image login" />
      </div>
      <div 
        id="loginForm" 
        className={`flex-1 flex flex-col items-center justify-center gap-2 my-4 transition-transform duration-300 
        ${register ? `min-[${WIDTH}]:-translate-x-full` : `min-[${WIDTH}]:translate-x-0`}`}
      >
        {register ? <Register /> : <InicioSesion />}
        <ButtonLogin 
          black={false}
          onClick={() => setRegister(!register)}
        >
          {register ? "¿Ya tienes Cuenta?" : "¿No tienes Cuenta?"}
        </ButtonLogin>
      </div>
    </div>
  )
}