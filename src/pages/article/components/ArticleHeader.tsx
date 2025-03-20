import React from 'react';
import { Article } from '../../../types';
import { Badge } from '../../../components/ui/badge';
import { formatDate } from '../../../utils/formatters';

interface ArticleHeaderProps {
    article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
    return (
        <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {article.title}
            </h1>
            <div className="mb-4 flex flex-wrap items-center text-gray-600 dark:text-gray-400">
                <span className="mr-4">作者: {article.author.name}</span>
                <span className="mr-4">
                    发布于:{' '}
                    {formatDate(article.publishedAt || article.createdAt)}
                </span>
                <span>阅读: {article.viewCount}</span>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
                {article.tags?.map((tag) => (
                    <Badge
                        key={tag.id}
                        variant="secondary"
                        style={{ backgroundColor: tag.color }}
                        className="px-3 py-1 text-sm"
                    >
                        {tag.name}
                    </Badge>
                ))}
            </div>
            {article.coverImage && (
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className="mb-6 h-auto w-full rounded-lg"
                />
            )}
        </div>
    );
};

export default ArticleHeader;
