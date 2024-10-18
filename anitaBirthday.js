const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".header__nav");
const closeIcon = document.querySelector(".closeIcon");
const hamburgerIcon = document.querySelector(".hamburgerIcon");
const modal = document.querySelector(".modalImgDialog");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("block");
  closeIcon.classList.toggle("block");
  hamburgerIcon.classList.toggle("none");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
