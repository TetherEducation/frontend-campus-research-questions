<script setup lang="ts">
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';
import { ref } from 'vue';

const researchStore = useResearchStore();

const showInputSection = ref<boolean>(false);

const payloadSecondQuestion: any = {
    knows_school: null,
    question_2: null,
    num_estab_post: null
}

const setResultRadioButton = (result: number) => {
    const key = researchStore.isTenantCl ? 'question_2' : 'knows_school';
    payloadSecondQuestion[key] = result;

    showInputSection.value = result === 1;
    !showInputSection && payloadSecondQuestion.num_estab_post === null;
}

const nextStep = () => {
    if (researchStore.isTenantCl) {
        return setNexStep()
    }

    return payloadSecondQuestion.knows_school !== null ? setNexStep() : null;
}

const setNexStep = () => {
    if (!researchStore.isTenantCl) {
        researchStore.setAnswer(payloadSecondQuestion.knows_school, 'knows_school')
        const step = payloadSecondQuestion.knows_school === 1 ? ResearchStep.thirdQuestion : ResearchStep.questionCampusAround;
        researchStore.setResearchStep(step)
        return;
    }

    researchStore.setAnswer(payloadSecondQuestion.question_2, 'question_2')
    researchStore.setAnswer(payloadSecondQuestion.num_estab_post, 'num_estab_post')
    researchStore.setResearchStep(ResearchStep.thirdQuestion)
}
const getAnswer = (event: any) => {
    if (Math.sign(event?.target.value) === -1) {
        event.target.value = null;
        return;
    }

    if (event?.target.value === '' || event?.target?.value === null) {
        event.target.value = null;
        return;
    }
    if (Number.isNaN(Number(event?.target.value))) {
        event.target.value = null;
        return;
    }

    payloadSecondQuestion.num_estab_post = +event?.target.value;
}
</script>
<template>
    <section class="container-question">
        <div>
            <RadioButtonQuestion @selectionResult="setResultRadioButton($event)" :changestyle="researchStore.isTenantCl" />
            <template v-if="showInputSection">
                <h5 v-t="'secondquestion.to_how_many'" class="mt-16" />
                <input @input="getAnswer($event)" name="answer" id="answer" class="mt-5 answer-of-question-default"
                    placeholder="Número" type="number" />
            </template>
        </div>
        <div class="container-question__button">
            <NextButton @click="nextStep()" />
        </div>
    </section>
</template>
