import { Colores } from "@/schemas/schemas";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getColores = async (user_id: number) => {
  const res = await fetch(`${API}/colores/${user_id}`); // ajusta a tu endpoint real
  if (!res.ok) throw new Error('Error al obtener los datos');
  return res.json();
};

export const updateColores = async (colores: Colores) => {
  console.log(colores)
  const res = await fetch(`${API}/colores`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: colores.id,
      color_texto: colores.textoColor,
      color_titulo: colores.textoTituloColor,
      fondo_navegacion: colores.navegacionColor,
      fondo_presentacion: colores.presentacionColor,
      fondo_proyectos: colores.proyectosColor,
      fondo_redes: colores.redesColor,
    }),
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
};