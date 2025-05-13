import { ButtonMain } from "@/components/Buttons";

export default function Home() {
  return (
    <main>
      <div id="main-page" className="lg:h-screen flex flex-col-reverse py-30 justify-center items-center md:flex-row px-2 lg:px-10">
        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="text-4xl font-mono font-bold text-center">
            Haz visible tu talento, <span className="titulo">EXPONTE</span> al mundo profesional.
          </h1>
          <ButtonMain size="text-3xl">Entrar</ButtonMain>
        </div>
        <img className="size-80 md:size-100 lg:size-120" src="/logo.png" alt="" />
      </div>
      <div className="bg-[var(--color-foreground)] text-[var(--color-background)]">
        <h1 className="text-4xl font-mono font-bold text-center py-10">
          Conoce a los mejores talentos de la región.
        </h1>
        <p className="sm:text-2xl text-justify px-10 pb-10">
          Diversos estudios recientes han resaltado la importancia de los portafolios digitales 
como herramienta para la empleabilidad. Los portafolios digitales permiten a los estudiantes 
documentar su progreso, reflejar habilidades transversales y demostrar competencias 
adquiridas durante su formación. Además, los portafolios fomentan la 
autonomía del estudiante y permiten una evaluación auténtica basada en evidencias reales del 
aprendizaje. En el ámbito de las carreras tecnológicas, donde los proyectos prácticos 
constituyen una parte esencial del proceso formativo, contar con un medio de presentación 
profesional se vuelve indispensable para resaltar el nivel de innovación y aplicabilidad de los 
desarrollos realizados por los estudiantes. 
        </p>
      </div>
      
    </main>    
  );
}
