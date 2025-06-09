/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ButtonLogin } from "@/components/Buttons";
import { InputLogin } from "@/components/Inputs";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/usuarioAPI";
import { useUserStore } from "@/lib/store/DataStore";
import AlertSuccess from "@/components/Notification";

export default function InicioSesion (){
  const router = useRouter()

  const [inputUser, setInputUser] = useState('')
  const [inputLock, setInputLock] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [Alert, setAlert] = useState(false)
  // const { user, setUser } = useUserStore()

  const { 
    mutate, 
    isPending, 
    isError, 
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.usuario);
      setAlert(true);
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email: inputUser, password: inputLock });
  }

  const handleSuccess = () => {
    setAlert(false);
    router.push("/dashboard");
  }

  return (
    <>
      <img className="size-30" src="/accountLogo.webp" alt="" />
      <h1 className="text-2xl font-bold text-center m-4">Inicio Sesion</h1>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <InputLogin 
            inputElement={inputUser}
            setInputElement={setInputUser}
            type="email"
            placeholder="Usuario"
            Icon={FiUser} 
          />
        </div>
        <div className="relative">
          <InputLogin 
            inputElement={inputLock}
            setInputElement={setInputLock}
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            Icon={FiLock} 
          />
          {inputLock !== '' && ( 
          <button 
            type='button'
            className='absolute top-3 right-3 cursor-pointer' 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
          </button>)}
        </div>
        {isError && <p className="text-red-500">{(error as Error).message}</p>}
        <ButtonLogin 
          type="submit" 
          disabled={isPending}
        >
           {isPending ? 'Ingresando...' : 'Ingresar'}
        </ButtonLogin>
      </form>
      { Alert && (
        <AlertSuccess message={`Inicio de Sesion Exitoso!`} onAccept={handleSuccess} />
      )}
    </>
  )
}