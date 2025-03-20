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

interface FeaturedArticlesProps {
    loading: boolean;
    articles: Article[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
    loading,
    articles,
}) => {
    return (
        <section className="mb-12">
            <h2 className="mb-6 border-b pb-2 text-2xl font-bold">推荐文章</h2>
            {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </CardContent>
                            <CardFooter>
                                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : articles?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            className="transition-shadow hover:shadow-lg"
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
                                        120,
                                    )}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="flex gap-2">
                                    {(article.tags || [])
                                        .slice(0, 2)
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
                <p className="text-center text-gray-500">暂无推荐文章</p>
            )}
        </section>
    );
};

export default FeaturedArticles;
