console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Get all navigation links
const navLinks = $$("nav a");

// Find the link to the current page
const currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Add the 'current' class to the current page link, if it exists
currentLink?.classList.add('current');

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://kawen25.github.io/portfolio', title: 'GitHub' },
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');
let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust relative URLs if not on the home page
  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

  // Create the link element
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  // Highlight the current page
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links in a new tab
  a.target = a.host !== location.host ? '_blank' : '_self';

  // Append the link to the nav
  nav.append(a);
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
  const colorScheme = event.target.value;
  document.documentElement.setAttribute('data-theme', colorScheme);
  localStorage.colorScheme = colorScheme; // Save preference
});

// Load saved preference on page load
const savedColorScheme = localStorage.colorScheme || 'light dark';
document.documentElement.setAttribute('data-theme', savedColorScheme);
select.value = savedColorScheme;