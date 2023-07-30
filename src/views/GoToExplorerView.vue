<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { computed } from 'vue';
import { mapStyle } from '../assets/map/mapStyle';
import { Tenant } from "@/enums/tenant.enum";
import NextButton from '@/common/components/NextButton.vue';


// const { centerLocation, treatment, currentStep } = storeToRefs(useResearchStore());
const researchStore = useResearchStore();

const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;
const styleCircle = {
    radius: 2000,
    strokeColor: 'rgba(255, 255, 255, 0.9)',
    strokeOpacity: 0.7,
    strokeWeight: 2,
    fillColor: 'rgba(255, 255, 255, 0.3)',
    fillOpacity: 0.9,
}
const { researchConfiguration } = useResearchStore();

const showFilters = computed(() => {
    return treatment.value === 3;
})

const treatment = computed(() => {
    return researchStore.researchConfiguration.treatment;
})
const getSrcIframeExplorer = () => {
    const { location, grades, hasPriority: applyScholarships } = researchConfiguration;

    // FIXME: Hardcoded for now

    const urlTenantStringsMapping = {
        [Tenant.CL]: {
            primary: 'chile',
            secondary: 'chile',
        },
        [Tenant.DO]: {
            primary: 'rd',
            secondary: 'dominicana',
        },
    }

    const urlTenant = urlTenantStringsMapping[researchConfiguration.tenant.toUpperCase() as Tenant];

    const urlRoot: string = import.meta.env.VITE_IFRAME_EXPLORER_TEMPLATE_URL
    .replaceAll(
        '{primaryTenant}',
        urlTenant.primary,
    ).replaceAll(
        '{secondaryTenant}',
        urlTenant.secondary,
    );
    const url = new URL('/research_iframe', urlRoot);
    url.searchParams.append('lat', location.lat.toString());
    url.searchParams.append('lng', location.lng.toString());
    url.searchParams.append('radius', '2');
    url.searchParams.append('z', '15.4');
    url.searchParams.append('filters', `${showFilters.value}`);
    for (const grade of (grades || [])) {
        url.searchParams.append('grade', grade.toString());
    }
    url.searchParams.append('force_scholarships', `${applyScholarships}`);
    return url.toString();
};

const nextStep = () => {
    researchStore.sendTopPostMessage('setAnswer', '', true);
    researchStore.sendTopPostMessage('close', true);
}

</script>
<template>
    <div class="w-full d-flex flex-column">
        <div class="go-to-explorer">
            <!-- label -->
            <span class="ml-2 mb-2">En el explorador puedes encontrar todos los establecimientos cercanos a tu
                ubicación</span>
            <!-- results -->
            <section v-if="treatment !== 1" class="go-to-explorer__information mt-3">
                <div style="position: relative;">
                    <p class="mt-4 ml-3 d-flex">{{ researchStore.researchConfiguration.totalCampusesAround }}
                        <img v-if="treatment === 3" src="../assets/schoolfilter.svg" alt="">
                    </p>
                    <span class="information ml-3" :class="treatment === 3 ? '' : 'mt-2'">centros</span>
                    <span class="information ml-3">educativos</span>
                    <img src="../assets/rectangule-purple.svg" alt="">
                </div>
                <div class="second-information">
                    <p class="mt-5 ml-3">{{ researchStore.researchConfiguration.totalCampusesAroundPaymentAndPerformance }}
                        <img v-if="treatment === 3" src="../assets/filters.svg" alt="">
                    </p>
                    <span class="information mt-2 ml-3">de bajo costo y</span>
                    <span class="information ml-3">alto desempeño</span>
                    <img class="mt-2 mr-3" src="../assets/rectangule-blue.svg" alt="" height="95">
                </div>
            </section>
        </div>
        <!-- Explorer map -->
        <section style="height: auto;" v-if="treatment === 1">
            <GoogleMap class="g-map-container-1" :api-key="GMAP_API_KEY" :center="researchStore.centerLocation" :zoom="15"
                :styles="mapStyle" :disableDefaultUI="true" :clickableIcons="false" :mapTypeControl="false"
                :fullscreenControl="false" :streetViewControl="false" :gestureHandling="'greedy'" :zoomControl="false">
                <Circle :options="{ center: researchStore.centerLocation, ...styleCircle }" />
                <CustomMarker :options="{ position: researchStore.centerLocation }">
                    <img src="../assets/marker-user.svg" />
                </CustomMarker>
            </GoogleMap>
        </section>
        <section v-else>
            <iframe :src="getSrcIframeExplorer()"></iframe>
        </section>

        <NextButton @click="nextStep()" />
    </div>
</template>
<style scoped>
.go-to-explorer {
    margin-top: 1.5rem;
    width: 100%;
    /* height: 100%; */
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
    margin-bottom: -0.5rem;
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
