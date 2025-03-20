// 格式化日期
export const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        return '日期未知';
    }
};

// 截断文本
export const truncateText = (text: string, maxLength: number) => {
    if (!text) return '无内容';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// 安全获取属性
export const safeGetProperty = (
    obj: any,
    path: string,
    defaultValue: any = '',
) => {
    try {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (result === null || result === undefined) return defaultValue;
            result = result[key];
        }
        return result === null || result === undefined ? defaultValue : result;
    } catch (error) {
        return defaultValue;
    }
};
