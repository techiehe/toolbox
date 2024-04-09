<script setup lang="ts">
import { Colord, colord, extend } from 'colord';
import { onMounted, reactive, ref, watch } from 'vue';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import InputCopyable from '@/components/InputCopyable.vue';
import ColorPicker from '@/components/ColorPicker.vue';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const name = ref('');
const hex = ref('#1ea54cff');
const rgb = ref('');
const hsl = ref('');
const hwb = ref('');
const cmyk = ref('');
const lch = ref('');

interface ColorInfo {
    name: string;
    hex: string;
    rgb: string;
    hsl: string;
    hwb: string;
    cmyk: string;
    lch: string;
}

const colorInfo = reactive<ColorInfo>({
    name: '',
    hex: '#1ea54cff',
    rgb: '',
    hsl: '',
    hwb: '',
    cmyk: '',
    lch: '',
})
type ColorInfoKey = keyof ColorInfo;
const converterDict: Record<string, (color: Colord) => string> = {
    name: color => color.toName({ closest: true }) ?? '',
    hex: color => color.toHex(),
    rgb: color => color.toRgbString(),
    hsl: color => color.toHslString(),
    hwb: color => color.toHwbString(),
    cmyk: color => color.toCmykString(),
    lch: color => color.toLchString(),
}

const onInputUpdated = (value: string, omit: string) => {
    try {
        const color = colord(value);
        (Object.keys(colorInfo) as ColorInfoKey[]).forEach((key) => {
            if (key !== omit) {
                const convert = converterDict[key];
                if (convert) {
                    colorInfo[key] = convert(color);
                }
            }
        });
    }
    catch {
    }
}

watch(() => colorInfo.hex, (value) => {
    onInputUpdated(value, 'hex');
})

onMounted(() => {
    onInputUpdated(colorInfo.hex, 'hex');
})
</script>

<template>
    <el-card shadow="hover">
        <el-form label-width="90" label-placement="left">
            <el-form-item label="颜色选择器:">
                <color-picker v-model="colorInfo.hex" />
            </el-form-item>
            <el-form-item label="颜色名:">
                <InputCopyable :model-value="colorInfo.name" @update="onInputUpdated" prop="name" />
            </el-form-item>
            <el-form-item label="hex:">
                <InputCopyable :model-value="colorInfo.hex" @update="onInputUpdated" prop="hex" />
            </el-form-item>
            <el-form-item label="rgb:">
                <InputCopyable :model-value="colorInfo.rgb" @update="onInputUpdated" prop='rgb' />
            </el-form-item>
            <el-form-item label="hsl:">
                <InputCopyable :model-value="colorInfo.hsl" @update="onInputUpdated" prop='hsl' />
            </el-form-item>
            <el-form-item label="hwb:">
                <InputCopyable :model-value="colorInfo.hwb" @update="onInputUpdated" prop='hwb' />
            </el-form-item>
            <el-form-item label="lch:">
                <InputCopyable :model-value="colorInfo.lch" @update="onInputUpdated" prop='lch' />
            </el-form-item>
            <el-form-item label="cmyk:">
                <InputCopyable :model-value="colorInfo.cmyk" @update="onInputUpdated" prop='cmyk' />
            </el-form-item>
        </el-form>
    </el-card>
</template>