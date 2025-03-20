import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun, Monitor, Menu, X } from 'lucide-react';
import { MagicInput } from '../magicui/magic-input';
import NavLink from '../common/NavLink';
import { ThemeMode } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const { mode, toggleMode, isDark } = useTheme();
    const { t } = useTranslation();

    // 监听滚动事件
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setScrolled(currentScrollY > 1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 计算Navbar样式变化
    const getNavbarWidth = () => {
        // 最小宽度：80%，最大宽度：98%
        const minWidth = 85;
        const maxWidth = 98;
        // 最大滚动距离为300px时达到最小宽度
        const scrollThreshold = 300;

        if (scrollY <= 0) return `${maxWidth}%`;
        if (scrollY >= scrollThreshold) return `${minWidth}%`;

        // 在0-100px之间，线性变化
        const ratio = scrollY / scrollThreshold;
        const width = maxWidth - (maxWidth - minWidth) * ratio;
        return `${width}%`;
    };

    // Function to render the appropriate theme icon based on current mode
    const renderThemeIcon = () => {
        switch (mode) {
            case ThemeMode.LIGHT:
                return <Sun size={20} />;
            case ThemeMode.DARK:
                return <Moon size={20} />;
            case ThemeMode.SYSTEM:
                return <Monitor size={20} />;
            default:
                return <Moon size={20} />;
        }
    };

    return (
        <div className="sticky top-0 z-10 flex justify-center overflow-hidden">
            <header
                className={cn(
                    'sticky top-0 z-10 w-[95%] overflow-hidden border-b bg-background transition-all duration-700 ease-in-out',
                    scrolled ? 'shadow-md' : '',
                )}
            >
                <div
                    className={cn(
                        'mx-auto flex items-center justify-between px-4 py-3 transition-all duration-700 ease-in-out',
                        scrolled ? 'py-2' : 'py-3',
                    )}
                    style={{
                        width: getNavbarWidth(),
                        maxWidth: '1600px',
                        margin: '0 auto',
                        borderRadius: scrolled ? '0 0 1rem 1rem' : '0',
                    }}
                >
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <NavLink
                            to="/"
                            exact
                            className="font-serif text-2xl font-bold"
                            activeClassName="text-blue-500 font-serif text-2xl font-bold relative"
                            inactiveClassName="text-foreground font-serif text-2xl font-bold relative"
                        >
                            HoWhite Blog
                        </NavLink>

                        {/* Desktop Navigation */}
                        <nav className="hidden space-x-4 md:flex">
                            <NavLink to="/" exact>
                                {t('nav.home')}
                            </NavLink>
                            <NavLink to="/article">{t('nav.articles')}</NavLink>
                            <NavLink to="/category">
                                {t('nav.categories')}
                            </NavLink>
                            <NavLink to="/tags">{t('nav.tags')}</NavLink>
                            <NavLink to="/about">{t('nav.about')}</NavLink>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Search */}
                        <div className="relative hidden md:flex">
                            <MagicInput
                                type="search"
                                placeholder={t('nav.search')}
                                className="w-64 pr-8"
                            />
                            <button className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Language Selector */}
                        <LanguageSelector />

                        {/* Theme Toggle Button */}
                        <button
                            onClick={() => {
                                toggleMode();
                                console.log('Theme toggled:', mode, isDark);
                            }}
                            className={`rounded-full p-2 transition-all duration-200 ${
                                isDark
                                    ? 'bg-gray-800 text-gray-200 shadow-md hover:bg-gray-700 hover:shadow-lg'
                                    : 'bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200 hover:shadow-md'
                            }`}
                            aria-label={t('theme.toggle')}
                            title={t('theme.current', {
                                mode: t(`theme.${mode.toLowerCase()}`),
                            })}
                        >
                            {renderThemeIcon()}
                        </button>

                        {/* Auth Buttons */}
                        <div className="hidden space-x-2 md:flex">
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/login">{t('nav.login')}</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="/register">{t('nav.register')}</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                'rounded-md p-2 transition-all duration-200 md:hidden',
                                mobileMenuOpen
                                    ? 'bg-accent/10 text-accent-foreground shadow-md'
                                    : 'hover:bg-accent/5 hover:border-accent/70 dark:border-muted-foreground/30 border-2 border-input/70',
                            )}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - 添加动画效果 */}
                <div
                    className={cn(
                        //data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                        'overflow-hidden transition-all duration-300 md:hidden',
                        mobileMenuOpen
                            ? 'max-h-[500px] opacity-100'
                            : 'max-h-0 opacity-0',
                    )}
                    data-state={mobileMenuOpen ? 'open' : 'closed'}
                >
                    <div className="border-t bg-background px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            <NavLink
                                to="/"
                                exact
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.home')}
                            </NavLink>
                            <NavLink
                                to="/article"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.articles')}
                            </NavLink>
                            <NavLink
                                to="/category"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.categories')}
                            </NavLink>
                            <NavLink
                                to="/tags"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.tags')}
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.about')}
                            </NavLink>

                            {/* Mobile Search */}
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder={t('nav.search')}
                                    className="w-full"
                                />
                            </div>

                            {/* Mobile Auth Buttons */}
                            <div className="flex space-x-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="flex-1"
                                >
                                    <NavLink
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </NavLink>
                                </Button>
                                <Button size="sm" asChild className="flex-1">
                                    <NavLink
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.register')}
                                    </NavLink>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
