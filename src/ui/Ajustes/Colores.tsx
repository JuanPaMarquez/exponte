"use client";

import { useColoresStore } from "@/lib/store/DataStore";

export default function Colores() {
  const { coloresStore, setColoresStore } = useColoresStore();
  
  return (
    <>
      <h3 className="font-bold text-2xl py-2">Colores:</h3>
      <div className="flex flex-col gap-2">
        {Object.entries(coloresStore).map(([key, value]) => (
          <div className="flex items-center justify-between" key={key}>
            <label htmlFor={`color-${key}`} className="mr-2">
              { value.label }
            </label>
            <input
              type="color"
              id={`color-${key}`}
              value={value.color}
              onChange={(e) => {
                setColoresStore({ 
                  ...coloresStore, 
                  [key]: { ...value, color: e.target.value } 
                })
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}