<script lang="ts">
export default {
    mounted() {
        const root = document.documentElement;
        const marqueeContent = this.$el.querySelector("ul.marquee-content") as HTMLElement;

        if(!marqueeContent)
            return;

        const originalCount = marqueeContent.children.length;
        root.style.setProperty("--marquee-elements", originalCount.toString());

        const marqueeElementsDisplayed = parseInt(
            getComputedStyle(root)
                .getPropertyValue("--marquee-elements-displayed")
        );

        const items = Array.from(marqueeContent.children);
        for(let i = 0; i < marqueeElementsDisplayed; i++)
            marqueeContent.appendChild(
                items[i].cloneNode(true) as HTMLElement
            );
    }
};
</script>

<template>
    <div class="w-100 mt-2 mt-lg-4" align="center">
        <div class="marquee">
            <ul class="marquee-content">
                <li><a target="_blank" href="https://learn.microsoft.com/en-us/dotnet/csharp/"><img src="@/assets/images/icons/ic-csharp.png" width="52" /></a></li>
                <li><a target="_blank" href="https://github.com/nthnn/nthnn/raw/main/assets/ic-dotnet.png"><img src="@/assets/images/icons/ic-dotnet.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.java.com/en/"><img src="@/assets/images/icons/ic-java.png" width="52" /></a></li>
                <li><a target="_blank" href="https://kotlinlang.org/"><img src="@/assets/images/icons/ic-kotlin.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.rust-lang.org/"><img src="@/assets/images/icons/ic-rust.png" width="52" /></a></li>
                <li><a target="_blank" href="https://github.com/nthnn/nthnn/raw/main/assets/ic-golang.png"><img src="@/assets/images/icons/ic-golang.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.typescriptlang.org/"><img src="@/assets/images/icons/ic-typescript.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.javascript.com/"><img src="@/assets/images/icons/ic-js.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.python.org/"><img src="@/assets/images/icons/ic-python.png" width="52" /></a></li>
                <li><a target="_blank" href="https://ballerina.io/"><img src="@/assets/images/icons/ic-ballerina.png" width="52" /></a></li>
                <li><a target="_blank" href="https://jupyter.org/"><img src="@/assets/images/icons/ic-jupyter.png" width="52" /></a></li>
                <li><a target="_blank" href="https://git-scm.com/"><img src="@/assets/images/icons/ic-git.png" width="52" /></a></li>
                <li><a target="_blank" href="https://github.com/"><img src="@/assets/images/icons/ic-github.png" width="52" /></a></li>
                <li><a target="_blank" href="https://github.com/"><img src="@/assets/images/icons/ic-github-actions.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.docker.com/"><img src="@/assets/images/icons/ic-docker.png" width="52" /></a></li>
                <li><a target="_blank" href="https://markdownguide.org/"><img src="@/assets/images/icons/ic-markdown.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.php.net/"><img src="@/assets/images/icons/ic-php.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.mysql.com/"><img src="@/assets/images/icons/ic-mysql.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.apachefriends.org/"><img src="@/assets/images/icons/ic-xampp.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.iso.org/standard/74528.html"><img src="@/assets/images/icons/ic-clang.png" width="52" /></a></li>
                <li><a target="_blank" href="https://cplusplus.com/"><img src="@/assets/images/icons/ic-cpp.png" width="52" /></a></li>
                <li><a target="_blank" href="https://doxygen.nl/"><img src="@/assets/images/icons/ic-doxygen.png" width="52" /></a></li>
                <li><a target="_blank" href="https://llvm.org/"><img src="@/assets/images/icons/ic-llvm.png" width="52" /></a></li>
                <li><a target="_blank" href="https://vercel.com/"><img src="@/assets/images/icons/ic-vercel.png" width="52" /></a></li>
                <li><a target="_blank" href="https://nodejs.org/en"><img src="@/assets/images/icons/ic-nodejs.png" width="52" /></a></li>
                <li><a target="_blank" href="https://nodemon.io/"><img src="@/assets/images/icons/ic-nodemon.png" width="52" /></a></li>
                <li><a target="_blank" href="https://jestjs.io/"><img src="@/assets/images/icons/ic-jest.png" width="52" /></a></li>
                <li><a target="_blank" href="https://parceljs.org/"><img src="@/assets/images/icons/ic-parcel.png" width="52" /></a></li>
                <li><a target="_blank" href="https://vitejs.dev/"><img src="@/assets/images/icons/ic-vite.png" width="52" /></a></li>
                <li><a target="_blank" href="https://vuejs.org/"><img src="@/assets/images/icons/ic-vue.png" width="52" /></a></li>
                <li><a target="_blank" href="https://babeljs.io/"><img src="@/assets/images/icons/ic-babel.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.electronjs.org/"><img src="@/assets/images/icons/ic-electronjs.png" width="52" /></a></li>
                <li><a target="_blank" href="https://react.dev/"><img src="@/assets/images/icons/ic-reactjs.png" width="52" /></a></li>
                <li><a target="_blank" href="https://postcss.org/"><img src="@/assets/images/icons/ic-postcss.png" width="52" /></a></li>
                <li><a target="_blank" href="https://tailwindcss.com/"><img src="@/assets/images/icons/ic-tailwind.png" width="52" /></a></li>
                <li><a target="_blank" href="https://flowbite.com/"><img src="@/assets/images/icons/ic-flowbite.png" width="52" /></a></li>
                <li><a target="_blank" href="https://heroicons.com/"><img src="@/assets/images/icons/ic-heroicons.png" width="52" /></a></li>
                <li><a target="_blank" href="https://firebase.google.com/"><img src="@/assets/images/icons/ic-firebase.png" width="52" /></a></li>
                <li><a target="_blank" href="https://html5.org/"><img src="@/assets/images/icons/ic-html5.png" width="52" /></a></li>
                <li><a target="_blank" href="https://pugjs.org/api/getting-started.html"><img src="@/assets/images/icons/ic-pug.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.css3.com/"><img src="@/assets/images/icons/ic-css3.png" width="52" /></a></li>
                <li><a target="_blank" href="https://sass-lang.com/"><img src="@/assets/images/icons/ic-sass.png" width="52" /></a></li>
                <li><a target="_blank" href="https://getbootstrap.com/"><img src="@/assets/images/icons/ic-bootstrap.png" width="52" /></a></li>
                <li><a target="_blank" href="https://jquery.com/"><img src="@/assets/images/icons/ic-jquery.png" width="52" /></a></li>
                <li><a target="_blank" href="https://phaser.io/"><img src="@/assets/images/icons/ic-phaser.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.mapeditor.org/"><img src="@/assets/images/icons/ic-tiledmap.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.arduino.cc/"><img src="@/assets/images/icons/ic-arduino.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.espressif.com/"><img src="@/assets/images/icons/ic-espressif.png" width="52" /></a></li>
                <li><a target="_blank" href="https://platformio.org/"><img src="@/assets/images/icons/ic-platformio.png" width="52" /></a></li>
                <li><a target="_blank" href="https://tinygo.org/"><img src="@/assets/images/icons/ic-tinygo.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.adafruit.com/"><img src="@/assets/images/icons/ic-adafruit.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/8-bit-mcus/avr-mcus"><img src="@/assets/images/icons/ic-avr.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html"><img src="@/assets/images/icons/ic-stm32.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.microchip.com/"><img src="@/assets/images/icons/ic-atmel.png" width="52" /></a></li>
                <li><a target="_blank" href="https://easyeda.com/"><img src="@/assets/images/icons/ic-easyeda.png" width="52" /></a></li>
                <li><a target="_blank" href="https://visualstudio.microsoft.com/"><img src="@/assets/images/icons/ic-visual-studio.png" width="52" /></a></li>
                <li><a target="_blank" href="https://code.visualstudio.com/"><img src="@/assets/images/icons/ic-visual-studio-code.png" width="52" /></a></li>
                <li><a target="_blank" href="https://developer.android.com/studio"><img src="@/assets/images/icons/ic-android-studio.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.jetbrains.com/idea/"><img src="@/assets/images/icons/ic-intellij.png" width="52" /></a></li>
                <li><a target="_blank" href="https://netbeans.apache.org/"><img src="@/assets/images/icons/ic-netbeans.png" width="52" /></a></li>
                <li><a target="_blank" href="https://www.bloodshed.net/"><img src="@/assets/images/icons/ic-devcpp.png" width="52" /></a></li>
                <li><a target="_blank" href="https://github.com/GValiente/butano"><img src="@/assets/images/icons/ic-gba.png" width="52" /></a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.marquee {
    width: var(--marquee-width);
    overflow: hidden;
    position: relative;
}

.marquee:before, .marquee:after {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100%;
    content: "";
    z-index: 1;
}

.marquee:before {
    left: 0;
    background: linear-gradient(to right, var(--bs-primary) 0%, transparent 100%);
}

.marquee:after {
    right: 0;
    background: linear-gradient(to left, var(--bs-primary) 0%, transparent 100%);
}

.marquee-content {
    list-style: none;
    display: flex;
    animation: scrolling var(--marquee-animation-duration) linear infinite;
}

.marquee-content li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: var(--marquee-element-width);
    white-space: nowrap;
}

.marquee-content li img {
    object-fit: cover;
    object-position: center;
}

@keyframes scrolling {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-1 * var(--marquee-element-width) * var(--marquee-elements)));
    }
}

@media only screen and (max-width: 771px) {
    .marquee-content img {
        width: 36px;
    }

    .marquee:before, .marquee:after {
        width: 5.2rem;
    }

    .marquee:after {
        right: -10px !important;
    }
}
</style>
