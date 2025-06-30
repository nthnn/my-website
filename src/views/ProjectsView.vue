<script setup lang="ts">
import { onMounted } from "vue";
import { hideLoadingBar } from "@/scripts/loading";
import {
    addParameter,
    getParameters,
    removeParameter
} from "@/scripts/params";

const dumpData = (
    data: {
        id: number,
        title: string,
        short_description: string,
        description: string,
        thumbnail: string,
        category: Array<string>
    }[],
    category: string,
    filter = ""
) => {
    let content = "<div class=\"row m-0 p-0\">", count = 0;

    for (let j = 0; j < data.length; j++) {
        const item = data[j];
        if((item["category"].includes(category) || category === "category") &&
            (filter === "" ||
                item["title"].toLowerCase().includes(filter.toLowerCase()) ||
                item["description"].toLowerCase().includes(filter.toLowerCase()))) {
            if(count == 3) {
                content += "</div><div class=\"row m-0 mt-4 p-0\">";
                count = 0;
            }

            content += `
                <div class="col-12 col-lg-4 ${count == 1 || count == 2 ? 'mt-4 mt-lg-0' : ''}">
                    <div class="card card-body bg-primary border border-gray animate__animated animate__flipInX p-0"
                        onclick="window.location.href='view.html?id=${item.id}'"
                        align=\"left\"
                    >
                        <img src="./images/projects/${item.thumbnail}.png" class="w-100" />

                        <div class="px-4 py-2">
                            <h3 class="card-title mt-2 mb-0 pb-0">${item.title}</h3>
                            <small><i>${item.short_description}</i></small>
                            <p class="mt-2">${item.description}</p>
                        </div>
                    </div>
                </div>`;

            count++;
        }
    }
    content += "</div>";

    const noProjectsFound = document.getElementById(
        "no-projects-found"
    ) as HTMLElement, projects = document.getElementById(
        "projects"
    ) as HTMLElement;

    if(count > 0) {
        noProjectsFound.classList.add("d-none");
        noProjectsFound.classList.remove("animate__animated", "animate__fadeIn");

        projects.innerHTML = content;
    }
    else {
        noProjectsFound.classList.remove("d-none");
        noProjectsFound.classList.add("animate__animated", "animate__fadeIn");

        projects.innerHTML = "";
    }
};

function loadProjects() {
    let projects = document.getElementById(
        "projects"
    ) as HTMLElement;

    fetch("./database/projects.json").then(response => {
        if(!response.ok) {
            hideLoadingBar(()=> {});
            throw new Error("Network response was not ok");
        }

        return response.json();
    })
    .then(data => {
        data.reverse();

        const filterInput = document.getElementById("filter") as HTMLInputElement;
        const categoriesSelect = document.getElementById("categories") as HTMLSelectElement;

        filterInput.addEventListener("change", () => {
            const category = categoriesSelect.options[categoriesSelect.selectedIndex].value;
            let filterValue = filterInput.value.replace(
                /[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`
            );

            if(filterValue !== "")
                addParameter("search", encodeURIComponent(filterValue));
            else removeParameter("search");

            dumpData(data, category, filterValue);
        });

        categoriesSelect.addEventListener("change", () => {
            projects.innerHTML = "";

            const category = categoriesSelect.options[categoriesSelect.selectedIndex].value;
            let filterValue = filterInput.value.replace(
                /[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`
            );

            dumpData(data, category, filterValue);
        });

        let params = getParameters();
        if(params.has("search")) {
            let searchValue = params.get("search") || "";

            if(searchValue === "")
                removeParameter("search");
            else filterInput.value = searchValue;
        }

        setTimeout(() => dumpData(data, "category", filterInput.value), 2000);
        hideLoadingBar(()=> {});
    })
    .catch((e) => {
        projects.classList.add("d-none");
        hideLoadingBar(()=> {});

        const cannotLoad = document.getElementById(
            "cannot-load"
        ) as HTMLElement;
        cannotLoad.classList.remove("d-none");
        cannotLoad.classList.add("animate__animated", "animate__fadeIn");
    });
}

onMounted(loadProjects);
setTimeout(()=> hideLoadingBar(()=> {}), 5000);
</script>

<template>
    <h1 align="center">Projects</h1>
    <div class="modal fade" id="filter-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Filter Projects</h4>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="w-100" align="center">
                        <select class="form-control" id="categories">
                            <option value="category">All</option>
                            <option value="app">Mobile Applications</option>
                            <option value="software">Software</option>
                            <option value="game">Games</option>
                            <option value="website">Website</option>
                            <option value="firmware">Firmware</option>
                            <option value="ai">Artificial Intelligence</option>
                        </select>
                    </div>
                </div>

                <div class="modal-footer">
                    <a class="btn-primary">Apply Selected</a>
                </div>
            </div>
        </div>
    </div>

    <div class="input-group mb-3">
        <input type="text" class="form-control form-input bg-primary text-white border border-gray" placeholder="Search a project..." id="filter" autocomplete="off" aria-describedby="search-bar">
        <button class="btn btn-info" type="button" id="search-bar" data-bs-toggle="modal" data-bs-target="#filter-modal">Filter<span class="desktop-only"> Projects</span></button>
    </div>

    <div class="mobile-break">
        <br/>
    </div>

    <div id="projects" class="row" align="center">
        <div class="d-block w-100">
            <br/>
            <img src="/images/gear.png" class="rotating-gear mt-2" width="32" />
            <p class="mt-3">Projects are currently being loaded, please wait...</p>
            <br/>
        </div>
    </div>

    <div id="no-projects-found" class="d-none">
        <div class="container col-lg-6" align="center">
            <div class="card card-body border border-gray">
                <div align="center">
                    <img src="./assets/images/img_planet.png" width="60%" />
                    <br/><br/>
                    <h5>No projects found.</h5>
                    <br/>
                    <p>There are no matching result for the applied filter.</p>
                    <br/>
                </div>
            </div>

            <br/>
        </div>
    </div>

    <div id="cannot-load" class="d-none">
        <div class="container col-lg-6" align="center">
            <div class="card card-body border border-gray">
                <div align="center">
                    <img src="./assets/images/img_satelite.png" width="60%" />
                    <br/><br/>
                    <h5>Cannot load projects.</h5>
                    <br/>
                    <p>Something went wrong while fetching data.</p>
                    <br/>
                </div>
            </div>

            <br/>
        </div>
    </div>
</template>

<style scoped>
#projects {
    overflow-y: hidden;
}

.rotating-gear {
  animation: rotate-gear 2s linear infinite;
  display: inline-block;
}

@keyframes rotate-gear {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
