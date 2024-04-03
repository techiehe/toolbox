<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>加密</template>
    <a class=" cursor-pointer"  @click="router.push('/crypto/aes')" target="_blank" rel="noopener">ASE</a>
  </WelcomeItem>
</template>
