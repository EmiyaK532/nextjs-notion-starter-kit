import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVirtualScrollOptions<T> {
    items: T[];
    itemHeight: number;
    overscan?: number;
    scrollingDelay?: number;
}

interface UseVirtualScrollResult<T> {
    virtualItems: {
        index: number;
        item: T;
        offsetTop: number;
        height: number;
    }[];
    totalHeight: number;
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    isScrolling: boolean;
}

/**
 * 虚拟滚动钩子，用于大型列表的高效渲染
 * @param options 配置选项
 * @returns 虚拟滚动状态和控制器
 */
function useVirtualScroll<T>({
    items,
    itemHeight,
    overscan = 3,
    scrollingDelay = 150,
}: UseVirtualScrollOptions<T>): UseVirtualScrollResult<T> {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    // 滚动处理的防抖计时器
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 计算可视项目和总高度
    const totalHeight = items.length * itemHeight;

    // 计算应该显示哪些项目
    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan,
    );
    const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + viewportHeight) / itemHeight) + overscan,
    );

    // 创建虚拟项目列表
    const virtualItems = items
        .slice(startIndex, endIndex + 1)
        .map((item, index) => {
            const virtualIndex = startIndex + index;
            return {
                index: virtualIndex,
                item,
                offsetTop: virtualIndex * itemHeight,
                height: itemHeight,
            };
        });

    // 处理滚动事件
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;

        // 设置正在滚动状态
        setIsScrolling(true);

        // 更新滚动位置
        setScrollTop(scrollContainerRef.current.scrollTop);

        // 清除之前的计时器
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }

        // 设置新的计时器
        scrollTimerRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, scrollingDelay);
    }, [scrollingDelay]);

    // 初始化和更新视口高度
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        // 获取视口尺寸
        const resizeObserver = new ResizeObserver((entries) => {
            const [entry] = entries;
            if (entry) {
                setViewportHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(scrollContainerRef.current);

        // 初始化滚动位置
        setScrollTop(scrollContainerRef.current.scrollTop);

        // 添加滚动事件监听器
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            // 清理
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }

            resizeObserver.disconnect();
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return {
        virtualItems,
        totalHeight,
        scrollContainerRef,
        isScrolling,
    };
}

export default useVirtualScroll;
