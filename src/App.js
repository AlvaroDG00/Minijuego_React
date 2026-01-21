import React, { useState } from 'react';
// IMPORTANTE: Solo Bootstrap. No importamos App.css
import 'bootstrap/dist/css/bootstrap.min.css';

import FichaPersonaje from './components/FichaPersonaje';
import TableroBatalla from './components/TableroBatalla';
import ComandosMenu from './components/ComandosMenu';
import rikuImg from './images/Riku.webp';
import soraImg from './images/Sora.webp';



function App() {
  // Configuración inicial de HP Máximo
  const MAX_HP = 3;

  // --- ESTADO: JUGADORES (Estats KH: FUE, MAG, DEF) ---
  const [jugador1, setJugador1] = useState({
    nombre: 'Sora',
    img: soraImg, 
    hp: MAX_HP,
    stats: { fue: 80, mag: 60, def: 50 }
  });

  const [jugador2, setJugador2] = useState({
    nombre: 'Riku',
    img: rikuImg,
    hp: MAX_HP,
    stats: { fue: 70, mag: 50, def: 70 }
  });

  // --- ESTADO DEL JUEGO ---
  const [fase, setFase] = useState('inicio'); // inicio, pelea, resolucion, fin
  const [atributoActual, setAtributoActual] = useState('');
  const [resultados, setResultados] = useState({ j1: 0, j2: 0 });
  // Mensaje superior estilo notificación
  const [mensajeSistema, setMensajeSistema] = useState('Selecciona un comando para iniciar.');
  // Estado para saber quién ganó la última ronda (para efectos visuales)
  const [ganadorRonda, setGanadorRonda] = useState(null); // 'j1', 'j2' o null

  // 1. Elegir estadística al azar (FUE, MAG, DEF)
  const manejarPelea = () => {
    const atributosKH = ['fue', 'mag', 'def'];
    const elegido = atributosKH[Math.floor(Math.random() * atributosKH.length)];
    setAtributoActual(elegido);
    setFase('pelea');
    setMensajeSistema(`¡Destino fijado! Se luchará por: ${elegido.toUpperCase()}`);
    setGanadorRonda(null); // Reseteamos brillo
  };

  // 2. Resolver combate (Dado 1-100 + Stat)
  const manejarResolucion = () => {
    const dado1 = Math.floor(Math.random() * 100) + 1;
    const dado2 = Math.floor(Math.random() * 100) + 1;

    const totalJ1 = dado1 + jugador1.stats[atributoActual];
    const totalJ2 = dado2 + jugador2.stats[atributoActual];

    setResultados({ j1: totalJ1, j2: totalJ2 });

    if (totalJ1 > totalJ2) {
      // Gana J1
      const nuevoHP = jugador2.hp - 1;
      setJugador2({ ...jugador2, hp: nuevoHP });
      setMensajeSistema(`¡${jugador1.nombre} supera a ${jugador2.nombre}! Riku pierde 1 HP.`);
      setGanadorRonda('j1');
      checkGameOver(jugador1.hp, nuevoHP);
    } else if (totalJ2 > totalJ1) {
      // Gana J2
      const nuevoHP = jugador1.hp - 1;
      setJugador1({ ...jugador1, hp: nuevoHP });
      setMensajeSistema(`¡${jugador2.nombre} supera a ${jugador1.nombre}! Sora pierde 1 HP.`);
      setGanadorRonda('j2');
      checkGameOver(nuevoHP, jugador2.hp);
    } else {
      setMensajeSistema("¡Choque de fuerzas igualado! Nadie pierde HP.");
      setGanadorRonda(null);
      setFase('resolucion');
    }
  };

  const checkGameOver = (hpJ1, hpJ2) => {
    if (hpJ1 === 0 || hpJ2 === 0) {
      setFase('fin');
      setMensajeSistema(hpJ1 === 0 ? `¡La oscuridad consume a Sora! RIKU GANA.` : `¡La luz prevalece! SORA GANA.`);
    } else {
      setFase('resolucion');
    }
  };

  const reiniciarJuego = () => {
    setJugador1({ ...jugador1, hp: MAX_HP });
    setJugador2({ ...jugador2, hp: MAX_HP });
    setFase('inicio');
    setMensajeSistema("El destino se reinicia. Elijan sus comandos.");
    setGanadorRonda(null);
  };

  return (
    // Fondo principal oscuro estilo "Mundo de la Oscuridad" usando gradiente de Bootstrap
    <div className="min-vh-100 bg-dark bg-gradient text-white d-flex flex-column">
      
      {/* Barra superior de mensajes */}
      <div className="bg-primary bg-opacity-75 text-center py-2 border-bottom border-3 border-warning shadow fw-bold text-uppercase" style={{letterSpacing: '2px'}}>
          {mensajeSistema} 
      </div>

      <div className="container flex-grow-1 d-flex align-items-center pb-5 mb-5">
        <div className="row w-100 align-items-stretch g-4 py-4">
          
          {/* Jugador 1 (Izquierda) */}
          <div className="col-lg-4">
            <FichaPersonaje 
              {...jugador1} 
              maxHp={MAX_HP}
              imagen={soraImg}
              esActivo={ganadorRonda === 'j1'}
            />
          </div>

          {/* Zona Central */}
          <div className="col-lg-4 d-flex align-items-center justify-content-center">
            <TableroBatalla 
              fase={fase} 
              atributo={atributoActual} 
              resultados={resultados} 
            />
          </div>

          {/* Jugador 2 (Derecha) */}
          <div className="col-lg-4">
            <FichaPersonaje 
              {...jugador2} 
              maxHp={MAX_HP}
              imagen={rikuImg}
              esActivo={ganadorRonda === 'j2'}
            />
          </div>
        </div>
      </div>

      {/* Botonera inferior */}
      <ComandosMenu 
        fase={fase} 
        onPelear={manejarPelea} 
        onResolver={manejarResolucion} 
        onReiniciar={reiniciarJuego}
      />
    </div>
  );
}

export default App;