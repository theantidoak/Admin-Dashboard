const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");
const suggestionDiv = document.querySelector('.suggestions');

const completedProjects = document.querySelectorAll('.articles h4');
const completedProjectsContent = 
  Array.from(completedProjects).map((project) => project.textContent);
const upcomingProjects = document.querySelectorAll('#upcoming-projects a');
const upcomingProjectsContent = 
  Array.from(upcomingProjects).map((project => project.textContent))
    .map((project => project.replace('\n', '').trim()));
const preTopProjects = document.querySelectorAll('#past-projects a');
const preTopProjectsContent = 
  Array.from(preTopProjects).map((project => project.textContent))
    .map((project => project.replace('\n', '').trim()));

const projectList = [...completedProjects].concat([...upcomingProjects], [...preTopProjects]);
const projectListContent = 
  completedProjectsContent.concat(upcomingProjectsContent, preTopProjectsContent);


document.addEventListener('click', hideSearchBar);
searchInput.addEventListener('input', findMatch);
searchInput.addEventListener('keydown', findFirstMatch);
searchLabel.addEventListener('click', showAll);
  

/* ----------------------------------------*/
/* Scroll searchbar result into view */

function scrollView() { 
  projectList.forEach((scroll) => { 
    if (this.firstElementChild.textContent.toLowerCase() == scroll.textContent.trim().toLowerCase()) {
      scroll.scrollIntoView(true);
      suggestionDiv.style.display='none';
      scroll.style.backgroundColor='var(--diluno-red)';
    }
  });
}

/* ----------------------------------------*/
/* Show whole list when user focuses the searchbar */

  function showAll() {
    if (searchInput.value == '') {
      projectListContent.forEach((project) => {
        const sug = document.createElement('div');
        const result = document.createElement('a');
        const resultContent = document.createTextNode(project);
        const section = document.createElement('span');
        result.appendChild(resultContent);
        completedProjectsContent.forEach((completed) => {
          if (completed == project) {
            const sectionContent = document.createTextNode('My Projects');
            section.appendChild(sectionContent);
          }
        });
    
        upcomingProjectsContent.forEach((upcoming) => {
          if (upcoming == project) {
            const sectionContent = document.createTextNode('Upcoming');
            section.appendChild(sectionContent);
          }
        });
    
        preTopProjectsContent.forEach((preTop) => {
          if (preTop == project) {
            const sectionContent = document.createTextNode('Pre-TOP');
            section.appendChild(sectionContent);
          }
        });

        sug.appendChild(result);
        sug.appendChild(section);
        suggestionDiv.appendChild(sug);

        sug.addEventListener('click', scrollView);
      });
    }
  }


/* ----------------------------------------*/
/* Find the searchbar match */

function findMatch() {
  
  const regex = new RegExp(this.value, 'ig');
  while(suggestionDiv.firstElementChild) {
    suggestionDiv.removeChild(suggestionDiv.lastChild);
  }

  const listMatches = projectListContent.filter((project) => project.match(regex));
  listMatches.map((project) => {
    const reMatches = [...project.matchAll(regex)]
                        .map((match) => match.index);    
    const sug = document.createElement('div');
    const result = document.createElement('a');
    const firstHalf = project.slice(0, reMatches[0]);
    const secondHalf = project.slice(reMatches[0] + this.value.length);
    const highlightSpan = document.createElement('span');
    highlightSpan.classList.add('project-match');
    const highlightSpanContent = document.createTextNode(this.value.toLowerCase());
    highlightSpan.appendChild(highlightSpanContent);

    const firstPart = document.createTextNode(firstHalf);
    const secondPart = document.createTextNode(secondHalf);
    result.appendChild(firstPart);
    result.appendChild(highlightSpan);
    result.appendChild(secondPart);
    const section = document.createElement('span');
    
    completedProjectsContent.forEach((completed) => {
      if (completed == project) {
        const sectionContent = document.createTextNode('My Projects');
        section.appendChild(sectionContent);
      }
    });

    upcomingProjectsContent.forEach((upcoming) => {
      if (upcoming == project) {
        const sectionContent = document.createTextNode('Upcoming');
        section.appendChild(sectionContent);
      }
    });

    preTopProjectsContent.forEach((preTop) => {
      if (preTop == project) {
        const sectionContent = document.createTextNode('Pre-TOP');
        section.appendChild(sectionContent);
      }
    });

    sug.appendChild(result);
    sug.appendChild(section);
    suggestionDiv.appendChild(sug);
    sug.addEventListener('click', scrollView);
  });
  
  if (listMatches == '') {
    const sug = document.createElement('div');
    const result = document.createElement('a');
    const newResultContent = document.createTextNode('No results');
    result.appendChild(newResultContent);
    sug.appendChild(result);
    suggestionDiv.appendChild(sug);
  }
  if (this.value == '') {
    while(suggestionDiv.firstElementChild) {
      suggestionDiv.removeChild(suggestionDiv.lastChild);
    }
  }
}


/* ----------------------------------------*/
/* Hide the Searchbar */

function hideSearchBar(event) {
  if (!searchInput.contains(event.target) && !searchLabel.contains(event.target) &&
    ![...suggestionDiv.children].some((child) => child.contains(event.target))) {
    searchLabel.style.display='flex';
    searchInput.style.display='none';
    suggestionDiv.style.display='none';
    projectList.forEach((project) => project.style.backgroundColor='transparent');
  } else {
    searchLabel.style.display='none';
    searchInput.style.display='block';
    if (![...suggestionDiv.children].some((child) => child.contains(event.target))) {
      suggestionDiv.style.display='block';
    }
  }
};


/* ----------------------------------------*/
/* Go to the match after pressing 'Enter' key */

function findFirstMatch(e) {
  if (e.key == 'Enter') {
    projectList.forEach((scroll) => {
      if (searchInput.nextElementSibling.firstElementChild.firstElementChild.textContent.toLowerCase() == scroll.textContent.trim().toLowerCase()) {
        e.preventDefault();
        scroll.scrollIntoView(true);
        suggestionDiv.style.display='none';
        scroll.style.backgroundColor='var(--diluno-red)';
      }
    });
  }
}


/* ----------------------------------------*/
/* Toggle Light and Dark color scheme AND toggle light and dark icons */

const darkLight = document.querySelector('#dark-light-mode');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const root = document.querySelector(':root');
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
    root.style.setProperty('--black', 'white');
    root.style.setProperty('--dark-blue', '#bccee6');
  } else {
    sun.style.transform='translateY(-5px)';
    moon.style.transform='translateY(5px)';
    root.style.setProperty('--diluno-red', '#f26659');
    root.style.setProperty('--diluno-shadow', '#fbc4a9');
    root.style.setProperty('--dull-polo-blue', '#8CA9D3');
    root.style.setProperty('--dull-polo-shadow', '#bccee6');
    root.style.setProperty('--white-lilac', '#F0EFF4');
    root.style.setProperty('--white', 'white');
    root.style.setProperty('--black', 'black');
    root.style.setProperty('--dark-blue', '#0f162f');
  }
  nightMode = !nightMode;
});


/* ----------------------------------------*/
/* Shake the bell icon */

const bella = document.querySelector('#bell-a');
bella.addEventListener('click', toggleIcons);

function toggleIcons() {
  bella.style.transform='translateX(-2px)'; 
  setTimeout(() => bella.style.transform='translateX(2px)', 100);
  setTimeout(() => bella.style.transform='translateX(0)', 200);
};