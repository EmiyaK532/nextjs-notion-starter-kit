import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavStore } from '../store';

/**
 * 路由追踪钩子
 * 监听路由变化并自动更新导航状态
 */
export function useRouteTracker() {
    const location = useLocation();
    const setActivePath = useNavStore((state) => state.setActivePath);

    useEffect(() => {
        // 每当路径变化时，更新活跃路径
        setActivePath(location.pathname);

        // 可以在这里添加其他路由变化时需要执行的逻辑
        // 例如页面访问统计、日志等
    }, [location.pathname, setActivePath]);

    return null; // 这个hook不需要返回任何JSX
}
