/**
 * 应用常量
 */

// 文章状态
export enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

// 评论状态
export enum CommentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// 用户角色
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  AUTHOR = "author",
  SUBSCRIBER = "subscriber",
}

// 媒体类型
export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  DOCUMENT = "document",
  AUDIO = "audio",
}

// 主题模式
export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

// 编辑器类型
export enum EditorType {
  MARKDOWN = "markdown",
  RICH_TEXT = "rich_text",
}

// HTTP状态码
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// 本地存储键
export enum LocalStorageKey {
  AUTH_TOKEN = "auth_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
  THEME = "theme",
  LANGUAGE = "language",
}

// 事件名称
export enum EventName {
  AUTH_CHANGE = "auth_change",
  THEME_CHANGE = "theme_change",
  LANGUAGE_CHANGE = "language_change",
  NOTIFICATION = "notification",
}

// 通知类型
export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

// 分页默认值
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SORT_FIELD = "createdAt";
export const DEFAULT_SORT_ORDER = "desc";

// 日期格式
export const DATE_FORMAT = {
  FULL: "YYYY-MM-DD HH:mm:ss",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  YEAR_MONTH: "YYYY-MM",
  MONTH_DAY: "MM-DD",
  RELATIVE: "relative",
};

// 文件上传限制
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ACCEPTED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  ACCEPTED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/ogg"],
  ACCEPTED_AUDIO_TYPES: ["audio/mpeg", "audio/ogg", "audio/wav"],
};
