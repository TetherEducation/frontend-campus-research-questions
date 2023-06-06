<script setup lang="ts">

import { useResearchStore } from '../stores/research';

const { nextStep } = useResearchStore();

window.addEventListener("message", function(event: any) {
    console.log('event', event)
});

window.parent.postMessage('close', '*');
</script>
<template>
    <Navbar />
    <main class="px-2">
       <router-view></router-view>
    </main>
    <section class="mt-2 research-buttons px-2">
        <button type="button" v-t="'generic.continue'" class="button button-active" @click="nextStep()" />
        <!-- <button type="button" v-t="'generic.skip'" class="button button-skip"/> -->
    </section>
</template>
<style>
    .research-buttons {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        padding: 2rem 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        bottom: 0;
    }
</style>
