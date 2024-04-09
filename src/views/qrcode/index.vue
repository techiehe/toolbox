<template>
    <el-card shadow="never">
        <div class="grid grid-cols-5 gap-4">
            <el-form :model="qrcodeOptions" class="col-span-5 sm:col-span-3 w-full select-none" label-width="100px"
                label-position="left">
                <div class="grid grid-cols-1 gap-2">
                    <el-form-item label="文本">
                        <el-input v-model="qrcodeOptions.text" type="textarea" rows="6" placeholder="密钥" />
                    </el-form-item>
                    <el-form-item label="前景色">
                        <el-color-picker color-format="hex" v-model="qrcodeOptions.color.dark" show-alpha
                            :predefine="predefineColors" />
                    </el-form-item>
                    <el-form-item label="背景颜色">
                        <el-color-picker color-format="hex" v-model="qrcodeOptions.color.light" show-alpha
                            :predefine="predefineColors" />
                    </el-form-item>
                    <el-form-item label="抗误差性">
                        <el-select v-model="qrcodeOptions.errorCorrectionLevel" placeholder="输出">
                            <el-option v-for="item in errorCorrectionLevels" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图像质量">
                        <el-slider v-model="qrcodeOptions.quality" :format-tooltip="formatTooltip" />
                    </el-form-item>
                    <el-form-item label="图像类型">
                        <el-select v-model="qrcodeOptions.type" placeholder="输出">
                            <el-option v-for="item in imageTypes" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div
                class="col-span-5 sm:col-span-2 flex flex-col gap-4 justify-center p-4 items-center border border-gray-200">
                <el-image :src="qrcodeDataURL" class="w-64 h-64 col-span-2">
                </el-image>
                <el-button @click="downloadImage" type="primary">下载图片</el-button>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import QRCode from 'qrcode'
import { get } from "@vueuse/core"
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { downloadFileFromBase64 } from '@/utils/downloadBase64';

const qrcodeOptions = reactive({
    text: 'https://toolbox.huala.fun/',
    color: {
        dark: '#000000FF',
        light: '#FFFFFFFF',
    },
    errorCorrectionLevel: "H",
    margin: 1,
    quality: 100,
    type: 'image/png'
})

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

// 容错度
const errorCorrectionLevels = [
    { label: 'low', value: "L" },
    { label: 'medium', value: "M" },
    { label: 'quartile', value: "Q" },
    { label: 'high', value: "H" }
]

// image/jpeg, image/webp
const imageTypes = [
    { label: 'png', value: "image/png" },
    { label: 'jpeg', value: "image/jpeg" },
    { label: 'webp', value: "image/webp" },
]

const formatTooltip = (val: number) => {
    return val / 100
}

const qrcodeDataURL = ref('')
const reGenerate = async () => {
    const { quality, text, errorCorrectionLevel, type, margin, color: {
        dark,
        light
    } } = qrcodeOptions;
    const dataURL = await QRCode.toDataURL(get(text).trim(), {
        color: {
            dark: get(dark),
            light: get(light)
        },
        rendererOpts: {
            quality: Number((quality / 100).toFixed(2))
        },
        margin,
        errorCorrectionLevel: get(errorCorrectionLevel) as any,
        type: get(type) as any
    })
    qrcodeDataURL.value = dataURL;
    nextTick(() => {
        console.log(dataURL);
    })
}

watch(qrcodeOptions, async () => {
    await reGenerate()
}, { deep: true })

onMounted(async () => {
    await reGenerate()
})


const fileType = computed(() => {
    return qrcodeOptions.type.split('/')[1]
})

const downloadImage = () => {
    downloadFileFromBase64({ source: qrcodeDataURL.value, filename: `qrcode.${fileType.value}` })
};

</script>

<style scoped>
.el-form .el-form-item {
    margin-bottom: 0;
}
</style>