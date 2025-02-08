import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let projects = [];
let selectedIndex = -1; 

document.addEventListener("DOMContentLoaded", async () => {
    projects = await fetchJSON("../lib/projects.json");

    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');

    if (projectsTitle) {
        projectsTitle.innerHTML = `${projects.length} Projects`;
    }

    renderProjects(projects, projectsContainer, 'h2');
    renderPieChart(projects);

    setupSearch();
});

function setupSearch() {
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
}

function renderPieChart(projectsGiven) {
    d3.select("#projects-pie-plot").selectAll("*").remove(); 
    d3.select(".legend").selectAll("*").remove(); 

    let rolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year
    );

    let data = rolledData.map(([year, count]) => ({
        value: count,
        label: year,
    }));

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let pieGenerator = d3.pie().value(d => d.value);
    let arcData = pieGenerator(data);

    let svg = d3.select("#projects-pie-plot");

    arcData.forEach((d, idx) => {
        svg.append("path")
            .attr("d", arcGenerator(d))
            .attr("fill", colors(idx))
            .attr("class", selectedIndex === idx ? "selected" : "")
            .on("click", () => {
                selectedIndex = selectedIndex === idx ? -1 : idx;
                let filteredProjects = selectedIndex === -1
                    ? projects
                    : projects.filter(p => p.year === data[idx].label);

                renderProjects(filteredProjects);
                renderPieChart(filteredProjects);
            });
    });

    let legend = d3.select(".legend");
    data.forEach((d, idx) => {
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


