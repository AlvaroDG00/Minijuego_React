import React from 'react';

function BarraHP({ hpActual, hpMax }) {
  // Creamos un array basado en el HP máximo (3 en este caso)
  const orbes = Array.from({ length: hpMax }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark bg-opacity-75 rounded-pill p-2 border border-primary border-2">
      <span className="fw-bold text-primary me-2" style={{ textShadow: '1px 1px black' }}>HP:</span>
      {orbes.map((orbe) => (
        <span 
          key={orbe} 
          className={`badge rounded-circle mx-1 border border-2 ${orbe <= hpActual ? 'bg-primary border-info' : 'bg-secondary border-dark bg-opacity-25'}`}
          style={{ width: '20px', height: '20px', display: 'inline-block' }}
        >
          {/* Orbe vacío si está perdido, lleno si lo tiene */}
        </span>
      ))}
    </div>
  );
}
export default BarraHP;