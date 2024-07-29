<script lang="ts" setup>
import { ref, watch } from 'vue'
const jsonRaw = ref('')

const jsonFormat = ref('')
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);
const jsonRef = ref()

watch(jsonRaw, () => {
    let t  = JSON.stringify(JSON.parse(jsonRaw.value), null, 4);
    jsonFormat.value =  hljs.highlightAuto(t).value
})


</script>

<template>
    <el-card shadow="never">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <el-input type="textarea" v-model="jsonRaw" rows="20" />
            <pre ref="jsonRef" class=" h-2/3 overflow-y-auto" v-html="jsonFormat"></pre>
        </div>
    </el-card>

</template>

<style scoped>
.el-form .el-form-item {
    margin-bottom: 0;
}
</style>