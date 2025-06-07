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

export async function getUsuario(userId: number) {
  const res = await fetch(`${API}/usuario/${userId}`);
  if (!res.ok) throw new Error('Error al obtener el usuario');
  return res.json();
}

export async function updateUserName({ userId, nombre_usuario }: { userId: number; nombre_usuario: string }) {
  const res = await fetch(`${API}/usuario/nombre/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre_usuario }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar el nombre de usuario');
  }
  return res.json();
}

export async function updateUserPassword({ userId, password }: { userId: number; password: string }) {
  const res = await fetch(`${API}/usuario/password/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar la contraseña');
  }
  return res.json();
}