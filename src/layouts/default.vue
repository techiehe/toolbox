<template>
    <el-container>
        <el-header class="p-0">
            <div class="nav flex items-center pl-8">
                <div class="flex items-center gap-2  cursor-pointer" @click="$router.push('/')">
                    <img style="width: 24px;height: 24px;"
                        src="/favicon.ico" alt="Element logo" />
                    <span>哗啦工具箱</span>
                </div>
                <div class="grow" />
                <el-menu default-active="2" :ellipsis="false" class=" border-none" router mode="horizontal"
                    @open="handleOpen" @close="handleClose">
                    <el-sub-menu index="2">
                        <template #title>加密</template>
                        <el-menu-item index="/crypto/aes">AES</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="">
                        <a class="w-full  bg-transparent " target="_blank"  href="https://github.com/huala-fun/toolbox">Github</a>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <el-main class="px-12">
            <router-view />
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Lock,
    Expand,
    Setting,
    Fold
} from '@element-plus/icons-vue'

const isCollapse = ref(true)

watch(isCollapse, () => {
    console.log(isCollapse.value)
})


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