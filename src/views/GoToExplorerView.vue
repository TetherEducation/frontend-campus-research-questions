<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { computed } from 'vue';

import { storeToRefs } from 'pinia';
import { mapStyle } from '../assets/map/mapStyle';


const { centerLocation, treatment } = storeToRefs(useResearchStore());

const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;
const styleCircle = {
    radius: 2000,
    strokeColor: 'rgba(255, 255, 255, 0.2)',
    strokeOpacity: 0.7,
    strokeWeight: 2,
    fillColor: 'rgba(255, 255, 255, 0.1);',
    fillOpacity: 0.2,
}
const { userLocation, dataOfResearch  } = useResearchStore();

const showFilters = computed(() => {
    return treatment.value === 1;
})

const getSrcIframeExplorer = () => {
    const url: string = import.meta.env.VITE_IFRAME_EXPLORER
    let newUrl = url.replace('location', `lat=${userLocation.lat}&lng=${userLocation.lng}`);
    return newUrl.replace('filters', `filters=${showFilters.value}`)
};
</script>
<template>
    <div class="go-to-explorer">
        <!-- label -->
        <span class="ml-2 mb-2">En el explorador puedes encontrar todos los establecimientos cercanos a tu ubicación</span>
        <!-- results -->
        <section v-if="treatment !== 1" class="go-to-explorer__information mt-3">
            <div>
                <p class="mt-4 ml-3">{{ dataOfResearch.num_estab_correct1 }}</p>
                <span class="information mt-2 ml-3">centros</span>
                <span class="information ml-3">educativos</span>
                <img src="../assets/rectangule-purple.svg" alt="">
            </div>
            <div class="second-information">
                <p class="mt-4 ml-3">{{ dataOfResearch.num_estab_correct2 }}</p>
                <span class="information mt-2 ml-3">de bajo costo y</span>
                <span class="information ml-3">alto desempeño</span>
                <img class="mt-2 mr-3" src="../assets/rectangule-blue.svg" alt="">
            </div>
        </section>
    </div>
    <!-- Explorer map -->
    <section v-if="treatment === 1">
        <GoogleMap class="g-map-container-1" :api-key="GMAP_API_KEY" :center="centerLocation" :zoom="13.2"
                :styles="mapStyle" :disableDefaultUI="true" :clickableIcons="false" :mapTypeControl="false"
                :fullscreenControl="false" :streetViewControl="false" :gestureHandling="'greedy'" :zoomControl="false">
                <Circle :options="{ center: centerLocation, ...styleCircle }" />
                <CustomMarker :options="{ position: centerLocation }">
                    <img src="../assets/marker-user.svg" />
                </CustomMarker>
            </GoogleMap>
    </section>
    <section v-else>
            <iframe :src="getSrcIframeExplorer()"></iframe>
        </section>
</template>
<style scoped>
.go-to-explorer {
    margin-top: 1.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #5627FF;
}

.second-information {
    margin-left: -1rem;
}

.go-to-explorer__information {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: relative;
}


.go-to-explorer__information>div {
    width: 152px;
    height: 102px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    /* position: absolute; */
}

p,
span {
    z-index: 5;
}

p {
    font-weight: 500;
    font-size: 36px;
    line-height: 24px;
    color: #F5F5F5;
}

.information {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.0025em;
    color: #FFFFFF;
}

.go-to-explorer__information>div>img {
    position: absolute;
    z-index: 0;
}

.go-to-explorer>section:first-child {
    margin-top: 1rem;
    width: 100%;
    height: auto;
}

iframe {
    margin-left: -1.7rem;
    position: absolute !important;
    display: block;
    border: none;
    max-height: 750px;
    height: 100vh !important;
    width: 100vw !important;
}

.g-map-container-1 {
    max-height: 750px;
    height: 100vh !important;
    width: 100vw !important;
}
</style>
