import { fetchJSON, renderProjects } from '../global.js';

(async function () {
  const projects = await fetchJSON('../lib/projects.json');
  const projectsContainer = document.querySelector('.projects');
  const projectsTitle = document.querySelector('.projects-title');

  // Update the title with the number of projects
  projectsTitle.textContent += ` (${projects.length} projects)`;

  if (projectsTitle) {
    projectsTitle.textContent += ` (${projects.length} projects)`;
  } else {
    console.error('Projects title element not found!');
  }

  if (projectsContainer) {
    renderProjects(projects, projectsContainer, 'h2');
  } else {
    console.error('Projects container element not found!');
  }

})();