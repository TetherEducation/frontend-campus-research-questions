<script setup lang="ts">
</script>
<template>
    <nav>
        <button type="button">
            <img src="../assets/arrow-left.svg" alt="arrow left" width="24">
        </button>
        <img src="../assets/explorer.svg" alt="explorer" width="30">
        <h1 v-t="'navbar.title'" class="mt-4 px-1" />
        <progress id="file" max="100" value="33" class="mx-1 progress"></progress>
    </nav>
</template>
