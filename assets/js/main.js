// Variables globales de javaScript
let baraja = [];
let puntosJugador01 = 0;
let puntosComputadora = 0;

const btnPedir = document.getElementById('btnPedir');
const btnPasar = document.getElementById('btnPasar');
const btnNuevoJuego = document.getElementById('btnNuevoJuego');

const puntosHTMLJugador01 = document.getElementById('puntosJugador01');
const puntosHTMLComputadora = document.getElementById('puntosComputadora');
const divCartasJugador01 = document.getElementById('jugador01-cartas');
const divCartasComputadora = document.getElementById('computadoras-cartas');

let primeraCartaJugador = true;
let primeraCartaComputadora = true;

let audioFeliz = document.getElementById("audioFeliz");
let audioTriste = document.getElementById("audioTriste");
let audioTenso = document.getElementById("audioTenso");


// Funciones

// La función devuelve un array con todas las cartas de una baraja de forma aleatoria
function crearBarajaAleatoria() 
{
    let cartas = ['01C','02C','03C','04C','05C','06C','07C','08C','09C','10C','10JC','10QC','10KC',
                  '01D','02D','03D','04D','05D','06D','07D','08D','09D','10D','10JD','10QD','10KD',
                  '01P','02P','03P','04P','05P','06P','07P','08P','09P','10P','10JP','10QP','10KP',
                  '01T','02T','03T','04T','05T','06T','07T','08T','09T','10T','10JT','10QT','10KT'];

    for (let i = cartas.length - 1; i >= 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }

    return cartas;
}

const pedirCarta = (baraja) => {

    for (let i = baraja.length -1; i >= 0; i--)
    {
        if (baraja[i] != null)
        {
            let carta = baraja[i];
            if (primeraCartaJugador)
            {
                document.getElementById('cartaJugador1').src = `assets/cartas/${carta}.png`;
                primeraCartaJugador = false;
            }else
            {
                divCartasJugador01.insertAdjacentHTML('beforeend',`<img class="carta" src=assets/cartas/${carta}.png alt="${carta}">`);
            }
            puntosJugador01 += valorCarta(carta);
            puntosHTMLJugador01.innerHTML = puntosJugador01;
            baraja[i] = null;
            if (puntosJugador01 > 21)
            {
                turnoComputadora(15)
                btnPasar.disabled = true;
                btnPedir.disabled = true;
            }
            break;
        }
    }
    
    return 0;
}

const valorCarta = (carta) => {

    return (carta[0]+carta[1])*1;
}

const turnoComputadora = (puntosMinimos) => {
    
    while(puntosComputadora < puntosMinimos && puntosComputadora < 21)
    {
        for (let i = baraja.length -1; i >= 0; i--)
            {
                if (baraja[i] != null)
                {
                    let carta = baraja[i];
                    if (primeraCartaComputadora)
                    {
                        document.getElementById('cartaComputadora1').src = `assets/cartas/${carta}.png`;
                        primeraCartaComputadora = false;
                    }else
                    {
                        divCartasComputadora.insertAdjacentHTML('beforeend',`<img class="carta" src=assets/cartas/${carta}.png alt="${carta}">`);
                    }
                    puntosComputadora += valorCarta(carta);
                    puntosHTMLComputadora.innerHTML = puntosComputadora;
                    baraja[i] = null;
                    break;
                }
            }
    }
    
    

    setTimeout(() => {
       // Meter aquí los alert para que se muestren después de mostrar las cartas de la computadora
       if ((puntosJugador01 > puntosComputadora && puntosJugador01 <= 21 ) || (puntosJugador01 <= 21 && puntosComputadora > 21))
       {
        audioFeliz.play();
        document.getElementById('titulo').innerText = "Has ganado!! :)";
       }else if ((puntosJugador01 < puntosComputadora && puntosComputadora <= 21) || (puntosJugador01 > 21 && puntosComputadora <= 21))
       {
        audioTriste.play();
        document.getElementById('titulo').innerText = "Has perdido :(";
       }else
       {
        audioTenso.play();
        document.getElementById('titulo').innerText = "Empate -_-";
       }
    },10);
    
    setTimeout(function(){
        btnNuevoJuego.disabled = false;
    }, 600);
}

// Eventos 

btnPedir.addEventListener('click', () => {
  pedirCarta(baraja);
});

btnPasar.addEventListener('click', () => {
  turnoComputadora(puntosJugador01);
  btnPasar.disabled = true;
  btnPedir.disabled = true;
});

btnNuevoJuego.addEventListener('click', () => {
    baraja = crearBarajaAleatoria();

    while (divCartasJugador01.firstChild)
    {
        divCartasJugador01.removeChild(divCartasJugador01.firstChild);
    }
    divCartasJugador01.insertAdjacentHTML('beforeend',`<br>`);
    divCartasJugador01.insertAdjacentHTML('beforeend',`<img class="carta" id="cartaJugador1" src="assets/cartas/red_back.png">`);

    while (divCartasComputadora.firstChild)
    {
        divCartasComputadora.removeChild(divCartasComputadora.firstChild);
    }
    divCartasComputadora.insertAdjacentHTML('beforeend',`<br>`);
    divCartasComputadora.insertAdjacentHTML('beforeend',`<img class="carta" id="cartaComputadora1" src="assets/cartas/red_back.png">`);
    
    puntosJugador01 = 0;
    puntosComputadora = 0;
    puntosHTMLJugador01.innerHTML = puntosJugador01;
    puntosHTMLComputadora.innerHTML = puntosComputadora;
    btnNuevoJuego.disabled = true;
    btnPasar.disabled = false;
    btnPedir.disabled = false;
    document.getElementById('titulo').innerText = "Juega al BlackJack";
    primeraCartaJugador = true;
    primeraCartaComputadora = true;
});


// Código principal
baraja = crearBarajaAleatoria();
btnNuevoJuego.disabled = true;








