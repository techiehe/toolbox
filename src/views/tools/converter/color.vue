<script setup lang="ts">
import { colord, extend } from 'colord';
import { reactive, ref, watch } from 'vue';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import InputCopyable from '@/components/InputCopyable.vue';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const name = ref('');
const hex = ref('#1ea54cff');
const rgb = ref('');
const hsl = ref('');
const hwb = ref('');
const cmyk = ref('');
const lch = ref('');

const onInputUpdated = (value: string, omit: string) => {
    try {
        const color = colord(value);

        if (omit !== 'name') {
            name.value = color.toName({ closest: true }) ?? '';
        }
        if (omit !== 'hex') {
            hex.value = color.toHex();
        }
        if (omit !== 'rgb') {
            rgb.value = color.toRgbString();
        }
        if (omit !== 'hsl') {
            hsl.value = color.toHslString();
        }
        if (omit !== 'hwb') {
            hwb.value = color.toHwbString();
        }
        if (omit !== 'cmyk') {
            cmyk.value = color.toCmykString();
        }
        if (omit !== 'lch') {
            lch.value = color.toLchString();
        }
    }
    catch {
        //
    }
}

const handleColorPicker = (e: any) => {
    hex.value = e;
    onInputUpdated(e, 'hex')
}

onInputUpdated(hex.value, 'hex');
</script>

<template>
    <el-card shadow="hover">
        <el-form label-width="100" label-placement="left">
            <el-form-item label="颜色选择器:">
                <el-color-picker v-model="hex" @active-change="handleColorPicker" />
            </el-form-item>
            <el-form-item label="颜色名:">
                <InputCopyable v-model="name" @update="onInputUpdated" prop="name" />
            </el-form-item>
            <el-form-item label="hex:">
                <InputCopyable v-model="hex" @update="onInputUpdated" prop="hex" />
            </el-form-item>
            <el-form-item label="rgb:">
                <InputCopyable v-model="rgb" @update="onInputUpdated" prop='rgb' />
            </el-form-item>
            <el-form-item label="hsl:">
                <InputCopyable v-model="hsl" @update="onInputUpdated" prop='hsl' />
            </el-form-item>
            <el-form-item label="hwb:">
                <InputCopyable v-model="hwb" @update="onInputUpdated" prop='hwb' />
            </el-form-item>
            <el-form-item label="lch:">
                <InputCopyable v-model="lch" @update="onInputUpdated" prop='lch' />
            </el-form-item>
            <el-form-item label="cmyk:">
                <InputCopyable v-model="cmyk" @update="onInputUpdated" prop='cmyk' />
            </el-form-item>
        </el-form>
    </el-card>
</template>