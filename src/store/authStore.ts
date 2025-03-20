/**
 * 认证状态管理
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocalStorageKey } from '../constants';
import { AuthResponse, LoginCredentials, User } from '../types';
import { authApi } from '../services/api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // 登录
    login: (credentials: LoginCredentials) => Promise<void>;
    // 注册
    register: (name: string, email: string, password: string) => Promise<void>;
    // 登出
    logout: () => Promise<void>;
    // 获取当前用户信息
    fetchCurrentUser: () => Promise<void>;
    // 重置错误
    resetError: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginCredentials) => {
                try {
                    set({ isLoading: true, error: null });

                    const response = await authApi.login(credentials);

                    // 保存token到localStorage
                    localStorage.setItem(
                        LocalStorageKey.AUTH_TOKEN,
                        response.accessToken,
                    );
                    localStorage.setItem(
                        LocalStorageKey.REFRESH_TOKEN,
                        response.refreshToken,
                    );

                    set({
                        user: response.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || '登录失败，请检查您的凭据',
                        isAuthenticated: false,
                        user: null,
                    });
                }
            },

            register: async (name: string, email: string, password: string) => {
                try {
                    set({ isLoading: true, error: null });

                    await authApi.register({ username: name, email, password });

                    // 注册成功后自动登录
                    await get().login({ email, password, rememberMe: false });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || '注册失败，请稍后再试',
                    });
                }
            },

            logout: async () => {
                try {
                    set({ isLoading: true });

                    // 调用登出API
                    await authApi.logout();

                    // 清除本地存储的token
                    localStorage.removeItem(LocalStorageKey.AUTH_TOKEN);
                    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                } catch (error) {
                    // 即使API调用失败，也要清除本地状态
                    localStorage.removeItem(LocalStorageKey.AUTH_TOKEN);
                    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            fetchCurrentUser: async () => {
                // 如果没有token，不进行请求
                const token = localStorage.getItem(LocalStorageKey.AUTH_TOKEN);
                if (!token) {
                    set({ isAuthenticated: false, user: null });
                    return;
                }

                try {
                    set({ isLoading: true });

                    const user = await authApi.getCurrentUser();

                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    // 获取用户信息失败，可能是token无效
                    localStorage.removeItem(LocalStorageKey.AUTH_TOKEN);
                    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            resetError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            // 只持久化部分状态
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);

export default useAuthStore;
