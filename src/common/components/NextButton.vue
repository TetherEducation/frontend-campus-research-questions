<script setup lang="ts">
import { useResearchStore } from '@/stores/research';

const researchStore = useResearchStore();

</script>
<template>
    <button
    type="button"
    @click="$emit('clickNextButton')"
    class="next-button-research"
    :class="{ 'next-button-research-cl': researchStore.isTenantCl }"
    >
    {{ $t('actions.next') }}
    <svg
      v-if="researchStore.isTenantCl"
      class="ml-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.9049 12.8498H4.70221C4.45764 12.8498 4.25456 12.769 4.09296 12.6074C3.93138 12.4458 3.85059 12.2427 3.85059 11.9981C3.85059 11.7536 3.93138 11.5505 4.09296 11.3889C4.25456 11.2273 4.45764 11.1465 4.70221 11.1465H16.9049L11.4033 5.64488C11.2334 5.47495 11.1473 5.27469 11.1449 5.04411C11.1426 4.81353 11.2266 4.61277 11.3968 4.44183C11.5671 4.2703 11.7678 4.18553 11.999 4.18753C12.2301 4.18953 12.4314 4.27549 12.6028 4.44541L19.5528 11.3954C19.6437 11.4874 19.7099 11.5831 19.7514 11.6825C19.7929 11.7818 19.8136 11.8873 19.8136 11.9988C19.8136 12.1103 19.7929 12.2156 19.7514 12.3147C19.7099 12.4138 19.6437 12.5092 19.5528 12.6009L12.5968 19.5509C12.4209 19.7248 12.2195 19.8117 11.9926 19.8117C11.7657 19.8117 11.5672 19.7243 11.3973 19.5495C11.2274 19.3792 11.1424 19.1805 11.1424 18.9532C11.1424 18.7259 11.2274 18.5273 11.3973 18.3574L16.9049 12.8498Z"
        fill="white"
      />
    </svg>
  </button>
</template>
<style scoped>
.next-button-research {
  border-radius: 30px;
  background-color: #1E0C61;
  box-shadow: -4px 4px 10px 0px rgba(128, 128, 128, 0.10);
  max-width: 360px;
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 0.32px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.next-button-research-cl {
  background: #62C7D3 !important;
}
</style>
