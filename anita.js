document.addEventListener("DOMContentLoaded", function () {
  const flower = document.querySelector(".flower img");
  flower.classList.add("bloom-animation");

  // Añadir un pequeño efecto de resplandor a la flor después de la animación de 'florecer'
  setTimeout(() => {
    flower.style.filter = "drop-shadow(0 0 15px yellow)";
  }, 2000);

  // Crear partículas brillantes alrededor de la flor
  const container = document.querySelector(".container");
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    container.appendChild(particle);
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 150}px`;

    // Iniciar las partículas con un pequeño retraso
    setTimeout(() => {
      particle.style.animationDelay = `${Math.random() * 5}s`;
    }, 100);
  }
});
