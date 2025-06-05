
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'

export default function LoadingSpin() {
  return (
    <div className="flex items-center justify-center">
      <Ring2
        size="30"
        stroke="5"
        strokeLength="0.25"
        bgOpacity="0.1"
        speed="0.8"
        color="black" 
      />
    </div>
  );
}