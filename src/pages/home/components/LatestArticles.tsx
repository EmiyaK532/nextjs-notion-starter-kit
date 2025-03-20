import React from 'react';
import { Article } from '../../../types';
import { Button } from '../../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import {
    formatDate,
    truncateText,
    safeGetProperty,
} from '../../../utils/formatters';

interface LatestArticlesProps {
    loading: boolean;
    articles: Article[];
}

const LatestArticles: React.FC<LatestArticlesProps> = ({
    loading,
    articles,
}) => {
    return (
        <div className="lg:col-span-2">
            <h2 className="mb-6 border-b pb-2 text-2xl font-bold">最新文章</h2>
            {loading ? (
                <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : articles?.length > 0 ? (
                <div className="space-y-6">
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardHeader>
                                <CardTitle>
                                    {article.title || '无标题'}
                                </CardTitle>
                                <CardDescription>
                                    {safeGetProperty(
                                        article,
                                        'author.name',
                                        '未知作者',
                                    )}{' '}
                                    ·{' '}
                                    {formatDate(
                                        article.publishedAt ||
                                            article.createdAt ||
                                            '',
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {truncateText(
                                        article.excerpt ||
                                            article.content ||
                                            '无内容',
                                        160,
                                    )}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="flex gap-2">
                                    {(article.tags || [])
                                        .slice(0, 3)
                                        .map((tag, index) => (
                                            <Badge
                                                key={tag?.id || index}
                                                variant="secondary"
                                                style={{
                                                    backgroundColor:
                                                        tag?.color || '#3b82f6',
                                                }}
                                            >
                                                {tag?.name || '标签'}
                                            </Badge>
                                        ))}
                                </div>
                                <Button variant="outline" asChild>
                                    <a
                                        href={`/blog/${article.slug || article.id}`}
                                    >
                                        阅读更多
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">暂无文章</p>
            )}
        </div>
    );
};

export default LatestArticles;
