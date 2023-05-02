<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore();
const incrementBy = (value: number) => counterStore.incrementBy(value);
</script>

<template>
    <button type="button" @click="incrementBy(1)">
        <span>Increment by 1</span>
    </button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
