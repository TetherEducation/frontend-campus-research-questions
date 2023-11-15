<script setup lang="ts">
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';
import { ref } from 'vue';

const firstQuestionResult = ref<number>(0);
const researchStore = useResearchStore();

const setResult = (result: number) => {
    firstQuestionResult.value = result;
}

const nextStep = () => {
    return firstQuestionResult.value === 0 ? null : setNexStep()
}

const setNexStep = () => {
    const keyInterface = 'question_4';
    researchStore.setAnswer(firstQuestionResult.value, keyInterface)
    researchStore.setResearchStep(ResearchStep.firstQuestion)
}
</script>
<template>
    <section class="container-question">
        <div>
            <RadioButtonQuestion @selectionResult="setResult($event)" />
        </div>
        <div class="container-question__button">
            <NextButton @click="nextStep()" />
        </div>
    </section>
</template>
