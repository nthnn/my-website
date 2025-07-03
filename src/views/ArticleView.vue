<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

import ProjectCard from "@/components/ProjectCard.vue";

const route = useRoute();
const router = useRouter();

const projectContent = ref("");
const projectTitle = ref("");
const projectLink = ref("");
const randomProjects = ref([]);

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
    }
    catch(error) {
        randomProjects.value = [];
    }
};

const loadArticle = async (id: string | string[])=> {
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
    }
};

watch(
    ()=> route.query.id,
    (newId)=> {
        if(newId)
            loadArticle(newId as string);
    },
    {immediate: true}
);
</script>

<template>
    <div class="row gx-0 mb-0 pb-0">
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

    <div class="main-section" id="main-content" v-html="projectContent"></div>
    <br/><hr/><br/>

    <template v-if="randomProjects.length > 0">
        <h2 class="shimmer" align="center">You might also like</h2>
        <div class="row equal-cols m-0 p-0">
            <div
                v-for="(item, index) in randomProjects"
                :key="item.id"
                :class="['col-12 col-lg-4']"
                :style="{ 'margin-left': index === 1 ? 'auto' : '0', 'margin-right': index === 1 ? 'auto' : '0' }"
            >
                <ProjectCard :item="item" />
            </div>
        </div>
        <br/>
    </template>
    <template v-else>
        <p class="mb-4 pb-3" align="center"><span class="shimmer">No other projects to recommend at the moment.</span></p>
    </template>
</template>
