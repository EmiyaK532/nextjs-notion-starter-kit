/**
 * 工具函数集合
 */

import { DATE_FORMAT, LocalStorageKey } from "@/constants";
import { ApiError, PaginationParams } from "@/types";

// 日期格式化工具
export const formatDate = (
  date: string | Date,
  format: string = DATE_FORMAT.FULL
): string => {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (format === DATE_FORMAT.RELATIVE) {
    return getRelativeTimeFromDate(d);
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  switch (format) {
    case DATE_FORMAT.FULL:
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case DATE_FORMAT.DATE:
      return `${year}-${month}-${day}`;
    case DATE_FORMAT.TIME:
      return `${hours}:${minutes}:${seconds}`;
    case DATE_FORMAT.YEAR_MONTH:
      return `${year}-${month}`;
    case DATE_FORMAT.MONTH_DAY:
      return `${month}-${day}`;
    default:
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

// 获取相对时间
export const getRelativeTimeFromDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} 秒前`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} 分钟前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} 小时前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} 天前`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} 个月前`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} 年前`;
};

// 字符串工具
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // 替换空格为 -
    .replace(/[^\w\-]+/g, "") // 移除非单词字符
    .replace(/\-\-+/g, "-") // 替换多个 - 为单个 -
    .replace(/^-+/, "") // 移除开头的 -
    .replace(/-+$/, ""); // 移除结尾的 -
};

export const generateRandomString = (length: number = 8): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 本地存储工具
export const storage = {
  get: <T>(key: LocalStorageKey): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return null;
    }
  },

  set: <T>(key: LocalStorageKey, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item to localStorage:", error);
    }
  },

  remove: (key: LocalStorageKey): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// 对象工具
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

// 数组工具
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) return 0;

    if (order === "asc") {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
};

// 分页工具
export const getPaginationParams = (
  params?: Partial<PaginationParams>
): PaginationParams => {
  return {
    page: params?.page || 1,
    pageSize: params?.pageSize || 10,
    sortField: params?.sortField || "createdAt",
    sortOrder: params?.sortOrder || "desc",
  };
};

// 错误处理工具
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // 服务器响应错误
    return {
      statusCode: error.response.status,
      message: error.response.data.message || "服务器错误",
      error: error.response.data.error,
      details: error.response.data.details,
    };
  } else if (error.request) {
    // 请求发送但没有收到响应
    return {
      statusCode: 0,
      message: "网络错误，请检查您的网络连接",
      error: "NETWORK_ERROR",
    };
  } else {
    // 请求设置时出错
    return {
      statusCode: 0,
      message: error.message || "发生未知错误",
      error: "UNKNOWN_ERROR",
    };
  }
};

// 验证工具
export const validators = {
  isEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  },

  isStrongPassword: (password: string): boolean => {
    // 至少8个字符，包含大小写字母、数字和特殊字符
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  },

  isEmpty: (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
  },
};

// 防抖函数
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<F>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), waitFor);
  };
};

// 节流函数
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let lastTime = 0;

  return function (this: any, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastTime >= waitFor) {
      func.apply(this, args);
      lastTime = now;
    }
  };
};

// 颜色工具
export const colorUtils = {
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  rgbToHex: (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  lightenColor: (hex: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;

    const lighten = (value: number) =>
      Math.min(255, Math.floor(value + (255 - value) * amount));

    return colorUtils.rgbToHex(lighten(rgb.r), lighten(rgb.g), lighten(rgb.b));
  },

  darkenColor: (hex: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;

    const darken = (value: number) =>
      Math.max(0, Math.floor(value * (1 - amount)));

    return colorUtils.rgbToHex(darken(rgb.r), darken(rgb.g), darken(rgb.b));
  },
};

// 设备检测工具
export const deviceDetect = {
  isMobile: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  isIOS: (): boolean => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },

  isAndroid: (): boolean => {
    return /Android/i.test(navigator.userAgent);
  },

  isSafari: (): boolean => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },

  isChrome: (): boolean => {
    return (
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    );
  },
};

// 文件工具
export const fileUtils = {
  getFileExtension: (filename: string): string => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  },

  getFileNameWithoutExtension: (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
  },

  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  isImageFile: (filename: string): boolean => {
    const ext = fileUtils.getFileExtension(filename).toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
  },
};

// URL工具
export const urlUtils = {
  getQueryParams: (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};

    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  },

  buildQueryString: (params: Record<string, any>): string => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    return query ? `?${query}` : "";
  },

  joinPaths: (...paths: string[]): string => {
    return paths
      .map((path) => path.replace(/^\/+|\/+$/g, ""))
      .filter(Boolean)
      .join("/");
  },
};
