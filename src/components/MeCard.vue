<script setup lang="ts">
import StackMarquee from './StackMarquee.vue';

function getCurrentAge(): number {
    const today: Date = new Date();
    const birthDate: Date = new Date('2002-08-08');

    let age: number = today.getFullYear() - birthDate.getFullYear();
    const monthDiff: number = today.getMonth() - birthDate.getMonth();

    if(monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate()))
        age--;

    return age;
}
</script>

<template>
    <div class="row">
        <div class="col-lg-1"></div>

        <div class="col-lg-3" align="center">
            <img src="@/assets/images/me.jpg" class="rounded-circle w-100 desktop-only" />
            <img src="@/assets/images/me.jpg" class="rounded-circle w-75 mobile-only" />
        </div>

        <div class="col-lg-7" align="center">
            <br class="mobile-only"/>
            <br class="mobile-only"/>

            <div align="left">
                <h1 class="display-3 text-white fw-light"><span class="fw-light">Hi, I'm</span> <b class="fw-bold">Nathanne</b></h1>
                <h3 class="text-gray">Building <span class="build-text">softwares, apps, and more</span></h3>

                <h4 class="desktop-only mt-3">
                    <a href="https://github.com/nthnn" target="_blank"><i class="bi bi-github"></i></a>
                    <a href="https://www.linkedin.com/in/nathannestein" target="_blank" class="ms-3"><i class="bi bi-linkedin"></i></a>
                    <a href="https://nthnn.medium.com/" target="_blank" class="ms-3"><i class="bi bi-medium"></i></a>
                </h4>

                <div class="w-100 mobile-only" align="center">
                    <h4>
                        <a href="https://github.com/nthnn" target="_blank"><i class="text-gray bi bi-github"></i></a>
                        <a href="https://www.linkedin.com/in/nathannestein" target="_blank" class="ms-3"><i class="text-gray bi bi-linkedin"></i></a>
                        <a href="https://nthnn.medium.com/" target="_blank" class="ms-3"><i class="text-gray bi bi-medium"></i></a>
                    </h4>
                </div>

                <hr/>
                <pre class="code desktop-only"><span class="hl-text">.learn()</span> <span class="hl-text">.code()</span> <span class="hl-text">.create()</span></pre>
                <p>{{getCurrentAge()}}-year-old experienced software engineer from Metro Manila, Philippines, with a strong foundation in leadership experience and customer service.</p>
                <pre class="code mobile-only w-100" align="center"><span class="hl-text">.learn()</span> <span class="hl-text">.code()</span> <span class="hl-text">.create()</span></pre>
            </div>
        </div>

        <div class="col-lg-1"></div>
    </div>

    <br/>
    <StackMarquee />
    <br class="mobile-only"/>
</template>

<style scoped>
.code {
	border: 1px solid rgba(255, 255, 255, 0.25);
	padding: 3px 12px 3px 12px;
	width: fit-content;
}

.build-text {
    background: -webkit-linear-gradient(180deg, var(--bs-info), var(--bs-danger));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
