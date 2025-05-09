import Navegation from "@/ui/Navegation/Navegation";

export default function Home() {
  return (
    <div>
      <div id="main-page" className="h-screen flex justify-center items-center px-10">
        <h1 className="text-4xl font-mono font-bold text-center">
          Haz visible tu talento, <span className="titulo">EXPONTE</span> al mundo profesional.
        </h1>
        <img className="size-120" src="/logo.png" alt="" />
      </div>
    </div>    
  );
}
