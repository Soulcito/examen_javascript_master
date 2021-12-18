'use strict'

const imgJugador = document.getElementById('img-jugador');
const imgIa = document.getElementById('img-ia');
const tbPuntaje = document.getElementById('puntaje');
const message = document.getElementById('message');
let lista = '';
const ronda = { id: 0, puntaje: 0 };
let puntuacion = [];

const juego = [
  { id: 0, url_user: './assets/piedra_user.png', url_ia: './assets/piedra_ia.png'},
  { id: 1, url_user: './assets/mano_user.png'  , url_ia: './assets/mano_ia.png'},
  { id: 2, url_user: './assets/tijera_user.png', url_ia: './assets/tijera_ia.png'}    
]


const juega = async(id) => {   
   const { id: id_user, url_user } = juego.filter( el => el.id === id )[0];
   imgJugador.setAttribute('src',url_user);
   return {id_user};
}

const ia = async() => {
  const random = Math.floor(Math.random() * 3);
  const { id, url_ia } = juego.filter( el => el.id === random )[0];
  imgIa.setAttribute('src',url_ia);
  return {id_ia: id};
}

const myAlert = (ronda,ganador, puntaje) => {
  message.style.padding = '15px';
  message.innerText = `Ronda: ${ronda} - Ganador: ${ganador} - Puntaje: ${puntaje}`
};

const myRonda = (winner) => {
  ronda.puntaje = ronda.puntaje + winner;
  ronda.id ++;
  if (ronda.id === 10) {
    puntuacion.unshift(ronda.puntaje);
    (puntuacion.length > 5) && puntuacion.pop();
    localStorage.removeItem('puntuacion');
    localStorage.setItem('puntuacion',puntuacion);
    lista = puntuacion.reduce( (acum, el) => acum += `<tr>${el}</tr>`,'');
    tbPuntaje.innerHTML = lista;
  };

}

const whoWinner =  (user, ia) => {

   if ( ronda.id >= 10 ) {
     ronda.id = 0;
     ronda.puntaje = 0;
   }

   if ( (user === 0 && ia === 0) || (user === 1 && ia === 1) || (user === 2 && ia === 2)) {
     myRonda(0);
     myAlert(ronda.id, 'EMPATE', ronda.puntaje);
   }

   if ( (user === 0 && ia === 1) || ( user === 1 && ia === 2 ) || ( user === 2 && ia === 0 )) {
    myRonda(-30);
    myAlert(ronda.id, 'IA', ronda.puntaje);
  }   

  if ( (user === 0 && ia === 2) || ( user === 1 && ia === 0 ) || ( user === 2 && ia === 1 )) {
    myRonda(100);
    myAlert(ronda.id, 'JUGADOR', ronda.puntaje);
  }     
  
}

const game = async (id) => {  
    const { id_user } = await juega(id);
    const { id_ia } =  await ia();  
    whoWinner(id_user, id_ia);
}

window.addEventListener('DOMContentLoaded', () => {
  tbPuntaje.innerHTML = localStorage.getItem('puntuacion')
                                    .split(',')
                                    .reduce((acum, el) => acum += `<tr>${el}</tr>`,'');
  puntuacion = localStorage.getItem('puntuacion').split(',');
});