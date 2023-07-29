<script setup lang="ts">
import { useResearchStore } from '@/stores/research';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const researchStore = useResearchStore();

const breadcrumb = computed(() => {
    return t(`${researchStore.researchStep.toLowerCase()}.breadcrumb`);
})

</script>
<template>
    <nav>        
        <button type="button" @click="$router.back()" class="mr-4">
            <img src="@/assets/arrow-left.svg" alt="arrow left" width="24">
        </button>
        <img v-if="researchStore.isTenantCl" src="@/assets/sae.svg" alt="explorer" width="60">
        <img v-else src="@/assets/explorer.svg" alt="explorer" width="30">
        <h1 class="mt-4">{{ breadcrumb }}</h1>
        <progress id="file" max="100" value="100" class="mx-1 progress"></progress>
    </nav>
</template>
<style scoped>
nav {
    background: var(--primary-color-light);
    position: relative;
    height: 8.7rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.09);
    padding: 1.5rem 2rem 0;

    /* margin-top: -1.5rem; */
}

nav > img {
    top: 0;
    right: 0;
    margin: 1.5rem;
    position: absolute;
}

nav > button {
    position: absolute;
    background: transparent;
    top: 0;
    left: 0;
    margin: 1rem 0 0 1rem;
}

progress[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    width: calc(100% - 2rem);
    height: 2px;
}

progress[value]::-webkit-progress-bar {
    background-color: #EBEBEB;
}

progress[value]::-webkit-progress-value {
    background: var(--secondary-color);
}

progress[value]::-moz-progress-bar {
    background-color: #EBEBEB;
}

progress[value]::-moz-progress-value {
    background: var(--secondary-color);
}
</style>