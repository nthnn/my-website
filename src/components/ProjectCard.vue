<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
    item: {
        id: number,
        title: string,
        short_description: string,
        description: string,
        thumbnail: string,
        category: Array<string>
    }
}>();

const router = useRouter();
const goToProjectDetail = ()=> {
    router.push({ name: 'view', query: { id: props.item.id } });
};

function capitalizeFirstLetter(str: string): string {
    return str.length === 0 ? "" :
        str.charAt(0).toUpperCase() + str.slice(1);
}

props.item.category.forEach((cat, index)=> {
    if(cat == "ai")
        props.item.category[index] = "AI";
    else props.item.category[index] =
        capitalizeFirstLetter(cat);
});
</script>

<template>
    <div
        class="card card-body bg-primary border border-gray p-0"
        @click="goToProjectDetail"
        align="left"
    >
        <img :src="`./images/projects/${props.item.thumbnail}.png`" class="w-100" />

        <div class="px-4 py-2">
            <h3 class="card-title mt-2 mb-0 pb-0">{{ props.item.title }}</h3>
            <small><i>{{ props.item.short_description }}</i></small>

            <div class="d-flex flex-wrap gap-1 mt-2 mb-4">
                <span v-for="cat in props.item.category" :key="cat" class="badge bg-info">
                    {{ cat }}
                </span>
            </div>

            <p class="mt-2">{{ props.item.description }}</p>
        </div>
    </div>
</template>
