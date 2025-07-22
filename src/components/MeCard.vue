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
    <div class="row mt-4">
        <div class="col-lg-1"></div>

        <div class="col-lg-3" align="center">
            <img src="/images/me.png" class="rounded-circle w-100 border border-gray desktop-only" />
            <img src="/images/me.png" class="rounded-circle w-75 border border-gray mobile-only" />
        </div>

        <div class="col-lg-7" align="center">
            <br class="mobile-only"/>
            <br class="mobile-only"/>

            <div align="left">
                <h1 class="display-3 text-white fw-light"><span class="fw-light">Hi, I'm</span> <b class="fw-bold shimmer">Nathanne</b></h1>
                <h3 class="text-gray lead">Building softwares, apps, and more</h3>

                <hr/>
                <pre class="code desktop-only"><span class="hl-text blue-hover">.learn()</span> <span class="hl-text blue-hover">.code()</span> <span class="hl-text blue-hover">.create()</span></pre>

                <p>{{getCurrentAge()}}-year-old experienced software engineer from Metro Manila, Philippines, with a strong foundation in software engineering, leadership experience, and customer service.</p>

                <h4 class="w-100 mb-4 mobile-only" align="center">
                    <a href="https://github.com/nthnn" target="_blank" class="blue-hover"><i class="bi bi-github"></i></a>
                    <a href="https://www.linkedin.com/in/nathannestein" target="_blank" class="ms-3 blue-hover"><i class="bi bi-linkedin"></i></a>
                    <a href="mailto:nathanneisip@gmail.com?subject=Re:Resume%20%3e%3e%20Nathanne%20Isip" target="_blank" class="ms-3 blue-hover"><i class="bi bi-google"></i></a>
                </h4>
                <pre class="code mobile-only w-100" align="center"><span class="hl-text">.learn()</span> <span class="hl-text">.code()</span> <span class="hl-text">.create()</span></pre>

                <h4 class="desktop-only mt-3">
                    <a href="https://github.com/nthnn" target="_blank" class="blue-hover"><i class="bi bi-github"></i></a>
                    <a href="https://www.linkedin.com/in/nathannestein" target="_blank" class="ms-3 blue-hover"><i class="bi bi-linkedin"></i></a>
                    <a href="mailto:nathanneisip@gmail.com?subject=Re:Resume%20%3e%3e%20Nathanne%20Isip" target="_blank" class="ms-3 blue-hover"><i class="bi bi-google"></i></a>
                </h4>
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
</style>
