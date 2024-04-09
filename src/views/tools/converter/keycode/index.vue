<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
import { ref, computed } from 'vue'
import InputCopyable from '@/components/InputCopyable.vue';

const event = ref<KeyboardEvent>();

useEventListener(document, 'keydown', (e) => {
    event.value = e;
});

const fields = computed(() => {
    if (!event.value) {
        return [];
    }
    return [
        {
            label: '按键 :',
            value: event.value.key,
            placeholder: '按键名...',
        },
        {
            label: '按键代码 (不推荐使用):',
            value: String(event.value.keyCode),
            placeholder: '按键代码...',
        },
        {
            label: '物理代码:',
            value: event.value.code,
            placeholder: '物理代码...',
        },
        {
            label: '键盘上位置 :',
            value: String(event.value.location),
            placeholder: '键盘上位置...',
        },
        {
            label: '修饰键 :',
            value: [
                event.value.metaKey && 'Meta',
                event.value.shiftKey && 'Shift',
                event.value.ctrlKey && 'Ctrl',
                event.value.altKey && 'Alt',
            ]
                .filter(Boolean)
                .join(' + '),
            placeholder: 'None',
        },
    ];
});
</script>

<template>
    <div>
        <el-card shadow="hover" class="mb-5 text-center important:py-12">
            <div v-if="event" class="mb-2 text-3xl">
                {{ event.key }}
            </div>
            <span class="lh-1 op-70">
                按下你想要获取信息的键盘上的键
            </span>
        </el-card>

        <div v-for="({ label, value, placeholder }, i) of fields" :key="i" class="flex items-center mb-2">
            <label style="flex: 0 0 150px">
                {{ label }}
            </label>
            <InputCopyable :value="value" readonly :placeholder="placeholder" />
        </div>
    </div>
</template>