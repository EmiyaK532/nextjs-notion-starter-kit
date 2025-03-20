/**
 * 应用配置
 */

// API配置
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  TIMEOUT: 10000,
};

// 主题配置
export const THEME_CONFIG = {
  // 颜色系统
  colors: {
    primary: "#0f0f0f",
    secondary: "#1f1f1f",
    accent: "#3b82f6",
    text: "#f5f5f5",
    textSecondary: "#a3a3a3",
    border: "#2a2a2a",
    card: "#1a1a1a",
    cardForeground: "#f0f0f0",
  },
  // 断点
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// 分页配置
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// 国际化配置
export const I18N_CONFIG = {
  DEFAULT_LANGUAGE: "en-US",
  SUPPORTED_LANGUAGES: ["en-US", "zh-CN", "zh-TW", "ja-JP"],
};

// 路由配置
export const ROUTE_CONFIG = {
  HOME: "/",
  BLOG: "/blog",
  ARTICLE: "/blog/:slug",
  CATEGORY: "/category/:slug",
  TAG: "/tag/:slug",
  ABOUT: "/about",
  PROJECTS: "/projects",
  SEARCH: "/search",
  LOGIN: "/login",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_ARTICLES: "/admin/articles",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_TAGS: "/admin/tags",
  ADMIN_COMMENTS: "/admin/comments",
  ADMIN_MEDIA: "/admin/media",
  ADMIN_SETTINGS: "/admin/settings",
};

// 存储键配置
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
};

// 默认SEO配置
export const DEFAULT_SEO = {
  title: "Howhite Blog",
  description: "A modern personal technology blog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://howhite-blog.com",
    site_name: "Howhite Blog",
  },
  twitter: {
    handle: "@howhite",
    site: "@howhite",
    cardType: "summary_large_image",
  },
};
