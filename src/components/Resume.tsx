import { useTranslation } from 'react-i18next';

export const Resume = () => {
    const { t } = useTranslation();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-transparent py-10 px-4 print:p-0 print:bg-white">

            {/* Кнопка скачать — скрыта при печати */}
            <div className="w-full max-w-[210mm] flex justify-end mb-6 print:hidden">
                <button
                    onClick={handlePrint}
                    className="btn-nav-shadow flex items-center gap-2"
                >
                    <span>📥</span> {t('resume.download')}
                </button>
            </div>

            {/* ЛИСТ А4 */}
            <div className="w-full max-w-[210mm] min-h-[297mm] bg-white dark:bg-slate-900 shadow-2xl print:shadow-none print:dark:bg-white flex flex-col">

                {/* Тот самый градиент из старого дизайна */}
                <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-500"></div>

                <div className="p-12 flex-grow">
                    {/* ХЕДЕР: Фото и Имя */}
                    <header className="flex justify-between items-center mb-12 border-b border-slate-100 dark:border-slate-800 pb-10 print:border-slate-200">
                        <div className="flex items-center gap-8">
                            {/* Круглое фото как в PDF */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg print:border-slate-100">
                                <img
                                    src="/avatar.jpg"
                                    alt="Stepan Ilyin"
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.currentTarget.src = "https://ui-avatars.com/api/?name=SI&size=200"}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white print:text-black">
                                    STEPAN ILYIN
                                </h1>
                                <p className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mt-1">
                                    Frontend Developer
                                </p>
                            </div>
                        </div>

                        <div className="text-right space-y-1 text-sm text-slate-500 dark:text-slate-400 print:text-slate-600">
                            <p className="font-bold text-slate-900 dark:text-slate-200 print:text-black italic">stepanic9@gmail.com</p>
                            <p>Prague, Czech Republic</p>
                            <p>t.me/stepanic</p>
                        </div>
                    </header>

                    {/* ОСНОВНОЙ КОНТЕНТ: Сетка */}
                    <div className="grid grid-cols-3 gap-12">

                        {/* ЛЕВАЯ КОЛОНКА: Скиллы и Языки */}
                        <div className="col-span-1 space-y-10">
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-5 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.skills')}
                                </h2>
                                <ul className="space-y-3 text-[13px] font-medium text-slate-700 dark:text-slate-300 print:text-slate-800">
                                    <li className="flex items-center gap-2">React / Next.js</li>
                                    <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400">TypeScript</li>
                                    <li>Three.js / WebGL</li>
                                    <li>GSAP / Framer Motion</li>
                                    <li>Tailwind CSS / SCSS</li>
                                    <li>Node.js / Firebase</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-5 border-b border-slate-100 pb-2">
                                    Languages
                                </h2>
                                <div className="space-y-4 text-xs font-bold uppercase">
                                    <div className="flex justify-between"><span>Russian</span> <span className="text-blue-500">Native</span></div>
                                    <div className="flex justify-between"><span>English</span> <span className="text-slate-400">B2</span></div>
                                    <div className="flex justify-between"><span>Czech</span> <span className="text-slate-400">A2</span></div>
                                </div>
                            </section>
                        </div>

                        {/* ПРАВАЯ КОЛОНКА: Опыт */}
                        <div className="col-span-2 space-y-10">
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.experience')}
                                </h2>

                                <div className="space-y-10">
                                    {/* Work Item */}
                                    <div className="relative pl-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white print:text-black">
                                                Senior Frontend Developer
                                            </h3>
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded print:border print:border-blue-200">
                                                2022 — PRESENT
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Freelance / Project Work</p>
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 print:text-slate-700">
                                            {/* Сюда вставь текст из старого резюме */}
                                            Разработка сложных интерфейсов с использованием React и Three.js.
                                            Оптимизация производительности и создание кастомных шейдеров для визуализации данных.
                                        </p>
                                    </div>

                                    <div className="relative pl-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white print:text-black">
                                                Middle Frontend Developer
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-400 px-2 py-1">
                                                2019 — 2022
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Previous Company</p>
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 print:text-slate-700">
                                            Создание и поддержка масштабируемых веб-приложений.
                                            Внедрение TypeScript в существующие проекты и настройка CI/CD процессов.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>

                {/* ФУТЕР ЛИСТА: Ссылка на портфолио */}
                <footer className="p-12 pt-0 mt-auto">
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <span>stepanic.github.io</span>
                        <span>2024 / PRAGUE</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};