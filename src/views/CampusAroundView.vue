<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useResearchStore } from '../stores/research';
    import { ref } from 'vue'
    import { MapAndQuestionInterface } from '../interfaces/mapAndQuestion.interface';
    import { StepOfCampusAround } from '@/enums/stepOfResearch.enum';
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n();
    
    const { currentStepChild, currentStep  } = storeToRefs(useResearchStore());
    const mapAndQuestion = ref<MapAndQuestionInterface>({
        question: t('campus_around.question.title'),
        description: t('campus_around.question.description'),
    });

</script>
<template>
    <template v-if="currentStep === 1">
        <MapAndQuestion v-if="currentStepChild === StepOfCampusAround.QuestionCampusAround" :config="mapAndQuestion" :showIcon="false" />
        <ResultsOfQuestion v-if="currentStepChild === StepOfCampusAround.AnswerCampusAround" />
    </template>
</template>