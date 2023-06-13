<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const { dataOfResearch, currentStep, treatment } = storeToRefs(useResearchStore());

const restOfAnswer = computed( () => {
    return currentStep.value === 2 ? dataOfResearch?.value.num_estab_correct2 - +dataOfResearch?.value?.num_estab_answer2: dataOfResearch?.value.num_estab_correct1 - +dataOfResearch?.value?.num_estab_answer1
});

const classOfAnswer = ref<string>('')

const text = () => {
    const rest: any = restOfAnswer
    if (rest === 0 ) {
        classOfAnswer.value = 'good-answer'
        return {
            title: 'Respuesta correcta',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, y efectivamente hay ${dataOfResearch?.value.num_estab_correct1}`,
        }
    }

    if (Math.sign(rest) === -1) {
        classOfAnswer.value = 'bad-answer'
        return {
            title: 'Te pasaste',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${dataOfResearch?.value.num_estab_correct1}.`,
        }
    }

    if(rest < 3) {
        return {
            title: 'Estuviste muy cerca',
            description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${dataOfResearch?.value.num_estab_correct1}.`,
        }
    }

    return {
        title: 'Estuviste muy lejos',
        description: `Creiste que habían ${dataOfResearch?.value?.num_estab_answer1} centros educativos a 2km de tu ubicación, pero en realidad hay ${dataOfResearch?.value.num_estab_correct1}.`,
    }
    
}
</script>
<template>
    <h1 class="mt-3">{{ treatment === 1 ? 'Centros Educativos' : text()?.title }}</h1>
    <p class="mt-8">{{ text()?.description }}</p>
    <section v-if="treatment !== 1" class="section-of-anwsers mt-10">
        <div>
            Tu respuesta <span :class="classOfAnswer">{{ dataOfResearch?.num_estab_answer1 }}</span>
        </div>

        <div>
            Respuesta Correcta <span>{{ dataOfResearch.num_estab_correct1 }}</span>
        </div>
    </section>
</template>
