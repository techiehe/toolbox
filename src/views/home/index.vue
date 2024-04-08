<script setup lang="ts">
import ToolBox from '../../components/toolBox/index.vue'
defineOptions({
    inheritAttrs: false,
    cusOptions: {
        name: "首页",
        show: true,
        desc: {
            cn: 'AES加密解密',
            en: 'AES encryption and decryption'
        }
    },
})
</script>

<template>
    <main class="grid grid-cols-5 gap-4">
        <ToolBox title="AES" />
        <ToolBox title="QRCODE" path="/qrcode" description="生成并下载 URL 或文本的 QR 码，并自定义背景和前景色" />
    </main>
</template>


<style scoped></style>
