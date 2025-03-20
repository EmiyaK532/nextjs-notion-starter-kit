import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useNavStore } from '../../store';
import { NavPath } from '../../store/navStore';
import { cn } from '../../lib/utils';

// 导航链接属性
interface NavLinkProps extends Omit<LinkProps, 'to'> {
    to: NavPath;
    activeClassName?: string;
    inactiveClassName?: string;
    exact?: boolean; // 是否需要精确匹配
    children: React.ReactNode;
}

/**
 * 导航链接组件
 * 根据当前路由状态自动高亮显示
 */
const NavLink: React.FC<NavLinkProps> = ({
    to,
    activeClassName = 'text-blue-500 font-bold font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
    inactiveClassName = 'text-foreground hover:text-blue-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
    className,
    exact = false,
    children,
    ...props
}) => {
    // 获取导航状态判断当前链接是否活跃
    const isActive = useNavStore((state) => {
        if (exact) {
            return state.activePath === to;
        }
        return state.isActive(to);
    });

    // 根据活跃状态组合类名
    const combinedClassName = cn(
        className,
        'transition-all duration-300 ease-in-out hover:backdrop-blur-[2px] relative group',
        isActive ? activeClassName : inactiveClassName,
    );

    return (
        <Link to={to} className={combinedClassName} {...props}>
            <span className="relative z-10 transition-all duration-300 ease-in-out group-hover:blur-0">
                {children}
            </span>
            <span className="bg-primary/5 absolute inset-0 -z-10 scale-95 rounded-lg opacity-0 blur-md transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 group-hover:blur-xl"></span>
        </Link>
    );
};

export default NavLink;
