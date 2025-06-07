import AutoCompleteInput from "@/components/AutoCompleteInput";
import { ButtonMainBlack } from "@/components/Buttons";
import LoadingSpin from "@/components/Loading";
import { deleteProyecto, updateProyecto } from "@/lib/api/proyectoAPI";
import { addTecnologia, deleteTecnologia } from "@/lib/api/tecnologiaAPI";
import { useDataProyectStore } from "@/lib/store/DataStore";
import { DataProyect } from "@/schemas/schemas";
import { techIcons } from "@/utils/techIcons";
import { useMutation } from "@tanstack/react-query";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

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

  const { mutate: mutateUpdate, error, isPending } = useMutation({
    mutationFn: updateProyecto,
    onSuccess: (data) => {
      console.log("Proyecto actualizado con éxito");
      const newProyectos = [...dataProyectStore];
      newProyectos[index] = data.proyectos[0];
      setDataProyectStore(newProyectos);
    }
  });

  const handleUpdateProject = () => {
    console.log("proyecto", proyecto);
    mutateUpdate(proyecto);
  }

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteProyecto,
    onSuccess: () => {
      console.log("Proyecto eliminado con éxito");
      const newProyectos = [...dataProyectStore];
      newProyectos.splice(index, 1);
      setDataProyectStore(newProyectos);
    }
  });

  const handleDeleteProject = () => {
    if (dataProyectStore.length === 1) {
      return;
    }
    mutateDelete(proyecto.id);
  }

  const { mutate: mutateAddTech, isPending: isAddingTech } = useMutation({
    mutationFn: addTecnologia,
    onSuccess: (data) => {
      console.log("Tecnología añadida con éxito");
      const newProyectos = [...dataProyectStore];
      newProyectos[index].tecnologias.push({
        id: data.id,
        nombre_tecnologia: data.nombre_tecnologia
      });
      setDataProyectStore(newProyectos);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleAddTechnology = () => {
    // console.log(proyecto.id)
    mutateAddTech(proyecto.id);
  }

  const { mutate: mutateEliminar } = useMutation({
    mutationFn: deleteTecnologia,
    onSuccess: () => {
      const newProyectos = [...dataProyectStore];
      newProyectos[index].tecnologias.pop();
      setDataProyectStore(newProyectos);
    }
  });

  const handleDeleteTechnology = () => {
    if (proyecto.tecnologias.length === 1) {
      return;
    }
    // Eliminar la última tecnología del proyecto
    const id = proyecto.tecnologias[proyecto.tecnologias.length - 1].id;
    mutateEliminar(id);
  }

  return (
    <div className={`relative border rounded-2xl border-gray-800 flex flex-col p-2 ${showElement ? "" : "hidden"}`}>
      <h3 className="text-md text-center font-bold p-1">Proyecto {index + 1}</h3>
      <input 
        onChange={(e) => {
          const newProyectos = [...dataProyectStore];
          newProyectos[index].imagen = e.target.value;
          setDataProyectStore(newProyectos);
        }} 
        id={`imagen-${index}`}
        name="imagen"
        type="text" 
        value={proyecto.imagen}
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
        value={proyecto.titulo}
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
        value={proyecto.descripcion}
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
        value={proyecto.linkGithub}
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
        value={proyecto.linkDemo}
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
              tecnologia={tecnologia}
              data={techIcons}
            />

          ))
        }
        <button 
          className="cursor-pointer flex justify-center items-center"
          onClick={handleAddTechnology}
        >

          {isAddingTech ? (<LoadingSpin />) : (<IoIosAddCircleOutline className="size-8" />)}
        </button>
        <button 
          className={`cursor-pointer flex justify-center items-center ${proyecto.tecnologias.length === 1 ? "disabled:cursor-not-allowed" : ""}`}
          disabled={proyecto.tecnologias.length === 1}
          onClick={handleDeleteTechnology}
        >
          <MdDelete className="size-8" />
        </button>
        <button id="delete-project"
          className="absolute top-2 right-2 cursor-pointer flex justify-center items-center"
          disabled={dataProyectStore.length === 1}
          onClick={handleDeleteProject}
        >
          <FaDeleteLeft className="size-6" />
        </button>
      </div>
      { error && (
        <p className="text-red-500">Error al actualizar el proyecto: {error.message}</p>
      )}
      <div className="flex justify-end items-center gap-2">
        <ButtonMainBlack 
          black={false}
          onClick={handleUpdateProject}
          disabled={isPending}
        >
          {isPending ? "Actualizando Proyecto..." : "Actualizar Proyecto"}
        </ButtonMainBlack>
      </div>
    </div>
  )
}