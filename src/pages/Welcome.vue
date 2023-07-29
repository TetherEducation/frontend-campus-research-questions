<script setup lang="ts">
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';

const researchStore = useResearchStore();
</script>
<template>
    <section class="container-question">
        <div>
            <p v-html="$t('welcome.description')" />
        </div>
        <div class="container-question__button">
            <NextButton @click="researchStore.setResearchStep(ResearchStep.firstQuestion)" />
        </div>
    </section>
</template>
