import { RedesState } from "@/schemas/schemas";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getRedesSociales = async (user_id: number) => {
  const res = await fetch(`${API}/redes-sociales/${user_id}`);
  if (!res.ok) {
    throw new Error('Error al obtener las redes');
  }
  return res.json();
};

export const setRedesSociales = async (redes: RedesState) => {
  const res = await fetch(`${API}/redes-sociales`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(redes),
  });
  if (!res.ok) {
    throw new Error('Error al actualizar las redes');
  }
  return res.json();
}