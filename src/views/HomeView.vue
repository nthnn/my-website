<script setup lang="ts">
import MeCard from "@/components/MeCard.vue";
import MyExperiences from "@/components/MyExperiences.vue";
import MyExpertise from "@/components/MyExpertise.vue";
import Testimonials from "@/components/Testimonials.vue";

import { useRoute } from "vue-router";
import { watch, onMounted } from "vue";
import { hideLoadingBar } from "../scripts/loading.ts";

const route = useRoute();
watch(
    ()=> route.fullPath,
    async (_, __)=>
        hideLoadingBar(()=> {})
);
onMounted(hideLoadingBar);
</script>

<template>
    <MeCard />

    <div class="p-lg-4">
        <div align="center">
            <div class="col-lg-11" align="left">
                <div class="mt-2 mb-4 border-1 border-gray border-top border-bottom w-100 p-3 toc" align="center">
                    <a href="#experiences" class="d-inline-block text-decoration-none text-uppercase"><i class="bi bi-briefcase"></i> <span class="desktop-only">Experiences</span></a>
                    <a href="#expertise" class="d-inline-block text-decoration-none text-uppercase ms-4"><i class="bi bi-cup-hot"></i> <span class="desktop-only">Expertise</span></a>
                    <a href="#testimonials" class="d-inline-block text-decoration-none text-uppercase ms-4"><i class="bi bi-trophy"></i> <span class="desktop-only">Testimonials</span></a>
                </div>

                <MyExperiences />
                <MyExpertise />
                <Testimonials />
            </div>
        </div>
    </div>
</template>

<style scoped>
.toc a {
    color: var(--bs-gray-400) !important;
}
</style>
