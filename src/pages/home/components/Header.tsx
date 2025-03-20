import React from 'react';

interface HeaderProps {
    hasErrors: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasErrors }) => {
    return (
        <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">HoWhite Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
                分享技术、生活和思考
            </p>
            {hasErrors && (
                <div className="mt-4 rounded border border-yellow-200 bg-yellow-50 p-2 text-yellow-700">
                    部分内容加载失败，显示的是示例数据
                </div>
            )}
        </div>
    );
};

export default Header;
