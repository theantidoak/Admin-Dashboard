const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");
const suggestionDiv = document.querySelector('.suggestions');



searchLabel.addEventListener('click', () => {
  searchInput.style.display='block';
  // suggestionDiv.style.display='inline-block';
});
searchInput.addEventListener('blur', () => {
  // searchInput.style.display='none';
  // suggestionDiv.style.display='none';
});

searchInput.addEventListener('input', findMatch);


const completedProjects = Array
                  .from(document.querySelectorAll('.articles h4'))
                  .map((project) => project.textContent);
const upcomingProjects = Array
                  .from(document.querySelectorAll('#upcoming-projects a'))
                  .map((project => project.textContent))
                  .map((project => project.replace('\n', '').trim()));
const preTopProjects = Array
                  .from(document.querySelectorAll('#past-projects a'))
                  .map((project => project.textContent))
                  .map((project => project.replace('\n', '').trim()));

function findMatch() {
  const regex = new RegExp(this.value, 'ig');
  while(suggestionDiv.firstElementChild) {
    suggestionDiv.removeChild(suggestionDiv.lastChild);
  }
  const completedMatches = completedProjects.filter((project) => project.match(regex));
  completedMatches.map((project) => {

    const reMatches = [...project.matchAll(regex)]
                        .map((match) => match.index);
    
    const sug = document.createElement('div');
    
    const result = document.createElement('a');
    
    const firstHalf = project.slice(0, reMatches[0]).toUpperCase();
    const secondHalf = project.slice(reMatches[0] + 1).toUpperCase();

    const highlightSpan = document.createElement('span');
    highlightSpan.classList.add('project-match');
    const highlightSpanContent = document.createTextNode(this.value.toUpperCase());
    highlightSpan.appendChild(highlightSpanContent);

    const firstPart = document.createTextNode(firstHalf);
    const secondPart = document.createTextNode(secondHalf);
    result.appendChild(firstPart);
    result.appendChild(highlightSpan);
    result.appendChild(secondPart);

    const section = document.createElement('span');
    const sectionContent = document.createTextNode('Completed');

    section.appendChild(sectionContent);
    sug.appendChild(result);
    sug.appendChild(section);
    suggestionDiv.appendChild(sug);
  });
  

  // const upcomingMatches = upcomingProjects.filter((project) => project.match(regex));
  // upcomingMatches.map((project) => {
  //   const result = document.createElement('li');
  //   const newResultContent = document.createTextNode(project);
  //   const section = document.createElement('span');
  //   const sectionContent = document.createTextNode('Future');
  //   section.appendChild(sectionContent);
  //   result.appendChild(newResultContent);
  //   result.appendChild(section);
  //   suggestionDiv.appendChild(result);
  // });

  // const preTopMatches = preTopProjects.filter((project) => project.match(regex));
  // preTopMatches.map((project) => {
  //   const result = document.createElement('li');
  //   const newResultContent = document.createTextNode(project);
  //   const section = document.createElement('span');
  //   const sectionContent = document.createTextNode('pre-TOP');
  //   section.appendChild(sectionContent);
  //   result.appendChild(newResultContent);
  //   result.appendChild(section);
  //   suggestionDiv.appendChild(result);
  // });
  
  if (completedMatches == '' && upcomingMatches == '' && preTopMatches == '') {
    const result = document.createElement('li');
    const newResultContent = document.createTextNode('No results');
    result.appendChild(newResultContent);
    suggestionDiv.appendChild(result);
  }
  if (this.value == '') {
    while(suggestionDiv.firstElementChild) {
      suggestionDiv.removeChild(ul.lastChild);
    }
  }
}

const darkLight = document.querySelector('#dark-light-mode');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const root = document.querySelector(':root');
const a = document.querySelectorAll('a');
let nightMode = false;

darkLight.addEventListener('click', () => {
  if (!nightMode) {
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
  nightMode = !nightMode;
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