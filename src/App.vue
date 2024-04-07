<script setup lang="ts">
import { RouterView } from 'vue-router'
import defaultLayout from './layouts/default.vue';
</script>

<template>
  <defaultLayout class=" select-none">
    <RouterView />
  </defaultLayout>
</template>
