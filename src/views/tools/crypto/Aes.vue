<template>
    <el-card shadow="never">
        <el-form :model="cryptoForm" class=" w-full select-none" label-position="top">
            <div class="grid grid-cols-2 gap-2">
                <el-form-item label="待操作内容" class=" col-span-1">
                    <el-input type="textarea" v-model="cryptoForm.content" :rows="10" placeholder="待操作内容" resize="none" />
                </el-form-item>
                <div class=" col-span-1">
                    <el-form-item label="模式">
                        <el-select v-model="cryptoForm.mode" placeholder="模式">
                            <el-option label="ECB" value="ECB" />
                            <!-- <el-option label="CBC" value="CBC" /> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="填充">
                        <el-select v-model="cryptoForm.padding" style="width: 100px;" placeholder="填充">
                            <el-option label="PKCS7" value="PKCS7" />
                            <!-- <el-option label="AnsiX923" value="AnsiX923" />
                            <el-option label="Iso10126" value="Iso10126" />
                            <el-option label="Iso97971" value="Iso97971" />
                            <el-option label="ZeroPadding" value="ZeroPadding" />
                            <el-option label="NoPadding" value="NoPadding" /> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密钥">
                        <el-input v-model="cryptoForm.secretKey" placeholder="密钥" />
                    </el-form-item>
                    <el-form-item label="输出">
                        <el-select v-model="cryptoForm.output" style="width: 100px;" placeholder="输出">
                            <el-option label="Base64" value="base64" />
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="" class="col-span-2">
                    <el-button-group>
                        <el-button type="primary" @click="ENCRYPT">加密</el-button>
                        <el-button type="success" @click="DECRYPT">
                            解密
                        </el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item label="操作结果" class=" col-span-2">
                    <el-input type="textarea" v-model="cryptoRes" :readonly="true" :rows="8" placeholder="操作结果"
                        resize="none" />
                </el-form-item>
            </div>
        </el-form>
    </el-card>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AES_ECB_DECRYPT, AES_ECB_ENCRYPT, AES_CBC_ENCRYPT } from "@/utils/aes"

const cryptoForm = reactive({
    mode: 'ECB',
    padding: 'PKCS7',
    length: '256',
    secretKey: '',
    output: 'base64',
    content: ""
})

const cryptoRes = ref("")

/**
 *  加密
 */
const ENCRYPT = () => {
    console.log(cryptoForm)
    const { mode, padding, length, secretKey, output, content } = cryptoForm;
    if (mode === 'ECB') {
        cryptoRes.value = AES_ECB_ENCRYPT(content, secretKey);
    } else {
        cryptoRes.value = AES_CBC_ENCRYPT(content, secretKey);
    }
}

/**
 *  解密
 */
const DECRYPT = () => {
    const { mode, padding, length, secretKey, output, content } = cryptoForm
    cryptoRes.value = AES_ECB_DECRYPT(content, secretKey)
}
</script>

<style scoped>
.el-form .el-form-item {
    margin-bottom: 0;
}
</style>