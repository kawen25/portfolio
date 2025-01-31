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
const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
  const colorScheme = event.target.value;
  document.documentElement.setAttribute('data-theme', colorScheme);
  localStorage.colorScheme = colorScheme; // Save Preference
});

// Load Saved Theme on Page Load
const savedColorScheme = localStorage.colorScheme || 'auto';
document.documentElement.setAttribute('data-theme', savedColorScheme);
select.value = savedColorScheme;

// Ensure "Automatic" Works on System Preference Change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (localStorage.colorScheme === 'auto') {
    document.documentElement.setAttribute('data-theme', 'auto');
  }
});