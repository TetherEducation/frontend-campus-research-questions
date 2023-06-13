<script setup lang="ts">
import { useResearchStore } from '../stores/research';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const { nextStep, setDataResearch  } = useResearchStore();

const { currentStep } = storeToRefs(useResearchStore());

window.addEventListener("message", function(event: any) {

    if (event.data.context === 'research') {
        setDataResearch(event?.data?.action, event?.data?.value);
        console.log('Received from parent:', event.data);
        return;
    }
});


const textButton = computed( () => {
    return currentStep.value === 3 ? 'Ir a Explorar' : 'Continuar'
});
// window.top!.postMessage({context: 'explorer', action: 'close'}, '*');

</script>
<template>
    <Navbar />
    <main class="px-8">
       <router-view></router-view>
    </main>
    <section class="mt-2 research-buttons px-2">
        <button type="button" class="button button-active" :class="{'btn-go': currentStep === 3}" @click="nextStep()">
            {{ textButton }}
        </button>
        <!-- <button type="button" v-t="'generic.skip'" class="button button-skip"/> -->
    </section>
</template>
<style>
    .research-buttons {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        padding: 2rem 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        bottom: 0;
    }

    .btn-go {
        background-color: white !important;
        color: var(--primary-color) !important;
    }
</style>
