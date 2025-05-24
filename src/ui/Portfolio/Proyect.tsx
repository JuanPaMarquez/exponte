import AutoCompleteInput from "@/components/AutoCompleteInput";
import { useDataProyectStore } from "@/lib/store/DataStore";
import { DataProyect } from "@/schemas/schemas";
import { techIcons } from "@/utils/techIcons";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


export default function Proyect({ 
  proyecto, 
  showElement, 
  index 
}:{ 
  proyecto: DataProyect, 
  showElement: boolean, 
  index: number 
}) {
  const { dataProyectStore, setDataProyectStore } = useDataProyectStore();

  return (
    <div className={`relative border rounded-2xl border-gray-800 flex flex-col p-2 ${showElement ? "" : "hidden"}`}>
      <h3 className="text-md text-center font-bold p-1">Proyecto {proyecto.id + 1}</h3>
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].imagen = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`imagen-${index}`}
        name="imagen"
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Link de la foto de proyecto" 
      />
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].titulo = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`titulo-${index}`}
        name="titulo"
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Titulo de proyecto" 
      />
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].descripcion = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`descripcion-${index}`}
        name="descripcion"
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Descripcion del proyecto" 
      />
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].linkGithub = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`linkGithub-${index}`}
        name="linkGithub"
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Link del Github" 
      />
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].linkDemo = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`linkDemo-${index}`}
        name="linkDemo"
        type="text"
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Link de la Demo" 
      />
      <div className="flex gap-2 py-2 flex-wrap">
        {
          proyecto.tecnologias.map((tecnologia, indexTecnologia) => (
            <AutoCompleteInput
              key={tecnologia.id}
              indexProyecto={index}
              index={indexTecnologia}
              tecnologia={tecnologia.nombre}
              data={techIcons}
            />

          ))
        }
        <button 
          className="cursor-pointer flex justify-center items-center"
          onClick={() => {
            const newProyectos = [...dataProyectStore];
            newProyectos[index].tecnologias = [...newProyectos[index].tecnologias, {id: uuidv4(), nombre: ""}];
            setDataProyectStore(newProyectos);
          }}
        >
          <IoIosAddCircleOutline className="size-8" />
        </button>
        <button 
          className="cursor-pointer flex justify-center items-center"
          onClick={() => {
            const newProyectos = [...dataProyectStore];
            if (newProyectos[index].tecnologias.length > 1) {
              newProyectos[index].tecnologias = newProyectos[index].tecnologias.slice(0, -1);
            }
            setDataProyectStore(newProyectos);
          }}
        >
          <MdDelete className="size-8" />
        </button>
        <button id="delete-project"
          className="absolute top-2 right-2 cursor-pointer flex justify-center items-center"
          onClick={() => {
            const newProyectos = [...dataProyectStore];
            if (dataProyectStore.length === 1) {
              setDataProyectStore(newProyectos);
              return;
            }
            newProyectos.splice(index, 1);
            setDataProyectStore(newProyectos);
          }}
        >
          <FaDeleteLeft className="size-6" />
        </button>
      </div>
    </div>
  )
}