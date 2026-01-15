import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    currentPage: string;
    setPage: (page: string) => void;
}

export const Header = ({currentPage, setPage}: HeaderProps) => {
    const {i18n, t} = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isLangOpen && langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLangOpen]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const currentLang = (i18n.language || 'RU').substring(0, 2).toUpperCase();

    const languages = [
        {code: 'RU', label: 'Русский'},
        {code: 'CZ', label: 'Čeština'},
        {code: 'EN', label: 'English'}
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-transparent">

            <div className="flex items-center gap-3 relative">

                <div className="relative" ref={langRef}>
                    <button onClick={() => setIsLangOpen(!isLangOpen)}
                            className="btn-nav-shadow flex items-center gap-2 !px-3 !py-2 uppercase transition-all">
                        <span className="text-xl leading-none">🌐</span>
                        <span className="text-sm font-semibold tracking-wider">{currentLang}</span>
                    </button>

                    {/* Выпадающий список - добавлен белый фон для светлой темы */}
                    {isLangOpen && (
                        <div className="absolute top-full left-0 mt-3 w-40 bg-white dark:bg-[#1e293b]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]">
                            {languages.map((lang) => (
                                <button key={lang.code}
                                        onClick={() => {
                                            i18n.changeLanguage(lang.code.toLowerCase());
                                            setIsLangOpen(false);
                                        }}
                                    /* Исправлены цвета текста и ховера для светлой темы */
                                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer ${
                                            currentLang === lang.code ? 'text-blue-500 bg-black/5 dark:bg-white/5 font-bold' : 'text-slate-700 dark:text-gray-300'
                                        }`}>
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={toggleTheme} className="btn-nav-shadow !p-2.5 flex items-center justify-center transition-all">
                    <span className="text-xl leading-none">{theme === 'dark' ? '☀️' : '🌙'}</span>
                </button>
            </div>

            {/* Заменил text-white на адаптивный цвет для навигации */}
            <div className="flex gap-3 text-slate-900 dark:text-white">
                {currentPage !== 'main' && (
                    <button onClick={() => setPage('main')} className="btn-nav-shadow">
                        {t('nav.main')}
                    </button>
                )}
                {currentPage !== 'works' && (
                    <button onClick={() => setPage('works')} className="btn-nav-shadow">
                        {t('nav.works')}
                    </button>
                )}
                {currentPage !== 'cv' && (
                    <button onClick={() => setPage('cv')} className="btn-nav-shadow">
                        {t('nav.cv')}
                    </button>
                )}
            </div>
        </header>
    );
};