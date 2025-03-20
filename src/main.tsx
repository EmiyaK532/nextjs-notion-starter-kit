import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { routes } from './routes/routes';
// 导入 i18n 配置
import './i18n';

// 创建路由 - 使用更现代的数据路由API
const router = createBrowserRouter(routes);

// 初始化应用
const initApp = () => {
    // 渲染React应用
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement,
    );

    root.render(
        // <React.StrictMode>
        <RouterProvider router={router} />,
        // </React.StrictMode>,
    );
};

// 应用初始化
initApp();
