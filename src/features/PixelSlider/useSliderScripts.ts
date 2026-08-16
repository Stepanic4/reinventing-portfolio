/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type RefObject } from "react";

interface CustomWindow extends Window {
  THREE?: any;
  init?: (callback: () => void) => void;
  rootInstance?: { dispose: () => void } | null;
}

export const useSliderScripts = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const [isLoading, setIsLoading] = useState(() =>
     typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    let isDestroyed = false;
    const container = containerRef.current;
    if (window.innerWidth < 1024 || !container) {
      return;
    }

    const loadScripts = async () => {
      const addScript = (
        src: string,
        id: string,
        force = false,
      ): Promise<void> => {
        return new Promise((resolve) => {
          const existing = document.getElementById(id);
          if (existing && !force) {
            resolve();
            return;
          }
          if (existing && force) existing.remove();

          const script = document.createElement("script");
          // Добавляем timestamp для обхода кэша при force перезагрузке
          script.src = force ? `${src}?t=${Date.now()}` : src;
          script.id = id;
          script.async = false;
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      };

      try {
        await addScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js",
          "three-js",
        );
        await Promise.all([
          addScript(
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js",
            "gsap-js",
          ),
          addScript(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js",
            "bas-js",
          ),
        ]);

        // Перегружаем pixel.js каждый раз, чтобы восстановить window.init
        await addScript("/pixel.js", "pixel-js", true);

        if (isDestroyed) return;
        const win = window as unknown as CustomWindow;

        const startup = () => {
          if (isDestroyed || !container) return;

          if (typeof win.init === "function" && win.THREE?.BAS) {
            const oldCanvas = container.querySelector("canvas");
            if (oldCanvas) oldCanvas.remove();

            win.init(() => {
              if (!isDestroyed) setIsLoading(false);
            });
          } else {
            setTimeout(startup, 100);
          }
        };
        startup();
      } catch (err) {
        console.error("Slider error:", err);
        if (!isDestroyed) setIsLoading(false);
      }
    };

    loadScripts();

    return () => {
      isDestroyed = true;
      const win = window as any;
      if (win.rootInstance?.dispose) {
        try {
          win.rootInstance.dispose();
        } catch (e) {
          console.warn("Cleanup error:", e);
        }
        win.rootInstance = null;
      }
      if (container) container.innerHTML = "";
    };
  }, [containerRef]);

  return { isLoading };
};
