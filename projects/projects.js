import { fetchJSON, renderProjects } from '../global.js';

  const projects = await fetchJSON('../lib/projects.json');
  const projectsContainer = document.querySelector('.projects');
  const projectsTitle = document.querySelector('.projects-title');

  // Update the title with the number of projects
  if (projectsTitle) {
    projectsTitle.innerHTML = `${projects.length} Projects`;
}
  renderProjects(projects, projectsContainer, 'h2');


import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

  const arcGenerator = d3.arc()
    .innerRadius(0) 
    .outerRadius(50); 
  
  const arc = arcGenerator({
    startAngle: 0, 
    endAngle: 2 * Math.PI, 
  });
  

let data = [1, 2];
let colors = ["gold", "purple"];

let sliceGenerator = d3.pie();
let arcData = sliceGenerator(data);
let arcs = arcData.map(d => arcGenerator(d));

arcs.forEach((arc, idx) => {
  d3.select("#projects-pie-plot")
    .append("path")
    .attr("d", arc)
    .attr("fill", colors[idx]);
});
