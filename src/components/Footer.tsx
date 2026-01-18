export const Footer = () => {
    return (
        <footer className="relative w-full py-5 border-t border-white/5 bg-[rgba(235,230,210,0.4)] backdrop-blur-md dark:bg-black/20 flex justify-between items-center px-10 text-sm text-amber-950 dark:text-slate-200 font-medium [perspective:500px]">

            <a href="mailto:stepanic9@gmail.com"
               className="hover:text-blue-700 hover:scale-110 transition-transform duration-300 inline-block">
                stepanic9@gmail.com
            </a>

            {/* Центральный блок: Old portfolio */}
            <a href="https://stepanic4.github.io/Portfolio" target="_blank"
               className="flex flex-col items-center gap-1 hover:text-blue-700 transition-all duration-300 group hover:-translate-y-1">
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-xs">Old portfolio</span>
            </a>

            <div className="cursor-pointer transition-transform duration-700 ease-in-out hover:[transform:rotateX(360deg)]">
                Portfolio 2026 ©
            </div>
        </footer>
    );
};