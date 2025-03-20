import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, Category } from '@/types';
import { articlesApi, categoriesApi } from '@/services/api';
import { Card, CardContent, ErrorDisplay } from '@/components/shared';
import { ArticleLoader } from '../article/components';
import { formatDate, truncateText } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                setError(null);

                // 获取分类信息
                const categoryData = await categoriesApi.getCategory(slug);
                setCategory(categoryData);

                // 获取该分类下的文章
                // 暂时使用假数据，实际项目中应通过API获取
                const articlesData = await articlesApi.getArticles({
                    page: 1,
                    pageSize: 10,
                    // 实际这里应该传categoryId参数，但需要API支持
                });

                // 过滤出该分类的文章，实际项目中应该通过后端过滤
                const filteredArticles = articlesData.data.filter(
                    (article) => article.category?.id === categoryData.id,
                );

                setArticles(filteredArticles);
            } catch (err) {
                console.error('Error fetching category data:', err);
                setError('加载分类信息失败');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return <ArticleLoader />;
    }

    if (error || !category) {
        return <ErrorDisplay message={error || '分类不存在'} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">{category.name}</h1>
                {category.description && (
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        {category.description}
                    </p>
                )}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{articles.length} 篇文章</span>
                </div>
            </div>

            {articles.length > 0 ? (
                <div className="grid gap-6">
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardContent className="p-6">
                                <a
                                    href={`/article/${article.id}`}
                                    className="mb-2 block"
                                >
                                    <h2 className="text-xl font-bold transition-colors hover:text-primary">
                                        {article.title}
                                    </h2>
                                </a>
                                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                    {article.author?.name} ·{' '}
                                    {formatDate(article.createdAt)}
                                </p>
                                <p className="mb-4">
                                    {truncateText(
                                        article.excerpt || article.content,
                                        200,
                                    )}
                                </p>
                                {article.tags && article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                variant="secondary"
                                                style={{
                                                    backgroundColor: tag.color,
                                                }}
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-gray-500">
                    该分类下暂无文章
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
