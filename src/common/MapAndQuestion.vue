<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MapAndQuestionInterface } from '../interfaces/mapAndQuestion.interface';
import { useResearchStore } from '../stores/research';
import { mapStyle } from '../assets/map/mapStyle';

defineProps<{ config: MapAndQuestionInterface }>();

const { centerLocation } = storeToRefs(useResearchStore());
const { setAnswersResearch, currentStepChild } = useResearchStore();

const getAnswer = (event: any) => {
    if (currentStepChild === 0 ) {
        setAnswersResearch({
            key: 'num_estab_answer1',
            value: event?.target.value,
        });
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
            <label for="answer" class="mt-8">{{ config.description }}</label>
            <input @input="getAnswer($event)" name="answer" id="answer" class="mt-10 answer-of-question" type="number" placeholder="XXX" />
        </div>
    </section>
</template>
