export interface DataPresentacion {
  id: number;
  foto: string;
  nombre: string;
  titulos: string;
}
export interface Tecnologia {
  id: number;
  nombre_tecnologia: string;
}

export interface DataProyect {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  tecnologias: Tecnologia[];
  linkGithub: string;
  linkDemo: string;
}

export type RedSocial = "linkedin" | "github" | "gmail" | "instagram" | "facebook" | "youtube";
export type RedesState = { id: number; social: RedSocial; activo: boolean; usuario: string }[];