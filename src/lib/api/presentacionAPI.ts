import { DataPresentacion } from "@/schemas/schemas";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getPresentacion = async (user_id: number) => {
  const res = await fetch(`${API}/perfil/${user_id}`); // ajusta a tu endpoint real
  if (!res.ok) throw new Error('Error al obtener los datos');
  return res.json();
};

export const updatePresentacion = async (data: DataPresentacion) => {
  const res = await fetch(`${API}/perfil/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: data.nombre,
      foto: data.foto,
      titulos: data.titulos,
    }),
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
};
