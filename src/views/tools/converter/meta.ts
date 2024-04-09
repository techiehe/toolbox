import { defineTool } from '..';
import { DocumentAdd } from '@element-plus/icons-vue';

export const tool = defineTool({
    path: '/converter/color',
    keywords: ['color', 'converter'],
    component: () => import('./color.vue'),
    icon: DocumentAdd,
    meta: {
        name: '颜色转换器',
        description: '转换颜色在不同格式（hex、rgb、hsl 和 css 名称）之间',
    },
    redirectFrom: ['/converter/color'],
});