<script setup lang="ts">
import "baguettebox.js/dist/baguetteBox.min.css";
import baguetteBox from "baguettebox.js/dist/baguetteBox.min.js";

import { getParameters } from '@/scripts/params';

let isValidID = (str: string)=>
    !isNaN(str as any) && !isNaN(parseFloat(str));

((paramName, callback) => {
    const paramValue = getParameters().get(paramName);

    if(paramValue)
        callback(paramValue);
})("id", (id: string) => {
    if (isValidID(id)) {
        fetch("./database/projects/" + id + ".json")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch");
                return response.json();
            })
            .then(data => {
                document.title = data["title"];
                (document.getElementById(
                    "main-content"
                ) as HTMLElement).innerHTML = data["content"];

                baguetteBox.run(".main-section", {
                    animation: 'fadeIn',
                    noScrollBars: true,
                });
            }).catch(() => {
                window.location.href = "404.html";
            });
    }
    else window.location.href = "404.html";
});

</script>

<template>
    <div class="container main-section" id="main-content"></div>
</template>
