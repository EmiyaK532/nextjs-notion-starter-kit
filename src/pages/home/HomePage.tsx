import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { articlesApi, categoriesApi, tagsApi } from '../../services/api';
import { Article, Category, Tag } from '../../types';
import {
    sampleArticles,
    sampleCategories,
    sampleTags,
} from '../../data/sampleData';
import ErrorFallback from '../../components/common/ErrorFallback';

// 导入组件
import Header from './components/Header';
import FeaturedArticles from './components/FeaturedArticles';
import LatestArticles from './components/LatestArticles';
import Sidebar from './components/Sidebar';

const HomePage = () => {
    const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
    const [latestArticles, setLatestArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [popularTags, setPopularTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState({
        articles: true,
        categories: true,
        tags: true,
    });
    const [errors, setErrors] = useState({
        articles: false,
        categories: false,
        tags: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            // 获取推荐文章和最新文章
            try {
                // 获取推荐文章
                const featured = await articlesApi.getFeaturedArticles(3);
                setFeaturedArticles(featured);

                // 获取最新文章
                const latest = await articlesApi.getLatestArticles(5);
                setLatestArticles(latest);

                setLoading((prev) => ({ ...prev, articles: false }));
                setErrors((prev) => ({ ...prev, articles: false }));
            } catch (error) {
                console.error('Failed to fetch articles:', error);
                setLoading((prev) => ({ ...prev, articles: false }));
                setErrors((prev) => ({ ...prev, articles: true }));
                // 设置示例数据
                setFeaturedArticles(sampleArticles as Article[]);
                setLatestArticles(sampleArticles as Article[]);
            }

            // 获取分类
            try {
                const categoriesResponse = await categoriesApi.getCategories({
                    pageSize: 10,
                });
                setCategories(categoriesResponse);
                setLoading((prev) => ({ ...prev, categories: false }));
                setErrors((prev) => ({ ...prev, categories: false }));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setLoading((prev) => ({ ...prev, categories: false }));
                setErrors((prev) => ({ ...prev, categories: true }));
                // 设置示例数据
                setCategories(sampleCategories as Category[]);
            }

            // 获取热门标签
            try {
                const tags = await tagsApi.getPopularTags(10);
                console.log('tags', tags);
                setPopularTags(tags);
                setLoading((prev) => ({ ...prev, tags: false }));
                setErrors((prev) => ({ ...prev, tags: false }));
            } catch (error) {
                console.error('Failed to fetch tags:', error);
                setLoading((prev) => ({ ...prev, tags: false }));
                setErrors((prev) => ({ ...prev, tags: true }));
                // 设置示例数据
                setPopularTags(sampleTags as Tag[]);
            }

            //测试返回的数据结构
            // try {
            //     const test = await tagsApi.getTags();
            //     console.log('test', test.data);
            // } catch (error) {
            //     console.error('Failed to fetch tags:', error);
            // }
        };

        fetchData();
    }, []);

    // 判断是否有任何错误
    const hasAnyError = errors.articles || errors.categories || errors.tags;

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
        >
            <div className="container mx-auto px-4 py-8">
                <Header hasErrors={hasAnyError} />

                <FeaturedArticles
                    loading={loading.articles}
                    articles={featuredArticles}
                />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <LatestArticles
                        loading={loading.articles}
                        articles={latestArticles}
                    />

                    <Sidebar
                        categoriesLoading={loading.categories}
                        categories={categories}
                        tagsLoading={loading.tags}
                        tags={popularTags}
                    />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default HomePage;
