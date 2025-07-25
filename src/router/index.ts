import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import GalleryView from "@/views/GalleryView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ArticleView from "@/views/ArticleView.vue";
import QuoteView from "@/views/QuoteView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "",
            name: "home",
            component: HomeView
        },
        {
            path: "/gallery",
            name: "gallery",
            component: GalleryView
        },
        {
            path: "/projects",
            name: "projects",
            component: ProjectsView
        },
        {
            path: "/view",
            name: "view",
            component: ArticleView
        },
        {
            path: "/quote",
            name: "quote",
            component: QuoteView
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/404"
        },
    ]
});

export default router;
