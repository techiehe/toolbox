import { defineTool } from '../..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/web/jwt-parser',
    keywords: ['color', 'converter'],
    component: () => import('./index.vue'),
    icon: DocumentAdd,
    redirectFrom: ['/web/jwt-parser'],
    meta: {
        name: 'JWT 解析',
        description: 'JSON-WEB-TOKEN 解析',
    }
});