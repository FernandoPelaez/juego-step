const tablero = document.getElementById("tablero");
const btnComenzar = document.getElementById("btnComenzar");
const juego = document.getElementById("juego");
const pantallaInicial = document.querySelector(".pantalla-inicial");
const mensajeFinal = document.getElementById("mensajeFinal");
const mensajeAcierto = document.getElementById("mensajeAcierto");
const btnReiniciar = document.getElementById("btnReiniciar");

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

function iniciarJuego() {
  pantallaInicial.style.display = "none";
  juego.style.display = "block";

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
          setTimeout(() => {
            juego.style.display = "none";
            mensajeFinal.style.display = "block";
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
