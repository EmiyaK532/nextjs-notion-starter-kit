import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/i18n';

/**
 * 语言选择器组件
 */
const LanguageSelector: React.FC = () => {
    const { i18n, t } = useTranslation();
    const [open, setOpen] = useState(false);

    // 获取当前语言
    const currentLanguage =
        SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language) ||
        SUPPORTED_LANGUAGES[0];

    // 切换语言
    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('howhite-blog-lang', code);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 px-2"
                >
                    <Globe size={18} />
                    <span className="hidden md:inline-block">
                        {currentLanguage.flag} {currentLanguage.nativeName}
                    </span>
                    <ChevronDown size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {SUPPORTED_LANGUAGES.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`flex items-center gap-2 ${
                            language.code === i18n.language
                                ? 'bg-accent/50'
                                : ''
                        }`}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="flex-1">{language.nativeName}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
