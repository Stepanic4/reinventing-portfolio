import {useEffect, useRef, useState} from 'react';

export const PixelSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Если это мобилка — ВООБЩЕ ничего не грузим
        if (window.innerWidth < 1024) return;

        const loadScripts = async (): Promise<void> => {
            const addScript = (src: string, id: string): Promise<void> => {
                return new Promise((resolve) => {
                    const existing = document.getElementById(id);
                    if (existing) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = src;
                    script.id = id;
                    script.async = false;
                    script.onload = () => resolve();
                    document.body.appendChild(script);
                });
            };

            try {
                // Строгий порядок загрузки библиотек
                await addScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js", "three-js");
                await Promise.all([
                    addScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js", "gsap-js"),
                    addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js", "bas-js")
                ]);
                // Загружаем сам файл логики слайдера
                await addScript("/pixel.js", "pixel-js");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const globalWindow = window as any;

                const startup = () => {
                    const isBasReady = globalWindow.THREE?.BAS?.ModelBufferGeometry;
                    // Передаем колбэк в init, чтобы он сказал нам, когда картинки загружены
                    if (globalWindow.init && isBasReady && containerRef.current) {
                        if (containerRef.current.querySelector('canvas') === null) {
                            globalWindow.init(() => {
                                console.log("Slider images loaded!");
                                setIsLoading(false);
                            });
                        }
                    } else {
                        setTimeout(startup, 50);
                    }
                };
                startup();
            } catch (err) {
                console.error("Ошибка загрузки скриптов слайдера:", err);
            }
        };

        loadScripts();

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globalWindow = window as any;
            if (globalWindow.rootInstance?.dispose) {
                globalWindow.rootInstance.dispose();
                globalWindow.rootInstance = null;
            }
            ['three-js', 'gsap-js', 'bas-js', 'pixel-js'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="relative w-full flex flex-col items-center">

            {/* ПРЕЛОАДЕР */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center h-[650px] z-20">
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
            <div ref={containerRef}
                 id="three-container"
                 className={`hidden lg:block relative z-10 h-[650px] min-h-[650px]
                   w-[calc(100%+4rem)] -mx-8 lg:w-[calc(100%+20rem)] lg:-mx-40
                   transition-opacity duration-1000 ease-in-out
                   ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            </div>
        </div>
    );
};