import { useEffect, useRef } from 'react';

export const PixelSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Если это мобилка — ВООБЩЕ ничего не грузим и не запускаем
        if (window.innerWidth < 1024) return;

        const loadScripts = async (): Promise<void> => {
            const addScript = (src: string, id: string): Promise<void> => {
                return new Promise((resolve) => {
                    const existing = document.getElementById(id);
                    if (existing) { resolve(); return; }
                    const script = document.createElement('script');
                    script.src = src;
                    script.id = id;
                    script.async = false;
                    script.onload = () => resolve();
                    document.body.appendChild(script);
                });
            };

            try {
                // Строгий порядок загрузки
                await addScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js", "three-js");
                await Promise.all([
                    addScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js", "gsap-js"),
                    addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js", "bas-js")
                ]);
                await addScript("/pixel.js", "pixel-js");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const globalWindow = window as any;

                const startup = () => {
                    const isBasReady = globalWindow.THREE?.BAS?.ModelBufferGeometry;
                    if (globalWindow.init && isBasReady && containerRef.current) {
                        if (containerRef.current.querySelector('canvas') === null) {
                            globalWindow.init();
                        }
                    } else {
                        setTimeout(startup, 50);
                    }
                };
                startup();
            } catch (err) {
                console.error("Ошибка загрузки:", err);
            }
        };

        loadScripts();

        // ОЧИСТКА: Срабатывает при клике на CV, Работы и т.д.
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globalWindow = window as any;

            // Убиваем экземпляр Three.js
            if (globalWindow.rootInstance?.dispose) {
                globalWindow.rootInstance.dispose();
                globalWindow.rootInstance = null;
            }

            // УДАЛЯЕМ СКРИПТЫ, чтобы они не висели в памяти
            ['three-js', 'gsap-js', 'bas-js', 'pixel-js'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    // Показываем блок только на десктопах
    return (
        <div ref={containerRef}
            id="three-container"
            className="hidden lg:block relative z-10 h-[650px] min-h-[650px]
               w-[calc(100%+4rem)] -mx-8 lg:w-[calc(100%+20rem)] lg:-mx-40">
        </div>
    );
};