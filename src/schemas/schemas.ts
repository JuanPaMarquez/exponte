
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
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  tecnologias: Tecnologia[];
  linkGithub: string;
  linkDemo: string;
}
