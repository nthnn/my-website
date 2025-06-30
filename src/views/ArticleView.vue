<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

const route = useRoute();
const router = useRouter();

const projectContent = ref("");
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
        document.title = data.title;
        projectContent.value = data.content;

        setTimeout(() => {
            if (document.querySelector(".main-section")) {
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
    <div>
        <div class="container main-section" id="main-content" v-html="projectContent"></div>
    </div>
</template>
