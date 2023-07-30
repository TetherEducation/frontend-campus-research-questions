<script setup lang="ts">
import { useResearchStore } from '@/stores/research';

const researchStore = useResearchStore();


const payloadSecondQuestion: any = {
    comuna: null,
    question_3: null,
    school: null
}



const nextStep = () => {
    if (researchStore.isTenantCl) {
        return setNexStep()
    }

    return payloadSecondQuestion.knows_school !== null ? setNexStep() : null;
}

const setNexStep = () => {
    // if (!researchStore.isTenantCl) {
    //     researchStore.setAnswer(payloadSecondQuestion.knows_school, 'knows_school')

    // }
    // researchStore.setAnswer(payloadSecondQuestion.question_3, 'question_3')
    // researchStore.setAnswer(payloadSecondQuestion.school, 'school')
    // researchStore.setAnswer(payloadSecondQuestion.comuna, 'comuna')

    // researchStore.setResearchStep(ResearchStep.questionCampusAround)

}

</script>
<template>
    <section class="container-question">
        <div>
            hola
          <MapAndQuestion :showIcon="false" />
        </div>
    <div class="container-question__button">
            <NextButton @click="nextStep()" />
        </div>
    </section>
</template>
<style scoped>
</style>

