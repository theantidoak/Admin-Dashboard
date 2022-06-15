const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");

searchLabel.addEventListener('click', () => searchInput.style.display='block');
searchInput.addEventListener('blur', () => searchInput.style.display='none');

const darkLight = document.querySelector('#dark-light-mode');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const root = document.querySelector(':root');
const a = document.querySelectorAll('a');
let celestialBodies = false;

darkLight.addEventListener('click', () => {
  if (!celestialBodies) {
    sun.style.transform='translateY(5px)';
    moon.style.transform='translateY(-5px)';
    root.style.setProperty('--diluno-red', '#9e180c');
    root.style.setProperty('--diluno-shadow', '#1B2547');
    root.style.setProperty('--dull-polo-blue', '#f26659');
    root.style.setProperty('--dull-polo-shadow', '#04040b');
    root.style.setProperty('--white-lilac', '#0f162f');
    root.style.setProperty('--white', '#1B2547');
    a.forEach((ah) => ah.style.color='white');
  } else {
    sun.style.transform='translateY(-5px)';
    moon.style.transform='translateY(5px)';
    root.style.setProperty('--diluno-red', '#f26659');
    root.style.setProperty('--diluno-shadow', '#fbc4a9');
    root.style.setProperty('--dull-polo-blue', '#8CA9D3');
    root.style.setProperty('--dull-polo-shadow', '#bccee6');
    root.style.setProperty('--white-lilac', '#F0EFF4');
    root.style.setProperty('--white', 'white');
    a.forEach((ah) => ah.style.color='black');
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
});