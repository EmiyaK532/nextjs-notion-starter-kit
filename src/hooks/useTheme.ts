/**
 * 主题相关钩子
 */

import { useEffect } from 'react';
import { useThemeStore } from '@/store';
import { ThemeMode } from '@/constants';

/**
 * 主题钩子，提供主题相关功能
 */
export const useTheme = () => {
    const { mode, isDark, colors, toggleMode, setMode } = useThemeStore();

    // 应用主题到文档
    useEffect(() => {
        // 首先将主题模式保存到 localStorage
        localStorage.setItem('theme', mode);

        // 设置文档根元素的 class
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 设置CSS变量 - 使用CSS变量是关键
        Object.entries(colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--color-${key}`, value);
        });

        // 将CSS变量转换为 HSL 变量，适配 Tailwind
        // 这是因为 Tailwind 使用 HSL 值作为颜色变量
        document.documentElement.style.setProperty(
            '--background',
            isDark ? '224 71% 4%' : '0 0% 100%',
        );
        document.documentElement.style.setProperty(
            '--foreground',
            isDark ? '213 31% 91%' : '222.2 47.4% 11.2%',
        );
        document.documentElement.style.setProperty(
            '--muted',
            isDark ? '223 47% 11%' : '210 40% 96.1%',
        );
        document.documentElement.style.setProperty(
            '--muted-foreground',
            isDark ? '215.4 16.3% 56.9%' : '215.4 16.3% 46.9%',
        );
        document.documentElement.style.setProperty(
            '--card',
            isDark ? '224 71% 4%' : '0 0% 100%',
        );
        document.documentElement.style.setProperty(
            '--card-foreground',
            isDark ? '213 31% 91%' : '222.2 47.4% 11.2%',
        );
        document.documentElement.style.setProperty(
            '--border',
            isDark ? '216 34% 17%' : '214.3 31.8% 91.4%',
        );
        document.documentElement.style.setProperty(
            '--input',
            isDark ? '216 34% 17%' : '214.3 31.8% 91.4%',
        );
        document.documentElement.style.setProperty(
            '--primary',
            isDark ? '210 40% 98%' : '222.2 47.4% 11.2%',
        );
        document.documentElement.style.setProperty(
            '--primary-foreground',
            isDark ? '222.2 47.4% 1.2%' : '210 40% 98%',
        );
        document.documentElement.style.setProperty(
            '--secondary',
            isDark ? '222.2 47.4% 11.2%' : '210 40% 96.1%',
        );
        document.documentElement.style.setProperty(
            '--secondary-foreground',
            isDark ? '210 40% 98%' : '222.2 47.4% 11.2%',
        );
        document.documentElement.style.setProperty(
            '--accent',
            isDark ? '216 34% 17%' : '210 40% 96.1%',
        );
        document.documentElement.style.setProperty(
            '--accent-foreground',
            isDark ? '210 40% 98%' : '222.2 47.4% 11.2%',
        );

        // 设置meta主题色
        const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]',
        );
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', colors.background);
        }

        // 强制触发重新渲染
        document.body.style.backgroundColor = colors.background;
        document.body.style.color = colors.foreground;
    }, [isDark, colors, mode]);

    return {
        mode,
        isDark,
        colors,
        toggleMode,
        setMode,
        isLightMode: mode === ThemeMode.LIGHT,
        isDarkMode: mode === ThemeMode.DARK,
        isSystemMode: mode === ThemeMode.SYSTEM,
    };
};

/**
 * 颜色工具钩子，提供颜色相关功能
 */
export const useColorUtils = () => {
    const { colors } = useThemeStore();

    /**
     * 根据亮度调整颜色
     * @param color 基础颜色
     * @param amount 调整量，正数变亮，负数变暗
     */
    const adjustColor = (color: string, amount: number): string => {
        const hexToRgb = (hex: string): [number, number, number] => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                hex,
            );
            return result
                ? [
                      parseInt(result[1], 16),
                      parseInt(result[2], 16),
                      parseInt(result[3], 16),
                  ]
                : [0, 0, 0];
        };

        const rgbToHex = (r: number, g: number, b: number): string => {
            return (
                '#' +
                ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
            );
        };

        const [r, g, b] = hexToRgb(color);

        if (amount > 0) {
            // 变亮
            const adjust = (value: number) =>
                Math.min(255, Math.floor(value + (255 - value) * amount));
            return rgbToHex(adjust(r), adjust(g), adjust(b));
        } else {
            // 变暗
            const adjust = (value: number) =>
                Math.max(0, Math.floor(value * (1 + amount)));
            return rgbToHex(adjust(r), adjust(g), adjust(b));
        }
    };

    /**
     * 获取对比色
     * @param color 基础颜色
     */
    const getContrastColor = (color: string): string => {
        const [r, g, b] = color
            .replace('#', '')
            .match(/.{2}/g)
            ?.map((x) => parseInt(x, 16)) || [0, 0, 0];
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#ffffff';
    };

    return {
        colors,
        adjustColor,
        getContrastColor,
        lighten: (color: string, amount: number) =>
            adjustColor(color, Math.abs(amount)),
        darken: (color: string, amount: number) =>
            adjustColor(color, -Math.abs(amount)),
    };
};
