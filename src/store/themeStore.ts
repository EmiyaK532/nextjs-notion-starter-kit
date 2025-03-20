/**
 * 主题状态管理
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocalStorageKey, ThemeMode } from '../constants';
import { Theme } from '../types';
import { THEME_CONFIG } from '../config';

interface ThemeState {
    mode: ThemeMode;
    isDark: boolean;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        muted: string;
        mutedForeground: string;
        border: string;
        card: string;
        cardForeground: string;
    };

    // 切换主题模式
    toggleMode: () => void;
    // 设置特定主题模式
    setMode: (mode: ThemeMode) => void;
    // 获取当前主题颜色
    getThemeColors: () => Theme['colors'];
}

// 定义亮色和暗色主题颜色
const lightColors = {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    accent: '#3b82f6',
    background: '#ffffff',
    foreground: '#0f0f0f',
    muted: '#f5f5f5',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
    card: '#ffffff',
    cardForeground: '#0f0f0f',
};

const darkColors = {
    primary: THEME_CONFIG.colors.primary,
    secondary: THEME_CONFIG.colors.secondary,
    accent: THEME_CONFIG.colors.accent,
    background: THEME_CONFIG.colors.primary,
    foreground: THEME_CONFIG.colors.text,
    muted: THEME_CONFIG.colors.secondary,
    mutedForeground: THEME_CONFIG.colors.textSecondary,
    border: THEME_CONFIG.colors.border,
    card: THEME_CONFIG.colors.card,
    cardForeground: THEME_CONFIG.colors.cardForeground,
};

// 检测系统主题偏好
const getSystemTheme = (): ThemeMode => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        const isDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        return isDarkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
    }
    return ThemeMode.DARK; // 默认暗色主题
};

// 根据主题模式获取对应的颜色
const getColorsByMode = (mode: ThemeMode): Theme['colors'] => {
    if (mode === ThemeMode.LIGHT) {
        return lightColors;
    }
    if (mode === ThemeMode.DARK) {
        return darkColors;
    }

    // 如果是系统主题，根据系统主题偏好返回对应的颜色
    const systemTheme = getSystemTheme();
    return systemTheme === ThemeMode.DARK ? darkColors : lightColors;
};

// 初始化主题模式
const getInitialThemeMode = (): ThemeMode => {
    // 首先尝试从 localStorage 读取
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme as ThemeMode;
        }
    }

    // 如果没有保存的主题，使用默认暗色主题
    return ThemeMode.DARK;
};

// 初始化暗色模式状态
const getInitialIsDark = (mode: ThemeMode): boolean => {
    if (mode === ThemeMode.DARK) {
        return true;
    }
    if (mode === ThemeMode.LIGHT) {
        return false;
    }
    // 如果是系统主题，根据系统主题偏好
    return getSystemTheme() === ThemeMode.DARK;
};

const initialMode = getInitialThemeMode();
const initialIsDark = getInitialIsDark(initialMode);

const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: initialMode,
            isDark: initialIsDark,
            colors: initialIsDark ? darkColors : lightColors,

            toggleMode: () => {
                const currentMode = get().mode;
                let newMode: ThemeMode;

                if (currentMode === ThemeMode.LIGHT) {
                    newMode = ThemeMode.DARK;
                } else if (currentMode === ThemeMode.DARK) {
                    newMode = ThemeMode.SYSTEM;
                } else {
                    newMode = ThemeMode.LIGHT;
                }

                const colors = getColorsByMode(newMode);
                const isDark =
                    newMode === ThemeMode.DARK ||
                    (newMode === ThemeMode.SYSTEM &&
                        getSystemTheme() === ThemeMode.DARK);

                // 更新状态
                set({ mode: newMode, colors, isDark });

                // 保存到 localStorage
                if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.setItem('theme', newMode);
                }

                // 触发主题变更事件
                const event = new CustomEvent('theme_change', {
                    detail: { mode: newMode, isDark },
                });
                window.dispatchEvent(event);

                console.log('Theme toggled to:', newMode, 'isDark:', isDark);
            },

            setMode: (mode: ThemeMode) => {
                const colors = getColorsByMode(mode);
                const isDark =
                    mode === ThemeMode.DARK ||
                    (mode === ThemeMode.SYSTEM &&
                        getSystemTheme() === ThemeMode.DARK);

                // 更新状态
                set({ mode, colors, isDark });

                // 保存到 localStorage
                if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.setItem('theme', mode);
                }

                // 触发主题变更事件
                const event = new CustomEvent('theme_change', {
                    detail: { mode, isDark },
                });
                window.dispatchEvent(event);

                console.log('Theme set to:', mode, 'isDark:', isDark);
            },

            getThemeColors: () => {
                const { mode } = get();
                return getColorsByMode(mode);
            },
        }),
        {
            name: 'theme-storage',
            getStorage: () => localStorage,
        },
    ),
);

// 监听系统主题变化
if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
        const themeStore = useThemeStore.getState();
        if (themeStore.mode === ThemeMode.SYSTEM) {
            const isDark = mediaQuery.matches;
            const colors = isDark ? darkColors : lightColors;

            useThemeStore.setState({ colors, isDark });

            // 触发重新渲染
            document.documentElement.classList.toggle('dark', isDark);

            // 设置 CSS 变量
            Object.entries(colors).forEach(([key, value]) => {
                document.documentElement.style.setProperty(
                    `--color-${key}`,
                    value,
                );
            });

            // 触发主题变更事件
            const event = new CustomEvent('theme_change', {
                detail: { mode: ThemeMode.SYSTEM, isDark },
            });
            window.dispatchEvent(event);

            console.log('System theme changed, isDark:', isDark);
        }
    };

    mediaQuery.addEventListener('change', handleChange);
}

export default useThemeStore;
