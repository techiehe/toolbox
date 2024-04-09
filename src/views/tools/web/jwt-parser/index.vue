<script setup lang="ts">
import { decodeJwt } from './jwt-parser.service';
import { useValidation } from '@/composables/use-validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';
import { ref, computed, watch } from 'vue'
const rawJwt = ref(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwibmFtZSI6Imh1YWxhZnVuIiwiaWF0IjoxNTE2MjM5MDIyfQ.o8kFHzEy-OlXmV4NARyZ0jZOSoc9BoZpRQa7Cho-CB4',
);

const decodedJWT = computed(() =>
    withDefaultOnError(() => decodeJwt({ jwt: rawJwt.value }), { header: [], payload: [] }),
);

const sections = [
    { key: 'header', title: 'Header' },
    { key: 'payload', title: 'Payload' },
] as const;

const validation = useValidation({
    source: rawJwt,
    rules: [
        {
            validator: value => value.length > 0 && isNotThrowing(() => decodeJwt({ jwt: rawJwt.value })),
            message: 'Invalid JWT',
        },
    ],
});

watch(validation, (value) => {
    if (!value.isValid) {
        ElMessage.error('JWT 校验失败');
        return;
    }
    ElMessage.success('解析成功');
})

</script>

<template>
    <el-card shadow="hover">
        <el-input type="textarea" v-model="rawJwt" label="JWT to decode" placeholder="输入你的 JWT..." rows="5"
            class="multiline raw-text autofocus mb-3" />
        <div v-if="validation.isValid" class=" border border-bg-slate-200">
            <template v-for="section of sections" :key="section.key">
                <div colspan="2" class="h-12 bg-slate-200 font-bold  flex items-center justify-center">
                    {{ section.title }}
                </div>
                <div v-for="({ claim, claimDescription, friendlyValue, value }, index) in decodedJWT[section.key]"
                    class="grid grid-cols-2 gap-4 my-2 border-b border-bg-slate-200 pb-2"
                    :class="index === decodedJWT[section.key].length - 1 ? ' border-b-0' : ''" :key="claim + value">
                    <div class="col-span-1 pl-2">
                        <span class="font-bold">
                            {{ claim }}
                        </span>
                        <span v-if="claimDescription" class="ml-2 op-70">
                            ({{ claimDescription }})
                        </span>
                    </div>
                    <div class="col-span-1 pr-2">
                        <span>{{ value }}</span>
                        <span v-if="friendlyValue" ml-2 op-70>
                            ({{ friendlyValue }})
                        </span>
                    </div>
                </div>
            </template>
        </div>
    </el-card>
</template>

<style scoped></style>