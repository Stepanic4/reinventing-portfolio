import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    currentPage: string;
    setPage: (page: string) => void;
}

export const Header = ({currentPage, setPage}: HeaderProps) => {
    const {i18n, t} = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    // Реф для слежения за кликами вне меню выбора языка
    const langRef = useRef<HTMLDivElement>(null);

    // Логика закрытия списка при клике в любое место экрана
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isLangOpen && langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLangOpen]);

    // Исправление бага RU-RU: берем только первые 2 буквы
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

                    {/* Выпадающий список */}
                    {isLangOpen && (
                        <div className="absolute top-full left-0 mt-3 w-40 bg-[#1e293b]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]">
                            {languages.map((lang) => (
                                <button key={lang.code}
                                        onClick={() => {
                                            i18n.changeLanguage(lang.code.toLowerCase());
                                            setIsLangOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/10 cursor-pointer ${
                                            currentLang === lang.code ? 'text-blue-400 bg-white/5' : 'text-gray-300'
                                        }`}>
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="btn-nav-shadow !p-2.5 flex items-center justify-center transition-all">
                    <span className="text-xl leading-none">🌓</span>
                </button>
            </div>

            <div className="flex gap-3 text-white">
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