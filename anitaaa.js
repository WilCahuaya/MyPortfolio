// Mensaje con palabras destacadas y saltos de línea
const messageText = `
me gusta cuando frunces los ojos, 
me gusta que siempre luces espectacular, 
me gusta tu sonrisa única, 
me gusta que te emociones al ver gatitos o perritos, 
me gusta que ames a los niños de Escuela Dominical, 
me gusta que seas comprometida con el ministerio, 
me gusta tu sensibilidad, 
me gusta que seas social, 
me gusta que cuando nos encontramos siempre conversemos mucho, 
me gusta que compartamos tantas cosas en común. 
Gracias por tu bonita amistad`;

const colors = [
  "#ff4d4d",
  "#ff8533",
  "#ffcc33",
  "#66cc66",
  "#3399ff",
  "#9966cc",
  "#ff66b2",
];
const words = messageText.split(" ");
const messageContainer = document.getElementById("message");

let i = 0;

// Función para mostrar el mensaje con saltos de línea en cada coma, más lento
function typeWriter() {
  if (i < words.length) {
    let span = document.createElement("span");

    // Si la palabra tiene una coma, agregamos un salto de línea
    if (words[i].includes(",")) {
      span.innerHTML = `<span style="color: ${
        colors[Math.floor(Math.random() * colors.length)]
      }">${words[i]}</span><br>`;
    } else {
      span.textContent = words[i] + " ";
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    messageContainer.appendChild(span);
    i++;

    setTimeout(typeWriter, 300); // **Texto más lento (antes era 150ms)**
  }
}

// Iniciar Celebración
function startCelebration() {
  document.getElementById("background-music").play(); // Reproducir música
  typeWriter(); // Mostrar mensaje con saltos de línea
  launchConfetti(); // Iniciar confeti
}

// Función de confeti (ahora dura 10 segundos)
function launchConfetti() {
  let duration = 10 * 1000; // **Antes era 5 segundos**
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
