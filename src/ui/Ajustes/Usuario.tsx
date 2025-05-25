import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Usuario() {
  const [showPassword, setShowPassword] = useState(false)
  

  return (
    <>
      <h3 className="font-bold text-2xl py-2">Usuario:</h3>
      <form action="">
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="nombre" className="mr-2">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="nombre"
            className="border p-2 rounded-lg"
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="password" className="mr-2">
            Contraseña:
          </label>
          <input
            type={`${showPassword ? "text": "password"}`}
            id="password"
            className="border p-2 rounded-lg"
            placeholder="Contraseña"
          />
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="password" className="mr-2">
            Repetir Contraseña:
          </label>
          <input
            type={`${showPassword ? "text": "password"}`}
            id="password"
            className="border p-2 rounded-lg"
            placeholder="Repetir Contraseña"
          />
        </div>
        <button 
          type='button'
          className='flex gap-2 cursor-pointer items-center hover:underline mx-auto' 
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Ocultar": "Mostrar"} contraseña 
          {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
        </button>
      </form>
    </>
  )
}