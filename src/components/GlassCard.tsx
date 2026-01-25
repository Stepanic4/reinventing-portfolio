/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react';

interface GlassCardProps {
    imageSrc: string;
    title: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ imageSrc, title }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isShattered, setIsShattered] = useState(false);

    useEffect(() => {
        // Проверяем наличие GSAP и Delaunay, если нет — подгружаем
        const win = window as any;
        if (!win.gsap) {
            const s = document.createElement('script');
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
            document.body.appendChild(s);
        }
        if (!win.Delaunay) {
            const s = document.createElement('script');
            s.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/delaunay.js";
            document.body.appendChild(s);
        }
    }, []);

    const shatter = (clientX: number, clientY: number) => {
        const win = window as any;
        const Delaunay = win.Delaunay;
        const gsap = win.gsap;

        // Если библиотеки еще не доехали — выходим
        if (!Delaunay || !gsap || isShattered || !containerRef.current || !imageRef.current) {
            console.log("Библиотеки не готовы или уже разбито");
            return;
        }

        console.log("ВЗРЫВАЕМ!"); // Если увидишь это в консоли — клик работает!

        const container = containerRef.current;
        const img = imageRef.current;
        const rect = container.getBoundingClientRect();

        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        // Точки для треугольников
        const vertices: [number, number][] = [[clickX, clickY]];
        for (let i = 0; i < 40; i++) {
            vertices.push([Math.random() * rect.width, Math.random() * rect.height]);
        }

        try {
            const indices = Delaunay.triangulate(vertices);
            setIsShattered(true);

            for (let i = 0; i < indices.length; i += 3) {
                const p0 = vertices[indices[i]];
                const p1 = vertices[indices[i+1]];
                const p2 = vertices[indices[i+2]];

                const xMin = Math.min(p0[0], p1[0], p2[0]);
                const yMin = Math.min(p0[1], p1[1], p2[1]);
                const xMax = Math.max(p0[0], p1[0], p2[0]);
                const yMax = Math.max(p0[1], p1[1], p2[1]);

                const canvas = document.createElement('canvas');
                canvas.width = xMax - xMin;
                canvas.height = yMax - yMin;
                canvas.style.position = 'absolute';
                canvas.style.left = `${xMin}px`;
                canvas.style.top = `${yMin}px`;
                canvas.style.zIndex = "50";
                canvas.style.pointerEvents = "none";

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.translate(-xMin, -yMin);
                    ctx.beginPath();
                    ctx.moveTo(p0[0], p0[1]);
                    ctx.lineTo(p1[0], p1[1]);
                    ctx.lineTo(p2[0], p2[1]);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(img, 0, 0, rect.width, rect.height);
                }
                container.appendChild(canvas);

                // Анимация разлета
                const dx = (xMin + (xMax - xMin) / 2) - clickX;
                const dy = (yMin + (yMax - yMin) / 2) - clickY;

                gsap.to(canvas, {
                    duration: 1.5,
                    x: dx * 2,
                    y: dy * 2,
                    rotation: Math.random() * 360,
                    opacity: 0,
                    ease: "power2.out",
                    onComplete: () => canvas.remove()
                });
            }

            // Прячем оригинал
            gsap.to(img, { opacity: 0, duration: 0.1 });

            // Возврат
            setTimeout(() => {
                setIsShattered(false);
                gsap.to(img, { opacity: 1, duration: 1 });
            }, 4000);

        } catch (e) {
            console.error("Shatter error:", e);
        }
    };

    return (
        <div
            ref={containerRef}
            className="group relative aspect-video bg-black rounded-3xl overflow-hidden cursor-pointer"
            style={{ zIndex: 10 }} // Чтобы клик точно доходил
            onClick={(e) => shatter(e.clientX, e.clientY)}
        >
            <img
                ref={imageRef}
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover pointer-events-none select-none"
            />
            {!isShattered && (
                <div className="absolute inset-0 bg-black/30 flex items-end p-6 z-10 pointer-events-none">
                    <h3 className="text-white font-black text-xl uppercase italic">{title}</h3>
                </div>
            )}
        </div>
    );
};