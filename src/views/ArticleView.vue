<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

const route = useRoute();
const router = useRouter();

const projectContent = ref("");
const projectTitle = ref("");
const projectLink = ref("");

const loadArticle = async (id: string | string[]) => {
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

        setTimeout(() => {
            if(document.querySelector(".main-section")) {
                baguetteBox.run(".main-section", {
                    animation: 'fadeIn',
                    noScrollBars: true,
                });
            }
        }, 100);
    }
    catch(error) {
        console.error("Error loading article:", error);
        router.push("/404");
    }
};

watch(
    () => route.query.id,
    (newId) => {
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
    <br/>
</template>
