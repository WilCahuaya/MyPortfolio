const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header__nav");
const closeIcon = document.querySelector(".closeIcon");
const hamburgerIcon = document.querySelector(".hamburgerIcon");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("block");
  closeIcon.classList.toggle("block");
  hamburgerIcon.classList.toggle("none");
  console.log("Holassss");
});
