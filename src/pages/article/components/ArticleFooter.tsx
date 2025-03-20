import React from 'react';
import { Article, Tag } from '../../../types';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';

interface ArticleFooterProps {
    article: Article;
    relatedTags: Tag[];
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({
    article,
    relatedTags,
}) => {
    return (
        <div className="border-t pt-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <span className="text-gray-600 dark:text-gray-400">
                        分类:{' '}
                    </span>
                    {article.category ? (
                        <a
                            href={`/category/${article.category.slug}`}
                            className="text-primary hover:underline"
                        >
                            {article.category.name}
                        </a>
                    ) : (
                        <span>未分类</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span>{article.likeCount}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-primary dark:text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                        </svg>
                        <span>分享</span>
                    </button>
                </div>
            </div>

            {/* 相关标签 */}
            {relatedTags.length > 0 && (
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-bold">相关标签</h3>
                        <div className="flex flex-wrap gap-2">
                            {relatedTags.map((tag) => (
                                <a key={tag.id} href={`/tag/${tag.slug}`}>
                                    <Badge
                                        variant="secondary"
                                        style={{ backgroundColor: tag.color }}
                                        className="px-3 py-1 text-sm"
                                    >
                                        {tag.name}
                                    </Badge>
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ArticleFooter;
