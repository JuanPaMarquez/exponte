import { ButtonMainBlack } from "@/components/Buttons";
import AlertSuccess from "@/components/Notification";
import { getUsuario, updateUserName, updateUserPassword } from "@/lib/api/usuarioAPI";
import { useUserStore } from "@/lib/store/DataStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Usuario() {
  const [Alert, setAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputPassword, setPassword] = useState('')
  const [inputPasswordRepat, setInputPasswordRepat] = useState('')
  const [isEqualPasswords, setIsEqualPasswords] = useState(false)
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const userId = user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["usuario", userId],
    queryFn: () => getUsuario(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data !== undefined && !isLoading) {
      setUser({
        id: data[0].id,
        nombre_usuario: data[0].nombre_usuario,
        email: data[0].email,
      });
      setNombreUsuario(data[0].nombre_usuario);
    }
  }, [data, isLoading]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      console.log("Usuario actualizado con éxito");
    },
  });

  const handleUpdateUserName = () => {
    if (!userId || !nombreUsuario) return;
    console.log("first: ", userId, nombreUsuario);
    mutate({ userId, nombre_usuario: nombreUsuario });
  };

  useEffect(() => {
    if (inputPassword && inputPasswordRepat) {
      setIsEqualPasswords(inputPassword === inputPasswordRepat);
    } else {
      setIsEqualPasswords(false);
    }

  }, [inputPassword, inputPasswordRepat])

  // Handle password change
  const { mutate: mutateChangePassword, isPending: isPendingPassword, error: errorPassword } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      console.log("Contraseña cambiada con éxito");
      setPassword('');
      setInputPasswordRepat('');
      setAlert(true);
    },
  });

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEqualPasswords && userId) {
      console.log("Cambiar contraseña para el usuario:", userId);
      mutateChangePassword({ userId, password: inputPassword });
    }
  };

  return (
    <>
      <h3 className="font-bold text-2xl py-2">Usuario:</h3>
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="nombre" className="mr-2">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="nombre-usuario"
            value={nombreUsuario || ""}
            disabled={isLoading}
            onChange={(e) => {
              setNombreUsuario(e.target.value);
              setUser({
                id: user?.id || 0,
                email: user?.email || "",
                nombre_usuario: e.target.value,
              });
            }}
            className="border p-2 rounded-lg"
            placeholder="Nombre de usuario"
          />
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="my-4 flex flex-col gap-2">
            <ButtonMainBlack black={false} onClick={handleUpdateUserName}>
              {isPending ? "Actualizando...": "Actualizar Nombre de Usuario"}
            </ButtonMainBlack>
          </div>
        </div>
        <form onSubmit={handleChangePassword}>
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="password" className="mr-2">
              Contraseña:
            </label>
            <input
              type={`${showPassword ? "text": "password"}`}
              value={inputPassword}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border p-2 rounded-lg"
              placeholder="Contraseña"
              minLength={8} // Assuming you want a minimum length
              maxLength={20} // Assuming you want a maximum length
              required
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="password" className="mr-2">
              Repetir Contraseña:
            </label>
            <input
              type={`${showPassword ? "text": "password"}`}
              id="password-repeat"
              value={inputPasswordRepat}
              onChange={(e) => setInputPasswordRepat(e.target.value)}
              className="border p-2 rounded-lg"
              placeholder="Repetir Contraseña"
              minLength={8} // Assuming you want a minimum length
              maxLength={20} // Assuming you want a maximum length
              required
            />
            {inputPasswordRepat && !isEqualPasswords && (
              <p className="text-red-500">Las contraseñas no coinciden</p>
            )}
          </div>
          <button 
            type='button'
            className='flex gap-2 cursor-pointer items-center hover:underline mx-auto' 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar": "Mostrar"} contraseña 
            {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
          </button>
          {errorPassword && <p className="text-red-500">{errorPassword.message}</p>}
          <div className="my-4 flex flex-col gap-2">
            <ButtonMainBlack black={false} type="submit">
              { isPendingPassword ? "Cambiando..." : "Cambiar Contraseña" }
            </ButtonMainBlack>
          </div>
        </form>
        { Alert && (
          <AlertSuccess message={"Contraseña cambiada con éxito!"} onAccept={() => setAlert(false)} />
        )}
    </>
  )
}