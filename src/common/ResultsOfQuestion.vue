<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { ref, computed } from 'vue';
import NextButton from './components/NextButton.vue';
import { ResearchStep } from '@/enums/researchStep.enum';


const researchStore = useResearchStore();

const nextStep = () => {
    let nextStep: ResearchStep;

    if (researchStore.researchStep === ResearchStep.answerCampusAround) {
        nextStep = ResearchStep.informationPayment;
    } else {
        nextStep = ResearchStep.answerPerformanceAndPayment === researchStore.researchStep ? ResearchStep.informationPerformance : ResearchStep.goToExplorer;
    }

    
    researchStore.setResearchStep(nextStep);

    // if (!researchStore.isTenantCl) {
    //     researchStore.setAnswer(payloadSecondQuestion.knows_school, 'knows_school')

    // }
    // researchStore.setAnswer(payloadSecondQuestion.question_3, 'question_3')
    // researchStore.setAnswer(payloadSecondQuestion.school, 'school')
    // researchStore.setAnswer(payloadSecondQuestion.comuna, 'comuna')

    // researchStore.setResearchStep(ResearchStep.questionCampusAround)

}
const interfaceResearch = computed(() => {
    return researchStore.researchConfiguration.interface;
})

const restOfAnswer = computed(() => {
    return researchStore.researchStep === ResearchStep.answerCampusAround ?
        interfaceResearch.value!.num_estab_correct1! - +interfaceResearch.value!.num_estab_answer1! : interfaceResearch.value!.num_estab_correct2! - +interfaceResearch.value!.num_estab_answer2!
    // return currentStep.value === 2 ? dataOfResearch?.value.num_estab_correct2 - +dataOfResearch?.value?.num_estab_answer2 : interfaceResearch.value?.num_estab_correct1 - +interfaceResearch.value?.num_estab_answer1
});

const results = computed(() => {
    const isCampusAround = researchStore.researchStep === ResearchStep.answerCampusAround;
    return {
        correctAnswer: isCampusAround ? interfaceResearch.value?.num_estab_correct1 : interfaceResearch.value?.num_estab_correct2,
        answer: isCampusAround ? interfaceResearch.value?.num_estab_answer1 : interfaceResearch.value?.num_estab_answer2,
    }
})

const isCorrect = computed(() => {
    return Number(results.value.answer) === Number(results.value.correctAnswer);
})

const labelCorrect = () => {
    { { isCorrect.value } }
    return isCorrect.value ? ', y efectivamente hay' : ', pero en realidad hay'
}

const modifyLabel = computed(() => {
    const labelPayment = researchStore.researchConfiguration.treatment === 1 ? '' : 'en el curso que estabas buscando postular'
    return researchStore.researchStep === ResearchStep.answerCampusAround
        ? 'en el curso que estás buscando postular' : labelPayment
})

const classOfAnswer = ref<string>('')

const text = () => {
    const rest: any = restOfAnswer.value;
    const changeText = researchStore.secondRoundKey !== '';

    if (rest === 0) {
        classOfAnswer.value = 'good-answer'
        return {
            title: 'Es correcto',
            description: changeText ? `Creíste que habían ${interfaceResearch.value?.num_estab_answer1} establecimientos con vacantes en el curso que estás buscando postular, y efectivamente hay ${interfaceResearch.value?.num_estab_correct1}.` : `Creíste que había ${interfaceResearch.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, y efectivamente hay ${interfaceResearch.value?.num_estab_correct1}.`,
        }
    }

    if (Math.sign(rest) === -1) {
        classOfAnswer.value = 'bad-answer'
        return {
            title: '',
            description: `Creíste que habían ${interfaceResearch.value?.num_estab_answer1} establecimientos con vacantes en el curso que estás buscando postular, pero en realidad hay ${interfaceResearch.value?.num_estab_correct1}.`,
        }
    }

    if (rest <= 3) {
        return {
            title: 'Estuviste muy cerca',
            description: `Creíste que habían ${interfaceResearch.value?.num_estab_answer1} establecimientos con vacantes en el curso que estás buscando postular, pero en realidad hay ${interfaceResearch.value?.num_estab_correct1}.`,
        }
    }

    if (rest > 3) {
        classOfAnswer.value = 'bad-answer'
        return {
            title: 'Hay más de los que piensas',
            description: `Creíste que habían ${interfaceResearch.value?.num_estab_answer1} establecimientos con vacantes en el curso que estás buscando postular, y efectivamente hay ${interfaceResearch.value?.num_estab_correct1}.`,
        }
    }



    classOfAnswer.value = 'bad-answer'
    return {

        title: '',
        description: `Creíste que había ${interfaceResearch.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${interfaceResearch.value?.num_estab_correct1}.`,
    }

}
</script>
<template>
    <section class="container-question">
        <div>
            <h1 class="mt-3">{{ researchStore.researchConfiguration.treatment === 1 ? 'Centros Educativos' : text()?.title
            }}</h1>
            <p class="mt-5">
                Creíste que habían <b>{{ results.answer }} </b> establecimientos con vacantes <span v-html="modifyLabel" />
                <template v-if="researchStore.researchConfiguration.treatment !== 1">
                    {{ labelCorrect() }} <b>{{ results.correctAnswer }}.</b>
                </template>
            </p>
            <section v-if="researchStore.researchConfiguration.treatment !== 1" class="section-of-anwsers mt-10">
                <div>
                    Tu respuesta <span :class="classOfAnswer">{{ results.answer }}</span>
                </div>

                <div>
                    Respuesta Correcta <span>{{ results.correctAnswer }}</span>
                </div>
            </section>

        </div>
        <div class="container-question__button">
            <NextButton @click="nextStep" />
        </div>
    </section>
</template>
