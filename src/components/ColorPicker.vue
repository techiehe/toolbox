<script setup lang="ts">
import { ref } from 'vue';
const hex = defineModel()

const handleColorPicker = (e: any) => {
    hex.value = e;
}

const colorPicker = ref()

</script>

<template>
    <div class="flex gap-4">
        <el-button class="w-full" @click="colorPicker.show()">
            {{ hex }}
        </el-button>
        <el-color-picker ref="colorPicker" @active-change="handleColorPicker" popper-class="color-picker"
            :model-value="hex" />
    </div>
</template>

<style scoped>
:global(.color-picker .el-button) {
    display: none;
}
</style>