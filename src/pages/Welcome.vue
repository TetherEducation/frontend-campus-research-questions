<script setup lang="ts">
import { ResearchStep } from '@/enums/researchStep.enum';
import { useResearchStore } from '@/stores/research';

const researchStore = useResearchStore();

</script>
<template>
    <section class="welcome-container">
        <div>
            <p v-html="$t('welcome.description')" />
        </div>
        <div>
            <NextButton @click="researchStore.setResearchStep(ResearchStep.firstQuestion)" />
        </div>
    </section>
</template>
<style scoped>
.welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

div:nth-child(2) {
    display: flex;
    justify-content: center;
}

@media only screen and (min-width: 1100px) and (min-height: 685px) {
    div:nth-child(2) {
        display: flex;
        justify-content: flex-end;
    }
}
</style>