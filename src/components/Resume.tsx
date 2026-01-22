import {useTranslation} from 'react-i18next';

export const Resume = () => {
    const {t} = useTranslation();

    return (
        <div className="resume-page-container w-full flex flex-col items-center py-10 px-4 print:p-0 print:m-0">

            {/* button PDF */}
            <div className="sticky top-6 w-full max-w-[210mm] flex justify-end z-[60] mb-6 print:hidden">
                <button onClick={() => window.print()}
                    className="btn-nav-shadow flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                    <span>📥</span> {t('resume.download')}
                </button>
            </div>

            {/* ОСНОВНОЙ А4 */}
            <div
                className="resume-sheet w-full max-w-[210mm] min-h-[296mm] bg-white dark:bg-slate-900 shadow-2xl print:shadow-none print:m-0 print:w-full flex flex-col overflow-hidden text-slate-900 transition-colors duration-500">

                <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-500 print:h-1"></div>

                <div className="p-10 flex-grow print:p-8">
                    {/* Header */}
                    <header
                        className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 print:mb-6 print:border-slate-200">
                        <div className="flex items-center gap-6">
                            <div
                                className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm print:w-20 print:h-20">
                                <img
                                    src="/avatar.jpg"
                                    alt="Ivan Zolotukhin"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://ui-avatars.com/api/?name=IZ&background=020617&color=fff&size=128";
                                    }}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tighter uppercase dark:text-white print:text-black">
                                    {t('resume.name')}
                                </h1>
                                <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mt-1">
                                    Web Developer - UX Designer
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center">
                            <div className="w-20 h-20 pointer-events-none">
                                <img src="/knight.webp"
                                     alt="Knight"
                                     className="w-full h-full object-contain grayscale opacity-25 "
                                     onError={(e) => e.currentTarget.style.display = 'none'}/>
                            </div>
                        </div>
                    </header>

                    {/* СЕТКА КОНТЕНТА */}
                    <div className="grid grid-cols-3 gap-10">
                        {/* Left col */}
                        <div className="col-span-1 space-y-10">

                            {/* СЕКЦИЯ SKILLS */}
                            <section>
                                <h2 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase italic tracking-wide mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.skills')}
                                </h2>

                                <div className="space-y-6">
                                    {/* CORE SKILLS */}
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 pb-2">
                                            {t('resume.core')}
                                        </p>
                                        <ul className="space-y-1 text-[13px] font-medium text-slate-700 dark:text-slate-300 print:text-slate-800">
                                            <li>JavaScript / React.JS [cite: 9, 13]</li>
                                            <li>TypeScript</li>
                                            <li>Angular 5+ [cite: 9, 32]</li>
                                            <li>Node.JS / Nginx [cite: 13]</li>
                                        </ul>
                                    </div>

                                    {/* FRONTEND SKILLS */}
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 pb-2">
                                            {t('resume.frontend')}
                                        </p>
                                        <ul className="space-y-1 text-[13px] font-medium text-slate-700 dark:text-slate-300 print:text-slate-800">
                                            <li>HTML5 / CSS3 / Sass [cite: 6, 10, 32]</li>
                                            <li>Bootstrap / Tailwind [cite: 6]</li>
                                            <li>JQuery / Gulp [cite: 10]</li>
                                            <li>jsPDF / Canvas [cite: 7]</li>
                                        </ul>
                                    </div>

                                    {/* TOOLS */}
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 pb-2">
                                            {t('resume.tools')}
                                        </p>
                                        <ul className="space-y-1 text-[13px] font-medium text-slate-700 dark:text-slate-300 print:text-slate-800">
                                            <li>Git / Jira [cite: 7, 10]</li>
                                            <li>Photoshop [cite: 11]</li>
                                            <li>WordPress</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* СЕКЦИЯ LANGUAGES */}
                            <section>
                                <h2 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase italic tracking-wide mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.lang')}
                                </h2>
                                <div className="space-y-3 text-[11px] font-bold uppercase tracking-tight">
                                    <div
                                        className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1">
                                        <span className="text-slate-600 dark:text-slate-400">English</span>
                                        <span className="text-slate-500">B2 (Improving) </span>
                                    </div>
                                    <div
                                        className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1">
                                        <span className="text-slate-600 dark:text-slate-400">Czech</span>
                                        <span className="text-slate-500">A2</span>
                                    </div>
                                    <div
                                        className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1">
                                        <span className="text-slate-600 dark:text-slate-400">Ukrainian</span>
                                        <span className="text-slate-500">Native</span>
                                    </div>
                                    <div
                                        className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1">
                                        <span className="text-slate-600 dark:text-slate-400">Russian</span>
                                        <span className="text-slate-500">Native</span>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Правая колонка */}
                        <div className="col-span-2 space-y-8">
                            <section>
                                <h3 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase italic tracking-wide mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.experience')}
                                </h3>
                                <div className="space-y-6">
                                    <div className="relative pl-4 border-l-2 border-blue-600/20">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-sm dark:text-white print:text-black uppercase">
                                                Web Developer
                                            </h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                2023 — Now
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold text-blue-600 mb-1 uppercase">Simplepin.inc</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {t('resume.experience_text')}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            {/* EDUCATION */}
                            <section className="mt-8">
                                <h3 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase italic tracking-wide mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.education')}
                                </h3>
                                <div className="relative pl-4 border-l-2 border-blue-600/20 space-y-4">
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold dark:text-white uppercase">
                                                Spalah IT school
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-4">
                                                2018
                                            </span>
                                        </div>
                                        <p className="italic">
                                            Angular 5+
                                        </p>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold dark:text-white uppercase">
                                                Spalah IT school
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-4">
                                                2017
                                            </span>
                                        </div>
                                        <p className="italic">Html-Css, JavaScript, ReactJS</p>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold dark:text-white uppercase">Kyiv National University of Culture and Arts</span>
                                            <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-4">2006 — 2010</span>
                                        </div>
                                        <p className="italic text-[10px]">Higher Education</p>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex justify-between items-start">
                                            <span
                                                className="font-bold dark:text-white uppercase">Business College</span>
                                            <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-4">1998 — 2000</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* INFORMATION & ACHIEVEMENTS */}
                            <section className="mt-8">
                                <h3 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase italic tracking-wide mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {t('resume.info')}
                                </h3>

                                <div className="relative pl-4 border-l-2 border-blue-600/20 space-y-5">
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            {t('resume.proj')}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                {name: 'Simplepin', url: 'https://simplepin.com'},
                                                {name: 'Vstudy', url: 'https://vstudy.cz'},
                                                {name: 'Wodproofapp', url: 'https://wodproofapp.com'}
                                            ].map((project) => (
                                                <a key={project.name}
                                                   href={project.url}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors">
                                                    {project.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col gap-2">
                                            <p>
                                                {t('resume.proj_info')}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <a href="https://github.com/Stepanic4"
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="flex items-center gap-2 text-blue-600 font-bold hover:underline underline-offset-4 transition-all">
                                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                    <span>GitHub Repository</span>
                                                </a>

                                                {/* Эта часть видна ТОЛЬКО при печати (PDF) */}
                                                <span className="hidden print:inline text-[10px] text-slate-400 font-normal">
                                                   ( github.com/Stepanic4 )
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <footer className="p-4 text-[10px] text-slate-800 dark:text-slate-600 tracking-widest flex justify-between items-center border-t border-slate-50 dark:border-slate-800">
                    <a href="https://www.linkedin.com/in/ivan-zolotukhin"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 hover:text-blue-600 transition-colors font-bold">
                        <svg className="w-4 h-4 fill-current"
                             viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                    <span>
                     © 2026 / {t('resume.name')}
                    </span>
                </footer>
            </div>
        </div>
    );
};