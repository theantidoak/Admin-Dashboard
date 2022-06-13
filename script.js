const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");

searchLabel.addEventListener('click', () => searchInput.style.display='block');
searchInput.addEventListener('blur', () => searchInput.style.display='none');