interface HeaderProps {
    currentPage: string;
    setPage: (page: string) => void;
}

export const Header = ({ currentPage, setPage }: HeaderProps) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-transparent">
            {/* Слева: Языки и Тема */}
            <div className="flex gap-4 items-center bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
                <div className="flex gap-2 px-2 border-r border-white/10">
                    {['RU', 'CZ', 'EN'].map(l => (
                        <button key={l} className="text-xs font-bold hover:text-blue-400 transition cursor-pointer">{l}</button>
                    ))}
                </div>
                <button className="text-xl hover:scale-110 transition cursor-pointer">🌓</button>
            </div>

            {/* Справа: Навигация (меняется динамически) */}
            <div className="flex gap-3">
                {currentPage !== 'main' && (
                    <button onClick={() => setPage('main')} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                        Обо мне
                    </button>
                )}
                {currentPage !== 'works' && (
                    <button onClick={() => setPage('works')} className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition cursor-pointer shadow-lg shadow-blue-500/20">
                        Работы
                    </button>
                )}
                {currentPage !== 'cv' && (
                    <button onClick={() => setPage('cv')} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                        CV
                    </button>
                )}
            </div>
        </header>
    );
};