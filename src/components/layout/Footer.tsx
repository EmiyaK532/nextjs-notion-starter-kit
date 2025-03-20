import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavLink from '../common/NavLink';
import { MagicInput } from '../magicui/magic-input';
import {
    Github,
    Mail,
    MessageSquare,
    Send,
    Code,
    Coffee,
    Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
}) => (
    <a
        href={href}
        className="group relative inline-block text-gray-600 transition-colors duration-200 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200"
        target="_blank"
        rel="noopener noreferrer"
    >
        <span className="relative z-10">{children}</span>
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full dark:bg-blue-400"></span>
    </a>
);

const FooterHeading: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <h3 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-lg font-bold dark:border-gray-700">
        {children}
    </h3>
);

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-12 overflow-hidden border-t bg-gradient-to-b from-transparent to-gray-50 py-12 dark:border-gray-800 dark:to-gray-900/30">
            {/* 装饰性代码图形 */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-5">
                <Code size={256} strokeWidth={1} />
            </div>
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rotate-12 opacity-5">
                <Coffee size={160} strokeWidth={1} />
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="transform transition-transform duration-300 hover:scale-[1.01]">
                        <FooterHeading>
                            <Code size={20} className="text-blue-500" /> For
                            HoWhite
                        </FooterHeading>
                        <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                            HoWhite Blog
                            是一个分享技术、生活和思考的个人博客平台。用代码连接思想，以创意启迪未来。
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <FooterLink href="https://github.com/EmiyaK532">
                                <Github
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-y-1"
                                />
                            </FooterLink>
                            <FooterLink href="mailto:howhite1023@gmail.com">
                                <Mail
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-y-1"
                                />
                            </FooterLink>
                            <FooterLink href="#">
                                <MessageSquare
                                    size={20}
                                    className="transition-transform duration-300 group-hover:-translate-y-1"
                                />
                            </FooterLink>
                        </div>
                    </div>

                    <div className="transform transition-transform duration-300 hover:scale-[1.01]">
                        <FooterHeading>
                            <Coffee size={20} className="text-amber-500" />{' '}
                            快速链接
                        </FooterHeading>
                        <ul className="space-y-3">
                            <li className="transform transition-transform duration-200 hover:translate-x-1">
                                <NavLink
                                    to="/"
                                    exact
                                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400"
                                >
                                    <span className="h-1 w-3 rounded-full bg-green-400"></span>
                                    首页
                                </NavLink>
                            </li>
                            <li className="transform transition-transform duration-200 hover:translate-x-1">
                                <NavLink
                                    to="/article"
                                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400"
                                >
                                    <span className="h-1 w-3 rounded-full bg-blue-400"></span>
                                    文章
                                </NavLink>
                            </li>
                            <li className="transform transition-transform duration-200 hover:translate-x-1">
                                <NavLink
                                    to="/category"
                                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400"
                                >
                                    <span className="h-1 w-3 rounded-full bg-purple-400"></span>
                                    分类
                                </NavLink>
                            </li>
                            <li className="transform transition-transform duration-200 hover:translate-x-1">
                                <NavLink
                                    to="/tags"
                                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400"
                                >
                                    <span className="h-1 w-3 rounded-full bg-yellow-400"></span>
                                    标签
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="transform transition-transform duration-300 hover:scale-[1.01]">
                        <FooterHeading>
                            <Heart size={20} className="text-red-500" />{' '}
                            联系方式
                        </FooterHeading>
                        <ul className="space-y-3">
                            <li className="group flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Mail
                                    size={16}
                                    className="text-blue-500 transition-transform duration-300 group-hover:rotate-12"
                                />
                                <span>howhite1023@gmail.com</span>
                            </li>
                            <li className="group flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <MessageSquare
                                    size={16}
                                    className="text-green-500 transition-transform duration-300 group-hover:rotate-12"
                                />
                                <span>微信: HoWhiteDeveloper</span>
                            </li>
                            <li className="group flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Github
                                    size={16}
                                    className="text-purple-500 transition-transform duration-300 group-hover:rotate-12"
                                />
                                <span>Github: EmiyaK532</span>
                            </li>
                        </ul>
                    </div>

                    <div className="transform transition-transform duration-300 hover:scale-[1.01]">
                        <FooterHeading>
                            <MessageSquare
                                size={20}
                                className="text-violet-500"
                            />{' '}
                            留言
                        </FooterHeading>
                        <p className="mb-3 text-gray-600 dark:text-gray-400">
                            分享想法或反馈，期待与你交流
                        </p>
                        <div className="group relative flex items-center justify-center">
                            <MagicInput
                                type="text"
                                placeholder="闲言碎语..."
                                className="w-full rounded-r-none border-blue-200/60 dark:border-blue-900/30"
                            />
                            <Button className="relative z-10 flex items-center gap-1 rounded-l-none bg-gradient-to-r from-blue-500 to-violet-500 transition-transform duration-200 hover:translate-x-0.5 dark:from-blue-600 dark:to-violet-600">
                                <Send
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                                <span className="hidden sm:inline">
                                    <Link to="/modal">发送</Link>
                                </span>
                            </Button>
                        </div>
                        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500 shadow-sm dark:bg-gray-800/50 dark:text-gray-400">
                            <p className="flex items-center gap-1">
                                <Code
                                    size={14}
                                    className="inline text-blue-500"
                                />
                                <span className="font-mono">
                                    console.log('Hello, developer!')
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-dashed border-gray-200 pt-6 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <span>© {currentYear} HoWhite Blog</span>
                        <span className="text-sm">•</span>
                        <span className="flex items-center gap-1">
                            Made with{' '}
                            <Heart
                                size={14}
                                className="fill-red-500 text-red-500"
                            />{' '}
                            by HoWhite
                        </span>
                    </div>
                    <p className="text-xs font-light">
                        使用 React、TypeScript 和 Tailwind CSS 构建
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
