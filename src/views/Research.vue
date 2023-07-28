<script setup lang="ts">
import { useResearchStore } from '@/stores/research';
import { watch } from 'vue';
import { i18n } from "../i18n";

const researchStore = useResearchStore();

watch(
    () => researchStore.researchConfiguration,
    (value) => {
        const locale: any = `es-${value?.tenant?.toUpperCase()}`
        i18n.global.locale.value = locale;
        console.log("🚀 ~ file: Research.vue:13 ~ le:", locale)
    },
    { immediate: true }
)
// window.addEventListener("message", function(event: any) {

//     if (event.data.context === 'research') {
//         setDataResearch(event?.data?.action, event?.data?.value);
//         return;
//     }
// });

// sendTopPostMessage('initData', '');

</script>
<template>
    <Loader v-if="researchStore.loading" />
    <main v-else>
        <Navbar />
        <component :is="researchStore.researchStep" class="container" />
    </main>
</template>
<style scoped>
.container {
    width: 100%;
    height: calc(100% - 8.7rem);
    padding: 2rem;
}

</style>
