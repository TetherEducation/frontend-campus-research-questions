<script setup lang="ts">
import { useResearchStore } from '../stores/research';
const { getBreadcrumb, previousStep } = useResearchStore();
</script>
<template>
    <nav>
        <button type="button" @click="previousStep()">
            <img src="../assets/arrow-left.svg" alt="arrow left" width="24">
        </button>
        <img src="../assets/explorer.svg" alt="explorer" width="30">
        <h1 class="mt-4 px-1">{{ getBreadcrumb() }}</h1>
        <progress id="file" max="100" value="100" class="mx-1 progress"></progress>
    </nav>
</template>
