const messages = [
  `Hoy quiero recordarte lo especial que eres para mi,
  valoro mucho las cosas que haces por mi y doy gracias a Dios por tu amistad,
  a veces pienso que estamos escribiendo una bonita historia juntos,
  no olvides que aqui tienes a alguien que le importas, 
  que te quiere y piensa que eres lo mejor que le paso,
  somos un buen equipo en Escuela Dominical, me gusta verte feliz
  ya sabes si me necesitas cuando quieras, donde quieras y como quieras, 
  doy gracias por tu vidaaa`,

  `Me gusta cuando frunces los ojos, 
  me gusta que siempre luces espectacular, 
  me gusta tu sonrisa única, 
  me gusta que te emociones al ver gatitos o perritos, 
  me gusta que ames a los niños de Escuela Dominical, 
  me gusta que seas comprometida con el ministerio, 
  me gusta tu sensibilidad, 
  me gusta que seas social, 
  me gusta que cuando nos encontramos siempre conversemos mucho, 
  me gusta que compartamos tantas cosas en común. 
  Gracias por tu bonita amistad`,

  ,
];

const colors = [
  "#ff4d4d",
  "#ff8533",
  "#ffcc33",
  "#66cc66",
  "#3399ff",
  "#9966cc",
  "#ff66b2",
];
const messageContainer = document.getElementById("message");

function startCelebration(messageIndex) {
  messageContainer.innerHTML = ""; // Limpiar mensaje anterior
  document.getElementById("background-music").play(); // Reproducir música
  showMessage(messages[messageIndex - 1]); // Mostrar mensaje seleccionado
  launchConfetti(); // Iniciar confeti
}

// Mostrar mensaje con efecto de aparición lenta
function showMessage(text) {
  const words = text.split(" ");
  let i = 0;

  function typeWriter() {
    if (i < words.length) {
      let span = document.createElement("span");

      // Agregar color aleatorio
      span.style.color = colors[Math.floor(Math.random() * colors.length)];

      // Si la palabra tiene una coma, agregamos un salto de línea
      span.innerHTML = words[i].includes(",")
        ? words[i] + "<br>"
        : words[i] + " ";

      messageContainer.appendChild(span);
      i++;
      setTimeout(typeWriter, 250); // Mostrar más lento
    }
  }
  typeWriter();
}

// Función de confeti (duración 10 segundos)
function launchConfetti() {
  let duration = 10 * 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      spread: 150,
      origin: { y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
