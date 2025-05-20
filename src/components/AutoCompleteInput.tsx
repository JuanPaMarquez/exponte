// components/AutoCompleteInput.tsx
import { DataProyect } from '@/schemas/schemas';
import { useState } from 'react';

const AutoCompleteInput = ({ data, setValue, tecnologia, indexProyecto, index }: { 
  data: { id: string; nombre: string }[], 
  setValue: React.Dispatch<React.SetStateAction<DataProyect[]>>, 
  tecnologia: string, 
  indexProyecto: number, 
  index: number 
}) => {
  const [inputValue, setInputValue] = useState(tecnologia);
  const [suggestions, setSuggestions] = useState<{ id: string; nombre: string }[]>([]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Actualizar el valor en el estado global
    setValue((prev) => {
      const newData = [...prev];
      newData[indexProyecto].tecnologias[index].nombre = value;
      return newData;
    });

    // Filtrar sugerencias
    if (value === "") {
      setSuggestions([]);
    } else {
      const filtered = data.filter((item) =>
        item.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion: { id: string; nombre: string }) => {
    setInputValue(suggestion.nombre);
    setSuggestions([]);

    setValue((prev) => {
      const newData = [...prev];
      newData[indexProyecto].tecnologias[index] = suggestion; // Aquí actualizas toda la tecnología
      return newData;
    });
  };


  return (
    <div style={{ position: 'relative', width: '120px' }}>
      <input
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
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
