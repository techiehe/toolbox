<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: 'AES 加密'
    },
    description: {
        type: String,
        default: 'AES 加密'
    },
    path: {
        type: String,
        default: '/crypto/aes'
    }
})
console.log(props);

import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
    <el-card class=" cursor-pointer" shadow="hover" @click="router.push(path)">
        <div class="flex gap-2 flex-col">
            <div class="text-xl">{{ title }}</div>
            <div class="text-sm text-gray-400">{{ description }}</div>
        </div>
    </el-card>
</template>
