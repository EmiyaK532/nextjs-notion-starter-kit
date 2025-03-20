import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

/**
 * App组件 - 应用的最外层容器
 * 可以在这里放置全局状态提供者、主题配置、全局事件监听等
 */
function App() {
    // 使用主题钩子来确保正确应用主题
    const { mode, isDark } = useTheme();

    useEffect(() => {
        console.log('App mounted, current theme:', mode, 'isDark:', isDark);
    }, [mode, isDark]);

    return (
        <div className={`app-container ${isDark ? 'dark' : ''}`}>
            {/* 全局状态提供者可以放在这里 */}
            {/* <GlobalStateProvider> */}

            {/* 路由出口 - 由RouterProvider管理 */}
            <Outlet />

            {/* </GlobalStateProvider> */}
        </div>
    );
}

export default App;
