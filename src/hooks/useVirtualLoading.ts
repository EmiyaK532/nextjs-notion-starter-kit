import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVirtualLoadingOptions<T> {
    items: T[];
    initialItemsToLoad?: number;
    incrementAmount?: number;
    onEndReached?: () => void;
    threshold?: number;
}

interface UseVirtualLoadingResult<T> {
    visibleItems: T[];
    containerRef: React.RefObject<HTMLDivElement>;
    isLoading: boolean;
    hasMoreItems: boolean;
    loadMore: () => void;
}

/**
 * 虚拟加载钩子，用于大型列表的按需加载
 * @param options 配置选项
 * @returns 虚拟加载状态和控制器
 */
function useVirtualLoading<T>({
    items,
    initialItemsToLoad = 5,
    incrementAmount = 5,
    onEndReached,
    threshold = 200,
}: UseVirtualLoadingOptions<T>): UseVirtualLoadingResult<T> {
    const [visibleItems, setVisibleItems] = useState<T[]>([]);
    const [visibleCount, setVisibleCount] = useState(initialItemsToLoad);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // 计算是否还有更多项目
    const hasMoreItems = visibleCount < items.length;

    // 手动加载更多项目的方法
    const loadMore = useCallback(() => {
        if (hasMoreItems && !isLoading) {
            setIsLoading(true);

            // 模拟网络延迟
            setTimeout(() => {
                setVisibleCount((prev) =>
                    Math.min(prev + incrementAmount, items.length),
                );
                setIsLoading(false);
            }, 500);
        }
    }, [hasMoreItems, isLoading, incrementAmount, items.length]);

    // 当items或visibleCount变化时更新可见项目
    useEffect(() => {
        setVisibleItems(items.slice(0, visibleCount));

        // 如果加载到最后，触发onEndReached回调
        if (visibleCount >= items.length && onEndReached) {
            onEndReached();
        }
    }, [items, visibleCount, onEndReached]);

    // 设置交叉观察器以检测何时接近底部
    useEffect(() => {
        // 创建哨兵元素，如果不存在
        if (!sentinelRef.current && containerRef.current) {
            const sentinel = document.createElement('div');
            sentinel.style.height = '1px';
            sentinel.style.width = '100%';
            containerRef.current.appendChild(sentinel);
            sentinelRef.current = sentinel;
        }

        // 断开之前的观察器
        if (observer.current) {
            observer.current.disconnect();
        }

        // 创建新的观察器
        observer.current = new IntersectionObserver(
            (entries) => {
                // 如果哨兵元素可见且有更多项目要加载
                if (entries[0].isIntersecting && hasMoreItems && !isLoading) {
                    loadMore();
                }
            },
            {
                root: null,
                rootMargin: `0px 0px ${threshold}px 0px`,
                threshold: 0.1,
            },
        );

        // 开始观察哨兵元素
        if (sentinelRef.current) {
            observer.current.observe(sentinelRef.current);
        }

        // 清理函数
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            if (sentinelRef.current && containerRef.current) {
                try {
                    containerRef.current.removeChild(sentinelRef.current);
                } catch (error) {
                    console.warn('Failed to remove sentinel element:', error);
                }
                sentinelRef.current = null;
            }
        };
    }, [hasMoreItems, isLoading, loadMore, threshold]);

    return {
        visibleItems,
        containerRef,
        isLoading,
        hasMoreItems,
        loadMore,
    };
}

export default useVirtualLoading;
