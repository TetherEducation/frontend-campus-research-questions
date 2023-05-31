<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MapAndQuestionInterface } from '../interfaces/mapAndQuestion.interface';
import { useResearchStore } from '../stores/research';
import { mapStyle } from '../assets/map/mapStyle';
import { computed } from 'vue';
import { StepOFResearch } from '@/enums/stepOfResearch.enum';

defineProps<{ config: MapAndQuestionInterface }>();

const { centerLocation, getAnswerCampusAround, getAnswerCampusPaymentAndPerformance, currentStep  } = storeToRefs(useResearchStore());

const answer = computed( () =>  {
    const value = currentStep.value === StepOFResearch.CampusAround ? getAnswerCampusAround.value : getAnswerCampusPaymentAndPerformance.value;
    return value === 0 ? null : value;
})

const getAnswer = (event: any) => {
    
    if (currentStep.value === StepOFResearch.CampusAround) {
        useResearchStore().setAnswerCampusAround(event.target.value);
    } else {
        useResearchStore().setAnswerCampusPaymentAndPerformance(event.target.value);
    }
}
const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;
const styleCircle =  {
        radius: 2000,
        strokeColor: 'rgba(255, 255, 255, 0.2)',
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: 'rgba(255, 255, 255, 0.1);',
        fillOpacity: 0.2,
}
</script>
<template>
    <section class="map-and-question">
        <div class="g-map">
            <GoogleMap class="g-map-container" :api-key="GMAP_API_KEY" :center="centerLocation" :zoom="13.2"
                :styles="mapStyle" :disableDefaultUI="true" :clickableIcons="false" :mapTypeControl="false"
                :fullscreenControl="false" :streetViewControl="false" :gestureHandling="'greedy'" :zoomControl="false">
                <Circle :options="{ center: centerLocation, ...styleCircle }" />
                <CustomMarker :options="{ position: centerLocation }">
                    <img src="../assets/marker-user.svg" />
                </CustomMarker>
            </GoogleMap>
        </div>
        <div class="question">
            <p>
                {{ config.question }}
            </p>
            <label for="answer" class="mt-1">{{ config.description }}</label>
            <input :value="answer" @input="getAnswer($event)" name="answer" id="answer" class="mt-2" type="number" placeholder="XXX" />
        </div>
    </section>
</template>
