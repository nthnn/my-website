<script setup lang="ts">
import { Modal } from "bootstrap";
import { useRoute } from "vue-router";
import { RouterView } from 'vue-router';
import { watch, onMounted } from "vue";

import {
    showLoadingBar,
    hideLoadingBar
} from "./scripts/loading";

import Cookies from "js-cookie";

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

onMounted(()=> {
    if(Cookies.get("has_visited") !== undefined)
        return;

    fetch("./database/events.json").then(response => {
        if(!response.ok) {
            hideLoadingBar(()=> {});
            throw new Error("Network response was not ok");
        }

        return response.json();
    }).then((data: {date: string, title: string, message: string}[]) => {
        let now = new Date();
        let isTodaysDate = (date: Date)=> {
            return now.getFullYear() === date.getFullYear() &&
                now.getMonth() == date.getMonth() &&
                now.getDate() == date.getDate();
        }, setModalInfo = (title: string, message: string)=> {
            (document.getElementById(
                "announcement-title"
            ) as HTMLElement).innerHTML = title;
            (document.getElementById(
                "announcement-message"
            ) as HTMLElement).innerHTML = message;
        }, showModal = ()=>
            new Modal(document.getElementById("announcement"))
                .show();

        for(let i = 0; i < data.length; i++) {
            if(data[i].date == "none")
                continue;

            if(data[i].date == "ongoing" || isTodaysDate(new Date(data[i].date))) {
                setModalInfo(
                    data[i].title,
                    data[i].message
                );
                showModal();
            }

            Cookies.set("has_visited", "1", {
                expires: new Date(
                    now.getTime() + (2 * 60 * 60 * 1000)
                )
            });
        }
    });
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

    <div class="modal fade" id="announcement" tabindex="-1" aria-labelledby="announcementLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border border-gray">
                <div class="modal-header">
                    <h5 class="modal-title" id="announcement-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span id="announcement-message"></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
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