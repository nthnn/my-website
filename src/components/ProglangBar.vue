<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true
    }
});

const barClass = computed(() => {
    if(props.progress >= 15)
        return "bg-success";
    else if(props.progress >= 10)
        return "bg-info";
    else if(props.progress >= 5)
        return "bg-warning";

    return "bg-danger";
})
</script>

<template>
    <div class="mb-3">
        <div class="d-flex justify-content-between mb-1 text-white">
            <span>{{ name }}</span>
            <span>{{ progress }}%</span>
        </div>
    
        <div class="progress">
            <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                :class="barClass"
                role="progressbar"
                :style="{ width: progress + '%' }"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    </div>
</template>

<style scoped>
.progress {
    height: 0.5rem;
}
</style>
