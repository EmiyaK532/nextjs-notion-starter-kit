import React from 'react';
import { Category, Tag } from '../../../types';
import { Badge } from '../../../components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    FolderKanban,
    Hash,
    Cpu,
    Globe,
    Database,
    Smartphone,
    Code,
    Coffee,
    Terminal,
    Plane,
    Utensils,
    BookOpen,
    GraduationCap,
} from 'lucide-react';

// 用于渲染分类图标的映射
const categoryIcons: Record<string, React.ReactNode> = {
    工具使用: <Terminal size={16} className="text-green-500" />,
    前端: <Globe size={16} className="text-blue-500" />,
    后端: <Database size={16} className="text-purple-500" />,
    移动开发: <Smartphone size={16} className="text-pink-500" />,
    DevOps: <Cpu size={16} className="text-amber-500" />,
    旅行: <Plane size={16} className="text-sky-500" />,
    美食: <Utensils size={16} className="text-orange-500" />,
    阅读: <BookOpen size={16} className="text-indigo-500" />,
    编程教程: <Code size={16} className="text-rose-500" />,
    教程: <BookOpen size={16} className="text-emerald-500" />,
    default: <FolderKanban size={16} className="text-gray-500" />,
};

interface SidebarProps {
    categoriesLoading: boolean;
    categories: Category[];
    tagsLoading: boolean;
    tags: Tag[];
}

const Sidebar: React.FC<SidebarProps> = ({
    categoriesLoading,
    categories,
    tagsLoading,
    tags,
}) => {
    // 背景色变化函数，根据索引返回不同的主题颜色
    const getCategoryBgColor = (index: number): string => {
        const colors = [
            'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-green-500',
            'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-blue-500',
            'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-l-purple-500',
            'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-l-amber-500',
            'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-l-pink-500',
            'from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-l-cyan-500',
            'from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-l-violet-500',
            'from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border-l-rose-500',
        ];
        return colors[index % colors.length];
    };

    return (
        <div>
            {/* 分类 */}
            <div className="mb-8">
                <h3 className="group mb-6 flex items-center gap-2 pb-2 text-xl font-bold">
                    <FolderKanban
                        className="text-blue-300 transition-all duration-500 group-hover:rotate-12"
                        size={20}
                    />
                    <span className="relative">
                        分类
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                </h3>

                {categoriesLoading ? (
                    <div className="space-y-3 rounded-lg border p-4 shadow-sm">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="flex h-12 animate-pulse items-center gap-2 rounded-md bg-gray-200 dark:bg-gray-700"
                            >
                                <div className="ml-2 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-4 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="ml-auto mr-2 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                        ))}
                    </div>
                ) : categories?.length > 0 ? (
                    <div className="space-y-3 overflow-hidden rounded-lg border shadow-sm">
                        {categories.map((category, index) => (
                            <Link
                                key={category?.id || index}
                                to={`/category/${category?.slug || category?.id || index}`}
                                className={cn(
                                    'group relative block overflow-hidden border-l-4 p-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
                                    getCategoryBgColor(index),
                                    'bg-gradient-to-r',
                                )}
                            >
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 shadow-sm transition-transform duration-300 group-hover:rotate-12 dark:bg-gray-800/70">
                                            {categoryIcons[
                                                category?.name || 'default'
                                            ] || categoryIcons.default}
                                        </span>
                                        <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
                                            {category?.name || '未命名分类'}
                                        </span>
                                    </div>

                                    {category?.articleCount !== undefined && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-white/80 font-mono text-xs transition-transform duration-300 group-hover:scale-110 dark:bg-gray-800/80"
                                        >
                                            {category?.articleCount}
                                        </Badge>
                                    )}
                                </div>

                                {/* 悬停时显示的装饰效果 */}
                                <div className="absolute -right-3 -top-3 h-6 w-6 scale-0 transform rounded-full bg-white opacity-30 transition-transform duration-300 group-hover:scale-[6] dark:bg-gray-700"></div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-lg border bg-gray-50 p-8 text-center text-gray-500 shadow-sm dark:bg-gray-800/50 dark:text-gray-400">
                        暂无分类
                    </p>
                )}
            </div>

            {/* 标签 */}
            <div>
                <h3 className="group mb-6 flex items-center gap-2 pb-2 text-xl font-bold">
                    <Hash
                        className="text-primary transition-all duration-300 group-hover:rotate-12"
                        size={20}
                    />
                    <span className="relative">
                        热门标签
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                </h3>

                {tagsLoading ? (
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
                            ></div>
                        ))}
                    </div>
                ) : tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Link
                                key={tag?.id || index}
                                to={`/tag/${tag?.slug || tag?.id || index}`}
                            >
                                <Badge
                                    variant="secondary"
                                    style={{
                                        backgroundColor:
                                            tag?.color || '#3b82f6',
                                    }}
                                    className="group relative overflow-hidden px-3 py-1 text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <span className="relative z-10">
                                        {tag?.name || '未命名标签'}
                                        {tag?.articleCount !== undefined &&
                                            ` (${tag?.articleCount})`}
                                    </span>
                                    <span className="absolute -right-4 -top-4 h-4 w-4 scale-0 transform rounded-full bg-white opacity-30 transition-transform duration-300 group-hover:scale-[8]"></span>
                                </Badge>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-lg border bg-gray-50 p-8 text-center text-gray-500 shadow-sm dark:bg-gray-800/50 dark:text-gray-400">
                        暂无标签
                    </p>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
