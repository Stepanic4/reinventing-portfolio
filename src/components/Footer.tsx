export const Footer = () => {
    return (
        <footer
            className="relative w-full py-10 border-t border-white/5 bg-black/20 flex justify-between px-10 text-sm text-gray-500">
            <div className="cursor-pointer hover:text-white transition">
                <a href="mailto:stepanic9@gmail.com">stepanic9@gmail.com</a>
            </div>
            <div className="text-blue-400">
                <a href="">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </a>
            </div>
            <div className="cursor-pointer hover:text-white transition">
                Portfolio 2026 ©
            </div>
        </footer>
    );
};
