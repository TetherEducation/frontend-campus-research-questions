<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { i18n } from "../i18n";
import { computed } from 'vue'
import { useResearchStore } from '../stores/research';
import { StepOfEnrollmentSection } from '@/enums/stepOfResearch.enum';

const { currentStepChild  } = storeToRefs(useResearchStore());
const { setDataOfResearch } = useResearchStore();

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
        // [StepOfEnrollmentSection.ThirdQuestionEnrollmentSection]: {
        //     question: i18n.global.t('enrollment_section.question_3.title'),
        //     options: i18n.global.t('enrollment_section.question_3.not_sure'),
        // },
    }

    return questions[currentStepChild.value];
});

const setAnswer = (answer: number | string) => {
  const keysAnswer: any  = {
        [StepOfEnrollmentSection.FirstQuestionEnrollmentSection]: 'plans_to_enroll',
        [StepOfEnrollmentSection.SecondQuestionEnrollmentSection]: 'knows_school',
        // [StepOfEnrollmentSection.ThirdQuestionEnrollmentSection]: 'school',
    }

    setDataOfResearch({
        key: keysAnswer[currentStepChild.value],
        value: answer,
    });
}
</script>
<template>
  <i18n-t :keypath="enrollmentSection.question" tag="p" class="description-enrollment" />

  <template v-if="currentStepChild === StepOfEnrollmentSection.FirstQuestionEnrollmentSection || 
                    currentStepChild === StepOfEnrollmentSection.SecondQuestionEnrollmentSection">

    <div class="d-flex align-items-center ml-1 mt-2" v-for="(option, key) in enrollmentSection.options" :key="Number(option)">
      <label class="container label-selection"> {{ option }}
        <input type="radio" :for="String(option)" name="radio" @change="setAnswer(key)">
        <span class="checkmark"></span>
      </label>
    </div>

  </template>

  <!-- <div class="d-flex flex-row mt-2" v-if="currentStepChild === StepOfEnrollmentSection.ThirdQuestionEnrollmentSection">
    <input class="w-full" type="text" />
    <div class="d-flex align-items-center">
      <input class="radio-option" type="checkbox" :id="enrollmentSection.options" name="options_of_questions"
        value="true">
      <label class="ml-1" :for="enrollmentSection.options">{{ enrollmentSection.options }}</label>
    </div>
  </div> -->
</template>
<style scoped>
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 45px;
  margin-bottom: 15px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #EBEBEB;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input~.checkmark {
  background-color: #EBEBEB;
}

/* When the radio button is checked, add a blue background */
.container input:checked~.checkmark {
  background-color: #5627FF;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked~.checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.description-enrollment {
  font-weight: 500 !important;
}
</style>
