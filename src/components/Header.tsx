import {useState} from 'react';
import {useTranslation} from 'react-i18next';

interface HeaderProps {
    currentPage: string;
    setPage: (page: string) => void;
}

export const Header = ({currentPage, setPage}: HeaderProps) => {
    const {i18n, t} = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    // Берем текущий язык из i18n, чтобы стейт не сбрасывался при перезагрузке
    const currentLang = i18n.language.toUpperCase();

    const languages = [
        {code: 'RU', label: 'Русский'},
        {code: 'CZ', label: 'Čeština'},
        {code: 'EN', label: 'English'}
    ];

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-transparent">
            {/* Единый блок Языки + Тема */}
            <div
                className="flex items-center bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl relative">

                {/* Кнопка выбора языка */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer text-white"
                    >
                        <span className="text-xl">🌐</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">{currentLang}</span>
                    </button>

                    {/* Выпадающий список (EN,CZ,RU) */}
                    {isLangOpen && (
                        <div
                            className="absolute top-full left-0 mt-2 w-36 bg-[#1e293b]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        i18n.changeLanguage(lang.code.toLowerCase()); // Реальное переключение
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/10 cursor-pointer ${
                                        currentLang === lang.code ? 'text-blue-400 bg-white/5' : 'text-gray-300'
                                    }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                <button
                    className="p-2 text-xl hover:scale-110 transition cursor-pointer text-white/80 hover:text-white">
                    🌓
                </button>
            </div>

            {/* Справа: Навигация */}
            <div className="flex gap-3 text-white">
                {currentPage !== 'main' && (
                    <button onClick={() => setPage('main')}
                            className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                        {t('nav.main')}
                    </button>
                )}
                {currentPage !== 'works' && (
                    <button onClick={() => setPage('works')}
                            className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition cursor-pointer shadow-lg shadow-blue-500/20">
                        {t('nav.works')}
                    </button>
                )}
                {currentPage !== 'cv' && (
                    <button onClick={() => setPage('cv')}
                            className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                        {t('nav.cv')}
                    </button>
                )}
            </div>
        </header>
    );
};