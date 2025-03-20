/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article, Category, Tag } from '@/types';

// 示例数据，当 API 请求失败时使用
export const sampleArticles: Partial<Article>[] = [
    {
        id: 'sample-1',
        title: '示例文章标题',
        content: '这是一篇示例文章的内容，用于在 API 请求失败时显示。',
        author: {
            id: 'author-1',
            name: '示例作者',
            email: '',
            role: 'author',
            isActive: true,
        } as any,
        createdAt: new Date().toISOString(),
        tags: [
            {
                id: 'tag-1',
                name: '示例标签',
                color: '#3b82f6',
                slug: 'sample-tag',
            } as any,
        ],
    },
    {
        id: 'sample-2',
        title: '另一篇示例文章',
        content: '这是另一篇示例文章的内容，展示了在后端不可用时的界面效果。',
        author: {
            id: 'author-2',
            name: '示例作者',
            email: '',
            role: 'author',
            isActive: true,
        } as any,
        createdAt: new Date().toISOString(),
        tags: [
            {
                id: 'tag-2',
                name: '示例标签',
                color: '#10b981',
                slug: 'sample-tag-2',
            } as any,
        ],
    },
];

export const sampleCategories: Partial<Category>[] = [
    { id: 'cat-1', name: '示例分类1', articleCount: 5 },
    { id: 'cat-2', name: '示例分类2', articleCount: 3 },
    { id: 'cat-3', name: '示例分类3', articleCount: 7 },
];

export const sampleTags: Partial<Tag>[] = [
    {
        id: 'tag-1',
        name: '示例标签1',
        color: '#3b82f6',
        articleCount: 4,
        slug: 'tag-1',
    } as any,
    {
        id: 'tag-2',
        name: '示例标签2',
        color: '#10b981',
        articleCount: 2,
        slug: 'tag-2',
    } as any,
    {
        id: 'tag-3',
        name: '示例标签3',
        color: '#f59e0b',
        articleCount: 6,
        slug: 'tag-3',
    } as any,
    {
        id: 'tag-4',
        name: '示例标签4',
        color: '#ef4444',
        articleCount: 3,
        slug: 'tag-4',
    } as any,
];
