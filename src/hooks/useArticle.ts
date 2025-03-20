/**
 * 文章相关钩子
 */

import { useEffect, useState } from 'react';
import { useArticleStore } from '../store';
import { Article, ArticleInput, PaginationParams } from '../types';
import { ArticleStatus } from '../constants';

/**
 * 文章列表钩子，提供文章列表相关功能
 */
export const useArticleList = (initialParams?: Partial<PaginationParams>) => {
    const {
        articles,
        pagination,
        isLoading,
        error,
        fetchArticles,
        resetError,
    } = useArticleStore();

    const [params, setParams] = useState<Partial<PaginationParams>>(
        initialParams || {},
    );

    // 加载文章列表
    useEffect(() => {
        fetchArticles(params);
    }, [fetchArticles, params]);

    // 更新分页参数
    const updateParams = (newParams: Partial<PaginationParams>) => {
        setParams((prev) => ({ ...prev, ...newParams }));
    };

    // 切换页码
    const changePage = (page: number) => {
        updateParams({ page });
    };

    // 切换每页数量
    const changePageSize = (pageSize: number) => {
        updateParams({ page: 1, pageSize });
    };

    // 切换排序
    const changeSort = (
        sortField: string,
        sortOrder: 'asc' | 'desc' = 'desc',
    ) => {
        updateParams({ sortField, sortOrder });
    };

    return {
        articles,
        pagination,
        isLoading,
        error,
        resetError,
        params,
        updateParams,
        changePage,
        changePageSize,
        changeSort,
        refresh: () => fetchArticles(params),
    };
};

/**
 * 文章详情钩子，提供文章详情相关功能
 */
export const useArticleDetail = (
    idOrSlug?: string,
    useSlug: boolean = true,
) => {
    const {
        currentArticle,
        isLoading,
        error,
        fetchArticleById,
        fetchArticleBySlug,
        // likeArticle,
        // unlikeArticle,
        resetError,
        clearCurrentArticle,
    } = useArticleStore();

    // 加载文章详情
    useEffect(() => {
        if (idOrSlug) {
            if (useSlug) {
                fetchArticleBySlug(idOrSlug);
            } else {
                fetchArticleById(idOrSlug);
            }
        }

        // 组件卸载时清除当前文章
        return () => {
            clearCurrentArticle();
        };
    }, [
        idOrSlug,
        useSlug,
        fetchArticleById,
        fetchArticleBySlug,
        clearCurrentArticle,
    ]);

    return {
        article: currentArticle,
        isLoading,
        error,
        resetError,
        // likeArticle,
        // unlikeArticle,
        refresh: () => {
            if (idOrSlug) {
                if (useSlug) {
                    fetchArticleBySlug(idOrSlug);
                } else {
                    fetchArticleById(idOrSlug);
                }
            }
        },
    };
};

/**
 * 文章编辑钩子，提供文章编辑相关功能
 */
export const useArticleEditor = (initialArticle?: Partial<ArticleInput>) => {
    const { isLoading, error, createArticle, updateArticle, resetError } =
        useArticleStore();

    const [article, setArticle] = useState<Partial<ArticleInput>>(
        initialArticle || {
            title: '',
            content: '',
            excerpt: '',
            status: ArticleStatus.DRAFT,
        },
    );

    // 更新文章字段
    const updateField = <K extends keyof ArticleInput>(
        field: K,
        value: ArticleInput[K],
    ) => {
        setArticle((prev) => ({ ...prev, [field]: value }));
    };

    // 保存文章
    const saveArticle = async (id?: string): Promise<Article | undefined> => {
        try {
            if (!article.title || !article.content) {
                throw new Error('标题和内容不能为空');
            }

            if (id) {
                // 更新文章
                return await updateArticle(id, article as ArticleInput);
            } else {
                // 创建文章
                return await createArticle(article as ArticleInput);
            }
        } catch (error) {
            console.error('保存文章失败:', error);
            return undefined;
        }
    };

    return {
        article,
        setArticle,
        updateField,
        saveArticle,
        isLoading,
        error,
        resetError,
    };
};

/**
 * 推荐文章钩子，提供推荐文章相关功能
 */
export const useFeaturedArticles = () => {
    const {
        featuredArticles,
        isLoading,
        error,
        fetchFeaturedArticles,
        resetError,
    } = useArticleStore();

    // 加载推荐文章
    useEffect(() => {
        fetchFeaturedArticles();
    }, [fetchFeaturedArticles]);

    return {
        featuredArticles,
        isLoading,
        error,
        resetError,
        refresh: fetchFeaturedArticles,
    };
};
