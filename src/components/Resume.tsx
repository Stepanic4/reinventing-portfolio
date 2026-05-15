import { useTranslation } from "react-i18next";

export const Resume = () => {
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => window.print()}
        className="animate-pulse-shadow fixed bottom-15 left-8 z-50 px-5 py-2 text-xs bg-sky-500/30 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest rounded-sm backdrop-blur-sm cursor-pointer print:hidden transition-all"
      >
        {t("resume.download") || "Stáhnout PDF"}
      </button>

      <div className="resume-page-container w-full flex flex-col items-center py-10 px-4 print:block print:p-0 print:m-0">
        <div className="resume-sheet relative w-full max-w-[210mm] min-h-[296mm] bg-white dark:bg-slate-900 shadow-2xl flex flex-col text-slate-900">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-500 shrink-0 print:h-1" />

          <div className="p-8 md:p-12 print:p-6 flex-grow">
            <header className="flex flex-col md:flex-row print:flex-row justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 print:mb-4 print:pb-3 print:border-slate-200 shrink-0">
              <div className="flex items-center gap-6 print:gap-4">
                <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm print:w-16 print:h-16">
                  <img
                    src="/avatar.jpg"
                    alt="Ivan Zolotukhin"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=IZ&background=020617&color=fff&size=128`;
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase dark:text-white print:text-black print:text-2xl">
                    {t("resume.name")}
                  </h1>
                  <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mt-1 print:text-[10px]">
                    Web Developer - UX Designer
                  </p>
                </div>
              </div>

              <div className="hidden md:block print:block opacity-20 dark:invert print:opacity-10">
                <img
                  src="/knight.webp"
                  alt="Knight"
                  className="w-16 h-16 object-contain print:w-12 print:h-12"
                />
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 print:grid print:grid-cols-3 gap-10 print:gap-4">
              <div className="md:col-span-1 print:col-span-1 space-y-8 print:space-y-3">
                <section>
                  <h2 className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 print:mb-2 print:pb-1">
                    {t("resume.skills")}
                  </h2>
                  <div className="space-y-4 print:space-y-2">
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-slate-400 mb-2 print:mb-1">
                        {t("resume.core")}
                      </h3>
                      <ul className="text-sm font-medium dark:text-slate-300 print:text-xs">
                        <li>JavaScript / React.JS</li>
                        <li>TypeScript</li>
                        <li>Node.JS / Nginx</li>
                        <li>Angular 5+</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-slate-400 mb-2 print:mb-1">
                        {t("resume.frontend")}
                      </h3>
                      <ul className="text-sm font-medium dark:text-slate-300 print:text-xs">
                        <li>HTML5 / CSS / Sass</li>
                        <li>Tailwind 4 / Bootstrap</li>
                        <li>JQuery / Gulp</li>
                        <li>jsPDF / Canvas</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-slate-400 mb-2 print:mb-1">
                        {t("resume.tools")}
                      </h3>
                      <ul className="text-sm font-medium dark:text-slate-300 print:text-xs">
                        <li>Git / Jira</li>
                        <li>Photoshop</li>
                        <li>WordPress</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 print:mb-2 print:pb-1">
                    {t("resume.lang")}
                  </h2>
                  <div className="text-xs space-y-2 font-bold uppercase dark:text-slate-400 print:text-[10px] print:space-y-1">
                    <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1 print:border-none print:pb-0">
                      <span>English</span>
                      <span className="text-slate-400">B2</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1 print:border-none print:pb-0">
                      <span>Czech</span>
                      <span className="text-slate-400">A2</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/50 pb-1 print:border-none print:pb-0">
                      <span>Ukrainian</span>
                      <span className="text-slate-400">Native</span>
                    </div>
                    <div className="flex justify-between pb-1 print:border-none print:pb-0">
                      <span>Russian</span>
                      <span className="text-slate-400">Native</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="md:col-span-2 print:col-span-2 space-y-8 print:space-y-3">
                <section>
                  <h2 className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 print:mb-2 print:pb-1">
                    {t("resume.experience")}
                  </h2>
                  <div className="border-l-2 border-blue-600/20 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-black text-sm uppercase dark:text-white print:text-xs">
                        Web Developer
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        2023 — NOW
                      </span>
                    </div>
                    <p className="text-blue-600 text-[11px] font-bold uppercase mb-2 print:mb-1">
                      Simplepin.inc
                    </p>
                    <p className="whitespace-pre-line text-xs text-slate-500 leading-relaxed print:text-[10px] print:leading-tight">
                      {t("resume.experience_text")}
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 print:mb-2 print:pb-1">
                    {t("resume.education")}
                  </h2>
                  <div className="space-y-4 print:space-y-2 border-l-2 border-blue-600/20 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold dark:text-white uppercase print:text-[11px]">
                          Spalah IT school
                        </h4>
                        <p className="text-[11px] text-slate-500 italic mt-1 print:mt-0 print:text-[10px]">
                          Angular 5+
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        2018
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold dark:text-white uppercase print:text-[11px]">
                          Spalah IT school
                        </h4>
                        <p className="text-[11px] text-slate-500 italic mt-1 print:mt-0 print:text-[10px]">
                          Html-Css, JavaScript, ReactJS
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        2017
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold dark:text-white uppercase print:text-[11px]">
                          Kyiv National University of Culture and Arts
                        </h4>
                        <p className="text-[11px] text-slate-500 italic mt-1 print:mt-0 print:text-[10px]">
                          Higher Education
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        2006 — 2010
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold dark:text-white uppercase print:text-[11px]">
                          Business College
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        1998 — 2000
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 print:mb-2 print:pb-1">
                    {t("resume.info")}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4 print:mb-2">
                    {["Simplepin", "Vstudy", "Wodproofapp"].map((proj) => (
                      <span
                        key={proj}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[11px] print:text-[10px] font-bold text-blue-600 rounded-sm print:bg-transparent print:border print:border-slate-300 print:px-1 print:py-0"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs print:text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                    <p className="mb-2 print:mb-1">{t("resume.proj_info")}</p>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/Stepanic4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 font-bold hover:underline underline-offset-4 print:text-slate-700"
                      >
                        <svg
                          className="w-4 h-4 fill-current print:w-3 print:h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub Repository</span>
                      </a>
                      <span className="hidden print:inline text-[9px] text-slate-400 font-normal">
                        ( https://github.com/Stepanic4 )
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <footer className="mt-auto py-6 px-8 md:px-12 print:flex print:flex-row border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter print:px-6 print:py-2">
            <a
              href="https://www.linkedin.com/in/ivan-zolotukhin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              LinkedIn: /ivan-zolotukhin
            </a>
            <span>© 2026 / {t("resume.name")}</span>
          </footer>
        </div>
      </div>
    </>
  );
};
