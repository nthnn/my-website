<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

import ProjectCard from "@/components/ProjectCard.vue";
import { animateTitle } from "@/scripts/title";
import { hideLoadingBar } from "@/scripts/loading";

const route = useRoute();
const router = useRouter();

const projectContent = ref("");
const projectTitle = ref("");
const projectLink = ref("");
const randomProjects = ref([]);

const isLoading: Ref<boolean> = ref(true);
const hasError: Ref<boolean> = ref(false);
const showArticleContent: Ref<boolean> = ref(false);

const showArticle = () => {
    isLoading.value = false;
    hasError.value = false;
    showArticleContent.value = true;
};

const showError = () => {
    isLoading.value = false;
    hasError.value = true;
    showArticleContent.value = false;
};

const fetchAndSetRandomProjects = async(currentArticleId: string)=> {
    try {
        const response = await fetch("./database/projects.json");
        if(!response.ok)
            throw new Error(`Failed to fetch all projects: ${response.status}`);

        const data = await response.json();
        const projectsExcludingCurrent = data.filter(
            (project: any)=> project.id !== Number(currentArticleId)
        );
        const currentArticleCategories = data.filter(
            (project: any)=> project.id === Number(currentArticleId)
        )[0].category;

        const projectsInSameCategory = projectsExcludingCurrent.filter(
            (project: any)=> {
                const projectCategories: string[] = Array.isArray(
                    project.category
                ) ? project.category : [];
                if(currentArticleCategories.length === 0 || projectCategories.length === 0)
                    return false;

                return projectCategories.some((cat: string)=>
                    currentArticleCategories.includes(cat)
                );
            }
        );

        const shuffled = projectsInSameCategory.sort(()=> 0.5 - Math.random());
        randomProjects.value = shuffled.slice(0, 3);

        hideLoadingBar(showArticle);
    }
    catch(error) {
        randomProjects.value = [];
        hideLoadingBar(showError);
    }
};

let animateInterval: number = 0;
const loadArticle = async (id: string | string[])=> {
    isLoading.value = true;
    hasError.value = false;
    showArticleContent.value = false;

    const articleId = Array.isArray(id) ? id[0] : id;
    if(!articleId || isNaN(Number(articleId))) {
        router.push("/404");
        return;
    }

    try {
        const response = await fetch(`./database/projects/${articleId}.json`);
        if(!response.ok)
            throw new Error(`Failed to fetch project data: ${response.status}`);

        const data = await response.json();
        projectTitle.value = document.title = data.title;
        projectContent.value = data.content;

        animateInterval = animateTitle(
            "Project: " + data.title + " | Nathanne Isip"
        );

        if(data.link)
            projectLink.value = data.link;
        else projectLink.value = "";

        await fetchAndSetRandomProjects(articleId);
        setTimeout(()=> {
            if(document.querySelector(".main-section"))
                baguetteBox.run(".main-section", {
                    animation: 'fadeIn',
                    noScrollBars: true,
                });
        }, 100);
    }
    catch(error) {
        console.error("Error loading article:", error);
        router.push("/404");

        hideLoadingBar(showError);
    }
};

watch(
    ()=> route.query.id,
    (newId)=> {
        if(!parseInt(newId as string, 10)) {
            hideLoadingBar(showError);
            return;
        }

        if(newId)
            loadArticle(newId as string);
    },
    {immediate: true}
);

onBeforeRouteLeave(()=> clearInterval(animateInterval));
</script>

<template>
    <div v-if="showArticleContent" class="row gx-0 mb-0 pb-0">
        <div class="col-9 col-lg-8 mb-0 pb-0">
            <h1 class="shimmer mt-2 mb-0 pb-0">{{ projectTitle }}</h1>
        </div>

        <div class="col-3 col-lg-4 mb-0 pb-0">
            <div v-if="projectLink !== ''" class="w-100" align="right">
                <a :href="projectLink" class="btn btn-info" target="_blank"><i class="bi bi-github"></i><span class="desktop-only"> View on GitHub</span></a>
            </div>
        </div>
    </div>
    <hr/>

    <div v-if="isLoading" id="loading-section" class="d-block" align="center">
        <br/>
        <img src="/images/gear.png" class="rotating-gear mt-2" width="32" />
        <p class="mt-3">Article is currently being loaded, please wait...</p>
        <br/>
    </div>

    <div v-if="hasError" id="error-section" class="d-block" align="center">
        <br/>
        <p class="mt-3">Something went wrong while trying to load article.</p>
        <br/>
    </div>

    <div v-if="showArticleContent" class="main-section" id="main-content" v-html="projectContent"></div>

    <template v-if="!isLoading && randomProjects.length > 0">
        <br/><hr/><br/>
        <h2 class="shimmer" align="center">You might also like</h2>
        <div class="row equal-cols m-0 p-0">
            <div
                v-for="(item, index) in randomProjects"
                :key="(item as any).id"
                :class="['col-12 col-lg-4']"
                :style="{ 'margin-left': index === 1 ? 'auto' : '0', 'margin-right': index === 1 ? 'auto' : '0' }"
            >
                <ProjectCard :item="item" />
            </div>
        </div>
        <br/>
    </template>
    <template v-else-if="!isLoading && !hasError && randomProjects.length === 0">
        <br/><hr/><br/>
        <p class="mb-4 pb-3" align="center"><span class="shimmer">No other projects to recommend at the moment.</span></p>
    </template>
</template>
