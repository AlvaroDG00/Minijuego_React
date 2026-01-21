import React from 'react';

function TableroBatalla({ fase, atributo, resultados }) {
  // Diccionario para dar nombres más épicos a las stats
  const nombresAtributos = {
    fue: "PODER FÍSICO (FUE)",
    mag: "PODER MÁGICO (MAG)",
    def: "RESISTENCIA (DEF)"
  };

  return (
    <div className="text-center my-4 px-4">
      {/* Título VS grande y con sombra */}
      <h1 className="display-2 fw-bolder text-primary fst-italic" style={{ textShadow: '3px 3px 0px #000, -1px -1px 0px #fff' }}>
        VS
      </h1>

      {/* Caja de mensajes estilo cuadro de diálogo JRPG */}
      <div className="card bg-black border border-4 border-warning text-white p-4 rounded-3 shadow-lg mt-4">
        {fase === 'inicio' && <h3 className="fw-bold animate__animated animate__pulse animate__infinite">¡ALZAD LAS LLAVES ESPADA!</h3>}
        
        {fase === 'pelea' && (
          <div>
            <p className="mb-2 text-warning fw-bold fs-5">DUELO DE ESTADÍSTICA</p>
            <h2 className="text-uppercase text-white fw-bolder border-bottom border-warning pb-2 d-inline-block">
              {nombresAtributos[atributo]}
            </h2>
          </div>
        )}

        {fase === 'resolucion' && (
          <div>
             <p className="text-warning fw-bold mb-3 fs-5">RESULTADOS DEL DESTINO</p>
            <div className="row g-3">
              {/* Usamos alertas para los resultados numéricos */}
              <div className="col-6">
                 <div className="alert alert-primary fw-bold fs-4 p-2 border-3">
                    P1: {resultados.j1}
                 </div>
              </div>
              <div className="col-6">
                 <div className="alert alert-danger fw-bold fs-4 p-2 border-3">
                    P2: {resultados.j2}
                 </div>
              </div>
            </div>
          </div>
        )}
        
        {fase === 'fin' && <h2 className="text-warning fw-bolder">¡BATALLA FINALIZADA!</h2>}
      </div>
    </div>
  );
}
export default TableroBatalla;