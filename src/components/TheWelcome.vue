<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <el-card class=" cursor-pointer" shadow="hover" @click="router.push('/crypto/aes')">
    <a class="cursor-pointer" target="_blank" rel="noopener">ASE 加密</a>
  </el-card>
</template>
