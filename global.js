console.log('IT’S ALIVE!');

// Utility Function to Select Elements
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Get All Navigation Links
const navLinks = $$("nav a");

// Find the Current Page Link
const currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Highlight the Current Page
currentLink?.classList.add('current');

// Pages for Navigation
let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
  { url: 'meta/', title: 'Meta' },
  { url: 'https://kawen25.github.io/portfolio', title: 'GitHub' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');


// Generate Navigation Links
for (let p of pages) {
  let url = p.url;
  let title = p.title;

  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  a.target = a.host !== location.host ? '_blank' : '_self';
  nav.append(a);
}

// Add Theme Selector
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="auto">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

// Handle Theme Change
function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  localStorage.colorScheme = colorScheme;
}

const select = document.querySelector(".color-scheme select");

if (localStorage.colorScheme) {
  setColorScheme(localStorage.colorScheme);
  select.value = localStorage.colorScheme;
} else {
  setColorScheme('auto');
  select.value = 'auto';
}

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  setColorScheme(event.target.value);
});

const form = document.querySelector("form[action = 'mailto: kawen@ucsd.edu']");

form?.addEventListener('submit', function (event) {
  event.preventDefault();

  let data = new FormData(form);
  let url = form.action + '?';

  for (let [name, value] of data ){
    console.log(name, encodeURIComponent(value));
    url += `${encodeURIComponent(name)}=${encodeURICompondnet(value)}&`;
  }
  location.href = url;
});

export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 

  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // Clear existing content
  containerElement.innerHTML = '';

  // Loop through each project and create an <article> element
  projects.forEach(project => {
    const article = document.createElement('article');
    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${project.image}" alt="${project.title}">
      <div class = "project-details"> 
        <p>${project.description}</p>
        <p class="project-year">Year: ${project.year}</p>
      </div>
    `;
    containerElement.appendChild(article);
  });
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}