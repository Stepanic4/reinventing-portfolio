/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type RefObject } from 'react';

interface CustomWindow extends Window {
    THREE?: any;
    init?: (callback: () => void) => void;
    rootInstance?: { dispose: () => void } | null;
}

export const useSliderScripts = (containerRef: RefObject<HTMLDivElement | null>) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isDestroyed = false;

        if (window.innerWidth < 1024) {
            setIsLoading(false);
            return;
        }

        const loadScripts = async () => {
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
                // Загружаем всё по очереди
                await addScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js", "three-js");
                await Promise.all([
                    addScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js", "gsap-js"),
                    addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js", "bas-js")
                ]);
                await addScript("/pixel.js", "pixel-js");

                if (isDestroyed) return;

                const win = window as unknown as CustomWindow;

                const startup = () => {
                    if (isDestroyed) return;

                    // Если всё готово и есть куда вставлять
                    if (win.init && win.THREE?.BAS && containerRef.current) {
                        // Если канваса еще нет - инициализируем
                        if (!containerRef.current.querySelector('canvas')) {
                            win.init(() => {
                                if (!isDestroyed) setIsLoading(false);
                            });
                        } else {
                            // Если канвас уже есть (от прошлого раза), просто выключаем загрузку
                            setIsLoading(false);
                        }
                    } else {
                        setTimeout(startup, 100);
                    }
                };

                startup();
            } catch (err) {
                console.error("Slider error:", err);
            }
        };

        loadScripts();

        return () => {
            isDestroyed = true;
            const win = window as any;
            if (win.rootInstance?.dispose) {
                win.rootInstance.dispose();
                win.rootInstance = null;
            }
            // НЕ удаляем скрипты из body при каждом размонтировании,
            // чтобы не грузить их заново. Удалим только если нужно.
        };
    }, [containerRef]);

    return { isLoading };
};