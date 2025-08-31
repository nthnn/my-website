import { createRouter, createWebHistory } from "vue-router";

import ArticleView from "@/views/ArticleView.vue";
import ContactsView from "@/views/ContactsView.vue";
import GalleryView from "@/views/GalleryView.vue";
import HomeView from "@/views/HomeView.vue";
import ProjectsView from "@/views/ProjectsView.vue";

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
            path: "/contacts",
            name: "contacts",
            component: ContactsView
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/404"
        },
    ]
});

export default router;
