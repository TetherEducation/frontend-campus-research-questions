<script setup lang="ts">
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';

const researchStore = useResearchStore();

</script>
<template>
    <section class="">
        <div>
            Template
        </div>
        <div>
            <NextButton @click="researchStore.setResearchStep(ResearchStep.secondQuestion)" />
        </div>
    </section>
</template>
<style scoped>
</style>