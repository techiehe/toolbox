import { defineTool } from '../..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/format/json',
    keywords: ['color', 'converter'],
    component: () => import('./index.vue'),
    icon: DocumentAdd,
    redirectFrom: ['/format/json'],
    meta: {
        name: 'JSON 格式化与压缩',
        description: '格式化与压缩',
    }
});