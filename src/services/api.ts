/**
 * API服务
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config';
import { LocalStorageKey } from '../constants';
import {
    ApiError,
    ApiResponse,
    Article,
    ArticleInput,
    Category,
    CategoryInput,
    LoginCredentials,
    PaginatedResponse,
    PaginationParams,
    SearchParams,
    SearchResult,
    Tag,
    TagInput,
    User,
} from '../types';
import { handleApiError, storage } from '../utils';

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从本地存储获取token
        const token = storage.get<string>(LocalStorageKey.AUTH_TOKEN);

        // 如果有token，添加到请求头
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 如果是401错误（未授权）且没有重试过，尝试刷新token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 从本地存储获取刷新token
                const refreshToken = storage.get<string>(
                    LocalStorageKey.REFRESH_TOKEN,
                );

                if (!refreshToken) {
                    // 如果没有刷新token，清除认证信息并返回登录页
                    storage.remove(LocalStorageKey.AUTH_TOKEN);
                    storage.remove(LocalStorageKey.REFRESH_TOKEN);
                    storage.remove(LocalStorageKey.USER);
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // 调用刷新token接口
                const response = await apiClient.post('/auth/refresh', {
                    refreshToken,
                });

                // 更新token
                const { accessToken, refreshToken: newRefreshToken } =
                    response.data;
                storage.set(LocalStorageKey.AUTH_TOKEN, accessToken);
                storage.set(LocalStorageKey.REFRESH_TOKEN, newRefreshToken);

                // 更新原始请求的Authorization头
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // 重试原始请求
                return apiClient(originalRequest);
            } catch (refreshError) {
                // 刷新token失败，清除认证信息并返回登录页
                storage.remove(LocalStorageKey.AUTH_TOKEN);
                storage.remove(LocalStorageKey.REFRESH_TOKEN);
                storage.remove(LocalStorageKey.USER);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // 处理其他错误
        return Promise.reject(handleApiError(error));
    },
);

// 通用请求方法
const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await apiClient(config);
        return response.data.data;
    } catch (error) {
        throw handleApiError(error as ApiError);
    }
};

// 认证相关API
export const authApi = {
    // 登录
    login: async (credentials: LoginCredentials) => {
        return request<{
            accessToken: string;
            refreshToken: string;
            user: User;
        }>({
            method: 'POST',
            url: '/auth/login',
            data: credentials,
        });
    },

    // 注册
    register: async (data: {
        username: string;
        email: string;
        password: string;
    }) => {
        return request<User>({
            method: 'POST',
            url: '/auth/register',
            data,
        });
    },

    // 登出
    logout: async () => {
        return request<void>({
            method: 'POST',
            url: '/auth/logout',
        });
    },

    // 刷新token
    refreshToken: async (refreshToken: string) => {
        return request<{ accessToken: string; refreshToken: string }>({
            method: 'POST',
            url: '/auth/refresh',
            data: { refreshToken },
        });
    },

    // 获取当前用户信息
    getCurrentUser: async () => {
        return request<User>({
            method: 'GET',
            url: '/auth/me',
        });
    },
};

// 文章相关API
export const articlesApi = {
    // 获取文章列表
    getArticles: async (params?: PaginationParams) => {
        return request<PaginatedResponse<Article>>({
            method: 'GET',
            url: '/articles',
            params,
        });
    },

    // 获取文章详情
    getArticle: async (slug: string) => {
        return request<Article>({
            method: 'GET',
            url: `/articles/slug/${slug}`,
        });
    },

    // 创建文章
    createArticle: async (data: ArticleInput) => {
        return request<Article>({
            method: 'POST',
            url: '/articles',
            data,
        });
    },

    // 更新文章
    updateArticle: async (id: string, data: Partial<ArticleInput>) => {
        return request<Article>({
            method: 'PATCH',
            url: `/articles/${id}`,
            data,
        });
    },

    // 删除文章
    deleteArticle: async (id: string) => {
        return request<void>({
            method: 'DELETE',
            url: `/articles/${id}`,
        });
    },

    // 获取热门文章
    getPopularArticles: async (limit?: number) => {
        return request<Article[]>({
            method: 'GET',
            url: '/articles/popular',
            params: { limit },
        });
    },

    // 获取最新文章
    getLatestArticles: async (limit?: number) => {
        return request<Article[]>({
            method: 'GET',
            url: '/articles/recent',
            params: { limit },
        });
    },

    // 获取推荐文章
    getFeaturedArticles: async (limit?: number) => {
        return request<Article[]>({
            method: 'GET',
            url: '/articles/featured',
            params: { limit },
        });
    },

    // 获取文章详情
    fetchArticleById: async (id: string): Promise<Article> => {
        return request<Article>({
            method: 'GET',
            url: `/articles/${id}`,
        });
    },
};

// 分类相关API
export const categoriesApi = {
    // 获取分类列表
    getCategories: async (params?: PaginationParams) => {
        return request<Category[]>({
            method: 'GET',
            url: '/categories',
            params,
        });
    },

    // 获取分类详情
    getCategory: async (slug: string) => {
        return request<Category>({
            method: 'GET',
            url: `/categories/slug/${slug}`,
        });
    },

    // 创建分类
    createCategory: async (data: CategoryInput) => {
        return request<Category>({
            method: 'POST',
            url: '/categories',
            data,
        });
    },

    // 更新分类
    updateCategory: async (id: string, data: Partial<CategoryInput>) => {
        return request<Category>({
            method: 'PATCH',
            url: `/categories/${id}`,
            data,
        });
    },

    // 删除分类
    deleteCategory: async (id: string) => {
        return request<void>({
            method: 'DELETE',
            url: `/categories/${id}`,
        });
    },

    // 获取分类树
    getCategoryTree: async () => {
        return request<Category[]>({
            method: 'GET',
            url: '/categories/tree',
        });
    },
};

// 标签相关API
export const tagsApi = {
    // 获取标签列表
    getTags: async (params?: PaginationParams) => {
        return request<PaginatedResponse<Tag>>({
            method: 'GET',
            url: '/tags',
            params,
        });
    },

    // 获取标签详情
    getTag: async (slug: string) => {
        return request<Tag>({
            method: 'GET',
            url: `/tags/slug/${slug}`,
        });
    },

    // 创建标签
    createTag: async (data: TagInput) => {
        return request<Tag>({
            method: 'POST',
            url: '/tags',
            data,
        });
    },

    // 更新标签
    updateTag: async (id: string, data: Partial<TagInput>) => {
        return request<Tag>({
            method: 'PATCH',
            url: `/tags/${id}`,
            data,
        });
    },

    // 删除标签
    deleteTag: async (id: string) => {
        return request<void>({
            method: 'DELETE',
            url: `/tags/${id}`,
        });
    },

    // 获取热门标签
    getPopularTags: async (limit?: number) => {
        return request<Tag[]>({
            method: 'GET',
            url: '/tags/popular',
            params: { limit },
        });
    },

    // 获取标签列表
    fetchTags: async (): Promise<Tag[]> => {
        return request<Tag[]>({
            method: 'GET',
            url: '/tags',
        });
    },
};

// 搜索相关API
export const searchApi = {
    // 全局搜索
    search: async (params: SearchParams) => {
        return request<SearchResult>({
            method: 'GET',
            url: '/search',
            params: {
                query: params.query,
                ...params.pagination,
            },
        });
    },

    // 搜索文章
    searchArticles: async (query: string, pagination?: PaginationParams) => {
        return request<PaginatedResponse<Article>>({
            method: 'GET',
            url: '/search/articles',
            params: {
                query,
                ...pagination,
            },
        });
    },

    // 搜索标签
    searchTags: async (query: string, pagination?: PaginationParams) => {
        return request<PaginatedResponse<Tag>>({
            method: 'GET',
            url: '/search/tags',
            params: {
                query,
                ...pagination,
            },
        });
    },

    // 搜索分类
    searchCategories: async (query: string, pagination?: PaginationParams) => {
        return request<PaginatedResponse<Category>>({
            method: 'GET',
            url: '/search/categories',
            params: {
                query,
                ...pagination,
            },
        });
    },
};
