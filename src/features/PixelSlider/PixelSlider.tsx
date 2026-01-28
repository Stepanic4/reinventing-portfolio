import { useRef } from 'react';
import { useSliderScripts } from './useSliderScripts';

export const PixelSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useSliderScripts(containerRef);

    return (
        <div className="relative w-full flex flex-col items-center min-h-[650px]">
            {/* ПРЕЛОАДЕР */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-transparent">
                    <div className="w-0 h-0
                        border-l-[30px] border-l-transparent
                        border-b-[52px] border-b-yellow-300
                        border-r-[30px] border-r-transparent
                        animate-triangle">
                    </div>
                    <span className="mt-4 text-yellow-300 text-sm font-medium tracking-widest uppercase">
                        Loading...
                    </span>
                </div>
            )}

            {/* КОНТЕЙНЕР СЛАЙДЕРА */}
            <div
                ref={containerRef}
                id="three-container"
                className={`hidden lg:block relative z-10 h-[650px] w-[calc(100%+4rem)] 
                   -mx-8 lg:w-[calc(100%+20rem)] lg:-mx-40
                   transition-opacity duration-1000 ease-in-out
                   ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
                {/* Сюда pixel.js вставит canvas */}
            </div>
        </div>
    );
};