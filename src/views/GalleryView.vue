<script setup lang="ts">
import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

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
    fetch("./database/gallery.json").then(response => {
        if(!response.ok)
            throw new Error("Network response was not ok");

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
                animation: 'fadeIn',
                noScrollBars: true,
            });

            reveal();
        }
    })
    .catch(()=> {
        const errorMessage = document.getElementById("error-message");
        if(errorMessage) {
            errorMessage.classList.remove("d-none");
            errorMessage.classList.add("animate__animated", "animate__fadeIn");
        }
    });

    document.addEventListener("scroll", reveal);
}

loadGallery();
</script>

<template>
    <h1>Gallery</h1>
    <hr/>

    <div id="gallery">
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
