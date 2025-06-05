// components/AutoCompleteInput.tsx
import { useDataProyectStore } from '@/lib/store/DataStore';
import { useState } from 'react';

const AutoCompleteInput = ({ data, tecnologia, indexProyecto, index }: { 
  data: { id: string; nombre_tecnologia: string }[], 
  tecnologia: { id: number; nombre_tecnologia: string }, 
  indexProyecto: number, 
  index: number 
}) => {
  const [inputValue, setInputValue] = useState(tecnologia.nombre_tecnologia);
  const [suggestions, setSuggestions] = useState<{ id: string; nombre_tecnologia: string }[]>([]);
  const { dataProyectStore, setDataProyectStore } = useDataProyectStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Actualizar el valor en el estado global
    const newData = [...dataProyectStore];
    newData[indexProyecto].tecnologias[index].nombre_tecnologia = value;
    setDataProyectStore(newData);

    // Filtrar sugerencias
    if (value === "") {
      setSuggestions([]);
    } else {
      const filtered = data.filter((item) =>
        item.nombre_tecnologia.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion: { nombre_tecnologia: string }) => {
    setInputValue(suggestion.nombre_tecnologia);
    setSuggestions([]);

    const newData = [...dataProyectStore];
    newData[indexProyecto].tecnologias[index] = {
      ...newData[indexProyecto].tecnologias[index], // Mantiene el resto de propiedades
      nombre_tecnologia: suggestion.nombre_tecnologia
    }; // Aquí actualizas toda la tecnología
    setDataProyectStore(newData);
  };


  return (
    <div style={{ position: 'relative', width: '120px' }}>
      <input
        id={`tecnologia-${indexProyecto}`}
        name={`tecnologia-${indexProyecto}`}
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        placeholder="Tecnologia..."
      />
      {suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          listStyle: 'none',
          margin: 0,
          padding: '0',
          width: '100%'
        }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.nombre_tecnologia}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
