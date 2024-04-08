<template>
    <el-config-provider :locale="locale">
        <el-container>
            <el-header class="p-0">
                <div class="nav flex items-center px-12">
                    <div class="flex items-center gap-2  cursor-pointer" @click="$router.push('/')">
                        <img style="width: 24px;height: 24px;" src="/favicon.ico" alt="Element logo" />
                        <span>哗啦工具箱</span>
                    </div>
                    <div class="grow" />
                    <div class="flex items-center gap-2">
                        <el-menu default-active="2" :ellipsis="false" class=" border-none" router mode="horizontal"
                            @open="handleOpen" @close="handleClose">
                            <el-sub-menu index="2">
                                <template #title>加密</template>
                                <el-menu-item index="/crypto/aes">AES</el-menu-item>
                            </el-sub-menu>
                        </el-menu>
                        <a class="w-full" target="_blank" href="https://github.com/huala-fun/toolbox">
                            <i class="bi-github" role="img" aria-label="GitHub"></i>
                        </a>
                    </div>
                </div>
            </el-header>
            <el-main class="px-12">
                <router-view />
            </el-main>
        </el-container>
    </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { en, zhCn } from 'element-plus/es/locales.mjs';

// 语言
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))


const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu {
    --el-menu-horizontal-height: 48px;
}

.nav {
    border-bottom: 1px solid var(--el-border-color);
}
</style>