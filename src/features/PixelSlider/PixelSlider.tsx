import {useEffect, useRef} from 'react';

export const PixelSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loadScripts = async (): Promise<void> => {
            const addScript = (src: string, id: string): Promise<void> => {
                return new Promise((resolve) => {
                    if (document.getElementById(id)) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = src;
                    script.id = id;
                    script.async = true;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    script.onload = () => resolve();
                    document.body.appendChild(script);
                });
            };

            await addScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js", "three-js");
            await addScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js", "gsap-js");
            await addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js", "bas-js");
            await addScript("/pixel.js", "pixel-js");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globalWindow = window as any;
            if (globalWindow.init) {
                globalWindow.init();
            }
        };

        loadScripts();

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="three-container"
            /* УБРАЛИ overflow-hidden, чтобы пиксели летели наружу */
            className="w-full max-w-5xl aspect-video relative mx-auto"
            style={{
                height: '600px', // Увеличили общую высоту области для разлета
                zIndex: 10
            }}
        >
            {/* Здесь будет Canvas, а закругления и рамки можно добавить внутренним слоем, если нужно */}
        </div>
    );
};