const searchLabel = document.querySelector("label[for='searchbar']");
const searchInput = document.querySelector("#searchbar");
const suggestionDiv = document.querySelector('.suggestions');

searchLabel.addEventListener('click', () => {
  searchInput.style.display='block';
  suggestionDiv.style.display='flex';
});
searchInput.addEventListener('blur', (event) => {
  searchInput.style.display='none';
  if (!suggestionDiv.contains(event.target) && !searchInput.contains(event.target)) {
    suggestionDiv.children.style.display='none';
  }
});
searchInput.addEventListener('click', () => {
  suggestionDiv.style.display='flex';
});


searchInput.addEventListener('input', findMatch);


const completedProjects = document.querySelectorAll('.articles h4');
const completedProjectsContent = Array.from(completedProjects)
                                .map((project) => project.textContent);
const upcomingProjects = document.querySelectorAll('#upcoming-projects a');
const upcomingProjectsContent = Array.from(upcomingProjects)
                                .map((project => project.textContent))
                                .map((project => project.replace('\n', '').trim()));
const preTopProjects = document.querySelectorAll('#past-projects a');
const preTopProjectsContent = Array.from(preTopProjects)                  
                                .map((project => project.textContent))
                                .map((project => project.replace('\n', '').trim()));


function findMatch() {
  const regex = new RegExp(this.value, 'ig');
  while(suggestionDiv.firstElementChild) {
    suggestionDiv.removeChild(suggestionDiv.lastChild);
  }
  
  const completedMatches = completedProjectsContent.filter((project) => project.match(regex));
  completedMatches.map((project) => {

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
    const sectionContent = document.createTextNode('Completed');
    section.appendChild(sectionContent);
    sug.appendChild(result);
    sug.appendChild(section);
    suggestionDiv.appendChild(sug);
    sug.addEventListener('click', scrollView);
    function scrollView() { 
      completedProjects.forEach((scroll) => {
        if (this.firstElementChild.textContent.toLowerCase() == scroll.textContent.toLowerCase()) {
          scroll.scrollIntoView(true);
        }
      });
    }
  });
  

  const upcomingMatches = upcomingProjectsContent.filter((project) => project.match(regex));
  upcomingMatches.map((project) => {
    
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
    const sectionContent = document.createTextNode('Future');
    section.appendChild(sectionContent);
    sug.appendChild(result);
    sug.appendChild(section);
    suggestionDiv.appendChild(sug);
    sug.addEventListener('click', scrollView);
    function scrollView() { 
      upcomingProjects.forEach((scroll) => {
        if (this.firstElementChild.textContent.toLowerCase() == scroll.textContent.trim().toLowerCase()) {
          scroll.scrollIntoView(true);
        }
      });
    }
  });

  const preTopMatches = preTopProjectsContent.filter((project) => project.match(regex));
  preTopMatches.map((project) => {
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
    const sectionContent = document.createTextNode('Pre-TOP');
    section.appendChild(sectionContent);
    sug.appendChild(result);
    sug.appendChild(section);
    suggestionDiv.appendChild(sug);
    sug.addEventListener('click', scrollView);
    function scrollView() { 
      preTopProjects.forEach((scroll) => {
        if (this.firstElementChild.textContent.toLowerCase() == scroll.textContent.trim().toLowerCase()) {
          scroll.scrollIntoView(true);
        }
      });
    }
  });
  
  if (completedMatches == '' && upcomingMatches == '' && preTopMatches == '') {
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
  document.addEventListener('click', (event) => {
    if (!suggestionDiv.contains(event.target)) {
      suggestionDiv.style.display='none';
    }
  });
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