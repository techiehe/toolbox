<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
defineOptions({
    inheritAttrs: false,
    customOptions: {
        /* ... */
    }
})
</script>

<template>
    <main class="grid grid-cols-5">
        <TheWelcome />
    </main>
</template>


<style scoped></style>
