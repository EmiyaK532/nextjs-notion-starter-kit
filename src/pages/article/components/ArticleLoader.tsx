import React from 'react';

const ArticleLoader: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="mb-4 h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-8 h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="h-4 rounded bg-gray-200 dark:bg-gray-700"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleLoader;
