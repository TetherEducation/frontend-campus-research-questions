<script setup lang="ts">
import RadioButtonQuestion from '@/common/components/RadioButtonQuestion.vue';
import { ActionDataOfResearch } from '@/enums/actionDataOfResearch.enum';
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';
import { ref, watch } from 'vue';

const researchStore = useResearchStore();
const showInputSection = ref<boolean>(false);

const payloadSecondQuestion: any = {
    comuna: null,
    question_3: null,
    school: null
}

const search = ref<string>('');
const nameSchool = ref<string>()
const listOfSchools = ref<string[]>([]);
const nameComuna = ref<string>()
const listOfComunas = ref<string[]>([]);
const searchComuna = ref<string>('');
const isNotSure = ref<boolean>(false);

watch(search, async (newSearch) => {
    changeValue(newSearch)
})

watch(searchComuna, async (newSearch) => {
    changeValueComuna(newSearch)
})

const changeValue = (value: any) => {
    const data = researchStore.getListOfCampus || [];
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

const changeValueComuna = (value: any) => {
    const data = researchStore.getListOfComuna || [];
    if (data?.length > 0 && listOfComunas.value.length === 0) {
        listOfComunas.value = data
    }

    window.top!.postMessage(
        {
            context: 'explorer',
            action: ActionDataOfResearch.setNameOfComuna,
            value,
        }, '*');
}

const nextStep = () => {
    if (researchStore.isTenantCl) {
        if (payloadSecondQuestion.question_3 === 1) {
            payloadSecondQuestion.school = nameSchool.value;
            payloadSecondQuestion.comuna = nameComuna.value;
        }
        return setNexStep()
    }

    return payloadSecondQuestion.knows_school !== null ? setNexStep() : null;
}

const setNexStep = () => {
    if (!researchStore.isTenantCl) {
        researchStore.setAnswer(payloadSecondQuestion.knows_school, 'knows_school')

    }
    researchStore.setAnswer(payloadSecondQuestion.question_3, 'question_3')
    researchStore.setAnswer(payloadSecondQuestion.school, 'school')
    researchStore.setAnswer(payloadSecondQuestion.comuna, 'comuna')

    researchStore.setResearchStep(ResearchStep.questionCampusAround)

}
const setResultRadioButton = (result: number) => {
    payloadSecondQuestion.question_3 = result;

    showInputSection.value = result === 1;

    if (!showInputSection.value) {
        payloadSecondQuestion.school = null;
        payloadSecondQuestion.comuna = null;
    }
}
</script>
<template>
    <section class="container-question">
        <div>
            <div v-if="!researchStore.isTenantCl" class="d-flex mt-8 checkbox-container-question">
                <h1 v-html="$t('thirdquestion.question')" />
                <v-autocomplete v-model="nameSchool" v-model:search="search" :items="listOfSchools" hide-no-data
                    placeholder="Nombre centro educativo" solo flat background-color="#EBEBEB" class="autocomplete" />
                <div class="checkbox_label">
                    <label class="container-checkbox">
                        {{ $t('thirdquestion.not_sure') }}
                        <input type="checkbox" v-model="isNotSure">
                        <span class="checkmark-checkbox"></span>
                    </label>
                </div>

            </div>
            <div v-else>
                <RadioButtonQuestion @selectionResult="setResultRadioButton($event)"
                    :changestyle="researchStore.isTenantCl" />
                <template v-if="showInputSection">
                    <h5 v-t="'thirdquestion.how_name_school'" class="mt-12" />
                    <div class="mt-4 d-flex flex-row flex-wrap gap-5">
                        <v-autocomplete v-model="nameComuna" v-model:search="searchComuna" :items="listOfComunas"
                            item-title="name" item-value="id" hide-no-data placeholder="Comuna" solo flat
                            persistent-placeholder background-color="#EBEBEB" class="autocomplete-input" />
                        <v-autocomplete v-model="nameSchool" v-model:search="search" :items="listOfSchools" hide-no-data
                            placeholder="Establecimiento" solo flat background-color="#EBEBEB"
                            class="autocomplete autocomplete-input" />
                    </div>
                    <span class="message-alert">
                    *Recuerda verificar si el establecimiento tiene vacantes para el periodo complementario.
                </span>
                </template>
               
            </div>
        </div>
        <div class="container-question__button">
            <NextButton @click="nextStep()" />
        </div>
    </section>
</template>
<style scoped>
.messge-alert {
    color: var(--alias-grayscale-label, #6E7191) !important;
    font-family: Inter !important;
    font-size: 0.75rem !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 1.25rem !important;
}

.autocomplete-input {
    margin-left: 0.5rem;
    width: 100%;
    max-width: 500px;
}

.checkbox_label {
    max-width: 400px;
}

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
    /* vertical-align: baseline !important; */
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
</style>

