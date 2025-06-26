<script setup lang="ts">
import { toggleBurger } from "../scripts/burger.ts";
import { computed, reactive } from "vue";
import {
    type RouteLocationNormalizedLoaded,
    RouterLink,
    useRoute
} from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute();
var pageData = reactive({
    currentRoute: computed(()=> route.name)
});
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-primary fixed-top">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand text-white mobile-only" v-on:click="toggleBurger">Nathanne Isip</RouterLink>
            <button id="nav-burger" class="navbar-toggler focus-ring focus-ring-primary" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex justify-content-center" id="main-navbar">
                <ul class="navbar-nav mx-auto nav-underline">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link nav-brand text-white desktop-only" v-on:click="toggleBurger">Nathanne Isip</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/projects" v-bind:class="pageData.currentRoute == 'projects' ? 'nav-link active' : 'nav-link'" v-on:click="toggleBurger">Projects</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/gallery" v-bind:class="pageData.currentRoute == 'gallery' ? 'nav-link active' : 'nav-link'" v-on:click="toggleBurger">Gallery</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/blogs" v-bind:class="pageData.currentRoute == 'contacts' ? 'nav-link active' : 'nav-link'" v-on:click="toggleBurger">Contacts</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a target="_blank" href="https://github.com/nthnn" class="nav-link" v-on:click="toggleBurger">GitHub</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav-link {
    color: var(--bs-gray-600) !important;
    transition: all 0.3s ease-in-out;
}

.nav-brand {
    color: var(--bs-white) !important;
    font-weight: bold;
}

.navbar {
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    background: rgba(26, 26, 26, 0.7) !important;
    border-style: solid !important;
    border-width: 0px 0px 1px 0px !important;
    border-color: rgba(85, 89, 92, 0.5) !important;
}
</style>
