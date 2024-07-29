import { defineTool } from '../..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/converter/keycode',
    keywords: ['color', 'converter'],
    component: () => import('./index.vue'),
    icon: DocumentAdd,
    redirectFrom: ['/converter/keycode'],
    meta: {
        name: '键盘信息转换',
        description: '键盘信息转换',
    }
});