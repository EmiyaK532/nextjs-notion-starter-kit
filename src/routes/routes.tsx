import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArticleLoader } from '../pages/article/components';
import App from '../App';

// 懒加载路由组件 - 优化初始加载性能
const HomePage = lazy(() => import('../pages/home/HomePage'));
const ArticlePage = lazy(() => import('../pages/article/ArticlePage'));
const TagsPage = lazy(() => import('../pages/tags/TagsPage'));
const CategoryPage = lazy(() => import('../pages/category/CategoryPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const FontTestPage = lazy(() => import('../pages/test/FontTestPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ModalPage = lazy(() => import('../pages/ModalPage'));

// 通用加载占位组件
const PageLoading = () => (
    <div className="flex min-h-[50vh] animate-pulse items-center justify-center p-8">
        <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="mx-auto h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
    </div>
);

// 文章页面专用加载占位
const ArticlePageFallback = () => <ArticleLoader />;

// 使用Suspense包装路由组件
const withSuspense = (
    Component: React.LazyExoticComponent<React.ComponentType<any>>,
    Fallback: React.ComponentType = PageLoading,
) => {
    return (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    );
};

// 路由配置 - 使用数据路由API的最佳实践结构
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Layout />,
                children: [
                    {
                        index: true, // 首页路由使用index标记
                        element: withSuspense(HomePage),
                    },
                    {
                        path: 'article/:id',
                        element: withSuspense(ArticlePage, ArticlePageFallback),
                    },
                    {
                        path: 'tags/:slug',
                        element: withSuspense(TagsPage),
                    },
                    {
                        path: 'category/:slug',
                        element: withSuspense(CategoryPage),
                    },
                    {
                        path: 'search',
                        element: withSuspense(SearchPage),
                    },
                    {
                        path: 'font-test',
                        element: withSuspense(FontTestPage),
                    },
                    {
                        path: 'modal',
                        element: withSuspense(ModalPage),
                    },
                    {
                        path: '*',
                        element: withSuspense(NotFoundPage),
                    },
                ],
            },
        ],
    },
];

export default routes;
