import { Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full py-4 border-t border-black/5 dark:border-white/5 bg-[rgba(235,230,210,0.4)] backdrop-blur-md dark:bg-black/20 flex justify-between items-center px-6 md:px-10 text-sm text-amber-950 dark:text-slate-200 font-medium [perspective:500px]">
      <a
        href="mailto:stepanic9@gmail.com"
        aria-label="Написать email"
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
      >
        <Mail className="w-5 h-5 group-hover:scale-110 group-active:scale-95 transition-transform duration-300" />
      </a>

      <div className="cursor-pointer transition-transform duration-700 ease-in-out hover:[transform:rotateX(360deg)]">
        Portfolio 2026 ©
      </div>
    </footer>
  );
};
