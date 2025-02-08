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
  

  let data = [
    { value: 1, label: 'apples' },
    { value: 2, label: 'oranges' },
    { value: 3, label: 'mangos' },
    { value: 4, label: 'pears' },
    { value: 5, label: 'limes' },
    { value: 5, label: 'cherries' },
  ];
let colors = d3.scaleOrdinal(d3.schemeTableau10);

let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);
let arcs = arcData.map(d => arcGenerator(d));

arcs.forEach((arc, idx) => {
  d3.select("#projects-pie-plot")
    .append("path")
    .attr("d", arc)
    .attr("fill", colors(idx));
});

let legend = d3.select('.legend');
data.forEach((d, idx) => {
    legend.append('li')
          .attr('style', `--color:${colors(idx)}`) 
          .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); 
});