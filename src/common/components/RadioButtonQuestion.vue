<script setup lang="ts">
import { useResearchStore } from '@/stores/research';
import { Tenant } from "@/enums/tenant.enum";

const researchStore = useResearchStore();
const labels = [
    
]
</script>
<template>
    
     <div class="d-flex align-items-center ml-1 mt-8" v-for="(option, key) in $t('firstquestion.results')"
        :key="String(option)">
        <label class="container label-selection">
          <span v-html="option" />
          <input type="radio" :for="String(option)" name="radio" >
          <span class="checkmark"></span>
        </label>
      </div>
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
