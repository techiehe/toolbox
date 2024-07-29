<script setup lang="ts">
import { useCopy } from '@/composables/use-copy';
import { computed, watch } from 'vue';
import { CopyDocument } from '@element-plus/icons-vue';
const props = defineProps(["prop"])
const emits = defineEmits(["update"]);

const model = defineModel<string>();
const { copy, isJustCopied } = useCopy({ source: model.value, createToast: false });
const tooltipText = computed(() => isJustCopied.value ? 'Copied!' : 'Copy to clipboard');

watch(model, (newValue) => {
    emits("update", newValue, props.prop)
})


</script>

<template>
    <el-input type="text" v-model="model">
        <template #suffix>
            <el-tooltip :content="tooltipText">
                <el-button circle variant="text" size="small" @click="copy()">
                    <el-icon>
                        <CopyDocument />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </template>
    </el-input>
</template>