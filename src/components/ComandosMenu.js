import React from 'react';

function ComandosMenu({ fase, onPelear, onResolver, onReiniciar }) {
  return (
    // Barra inferior fija, oscura con borde superior azul
    <div className="fixed-bottom bg-black border-top border-4 border-primary p-3">
      <div className="container d-flex justify-content-center gap-3">
        
        {(fase === 'inicio' || fase === 'resolucion') && (
          // Botón estilo "Atacar" (Azul KH)
          <button className="btn btn-primary btn-lg fw-bold border-3 px-5 py-3 rounded-pill shadow" onClick={onPelear}>
            COMANDO: LUCHAR
          </button>
        )}

        {fase === 'pelea' && (
          // Botón estilo "Magia/Especial" (Dorado KH)
          <button className="btn btn-warning btn-lg fw-bold border-3 px-5 py-3 rounded-pill shadow text-dark" onClick={onResolver}>
            COMANDO: RESOLVER
          </button>
        )}

        {fase === 'fin' && (
          // Botón de reinicio
          <button className="btn btn-light btn-lg fw-bold border-3 px-5 py-3 rounded-pill shadow text-primary" onClick={onReiniciar}>
            NUEVA PARTIDA
          </button>
        )}
      </div>
    </div>
  );
}
export default ComandosMenu;