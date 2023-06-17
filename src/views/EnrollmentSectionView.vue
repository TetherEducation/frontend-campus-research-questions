<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { i18n } from "../i18n";
import { computed } from 'vue'
import { useResearchStore } from '../stores/research';
import { StepOfEnrollmentSection } from '@/enums/stepOfResearch.enum';
import { ref, watch } from 'vue'
import { ActionDataOfResearch } from '@/enums/actionDataOfResearch.enum';

const { currentStepChild, getListOfCampus, currentStep } = storeToRefs(useResearchStore());
const { setAnswersResearch } = useResearchStore();
const nameSchool = ref<string>('')
const listOfSchools = ref<string[]>([]);
const search = ref<string>('');
const selectCheckbox = ref<boolean>(false);
// const iKnowSchool = ref<boolean>(false);

watch(nameSchool, async (name) => {
  setAnswer(name);
})

watch(search, async (newSearch) => {
  changeValue(newSearch)
})
const enrollmentSection = computed(() => {
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

const setAnswer = (answer: number | string | boolean) => {
  const keysAnswer: any = {
    [StepOfEnrollmentSection.FirstQuestionEnrollmentSection]: 'plans_to_enroll',
    [StepOfEnrollmentSection.SecondQuestionEnrollmentSection]: 'knows_school',
    [StepOfEnrollmentSection.ThirdQuestionEnrollmentSection]: 'school',
  }

  setAnswersResearch({
    key: keysAnswer[currentStepChild.value],
    value: answer,
  });
}

const setAnswerCheckbox = () => {
  setAnswersResearch({
    key: 'knows_school_not_sure',
    value: selectCheckbox.value
  })
}

const changeValue = (value: any) => {
  const data = getListOfCampus?.value || [];
  if (data?.length > 0) {
    listOfSchools.value = [...data.map((campus: any) => campus?.campus_name)]
  }

  window.top!.postMessage(
    {
      context: 'explorer',
      action: ActionDataOfResearch.setNameOfCampus,
      value,
    }, '*');
}
</script>
<template>
  <template v-if="currentStep === 0">
    <i18n-t :keypath="enrollmentSection.question" tag="p" class="description-enrollment" />
    <template v-if="currentStepChild === StepOfEnrollmentSection.FirstQuestionEnrollmentSection ||
      currentStepChild === StepOfEnrollmentSection.SecondQuestionEnrollmentSection">

      <div class="d-flex align-items-center ml-1 mt-8" v-for="(option, key) in enrollmentSection.options"
        :key="String(option)">
        <label class="container label-selection"> {{ option }}
          <input type="radio" :for="String(option)" name="radio" @change="setAnswer(key)">
          <span class="checkmark"></span>
        </label>
      </div>

    </template>

    <div class="d-flex mt-8 checkbox-container-question"
      v-if="currentStepChild === StepOfEnrollmentSection.ThirdQuestionEnrollmentSection">
      <v-autocomplete v-model="nameSchool" v-model:search="search" :items="listOfSchools" hide-no-data
        hide-details></v-autocomplete>
      <div class="">
        <label class="container-checkbox">No estoy seguro del nombre del centro educativo.
          <input type="checkbox" v-model="selectCheckbox" @change="setAnswerCheckbox()">
          <span class="checkmark-checkbox"></span>
        </label>
      </div>

    </div>
  </template>
</template>
<style scoped>
/* Customize the label (the container) */
.container-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: 400 !important;
  border-radius: 10px;
}

/* Hide the browser's default checkbox */
.container-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark-checkbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container-checkbox:hover input~.checkmark-checkbox {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container-checkbox input:checked~.checkmark-checkbox {
  background-color: #5627FF;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark-checkbox:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container-checkbox input:checked~.checkmark-checkbox:after {
  display: block;
}

/* Style the checkmark/indicator */
.container-checkbox .checkmark-checkbox:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

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
