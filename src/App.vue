<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from 'vue-router';

import { toggleBurger } from "./scripts/burger.ts";
import Footer from "./components/Footer.vue";
import NavigationBar from "./components/NavigationBar.vue";
import TantanAI from "./components/TantanAI.vue";

const route = useRoute();
watch(
    () => route.fullPath,
    async (_, __) => window.scrollTo(0, 0)
);

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
});
</script>

<template>
    <NavigationBar />

    <br class="desktop-only"/>
    <br/><br/><br/><br/>

    <div class="w-100 p-4 container">
        <RouterView />
        <Footer />
    </div>

    <TantanAI />
</template>
