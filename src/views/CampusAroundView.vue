<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useResearchStore } from '../stores/research';
    import { ref } from 'vue'
    import { i18n } from "../i18n";
    import { MapAndQuestionInterface } from '../interfaces/mapAndQuestion.interface';
    import { StepOfCampusAround } from '@/enums/stepOfResearch.enum';
    
    const { currentStepChild, currentStep  } = storeToRefs(useResearchStore());
    const mapAndQuestion = ref<MapAndQuestionInterface>({
        question: i18n.global.t('campus_around.question.title'),
        description: i18n.global.t('campus_around.question.description'),
    });

</script>
<template>
    <template v-if="currentStep === 1">
        <MapAndQuestion v-if="currentStepChild === StepOfCampusAround.QuestionCampusAround" :config="mapAndQuestion" :showIcon="false" />
        <ResultsOfQuestion v-if="currentStepChild === StepOfCampusAround.AnswerCampusAround" />
    </template>
</template>