import { DataProyect } from "@/schemas/schemas";
import { tech } from "@/utils/techIcons";

export default function Tecnologias({
  proyecto,
}: {
  proyecto: DataProyect | undefined;
}) {
  return (
    <div id="tecnologias" className="flex flex-wrap justify-center gap-2 p-2">
      {proyecto?.tecnologias.map((tecnologia) => (
        <div key={tecnologia.id}>
          {
            tech[tecnologia.nombre_tecnologia.toLowerCase()] 
              ? ( tech[tecnologia.nombre_tecnologia.toLowerCase()] ) 
              : tech["secure"]
            }
        </div>
      ))}
    </div>
  )
}