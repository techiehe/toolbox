<template>
    <div class="flex flex-col gap-4">
        <div class=" border   rounded-sm">
            <el-form :inline="true" :model="cryptoForm" class=" px-4 py-2">
                <el-form-item label="AES加密模式">
                    <el-select v-model="cryptoForm.mode" style="width: 100px;" placeholder="加密模式">
                        <el-option label="ECB" value="ECB" />
                        <!-- <el-option label="CBC" value="CBC" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="填充方式">
                    <el-select v-model="cryptoForm.padding" style="width: 100px;" placeholder="填充方式">
                        <el-option label="PKCS7" value="PKCS7" />
                        <!-- <el-option label="PKCS5" value="PKCS5" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="密钥长度">
                    <el-select v-model="cryptoForm.length" style="width: 100px;" placeholder="密钥长度">
                        <!-- <el-option label="128位" value="128" /> -->
                        <!-- <el-option label="192位" value="192" /> -->
                        <el-option label="256位" value="256" />
                    </el-select>
                </el-form-item>
                <el-form-item label="密钥">
                    <el-input v-model="cryptoForm.secretKey" placeholder="输入密钥" />
                </el-form-item>
                <el-form-item label="输出方式">
                    <el-select v-model="cryptoForm.output" style="width: 100px;" placeholder="输出方式">
                        <el-option label="Base64" value="base64" />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-input type="textarea" v-model="cryptoForm.content" :rows="8" placeholder="输入内容" resize="none">

            </el-input>
        </div>
        <el-button-group>
            <el-button type="primary" @click="ENCRYPT">加密</el-button>
            <el-button type="success" @click="DECRYPT">
                解密
            </el-button>
        </el-button-group>
        <el-input type="textarea" v-model="cryptoRes" readonly="true" :rows="8" placeholder="输入内容" resize="none">

        </el-input>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AES_ECB_DECRYPT, AES_ECB_ENCRYPT } from "@/utils/aes"

const cryptoForm = reactive({
    mode: 'ECB',
    padding: 'PKCS7',
    length: '256',
    secretKey: '',
    output: 'base64',
    content: ""
})

const cryptoRes = ref("")

const ENCRYPT = () => {
    console.log(cryptoForm)
    const { mode, padding, length, secretKey, output, content } = cryptoForm
    cryptoRes.value = AES_ECB_ENCRYPT(content, secretKey)
}


const DECRYPT = () => {
    const { mode, padding, length, secretKey, output, content } = cryptoForm
    cryptoRes.value = AES_ECB_DECRYPT(content, secretKey)
}
</script>

<style scoped>
.el-form .el-form-item {
    margin-bottom: 0;
}
</style>@/utils/aes