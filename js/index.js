const nav = document.querySelector('#nav');
const openButton = document.querySelector('#nav__button-open');
const closeButton = document.querySelector('#nav__button-close');

openButton.addEventListener('click', () => {
    nav.classList.add('visibility');
    closeButton.classList.add('visibilityc');
    openButton.classList.add('invisibilityo');
});

closeButton.addEventListener('click', () => {
    nav.classList.remove('visibility');
    openButton.classList.remove('invisibilityo');
    openButton.classList.add('visibilityo');
    closeButton.classList.remove('visibilityc');
});