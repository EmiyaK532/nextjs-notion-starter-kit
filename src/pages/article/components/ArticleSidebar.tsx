import React from 'react';
import { Link } from 'react-router-dom';
import { Article, Tag } from '@/types';
import { Card, CardContent, Badge } from '@/components/shared';
import { formatDate } from '@/utils/formatters';

interface ArticleSidebarProps {
    relatedArticles?: Article[];
    popularTags?: Tag[];
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
    relatedArticles = [],
    popularTags = [],
}) => {
    return (
        <div className="space-y-6">
            {/* 相关文章 */}
            {relatedArticles.length > 0 && (
                <Card>
                    <CardContent>
                        <h3 className="mb-4 text-lg font-medium">相关文章</h3>
                        <div className="space-y-4">
                            {relatedArticles.map((article) => (
                                <div key={article.id} className="group">
                                    <Link
                                        to={`/article/${article.id}`}
                                        className="group-hover:text-primary-500 block font-medium transition-colors duration-200"
                                    >
                                        {article.title}
                                    </Link>
                                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(article.createdAt)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* 热门标签 */}
            {popularTags.length > 0 && (
                <Card>
                    <CardContent>
                        <h3 className="mb-4 text-lg font-medium">热门标签</h3>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag) => (
                                <Link key={tag.id} to={`/tags/${tag.slug}`}>
                                    <Badge>{tag.name}</Badge>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ArticleSidebar;
