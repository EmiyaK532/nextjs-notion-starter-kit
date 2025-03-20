import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouteTracker } from '../../hooks/useRouteTracker';

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // 使用路由追踪钩子，自动更新当前活跃路径
    useRouteTracker();

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children || <Outlet />}</main>
            <Footer />
        </div>
    );
};

export default Layout;
