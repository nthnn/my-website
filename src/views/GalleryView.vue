<script setup lang="ts">
import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

import { hideLoadingBar } from "../scripts/loading.ts";
import { onMounted } from "vue";

import {
    addParameter,
    getParameters,
    removeParameter
} from "../scripts/params.ts";

var clickImage = (e: HTMLElement)=> {
    e.dispatchEvent(new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
    }));
};

let reveal = ()=> {
    const reveals = document.querySelectorAll(".reveal");
    for(const rev of reveals)
        if(rev.getBoundingClientRect().top < window.innerHeight - 90)
            rev.classList.add("active");
        else rev.classList.remove("active");
};

function loadGallery() {
    let showGallery = ()=> {
        let gallery = document.getElementById(
            "gallery"
        ) as HTMLElement;
        let galleryLoading = document.getElementById(
            "gallery-loading"
        ) as HTMLElement;

        galleryLoading.classList.remove("d-block");
        galleryLoading.classList.add("d-none");

        gallery.classList.remove("d-none");
        gallery.classList.add("d-block");

        const id = getParameters().get("id");
        if(id && Number.isInteger(parseInt(id, 10)))
            clickImage(document.getElementById("caption-" + id));
    };

    fetch("./database/gallery.json").then(response => {
        if(!response.ok) {
            hideLoadingBar(showGallery);
            throw new Error("Network response was not ok");
        }

        return response.json();
    }).then((data: {src: string, caption: string, date: string}[]) => {
        let content = "<div class=\"row\">", capId = 1;

        data.reverse();
        for(let i = 0; i < data.length; i++) {
            if(i % 3 == 0) content += "</div><div class=\"row\">";

            content += "<div class=\"col-lg-4" +
                (i <= 2 ? "" : " reveal fade-bottom") +
                "\"><a id=\"caption-" + capId +
                "\" href=\"" + data[i]["src"] +
                "\"><img class=\"img-fluid\" src=\"" + data[i]["src"] +
                "\" alt=\"" + data[i]["caption"] +
                "\" date=\"" + data[i]["date"] +
                "\"/></a><span id=\"caption-span-" + capId +
                "\" class=\"lead fw-bold gallery-caption\">" + data[i]["caption"] +
                "</span><p class=\"date\">" + data[i]["date"] +
                "</p></div>";

            capId++;
        }
        content += "</div>";

        const galleryContainer = document.querySelector(".gallery-container");
        if(galleryContainer) {
            galleryContainer.innerHTML = content;
            for(let i = 1; i < capId; i++) {
                const span = document.getElementById("caption-span-" + i);
                const anchor = document.getElementById("caption-" + i);

                if(span && anchor)
                    span.addEventListener("click", () => clickImage(anchor));
            }

            baguetteBox.run(".gallery-container", {
                animation: "slideIn",
                noScrollBars: true,
                captions: (elem)=> {
                    let img = elem.getElementsByTagName("img")[0];
                    return "<p class=\"fw-bold text-white mb-0 pb-0\">" + img.alt +
                        "</p><small class=\"mt-0 pt-0 text-gray\">" +
                        img.getAttribute("date") + "</small>"
                },
                afterHide: ()=> removeParameter("id"),
                onChange: (idx, _)=> addParameter("id", idx + 1)
            });

            hideLoadingBar(showGallery);
            reveal();
        }
    })
    .catch(()=> {
        const errorMessage = document.getElementById("error-message");
        if(errorMessage) {
            errorMessage.classList.remove("d-none");
            errorMessage.classList.add("animate__animated", "animate__fadeIn");
        }

        hideLoadingBar(showGallery);
    });

    document.addEventListener("scroll", reveal);
}

onMounted(() => loadGallery());
</script>

<template>
    <h1 align="center">Gallery</h1>
    <hr/>

    <div id="gallery-loading" align="center">
        <br/>

        <img src="/images/gear.png" class="rotating-gear" width="32" />
        <p>Gallery is currently being loaded, please wait...</p>
        <br/>
    </div>

    <div id="gallery" class="d-none" align="center">
        <div class="gallery-container"></div>
    </div>

    <div id="error-message" class="d-none animate__animated" align="center">
        <br/>
        <div id="error-card" class="card card-body border border-gray p-4 bg-dark animate__animated">
            <div align="center">
                <h1>&#x26A0;</h1>
                <h3>Cannot load gallery.</h3>
                <p>Something went wrong while trying to fetch data.</p>

                <a class="btn btn-secondary text-dark" v-on:click="loadGallery">Reload</a>
            </div>
        </div>

        <br/>
    </div>
</template>

<style>
.row {
    margin-bottom: 24px;
}

#gallery .col-lg-4 {
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    transition: .3s cubic-bezier(.6,.4,0,1),transform .15s ease;
    position: relative;
}

#gallery .col-lg-4 > :not(span) {
    transition: .3s cubic-bezier(.6,.4,0,1);
}

#gallery .col-lg-4 span {
    position: absolute;
    padding: 12px;
    font-size: 1.1em;
    inset: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: white;
    transition: all 500ms;
    display: flex;
    opacity: 0;
}

#gallery .col-lg-4 img {
    overflow: hidden;
    transition: transform .5s;
}

#gallery .col-lg-4:hover img {
    transform: scale(1.1);
}

#gallery .col-lg-4 .date {
    display: none;
    transition: all 500ms;
}

#gallery .col-lg-4:hover .date {
    padding: 0px;
    width: 100% !important;
    position: absolute;
    color: white;
    display: flex;
    bottom: 5px;
    text-align: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
}

#gallery .col-lg-4:hover span {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5.5px);
    -webkit-backdrop-filter: blur(5.5px);
    opacity: 1;
    top: 0;
}

.gallery-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.reveal {
    position: relative;
    opacity: 0;
}
  
.reveal.active {
    opacity: 1;
}

.active.fade-bottom {
    animation: fade-bottom 1s alternate;
}

#error-card {
    width: 50%;
}

figcaption {
    padding-top: 12px;
    padding-bottom: 6px;
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    background: rgba(26, 26, 26, 0.7) !important;
    border-style: solid !important;
    border-width: 0px 0px 1px 0px !important;
    border-color: rgba(85, 89, 92, 0.5) !important;
}

.rotating-gear {
  animation: rotate-gear 2s linear infinite;
  display: inline-block;
}

@keyframes rotate-gear {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-bottom {
    0% {
        transform: translateY(50px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@media only screen and (max-width: 771px) {
    .row { margin-bottom: 0px; }
}

@media only screen and (max-width: 771px) {
    #error-card { width: 100%; }
}
</style>
