import { ButtonMain } from "@/components/Buttons"
import { precios } from "@/mocks/precios"

export default function Precios() {
  return (
    <div className="bg-[var(--color-foreground)] text-[var(--color-background)] flex justify-center py-30 min-[1000px]:items-center min-[1000px]:h-screen">
      <div id="precios" className="flex flex-col min-[1000px]:justify-center min-[1000px]:flex-row gap-6">
        {
          precios.map((precio) => (
            <div key={precio.id} className="flex-1 flex max-w-120 flex-col justify-between items-center gap-6 py-10 border-2 rounded-3xl hover:scale-105 transition-all duration-200 ease-in-out">
              <h1 className="text-4xl font-mono font-bold text-center">
                {precio.title}
              </h1>
              <ul className=" text-justify px-10">
                {precio.description.map((desc, index) => (
                  <li key={index} className="list-disc">
                    {desc}
                  </li>
                ))  
                }
              </ul>
              <ButtonMain black={false}>{precio.precio}</ButtonMain>
            </div>
          ))
        }
      </div>
    </div>
  )
}