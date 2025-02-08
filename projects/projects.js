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

let legend = d3.select('.legend').html("");
data.forEach((d, idx) => {
    legend.append('li')
          .attr('style', `--color:${colors(idx)}`) 
          .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); 
});

document.addEventListener("DOMContentLoaded", async () => {
  let projects = await fetchJSON ("../lib/projects.json");

  let rolledData = d3.rollups(
    projects,
    (v) => v.length,
    (d) => d.year
  );
  let data = rolledData.map(([year, count]) => {
    return {value: count, label: year};
  });

});

let query = ''; 

let searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('input', (event) => {
  query = event.target.value.toLowerCase(); 

  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join(' ').toLowerCase();
    return values.includes(query);
  });

  renderProjects(filteredProjects);
  renderPieChart(filteredProjects);
});


function renderPieChart(projectsGiven) {
  d3.select("svg").selectAll("*").remove(); 
  d3.select(".legend").selectAll("*").remove(); 


  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  let newData = newRolledData.map(([year, count]) => ({
    value: count,
    label: year,
  }));

  let newSliceGenerator = d3.pie().value(d => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArc = d3.arc().innerRadius(0).outerRadius(50);

  let svg = d3.select("#projects-pie-plot");

  newArcData.forEach((d, idx) => {
    svg.append("path")
      .attr("d", newArc(d))
      .attr("fill", colors(idx));
  });

  let legend = d3.select(".legend");
  newData.forEach((d, idx) => {
    legend.append("li")
      .attr("style", `--color: ${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

renderPieChart(projects);

let selectedIndex = -1; 

function renderPieChart(projectsGiven) {
  d3.select("svg").selectAll("*").remove(); 
  d3.select(".legend").selectAll("*").remove(); 

  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  let newData = newRolledData.map(([year, count]) => ({
    value: count,
    label: year,
  }));

  let newSliceGenerator = d3.pie().value(d => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArc = d3.arc().innerRadius(0).outerRadius(50);
  let svg = d3.select("#projects-pie-plot");

  newArcData.forEach((d, idx) => {
    svg.append("path")
      .attr("d", newArc(d))
      .attr("fill", colors(idx))
      .attr("class", selectedIndex === idx ? "selected" : "")
      .on("click", () => {
        selectedIndex = selectedIndex === idx ? -1 : idx;
        let filteredProjects = selectedIndex === -1
          ? projects
          : projects.filter(p => p.year === newData[idx].label);
        
        renderProjects(filteredProjects);
        renderPieChart(filteredProjects);
      });
  });

  let legend = d3.select(".legend");
  newData.forEach((d, idx) => {
    legend.append("li")
      .attr("style", `--color: ${colors(idx)}`)
      .attr("class", selectedIndex === idx ? "selected" : "")
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
      .on("click", () => {
        selectedIndex = selectedIndex === idx ? -1 : idx;
        let filteredProjects = selectedIndex === -1
          ? projects
          : projects.filter(p => p.year === d.label);
        
        renderProjects(filteredProjects);
        renderPieChart(filteredProjects);
      });
  });
}


renderPieChart(projects);