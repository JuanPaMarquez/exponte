import AutoCompleteInput from "@/components/AutoCompleteInput";
import { DataProyect } from "@/schemas/schemas";
import { techIcons } from "@/utils/techIcons";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


export default function Proyect({ proyecto, setDataProyectos, showElement, index }: { proyecto: DataProyect, setDataProyectos: React.Dispatch<React.SetStateAction<DataProyect[]>>, showElement: boolean, index: number }) {

  return (
    <div className={`relative border rounded-2xl border-gray-800 flex flex-col p-2 ${showElement ? "" : "hidden"}`}>
      <h3 className="text-md text-center font-bold p-1">Proyecto {proyecto.id + 1}</h3>
      <input 
        onChange={(e) => setDataProyectos((prev) => {
          const newProyectos = [...prev];
          newProyectos[index].imagen = e.target.value;
          return newProyectos;
        })} 
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Link de la foto de proyecto" 
      />
      <input 
        onChange={(e) => setDataProyectos((prev) => {
          const newProyectos = [...prev];
          newProyectos[index].titulo = e.target.value;
          return newProyectos;
        })} 
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Titulo de proyecto" 
      />
      <input 
        onChange={(e) => setDataProyectos((prev) => {
          const newProyectos = [...prev];
          newProyectos[index].descripcion = e.target.value;
          return newProyectos;
        })} 
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Descripcion del proyecto" 
      />
      <input 
        onChange={(e) => setDataProyectos((prev) => {
          const newProyectos = [...prev];
          newProyectos[index].linkGithub = e.target.value;
          return newProyectos;
        })} 
        type="text" 
        className={`border p-1 border-gray-400 ${showElement ? "" : "hidden"}`} 
        placeholder="Link del Github" 
      />
      <input 
        onChange={(e) => setDataProyectos((prev) => {
          const newProyectos = [...prev];
          newProyectos[index].linkDemo = e.target.value;
          return newProyectos;
        })} 
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
              setValue={setDataProyectos}
            />

          ))
        }
        <button 
          className="cursor-pointer flex justify-center items-center"
          onClick={() => {
            setDataProyectos((prev) => {
              const newProyectos = [...prev];
              newProyectos[index].tecnologias = [...newProyectos[index].tecnologias, {id: uuidv4(), nombre: ""}];
              return newProyectos;
            });
          }}
        >
          <IoIosAddCircleOutline className="size-8" />
        </button>
        <button 
          className="cursor-pointer flex justify-center items-center"
          onClick={() => {
            setDataProyectos((prev) => {
              const newProyectos = [...prev];
              if (newProyectos[index].tecnologias.length > 1) {
                newProyectos[index].tecnologias = newProyectos[index].tecnologias.slice(0, -1);
              }
              return newProyectos;
            });
          }}
        >
          <MdDelete className="size-8" />
        </button>
        <button id="delete-project"
          className="absolute top-2 right-2 cursor-pointer flex justify-center items-center"
          onClick={() => {
            setDataProyectos((prev) => {
              if (prev.length === 1) {
                return [{
                  id: 0,
                  titulo: "",
                  descripcion: "",
                  tecnologias: [{id: "0", nombre: ""}],
                  linkGithub: "",
                  linkDemo: "",
                  imagen: "",
                }];
              }
              const newProyectos = [...prev];
              newProyectos.splice(index, 1);
              return newProyectos;
            });
          }}
        >
          <FaDeleteLeft className="size-6" />
        </button>
      </div>
    </div>
  )
}