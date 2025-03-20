import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义导航路径类型
export type NavPath =
    | '/'
    | '/article'
    | '/category'
    | '/tags'
    | '/about'
    | '/search'
    | '/login'
    | '/register'
    | '/font-test'
    | string; // 其他可能的路径

// 定义导航状态接口
interface NavState {
    // 当前活跃的导航路径
    activePath: NavPath;

    // 设置活跃路径
    setActivePath: (path: NavPath) => void;

    // 检查给定路径是否为当前活跃路径或其子路径
    isActive: (path: NavPath) => boolean;
}

/**
 * 导航状态管理
 * 用于跟踪当前活跃的导航项，实现导航高亮功能
 */
const useNavStore = create<NavState>()(
    persist(
        (set, get) => ({
            // 默认活跃路径为首页
            activePath: '/',

            // 设置活跃路径
            setActivePath: (path) => set({ activePath: path }),

            // 检查路径是否活跃
            // 支持子路径匹配 - 例如 /article/123 会匹配 /article
            isActive: (path) => {
                const currentPath = get().activePath;

                // 精确匹配
                if (path === currentPath) return true;

                // 首页特殊处理
                if (path === '/' && currentPath === '/') return true;

                // 子路径匹配 - 检查当前路径是否以给定路径开头
                // 但需要确保是完整路径段匹配，例如 /article 匹配 /article/123
                // 但 /art 不应匹配 /article
                if (
                    path !== '/' &&
                    currentPath.startsWith(path) &&
                    (currentPath.length === path.length ||
                        currentPath[path.length] === '/')
                ) {
                    return true;
                }

                return false;
            },
        }),
        {
            name: 'nav-storage', // localStorage 中的键名
            partialize: (state) => ({ activePath: state.activePath }), // 仅持久化 activePath
        },
    ),
);

export default useNavStore;
