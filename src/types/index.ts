/**
 * 应用类型定义
 */

import {
  ArticleStatus,
  CommentStatus,
  MediaType,
  UserRole,
} from "../constants";

// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  userId: string;
  fullName?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  skills?: string[];
  interests?: string[];
}

// 文章相关类型
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ArticleStatus;
  author: User;
  category?: Category;
  tags?: Tag[];
  viewCount: number;
  likeCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ArticleStatus;
  categoryId?: string;
  tagIds?: string[];
  publishedAt?: string;
}

// 分类相关类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  description?: string;
}

// 标签相关类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  articleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagInput {
  name: string;
  color?: string;
}

// 评论相关类型
export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  article: {
    id: string;
    title: string;
    slug: string;
  };
  status: CommentStatus;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentInput {
  content: string;
  articleId: string;
  authorName: string;
  authorEmail: string;
  parentId?: string;
}

// 媒体相关类型
export interface Media {
  id: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  type: MediaType;
  size: number;
  url: string;
  width?: number;
  height?: number;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

// 分页相关类型
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// 认证相关类型
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// 通知相关类型
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  dismissible?: boolean;
}

// 搜索相关类型
export interface SearchParams {
  query: string;
  filters?: {
    categories?: string[];
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
  };
  pagination?: PaginationParams;
}

export interface SearchResult {
  articles: PaginatedResponse<Article>;
  categories: Category[];
  tags: Tag[];
}

// 主题相关类型
export interface Theme {
  mode: "light" | "dark" | "system";
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
}

// API相关类型
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

// 路由相关类型
export interface RouteParams {
  slug?: string;
  id?: string;
}

// 设置相关类型
export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  favicon?: string;
  keywords?: string[];
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  analyticsId?: string;
  disqusShortname?: string;
}

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultImage?: string;
  siteUrl: string;
  siteName: string;
  twitterHandle?: string;
  twitterCardType?: string;
}

export interface CommentSettings {
  enabled: boolean;
  requireApproval: boolean;
  allowAnonymous: boolean;
  allowReplies: boolean;
  maxNestedLevel: number;
  notifyOnNewComment: boolean;
}

// 编辑器相关类型
export interface EditorState {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ArticleStatus;
  categoryId?: string;
  tagIds?: string[];
  publishedAt?: string;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved?: string;
}
