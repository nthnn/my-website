<script setup lang="ts">
import { hideLoadingBar } from "@/scripts/loading";
import {
    watch,
    onMounted,
    ref,
    computed
} from "vue";
import {
    addParameter,
    getParameters,
    removeParameter
} from "@/scripts/params";

import ProjectCard from "@/components/ProjectCard.vue";
import { animateTitle } from "@/scripts/title";
import { onBeforeRouteLeave } from "vue-router";

const allProjects = ref([]);
const filterInput = ref("");
const selectedCategory = ref("category");

const currentPage = ref(1);
const itemsPerPage = 9;

const paginatedProjects = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(filteredProjects.value.length / itemsPerPage);
});

const filteredProjects = computed(()=> {
    return allProjects.value.filter((item: any)=> {
        const matchesCategory = selectedCategory.value === "category" ||
            item.category.includes(selectedCategory.value);
        const matchesFilter = filterInput.value === "" ||
            item.title.toLowerCase().includes(
                filterInput.value.toLowerCase()
            ) ||
            item.description.toLowerCase().includes(
                filterInput.value.toLowerCase()
            );

        return matchesCategory && matchesFilter;
    });
});

const loadProjects = ()=> {
    fetch("./database/projects.json").then(response => {
        if(!response.ok) {
            hideLoadingBar(()=> {});
            throw new Error("Network response was not ok");
        }

        return response.json();
    }).then(data => {
        setTimeout(()=> {
            allProjects.value = data.reverse();

            let params = getParameters();
            if(params.has("search")) {
                let searchValue = params.get("search") || "";
                if(searchValue === "")
                    removeParameter("search");
                else filterInput.value = decodeURIComponent(searchValue);
            }

            if (params.has("page")) {
                const pageValue = parseInt(params.get("page") || "1");
                if(!isNaN(pageValue) && pageValue >= 1)
                    currentPage.value = pageValue;
                else removeParameter("page");
            }
            else removeParameter("page");

        }, 2500);

        hideLoadingBar(()=> {});
    }).catch((e)=> {
        console.error("Error loading projects:", e);
        hideLoadingBar(()=> {});

        const cannotLoad = document.getElementById(
            "cannot-load"
        ) as HTMLElement;

        if(cannotLoad) {
            cannotLoad.classList.remove("d-none");
            cannotLoad.classList.add("animate__animated", "animate__fadeIn");
        }
    });
};

watch(filterInput, (newValue)=> {
    if(newValue !== "")
        addParameter("search", encodeURIComponent(newValue));
    else removeParameter("search");

    currentPage.value = 1;
});

watch(selectedCategory, ()=> currentPage.value = 1);
watch(currentPage, (newValue) => {
    if(newValue > 1)
        addParameter("page", newValue.toString());
    else removeParameter("page");
});

let animateInterval: number = 0;
onMounted(()=> {
    animateInterval = animateTitle("My Projects | Nathanne Isip");
    loadProjects();
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}, nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}, prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};

onBeforeRouteLeave(()=> clearInterval(animateInterval));
</script>

<template>
    <h1 class="shimmer" align="center">Projects</h1>
    <div class="modal fade" id="filter-modal" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border border-gray">
                <div class="modal-header">
                    <h4 class="modal-title">Filter Projects</h4>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="w-100" align="center">
                        <select class="form-control bg-transparent border border-gray" id="categories" v-model="selectedCategory">
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
                    <button type="button" class="btn btn-outline-info" data-bs-dismiss="modal"><i class="bi bi-check"></i> Apply Selected</button>
                </div>
            </div>
        </div>
    </div>

    <div class="input-group mb-3">
        <input type="text" class="form-control form-input bg-primary text-white border border-gray" placeholder="Search a project..." id="filter" autocomplete="off" aria-describedby="search-bar" v-model="filterInput">
        <button class="btn btn-info" type="button" id="search-bar" data-bs-toggle="modal" data-bs-target="#filter-modal"><i class="bi bi-funnel"></i><span class="desktop-only"> Filter Projects</span></button>
    </div>

    <div class="mobile-only">
        <br/>
    </div>

    <div id="projects" class="row equal-cols m-0 p-0" align="center">
        <template v-if="paginatedProjects.length > 0">
            <div
                v-for="(item, _) in paginatedProjects"
                :key="(item as any).id"
                :class="['col-12 col-lg-4 mt-4']"
            >
                <ProjectCard :item="item" />
            </div>
        </template>
        <template v-else-if="allProjects.length === 0">
            <div class="d-block w-100">
                <br/>
                <img src="/images/gear.png" class="rotating-gear mt-2" width="32" />
                <p class="mt-3">Projects are currently being loaded, please wait...</p>
                <br/>
            </div>
        </template>
        <template v-else>
            <div id="no-projects-found">
                <div class="d-block w-100" align="center">
                    <br/>
                    <h1>&#x26A0;</h1>
                    <h5>No projects found.</h5>
                    <p>There are no matching results for the applied filter.</p>
                    <br/>
                </div>
            </div>
        </template>
    </div>

    <div id="cannot-load" class="d-none">
        <div class="d-block w-100" align="center">
            <br/>
            <h1>&#x26A0;</h1>
            <h5>Cannot load projects.</h5>
            <p>Something went wrong while fetching data.</p>
            <br/>
        </div>
    </div>

    <nav v-if="totalPages > 1 && filteredProjects.length > 0" aria-label="Project pagination" class="mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
            >
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
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

.page-link {
    background-color: var(--bs-primary);
    border-color: var(--bs-gray);
    color: var(--bs-info);
}

.page-item.active .page-link {
    background-color: var(--bs-info);
    border-color: var(--bs-info);
    color: var(--bs-primary);
}

.page-item.disabled .page-link {
    color: var(--bs-gray-dark);
    pointer-events: none;
    background-color: var(--bs-primary);
    border-color: var(--bs-gray);
}
</style>