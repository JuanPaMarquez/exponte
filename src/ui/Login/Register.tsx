import { ButtonLogin } from "@/components/Buttons"
import { InputRegister } from "@/components/Inputs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/usuarioAPI";
import AlertSuccess from "@/components/Notification";

export default function Register() {

  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setPassword] = useState('')
  const [inputPasswordRepat, setInputPasswordRepat] = useState('')
  const [isEqualPasswords, setIsEqualPasswords] = useState(false)
  const [Alert, setAlert] = useState(false)
  const [nameUser, setNameUser] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const { 
    mutate,
    isPending, 
    isError, 
    error
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setNameUser(data.nombre_usuario);
      setAlert(true);
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEqualPasswords) {
      mutate({ nombre_usuario: inputName, email: inputEmail, password: inputPassword });
    }
  }

  const handleSuccess = () => {
    window.location.reload(); 
  }

  useEffect(() => {
    if (inputPassword && inputPasswordRepat) {
      setIsEqualPasswords(inputPassword === inputPasswordRepat);
    } else {
      setIsEqualPasswords(false);
    }

  }, [inputPassword, inputPasswordRepat])

  return (
    <div>
      { Alert && (
        <AlertSuccess message={`Usuario (${nameUser}) registrado con éxito!`} onAccept={handleSuccess} />
      )}
      <h1 className="text-2xl font-bold text-center m-4">Crea tu cuenta!</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2">
          <InputRegister 
            inputElement={inputName} 
            setInputElement={setInputName} 
            type="text" 
            placeholder="Nombre de usuario" 
          />
          <InputRegister 
            inputElement={inputEmail} 
            setInputElement={setInputEmail} 
            type="email" 
            placeholder="Correo" 
          />
          <InputRegister 
            inputElement={inputPassword} 
            setInputElement={setPassword} 
            type={`${showPassword ? "text": "password"}`} 
            placeholder="Contraseña" 
          />
          <InputRegister 
            inputElement={inputPasswordRepat} 
            setInputElement={setInputPasswordRepat} 
            type={`${showPassword ? "text": "password"}`} 
            placeholder="Repite la contraseña" 
          />
          <button 
            type='button'
            className='flex gap-2 cursor-pointer items-center hover:underline' 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar": "Mostrar"} contraseña 
            {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
          </button>
          {inputPasswordRepat && !isEqualPasswords && (
            <p className="text-red-500">Las contraseñas no coinciden</p>
          )}
          { isError && <p className="text-red-500">{(error as Error).message}</p> }
          <ButtonLogin type="submit" disabled={isPending} >{isPending ? 'Registrando...' : 'Registrarse'}</ButtonLogin>
        </div>
      </form>
    </div>
  )
}