const tablero = document.getElementById("tablero");
const btnComenzar = document.getElementById("btnComenzar");
const juego = document.getElementById("juego");
const pantallaInicial = document.querySelector(".pantalla-inicial");
const mensajeFinal = document.getElementById("mensajeFinal");
const mensajeAcierto = document.getElementById("mensajeAcierto");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnVolverAJugar = document.getElementById("btnVolverAJugar");
const tiempoFinal = document.getElementById("tiempoFinal");
const mensajeTiempo = document.getElementById("mensajeTiempo");

const reloj = document.getElementById("reloj");
let segundos = 0;
let temporizador = null;

function actualizarReloj() {
  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');
  reloj.textContent = `⏱️ ${min}:${seg}`;
}

const sonidoVoltear = new Audio('sonido/voltear.mp3');

const emojis = ["🌈", "🎀", "🍭", "🌸", "🧁", "🧸", "🦄", "💖", "🌟", "🍓", "🐥", "🐚", "🌷", "🍬"];
const mensajes = [
  "¡Lo lograste, Step! 🧠✨",
  "Eres más lista que el código que te hizo 😎",
  "¡Cada vez más cerca del tesoro! 💖",
  "¡Estás imparable, mi genia! 💪💘",
  "¡Wow! Tu memoria es de otro nivel 🧠💥",
  "¡Eres brillante! ✨ Como siempre lo has sido 🌟",
  "¡Qué talento, Step! 🪄💡",
  "¡Eres un rayo de genialidad! ⚡🌈",
  "¡Imposible no admirarte! 🐚🫧",
  "¡Así se juega con el corazón! 💓🎯",
  "¡Tus neuronas están de fiesta! 🧠🎉",
  "¡Eres la reina de los pares! 👑🧸",
  "¡Con cada clic demuestras magia! 🦄💫",
  "¡Increíble! No hay reto que no superes 💥🍭"
];

let cartas = [];
let seleccionadas = [];
let paresEncontrados = 0;

btnComenzar.addEventListener("click", iniciarJuego);
btnReiniciar.addEventListener("click", () => location.reload());
if (btnVolverAJugar) {
  btnVolverAJugar.addEventListener("click", () => location.reload());
}

function iniciarJuego() {
  pantallaInicial.style.display = "none";
  juego.style.display = "block";
  mensajeTiempo.textContent = "";

  segundos = 0;
  actualizarReloj();
  temporizador = setInterval(() => {
    segundos++;
    actualizarReloj();

    if (segundos === 30) {
      mensajeTiempo.textContent = "Ánimos, no te me vayas a ondear 😅 ¡Yo sé que tú puedes!";

      // 🧼 Borrar después de 5 segundos
      setTimeout(() => {
        mensajeTiempo.textContent = "";
      }, 5000);
    }
  }, 1000);

  const cartasDobles = [...emojis, ...emojis];
  cartasDobles.sort(() => Math.random() - 0.5);

  cartasDobles.forEach((emoji, index) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.valor = emoji;
    carta.dataset.index = index;
    carta.textContent = "❌";
    carta.addEventListener("click", manejarSeleccion);
    tablero.appendChild(carta);
    cartas.push(carta);
  });
}

function manejarSeleccion(e) {
  const carta = e.target;

  if (seleccionadas.length < 2 && !carta.classList.contains("acertada") && !seleccionadas.includes(carta)) {
    sonidoVoltear.play();
    carta.textContent = carta.dataset.valor;
    seleccionadas.push(carta);

    if (seleccionadas.length === 2) {
      const [carta1, carta2] = seleccionadas;
      if (carta1.dataset.valor === carta2.dataset.valor) {
        carta1.classList.add("acertada");
        carta2.classList.add("acertada");
        seleccionadas = [];
        paresEncontrados++;

        mensajeAcierto.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];

        if (paresEncontrados === emojis.length) {
          clearInterval(temporizador);
          const min = String(Math.floor(segundos / 60)).padStart(2, '0');
          const seg = String(segundos % 60).padStart(2, '0');
          tiempoFinal.textContent = `⏱️ Lo hiciste en ${min}:${seg} minutos`;
          setTimeout(() => {
            juego.style.display = "none";
            mensajeFinal.style.display = "block";
            lanzarConfeti();
          }, 1000);
        }
      } else {
        setTimeout(() => {
          carta1.textContent = "❌";
          carta2.textContent = "❌";
          seleccionadas = [];
          mensajeAcierto.textContent = "";
        }, 800);
      }
    }
  }
}

function lanzarConfeti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}
