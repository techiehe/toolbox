import { defineTool } from '..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/crypto-converter',
    keywords: ['color', 'converter'],
    component: () => import('./Aes.vue'),
    icon: DocumentAdd,
    redirectFrom: ['/crypto-converter'],
    meta: {
        name: 'AES 加密',
        description: '使用 AES 加密算法加密和解密文本明文',
    }
});