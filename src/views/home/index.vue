<script setup lang="ts">
import ToolBox from '../../components/toolBox/index.vue'
import { routes as toolsRoutes } from "@/views/tools"
</script>

<template>
    <main class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <ToolBox v-for="item in toolsRoutes" :title="item.meta.name" :key="item.path" :path="item.path"
            :description="item.meta.description" />
    </main>
</template>

<style scoped></style>
