import { defineTool } from '../..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/converter/date-time',
    keywords: ['color', 'converter'],
    component: () => import('./index.vue'),
    icon: DocumentAdd,
    redirectFrom: ['/converter/date-time'],
    meta: {
        name: '时间转换器',
        description: '时间转换器',
    }
});