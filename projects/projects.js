import { fetchJSON, renderProjects } from '../global.js';

(async function () {
  const projects = await fetchJSON('../lib/projects.json');
  const projectsContainer = document.querySelector('.projects');
  const projectsTitle = document.querySelector('.projects-title');

  // Update the title with the number of projects
  projectsTitle.textContent += ` (${projects.length} projects)`;

  renderProjects(projects, projectsContainer, 'h2');
})();