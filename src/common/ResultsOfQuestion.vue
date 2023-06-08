<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// const { currentStepChild, currentStep, dataOfResearch, campusesAround} = useResearchStore();

const { currentStepChild, currentStep, dataOfResearch, campusesAround  } = storeToRefs(useResearchStore());
const classOfAnswer = ref<string>('')

const isGoodAnswer = () => {
    if (currentStep.value === 1 && currentStepChild.value === 1) {
        return +dataOfResearch?.value?.num_estab_answer1 === +campusesAround.value.length;
    }
}

const text = () => {
    const rest = +campusesAround.value.length - +dataOfResearch?.value?.num_estab_answer1;
    if (rest === 0 ) {
        classOfAnswer.value = 'good-answer'
        return {
            title: 'Respuesta correcta',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, y efectivamente hay ${campusesAround.value.length}`,
        }
    }

    if (Math.sign(rest) === -1) {
        classOfAnswer.value = 'bad-answer'
        return {
            title: 'Te pasaste',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${campusesAround.value.length}.`,
        }
    }

    if(rest < 3) {
        return {
            title: 'Estuviste muy cerca',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${campusesAround.value.length}.`,
        }
    }

    return {
        title: 'Estuviste muy lejos',
        description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${campusesAround.value.length}.`,
    }
    
}
</script>
<template>
    <h1 class="mt-3">{{ text()?.title }}</h1>
    <p class="mt-8">{{ text()?.description }}</p>
    <section class="section-of-anwsers mt-10">
        <div>
            Tu respuesta <span :class="classOfAnswer">{{ dataOfResearch?.num_estab_answer1 }}</span>
        </div>

        <div>
            Respuesta Correcta <span>{{ campusesAround.length }}</span>
        </div>
    </section>
</template>
