import { DocumentAdd } from '@element-plus/icons-vue';
import { defineTool } from '..';

export const tool = defineTool({
    path: '/qrcode',
    keywords: ['color', 'converter'],
    component: () => import('./index.vue'),
    icon: DocumentAdd,
    meta: {
        name: '二维码生成',
        description: '生成并下载 URL 或文本的 QR 码，并自定义背景和前景色',
    },
    redirectFrom: ['/qrcode'],
});