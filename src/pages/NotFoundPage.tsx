import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
            <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
                404
            </h1>
            <h2 className="mb-8 text-2xl font-medium text-gray-600 dark:text-gray-400">
                页面未找到
            </h2>
            <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
                您要查找的页面可能已被移除、名称已更改或暂时不可用。
            </p>
            <Link
                to="/"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
                返回首页
            </Link>
        </div>
    );
};

export default NotFoundPage;
