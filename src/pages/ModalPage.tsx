import { SheetDemo } from '@/components/custom/MySheet';
import { useEffect, useLayoutEffect } from 'react';

export default function ModalPage() {
    // 使用 useLayoutEffect 确保在DOM渲染前应用样式，避免闪烁
    useLayoutEffect(() => {
        // 计算滚动条宽度
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        // 创建样式元素
        const style = document.createElement('style');
        style.innerHTML = `
            /* 防止滚动条导致的布局偏移 */
            html {
                overflow-y: scroll;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            
            html::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            
            /* 创建一个假的滚动条占位，保持布局稳定 */
            body {
                position: relative;
                overflow-x: hidden;
                margin-right: 0 !important;
                padding-right: 0 !important;
            }
            
            /* 创建一个固定宽度的伪元素作为滚动条占位 */
            body::after {
                content: '';
                position: fixed;
                top: 0;
                right: 0;
                height: 100vh;
                width: ${scrollbarWidth}px;
                background: transparent;
                pointer-events: none;
                z-index: 9999;
            }
            
            /* 确保抽屉组件不会改变布局 */
            [data-radix-scroll-lock] {
                margin-right: 0 !important;
                padding-right: 0 !important;
            }
            
            /* 确保内容容器宽度正确 */
            #__next {
                width: 100%;
                position: relative;
                overflow-x: hidden;
            }
        `;
        document.head.appendChild(style);

        // 添加自定义滚动条
        const scrollbarStyle = document.createElement('style');
        scrollbarStyle.innerHTML = `
            /* 自定义滚动条 */
            .custom-scrollbar {
                position: fixed;
                top: 0;
                right: 0;
                width: ${scrollbarWidth}px;
                height: 100vh;
                background: rgba(0, 0, 0, 0.05);
                z-index: 9998;
                pointer-events: none;
            }
            
            .custom-scrollbar-thumb {
                position: absolute;
                top: 0;
                right: 0;
                width: ${scrollbarWidth}px;
                background: rgba(155, 155, 155, 0.5);
                border-radius: ${scrollbarWidth / 2}px;
                z-index: 9999;
                pointer-events: none;
            }
        `;
        document.head.appendChild(scrollbarStyle);

        // 创建自定义滚动条元素
        const scrollbar = document.createElement('div');
        scrollbar.className = 'custom-scrollbar';

        const scrollThumb = document.createElement('div');
        scrollThumb.className = 'custom-scrollbar-thumb';
        scrollbar.appendChild(scrollThumb);
        document.body.appendChild(scrollbar);

        // 更新滚动条高度
        const updateScrollThumb = () => {
            const scrollPercentage =
                window.scrollY /
                (document.body.scrollHeight - window.innerHeight);
            const thumbHeight = Math.max(
                40,
                (window.innerHeight / document.body.scrollHeight) *
                    window.innerHeight,
            );
            const thumbTop =
                scrollPercentage * (window.innerHeight - thumbHeight);

            scrollThumb.style.height = `${thumbHeight}px`;
            scrollThumb.style.top = `${thumbTop}px`;
        };

        // 初始更新
        updateScrollThumb();

        // 监听滚动事件
        window.addEventListener('scroll', updateScrollThumb);
        window.addEventListener('resize', updateScrollThumb);

        // 清理函数
        return () => {
            document.head.removeChild(style);
            document.head.removeChild(scrollbarStyle);
            document.body.removeChild(scrollbar);
            window.removeEventListener('scroll', updateScrollThumb);
            window.removeEventListener('resize', updateScrollThumb);
        };
    }, []);

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <SheetDemo
                label="Open it HoWhite sann"
                className="flex h-screen w-screen items-center justify-center bg-[url('/images/wallhaven-2ypgdm.jpg')] bg-cover bg-fixed bg-center"
                onSubmit={() => {
                    console.log('submit');
                }}
            />
            <h1>
                <strong className="flex h-screen w-screen items-center justify-center overflow-hidden bg-[url('/images/wallhaven-6d9lr7.jpg')] bg-cover bg-fixed bg-center text-center text-4xl font-bold text-blue-400">
                    HOWHITE
                </strong>
            </h1>
        </div>
    );
}
