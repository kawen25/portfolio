import { fetchJSON, renderProjects } from '../global.js';

(async function () {
  const projects = await fetchJSON('../lib/projects.json');
  const projectsContainer = document.querySelector('.projects');
  const projectsTitle = document.querySelector('.projects-title');

  // Update the title with the number of projects
  if (projectsTitle) {
    projectsTitle.innerHTML = `${projects.length} Projects`;
}
  renderProjects(projects, projectsContainer, 'h2');

})();