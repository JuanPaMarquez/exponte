
import { createPortal } from 'react-dom';
// componente de mensaje de notificacion con un aceptar
export default function AlertSuccess({ message, onAccept }: { message: string; onAccept: () => void }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs z-50">
      <div className="bg-white text-black font-bold p-6 rounded shadow-lg text-center flex flex-col items-center gap-5">
        <p>{message}</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600' onClick={onAccept}>Aceptar</button>
      </div>
    </div>,
    document.body
  );
}

// componente de mensaje de notificacion con un aceptar y cancelar
export function AlertConfirm({ message, onAccept, onCancel }: { message: string; onAccept: () => void; onCancel: () => void }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs z-50">
      <div className="bg-white text-black font-bold p-6 rounded shadow-lg text-center flex flex-col items-center gap-5">
        <p>{message}</p>
        <div className="flex gap-4">
          <button 
            className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600' 
            onClick={onAccept}
          >
            Aceptar
          </button>
          <button 
            className='bg-gray-300 text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-400' 
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
