import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Article, PaginatedResponse } from '@/types';
import { searchApi } from '@/services/api';
import { Card, CardContent, ErrorDisplay } from '@/components/shared';
import { formatDate, truncateText } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState<PaginatedResponse<Article> | null>(
        null,
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(query);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ q: searchInput.trim() });
        }
    };

    useEffect(() => {
        const performSearch = async () => {
            if (!query) return;

            try {
                setLoading(true);
                setError(null);

                const searchResults = await searchApi.searchArticles(query, {
                    page: 1,
                    pageSize: 10,
                    sortField: 'createdAt',
                    sortOrder: 'desc',
                });

                setResults(searchResults);
            } catch (err) {
                console.error('Search error:', err);
                setError('搜索失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [query]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">搜索</h1>

            <form onSubmit={handleSearch} className="mb-8 flex gap-2">
                <Input
                    type="text"
                    placeholder="搜索文章..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" disabled={!searchInput.trim() || loading}>
                    {loading ? '搜索中...' : '搜索'}
                </Button>
            </form>

            {query && (
                <div className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        搜索 "{query}" 的结果{' '}
                        {results && `(${results.meta.total})`}
                    </h2>

                    {loading && (
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800"
                                >
                                    <div className="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="mb-4 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && <ErrorDisplay message={error} />}

                    {!loading && !error && results && (
                        <>
                            {results.data.length > 0 ? (
                                <div className="space-y-6">
                                    {results.data.map((article) => (
                                        <Card key={article.id}>
                                            <CardContent className="p-6">
                                                <a
                                                    href={`/article/${article.id}`}
                                                    className="mb-2 block"
                                                >
                                                    <h3 className="text-xl font-bold transition-colors hover:text-primary">
                                                        {article.title}
                                                    </h3>
                                                </a>
                                                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                                    {article.author?.name} ·{' '}
                                                    {formatDate(
                                                        article.createdAt,
                                                    )}
                                                </p>
                                                <p className="mb-4">
                                                    {truncateText(
                                                        article.excerpt ||
                                                            article.content,
                                                        200,
                                                    )}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {article.tags?.map(
                                                        (tag) => (
                                                            <Badge
                                                                key={tag.id}
                                                                variant="secondary"
                                                                style={{
                                                                    backgroundColor:
                                                                        tag.color,
                                                                }}
                                                            >
                                                                {tag.name}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    {/* 分页控件 - 可以在这里添加 */}
                                </div>
                            ) : (
                                <div className="py-12 text-center text-gray-500">
                                    没有找到与 "{query}" 相关的结果
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {!query && !loading && (
                <div className="py-12 text-center text-gray-500">
                    请输入搜索关键词
                </div>
            )}
        </div>
    );
};

export default SearchPage;
