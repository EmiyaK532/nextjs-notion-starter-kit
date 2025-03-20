/**
 * 国际化配置主文件
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入资源文件
import enUS from './locales/en-US';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import jaJP from './locales/ja-JP';

// 支持的语言列表
export const SUPPORTED_LANGUAGES = [
    {
        code: 'en-US',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
    },
    {
        code: 'zh-CN',
        name: 'Simplified Chinese',
        nativeName: '简体中文',
        flag: '🇨🇳',
    },
    {
        code: 'zh-TW',
        name: 'Traditional Chinese',
        nativeName: '繁體中文',
        flag: '🇹🇼',
    },
    {
        code: 'ja-JP',
        name: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
    },
];

// 所有语言的资源
const resources = {
    'en-US': {
        translation: enUS,
    },
    'zh-CN': {
        translation: zhCN,
    },
    'zh-TW': {
        translation: zhTW,
    },
    'ja-JP': {
        translation: jaJP,
    },
};

// 初始化 i18next
i18n
    // 检测用户语言
    .use(LanguageDetector)
    // 添加对 React 的支持
    .use(initReactI18next)
    // 初始化 i18next
    .init({
        resources,
        fallbackLng: 'en-US',
        debug: process.env.NODE_ENV === 'development', // 在开发环境中启用调试模式
        interpolation: {
            escapeValue: false, // 不转义 React 内的内容
        },
        detection: {
            // 检测顺序
            order: [
                'querystring', // 从 URL 中获取
                'localStorage', // 从本地存储中获取
                'navigator', // 从浏览器中获取
                'htmlTag', // 从 HTML 标签中获取
            ],
            // 保存到 localStorage 的 key
            lookupLocalStorage: 'howhite-blog-lang',
        },
    });

export default i18n;
