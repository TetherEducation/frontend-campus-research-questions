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
    const keyInterface = researchStore.isTenantCl ? 'question_1' : 'plans_to_enroll';
    researchStore.setAnswer(firstQuestionResult.value, keyInterface)
    if (researchStore.isTenantCl) {
        researchStore.setResearchStep(ResearchStep.secondQuestion)
        return;
    }

    const step = firstQuestionResult.value === 3 ? ResearchStep.questionCampusAround : ResearchStep.secondQuestion;
    researchStore.setResearchStep(step)
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
