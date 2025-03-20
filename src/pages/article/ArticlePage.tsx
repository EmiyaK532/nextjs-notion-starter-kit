import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, Tag, User } from '@/types';
import { articlesApi } from '@/services/api';
import {
    ArticleHeader,
    ArticleContent,
    ArticleFooter,
    ArticleLoader,
    ArticleSidebar,
    ArticleComments,
} from './components';
import { ErrorDisplay } from '@/components/shared';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [relatedTags, setRelatedTags] = useState<Tag[]>([]);
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id) {
                    throw new Error('文章ID不存在');
                }

                const data = await articlesApi.fetchArticleById(id);
                setArticle(data);

                // 加载相关标签和文章
                // 实际项目中可能需要额外的API调用
                setRelatedTags(data.tags || []);

                // 模拟加载相关文章
                // 实际项目中应该通过API获取
                // 这里暂时使用空数组，实际应用需要实现
                setRelatedArticles([]);

                // 获取当前登录用户
                // 实际项目中应该通过认证服务或状态管理获取
                // 这里暂时设置为null，表示用户未登录
                setCurrentUser(null);
            } catch (err) {
                console.error('Failed to fetch article:', err);
                setError(err instanceof Error ? err.message : '加载文章失败');
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    if (loading) {
        return <ArticleLoader />;
    }

    if (error || !article) {
        return <ErrorDisplay message={error || '文章不存在'} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* 文章主体内容 */}
                <div className="lg:col-span-8">
                    <ArticleHeader article={article} />
                    <ArticleContent content={article.content} />
                    <ArticleFooter
                        article={article}
                        relatedTags={relatedTags}
                    />
                    <ArticleComments
                        article={article}
                        currentUser={currentUser}
                    />
                </div>

                {/* 侧边栏 */}
                <div className="lg:col-span-4">
                    <ArticleSidebar
                        relatedArticles={relatedArticles}
                        popularTags={relatedTags}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
