/**
 * 文章状态管理
 */

import { create } from 'zustand';
import {
    Article,
    ArticleInput,
    PaginatedResponse,
    PaginationParams,
} from '../types';
import { articlesApi } from '../services/api';
import { getPaginationParams } from '../utils';

interface ArticleState {
    articles: Article[];
    featuredArticles: Article[];
    currentArticle: Article | null;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    isLoading: boolean;
    error: string | null;

    // 获取文章列表
    fetchArticles: (params?: Partial<PaginationParams>) => Promise<void>;
    // 获取推荐文章
    fetchFeaturedArticles: () => Promise<void>;
    // 根据ID获取文章
    fetchArticleById: (id: string) => Promise<void>;
    // 根据Slug获取文章
    fetchArticleBySlug: (slug: string) => Promise<void>;
    // 创建文章
    createArticle: (article: ArticleInput) => Promise<Article>;
    // 更新文章
    updateArticle: (id: string, article: ArticleInput) => Promise<Article>;
    // 删除文章
    deleteArticle: (id: string) => Promise<void>;
    // 点赞文章
    // likeArticle: (id: string) => Promise<void>;
    // 取消点赞
    // unlikeArticle: (id: string) => Promise<void>;
    // 重置错误
    resetError: () => void;
    // 清除当前文章
    clearCurrentArticle: () => void;
}

const useArticleStore = create<ArticleState>((set, get) => ({
    articles: [],
    featuredArticles: [],
    currentArticle: null,
    pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
    },
    isLoading: false,
    error: null,

    fetchArticles: async (params?: Partial<PaginationParams>) => {
        try {
            set({ isLoading: true, error: null });

            const paginationParams = getPaginationParams(params);
            const response = await articlesApi.getArticles(paginationParams);

            set({
                articles: response.data,
                pagination: {
                    page: response.meta.page,
                    pageSize: response.meta.pageSize,
                    total: response.meta.total,
                    totalPages: response.meta.totalPages,
                },
                isLoading: false,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '获取文章列表失败',
            });
        }
    },

    fetchFeaturedArticles: async () => {
        try {
            set({ isLoading: true, error: null });

            // 获取推荐文章，可能需要特定的API参数
            const response = await articlesApi.getFeaturedArticles(5);

            set({
                featuredArticles: response,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '获取推荐文章失败',
            });
        }
    },

    fetchArticleById: async (id: string) => {
        try {
            set({ isLoading: true, error: null });

            const article = await articlesApi.fetchArticleById(id);

            set({
                currentArticle: article,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '获取文章详情失败',
            });
        }
    },

    fetchArticleBySlug: async (slug: string) => {
        try {
            set({ isLoading: true, error: null });

            const article = await articlesApi.getArticle(slug);

            set({
                currentArticle: article,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '获取文章详情失败',
            });
        }
    },

    createArticle: async (article: ArticleInput) => {
        try {
            set({ isLoading: true, error: null });

            const newArticle = await articlesApi.createArticle(article);

            // 更新文章列表
            set((state) => ({
                articles: [newArticle, ...state.articles],
                isLoading: false,
            }));

            return newArticle;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '创建文章失败',
            });
            throw error;
        }
    },

    updateArticle: async (id: string, article: ArticleInput) => {
        try {
            set({ isLoading: true, error: null });

            const updatedArticle = await articlesApi.updateArticle(id, article);

            // 更新文章列表和当前文章
            set((state) => ({
                articles: state.articles.map((item) =>
                    item.id === id ? updatedArticle : item,
                ),
                currentArticle:
                    state.currentArticle?.id === id
                        ? updatedArticle
                        : state.currentArticle,
                isLoading: false,
            }));

            return updatedArticle;
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '更新文章失败',
            });
            throw error;
        }
    },

    deleteArticle: async (id: string) => {
        try {
            set({ isLoading: true, error: null });

            await articlesApi.deleteArticle(id);

            // 从文章列表中移除
            set((state) => ({
                articles: state.articles.filter((article) => article.id !== id),
                currentArticle:
                    state.currentArticle?.id === id
                        ? null
                        : state.currentArticle,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || '删除文章失败',
            });
            throw error;
        }
    },

    // likeArticle: async (id: string) => {
    //     try {
    //         const response = await articlesApi.likeArticle(id);

    //         // 更新文章点赞数
    //         set((state) => ({
    //             articles: state.articles.map((article) =>
    //                 article.id === id
    //                     ? { ...article, likeCount: response.likeCount }
    //                     : article,
    //             ),
    //             currentArticle:
    //                 state.currentArticle?.id === id
    //                     ? {
    //                           ...state.currentArticle,
    //                           likeCount: response.likeCount,
    //                       }
    //                     : state.currentArticle,
    //         }));
    //     } catch (error: any) {
    //         set({
    //             error: error.message || '点赞失败',
    //         });
    //     }
    // },

    // unlikeArticle: async (id: string) => {
    //     try {
    //         const response = await api.articles.unlike(id);

    //         // 更新文章点赞数
    //         set((state) => ({
    //             articles: state.articles.map((article) =>
    //                 article.id === id
    //                     ? { ...article, likeCount: response.likeCount }
    //                     : article,
    //             ),
    //             currentArticle:
    //                 state.currentArticle?.id === id
    //                     ? {
    //                           ...state.currentArticle,
    //                           likeCount: response.likeCount,
    //                       }
    //                     : state.currentArticle,
    //         }));
    //     } catch (error: any) {
    //         set({
    //             error: error.message || '取消点赞失败',
    //         });
    //     }
    // },

    resetError: () => {
        set({ error: null });
    },

    clearCurrentArticle: () => {
        set({ currentArticle: null });
    },
}));

export default useArticleStore;
