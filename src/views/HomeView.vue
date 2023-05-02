<script setup lang="ts">
    import { useCounterStore } from '../stores/counter'
    
    const counterStore = useCounterStore()
</script>
<template>
    <h1>{{ $t('counter') }} {{ counterStore.counter }}</h1>
    <Counter />
</template>
