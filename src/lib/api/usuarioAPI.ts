// lib/api.ts
const API = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${API}/usuario/verificar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al iniciar sesión');
  }

  return res.json();
}

export async function registerUser({ nombre_usuario, email, password }: { nombre_usuario: string; email: string; password: string }) {
  const res = await fetch(`${API}/usuario/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre_usuario, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al registrar usuario');
  }

  return res.json();
}
