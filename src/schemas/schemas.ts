export interface DataPresentacion {
  foto: string;
  nombre: string;
  titulos: string;
}
export interface Tecnologia {
  id: string;
  nombre: string;
}

export interface DataProyect {
  id: string;
  imagen: string;
  titulo: string;
  descripcion: string;
  tecnologias: Tecnologia[];
  linkGithub: string;
  linkDemo: string;
}

export type RedSocial = "linkedin" | "github" | "twitter" | "instagram" | "facebook" | "youtube";
export type RedesState = Record<RedSocial, { activo: boolean; usuario: string }>;