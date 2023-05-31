<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { i18n } from "../i18n";
import { ref, computed } from 'vue'
import { useResearchStore } from '../stores/research';
import { StepOfEnrollmentSection } from '@/enums/stepOfResearch.enum';

const { currentStepChild  } = storeToRefs(useResearchStore());

const enrollmentSection = computed( () => {
    const questions: any = {
        [StepOfEnrollmentSection.DescriptionEnrollmentSection]: {
            question: i18n.global.t('enrollment_section.description'),
        },
        [StepOfEnrollmentSection.FirstQuestionEnrollmentSection]: {
            question: i18n.global.t('enrollment_section.question_1.title'),
            options: i18n.global.t('enrollment_section.question_1.options').split('%space%'),
        },
        [StepOfEnrollmentSection.SecondQuestionEnrollmentSection]: {
            question: i18n.global.t('enrollment_section.question_2.title'),
            options: i18n.global.t('enrollment_section.question_2.options').split('%space%'),
        },
        [StepOfEnrollmentSection.ThirdQuestionEnrollmentSection]: {
            question: i18n.global.t('enrollment_section.question_3.title'),
            options: i18n.global.t('enrollment_section.question_3.not_sure'),
        },
    }

    return questions[currentStepChild.value];
});
</script>
<template>
    <i18n-t :keypath="enrollmentSection.question" tag="p" class="description-enrollment">
        <template v-slot:questions>
            <b v-t="'enrollment_section.questions'" />
        </template>
    </i18n-t>

    <template v-if="currentStepChild === StepOfEnrollmentSection.FirstQuestionEnrollmentSection || 
                    currentStepChild === StepOfEnrollmentSection.SecondQuestionEnrollmentSection">

    <div class="d-flex align-items-center ml-1" v-for="(option, key) in enrollmentSection.options" :key="key">
        <input class="radio-option" type="radio" :id="option" name="options_of_questions" :value="key">
        <label class="ml-1" :for="option">{{ option }}</label>
    </div>
        
    </template>

    <div class="d-flex flex-row" v-if="currentStepChild === StepOfEnrollmentSection.ThirdQuestionEnrollmentSection">
        <input class="w-full" type="text" />
        <div class="d-flex align-items-center">
        <input class="radio-option" type="checkbox" :id="enrollmentSection.options" name="options_of_questions" value="true">
        <label class="ml-1" :for="enrollmentSection.options">{{ enrollmentSection.options }}</label>
    </div>
    </div>
</template>
<style>
.description-enrollment {
    font-weight: 500;
}

input [type='radio'] {
  background: none !important;
  box-shadow: none !important;
  border: none !important;
  border: none !important;
}


.radio-option {
    width: 24px;
    background: none !important;
  box-shadow: none !important;
  border: none !important;
  border: 0.15em solid #EBEBEB !important;
}
</style>
