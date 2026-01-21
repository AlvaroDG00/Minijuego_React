import React from 'react';
import BarraHP from './BarraHP';

function FichaPersonaje({ nombre, imagen, stats, hp, maxHp, esActivo }) {
  // Clase para resaltar al personaje que gana la ronda (efecto dorado)
  const brilloGanador = esActivo ? 'shadow-lg border-warning' : 'border-primary';

  return (
    <div className={`card bg-dark text-white border border-4 ${brilloGanador} h-100`} style={{boxShadow: esActivo ? '0 0 20px gold' : 'none'}}>
      {/* Cabecera azul estilo KH */}
      <div className="card-header bg-primary bg-gradient fw-bold text-uppercase text-center border-bottom border-primary py-3">
        <h4 className="m-0" style={{ textShadow: '2px 2px 4px black' }}>{nombre}</h4>
      </div>

      <div className="card-body p-0">
        {/* Zona de HP e Imagen con fondo degradado oscuro */}
        <div className="bg-secondary bg-gradient bg-opacity-50 p-3 text-center">
          <BarraHP hpActual={hp} hpMax={maxHp} />
          <div className="mt-3 border border-4 border-primary rounded-circle overflow-hidden bg-black d-inline-block" style={{width: '180px', height: '180px'}}>
             <img 
             src={imagen} 
             alt={nombre} 
             className="img-fluid" 
             style={{
              maxHeight: '100%',
              maxWidth: '100%', 
              display: 'block',
              margin: 'auto'
              }} />
          </div>
        </div>

        {/* Lista de Stats estilo menú */}
        <ul className="list-group list-group-flush fw-bold">
          <li className="list-group-item bg-dark text-white d-flex justify-content-between border-top border-primary px-4 py-3">
            <span className="text-primary">FUE (Fuerza)</span>
            <span className="badge bg-primary fs-6">{stats.fue}</span>
          </li>
          <li className="list-group-item bg-dark text-white d-flex justify-content-between border-primary px-4 py-3">
            <span className="text-info">MAG (Magia)</span>
            <span className="badge bg-info text-dark fs-6">{stats.mag}</span>
          </li>
          <li className="list-group-item bg-dark text-white d-flex justify-content-between border-primary px-4 py-3">
            <span className="text-secondary">DEF (Defensa)</span>
            <span className="badge bg-secondary fs-6">{stats.def}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default FichaPersonaje;