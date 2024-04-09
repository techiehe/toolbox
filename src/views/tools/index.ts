import { isAfter, subWeeks } from 'date-fns';
import type { Component } from 'vue';
import { tool } from './crypto/meta';
export interface Tool {
    path: string
    keywords: string[]
    component: () => Promise<Component>
    icon: Component
    redirectFrom?: string[]
    isNew: boolean
    createdAt?: Date,
    meta: {
        [key: string]: any
    }
}

export interface ToolCategory {
    name: string
    components: Tool[]
}

export type ToolWithCategory = Tool & { category: string };

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function defineTool(tool: WithOptional<Tool, 'isNew'>) {
    const isNew = tool.createdAt ? isAfter(tool.createdAt, subWeeks(new Date(), 2)) : false;

    return {
        isNew,
        ...tool,
    };
}

const metas = import.meta.glob('./**/meta.ts', { eager: true });
export const routes = Object.entries(metas).map(([path, module]) => {
    const { tool } = module as { tool: Tool };
    return tool;
})


