
const API = process.env.NEXT_PUBLIC_API_URL;

export const addTecnologia = async (proyecto_id: number) => {
  const res = await fetch(`${API}/tecnologias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        proyecto_id, 
        nombre_tecnologia: ""
      }
    ),
  });
  if (!res.ok) throw new Error('Error al crear la tecnologia');
  return res.json();
}

export const deleteTecnologia = async (id: number) => {
  const res = await fetch(`${API}/tecnologias/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar una tecnologia')
  return res.json();
}