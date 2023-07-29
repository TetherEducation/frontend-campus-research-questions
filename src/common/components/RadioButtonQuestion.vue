<script setup lang="ts">
import { i18n } from '@/i18n';
import { useResearchStore } from '@/stores/research';
// import { Tenant } from "@/enums/tenant.enum";

const researchStore = useResearchStore();

const results = () => {
  const keyOfi18n = researchStore.researchStep.toLocaleLowerCase();
  
  return [
    i18n.global.t(`${keyOfi18n}.results.1`),
    i18n.global.t(`${keyOfi18n}.results.2`),
    i18n.global.t(`${keyOfi18n}.results.3`),
  ]
}

</script>
<template>
     <div class="d-flex align-items-center ml-1 mt-8" v-for="(option, key) in results()"
        :key="String(option)">
        <label class="container label-selection">
          <span v-html="option" />
          <input type="radio" :for="String(option)" name="radio" @click="$emit('selectionResult', key+1 )">
          <span class="checkmark"></span>
        </label>
      </div>
</template>
<style scoped>
.checkbox_label {
  max-width: 400px;
}

/* Create a custom checkbox */
.checkmark-checkbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark-checkbox:after {
  content: "";
  position: absolute;
  display: none;
}

.container {
  display: block;
  position: relative;
  padding-left: 45px;
  margin-bottom: 15px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #EBEBEB;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input~.checkmark {
  background-color: #EBEBEB;
}

/* When the radio button is checked, add a blue background */
.container input:checked~.checkmark {
  background-color: #5627FF;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked~.checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
