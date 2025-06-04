import { DataProyect } from "@/schemas/schemas";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getProyectos = async (user_id: number) => {
  const res = await fetch(`${API}/proyecto/${user_id}`); // ajusta a tu endpoint real
  if (!res.ok) throw new Error('Error al obtener los datos');
  return res.json();
};

export const setProyectoEmpty = async (user_id: number) => {
  const res = await fetch(`${API}/proyecto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
    [
      {
        titulo: "",
        descripcion: "",
        imagen: "",
        linkGithub: "",
        linkDemo: "",
        tecnologias: [{ nombre_tecnologia: ""}],
        usuario_id: user_id
      },
    ]
    ),
  });
  if (!res.ok) throw new Error('Error al crear el proyecto');
  return res.json();
}

export const deleteProyecto = async (proyectoId: number) => {
  const res = await fetch(`${API}/proyecto/${proyectoId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el proyecto');
  return res.json();
}