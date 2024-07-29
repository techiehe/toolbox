<script setup lang="ts">
import { RouterView } from 'vue-router'
import defaultLayout from './layouts/default.vue';
</script>

<template>
  <defaultLayout class=" select-none">
    <router-view v-slot="{ Component }">
      <transition name="fade1">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </defaultLayout>
</template>
