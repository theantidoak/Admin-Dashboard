const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");

searchLabel.addEventListener('click', () => searchInput.style.display='block');
searchInput.addEventListener('blur', () => searchInput.style.display='none');

const darkLight = document.querySelector('#dark-light-mode');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
let celestialBodies = false;

darkLight.addEventListener('click', () => {
  if (!celestialBodies) {
    sun.style.transform='translateY(5px)';
    moon.style.transform='translateY(-5px)';
  } else {
    sun.style.transform='translateY(-5px)';
    moon.style.transform='translateY(5px)';
  }
  celestialBodies = !celestialBodies;
});

const bella = document.querySelector('#bell-a');

bella.addEventListener('click', () => {
  bella.style.transform='translateX(-2px)';
  
  const timeOut = setTimeout(() => {
    bella.style.transform='translateX(2px)';
  }, 100);

  const timeOut2 = setTimeout(() => {
    bella.style.transform='translateX(0)';
  }, 200);

  timeOut;
})