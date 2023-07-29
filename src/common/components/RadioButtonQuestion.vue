<script setup lang="ts">
import { useResearchStore } from '@/stores/research';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
// import { Tenant } from "@/enums/tenant.enum";

const researchStore = useResearchStore();

defineProps<{ changestyle: false }>();
const question: any = () => {
  const keyOfi18n = researchStore.researchStep.toLocaleLowerCase();

  return {
    title: t(`${keyOfi18n}.question`),
    results: [
      t(`${keyOfi18n}.results.1`),
      t(`${keyOfi18n}.results.2`),
      t(`${keyOfi18n}.results.3`),
    ].filter((result: string) => result)
  }
}

</script>
<template>
  <h1 v-html="question().title" />
  <section class="d-flex" :class="changestyle ? 'flex-row': 'flex-column'">
    <div v-for="(option, key) in question().results" :key="String(option)" class="d-flex align-items-center ml-1 mt-8">
      <label v-if="!changestyle" class="container label-selection">
        <span v-html="option" />
        <input type="radio" :for="String(option)" name="radio" @click="$emit('selectionResult', key + 1)">
        <span class="checkmark"></span>
      </label>
      <div v-else class="radio-toolbar mr-2 mt-5">
        <input type="radio" :id="String(option)" :for="String(option)" name="radio"
          @click="$emit('selectionResult', option)">
        <label class="text-center" :for="String(option)">{{ option }}</label>
      </div>
    </div>
  </section>
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

.radio-toolbar {
  width: 100%;
  min-width: 150px;
  cursor: pointer;
}

.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
  display: inline-block;
  width: 100%;
  min-width: 150px;
  background-color: white;
  padding: 10px 20px;
  font-family: sans-serif, Arial;
  font-size: 14px;
  border: 0px;
  border-radius: 8px;
}

.radio-toolbar input[type="radio"]:checked+label {
  background-color: var(--secondary-color);
  color: white;
  border: 16px;
}
</style>
