import { useState } from 'react';
import { Header } from './components/Header';

function App() {
    // Состояние: какая страница сейчас открыта
    const [page, setPage] = useState('main'); // 'main' | 'works' | 'cv'

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">

            {/* Шапка (передаем страницу и функцию смены) */}
            <Header currentPage={page} setPage={setPage} />

            {/* Основной контейнер, который меняет содержимое */}
            <main className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">

                {/* СТРАНИЦА 1: ОБО МНЕ */}
                {page === 'main' && (
                    <div className="flex flex-col items-center animate-in fade-in duration-700">
                        <div className="w-32 h-32 rounded-full bg-blue-500/20 border border-blue-500/50 mb-6 overflow-hidden">
                            {/* Твое фото будет здесь */}
                        </div>
                        <h1 className="text-5xl font-black mb-4">Привет, я Разработчик</h1>
                        <p className="text-gray-400 text-center max-w-xl mb-12">Коротко обо мне: создаю крутые штуки на React.</p>

                        {/* Заглушка под Pixel Slider */}
                        <div className="w-full aspect-video bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center italic text-gray-600">
                            Pixel Slider (Three.js) Coming Soon...
                        </div>
                    </div>
                )}

                {/* СТРАНИЦА 2: РАБОТЫ */}
                {page === 'works' && (
                    <div className="animate-in slide-in-from-bottom-10 duration-500">
                        <h2 className="text-4xl font-bold mb-8 text-center">Мои работы</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Позже здесь будет BentoGrid */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/50 transition-all cursor-pointer group p-8">
                                    <div className="h-full border-2 border-dashed border-white/10 rounded-xl group-hover:border-blue-500/30 flex items-center justify-center">
                                        Проект {i} (Стекло)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* СТРАНИЦА 3: CV */}
                {page === 'cv' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] animate-in zoom-in duration-300">
                        <h2 className="text-4xl font-bold mb-6 text-center">Curriculum Vitae</h2>
                        <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition active:scale-95 shadow-xl">
                            СКАЧАТЬ PDF
                        </button>
                    </div>
                )}

            </main>

            {/* ФУТЕР (будет всегда внизу) */}
            <footer className="w-full py-10 border-t border-white/5 bg-black/20 flex justify-between px-10 text-sm text-gray-500">
                <div>Contacts: email@example.com</div>
                <div className="cursor-pointer hover:text-white transition">Portfolio 2026 ©</div>
            </footer>
        </div>
    );
}

export default App;