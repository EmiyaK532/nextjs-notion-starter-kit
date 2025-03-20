import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, Tag } from '@/types';
import { articlesApi, tagsApi } from '@/services/api';
import { Card, CardContent, ErrorDisplay } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import { ArticleLoader } from '../article/components';
import { formatDate, truncateText } from '@/utils/formatters';
import useVirtualLoading from '@/hooks/useVirtualLoading';
import { Loader2 } from 'lucide-react';

const TagsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [tag, setTag] = useState<Tag | null>(null);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 使用虚拟加载钩子
    const {
        visibleItems: articles,
        containerRef,
        isLoading: isLoadingMore,
        hasMoreItems,
    } = useVirtualLoading({
        items: allArticles,
        initialItemsToLoad: 5,
        incrementAmount: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                setError(null);

                // 获取标签信息
                const tagData = await tagsApi.getTag(slug);
                setTag(tagData);

                // 获取该标签下的文章
                const articlesData = await articlesApi.getArticles({
                    page: 1,
                    pageSize: 50, // 获取更多文章以便演示虚拟加载
                });

                // 过滤该标签的文章，实际项目中应该通过后端过滤
                const filteredArticles = articlesData.data.filter((article) =>
                    article.tags?.some((t) => t.id === tagData.id),
                );

                setAllArticles(filteredArticles);
            } catch (err) {
                console.error('Error fetching tag data:', err);
                setError('加载标签信息失败');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return <ArticleLoader />;
    }

    if (error || !tag) {
        return <ErrorDisplay message={error || '标签不存在'} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold">{tag.name}</h1>
                <Badge
                    variant="secondary"
                    style={{ backgroundColor: tag.color || '#3b82f6' }}
                    className="px-3 py-1 text-sm"
                >
                    {allArticles.length} 篇文章
                </Badge>
            </div>

            <div ref={containerRef} className="space-y-6">
                {articles.length > 0 ? (
                    <>
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
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags?.map((articleTag) => (
                                            <Badge
                                                key={articleTag.id}
                                                variant="secondary"
                                                style={{
                                                    backgroundColor:
                                                        articleTag.color,
                                                }}
                                                className={
                                                    articleTag.id === tag.id
                                                        ? 'border-2 border-primary'
                                                        : ''
                                                }
                                            >
                                                {articleTag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* 加载指示器 */}
                        {isLoadingMore && (
                            <div className="flex justify-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        )}

                        {/* 全部加载完成提示 */}
                        {!hasMoreItems && articles.length > 0 && (
                            <div className="py-4 text-center text-gray-500">
                                已加载全部文章
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-12 text-center text-gray-500">
                        该标签下暂无文章
                    </div>
                )}
            </div>
        </div>
    );
};

export default TagsPage;
