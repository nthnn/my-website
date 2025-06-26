<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from 'vue-router';
import { toggleBurger } from "./scripts/burger.ts";
import { showLoadingBar } from "./scripts/loading.ts";

import Footer from "./components/Footer.vue";
import NavigationBar from "./components/NavigationBar.vue";
import TantanAI from "./components/TantanAI.vue";

const route = useRoute();
watch(
    () => route.fullPath,
    async (_, __) => {
        showLoadingBar();
        window.scrollTo(0, 0);
    }
);

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
});
</script>

<template>
    <div id="loading" class="prog-bar">
        <div class="indeterminate-chunk"></div>
    </div>

    <NavigationBar />

    <br class="desktop-only"/>
    <br/><br/><br/><br/>

    <div class="w-100 p-4 container">
        <RouterView />
        <Footer />
    </div>

    <TantanAI />
</template>

<style>
.prog-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    overflow: hidden;
    z-index: 9999;
}

.indeterminate-chunk {
    position: absolute;
    height: 100%;
    width: 20%;
    background: linear-gradient(90deg, #0d6efd 0%, #66b2ff 100%);
    animation: slideChunk 1.2s infinite ease-in-out;
    border-radius: 2px;
}

@keyframes slideChunk {
    0% {
        left: -20%;
    }
    50% {
        left: 50%;
        width: 30%;
    }
    100% {
        left: 100%;
        width: 20%;
    }
}
</style>