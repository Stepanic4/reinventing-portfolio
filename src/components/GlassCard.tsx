/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface GlassCardProps {
    imageSrc: string;
     title: string;
    description?: string;
    link?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ imageSrc, title, description, link }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isShattered, setIsShattered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
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

    const closeModal = () => {
        setShowModal(false);
        setIsShattered(false);
        const win = window as any;
        if (win.gsap && imageRef.current) {
            win.gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
        }
    };

    const shatter = (clientX: number, clientY: number) => {
        const win = window as any;
        const Delaunay = win.Delaunay;
        const gsap = win.gsap;

        if (!Delaunay || !gsap || isShattered || !containerRef.current || !imageRef.current) return;

        const container = containerRef.current;
        const img = imageRef.current;
        const rect = container.getBoundingClientRect();

        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        const vertices: [number, number][] = [[clickX, clickY]];
        for (let i = 0; i < 40; i++) {
            vertices.push([Math.random() * rect.width, Math.random() * rect.height]);
        }

        try {
            const indices = Delaunay.triangulate(vertices);
            setIsShattered(true);

            // Показываем модалку через 400мс, когда осколки разлетелись
            setTimeout(() => {
                setShowModal(true);
            }, 400);

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

                const dx = (xMin + (xMax - xMin) / 2) - clickX;
                const dy = (yMin + (yMax - yMin) / 2) - clickY;

                gsap.to(canvas, {
                    duration: 1.5,
                    x: dx * 2.5,
                    y: dy * 2.5,
                    rotation: Math.random() * 360,
                    opacity: 0,
                    ease: "power2.out",
                    onComplete: () => canvas.remove()
                });
            }

            gsap.to(img, { opacity: 0, duration: 0.1 });

        } catch (e) {
            console.error("Shatter error:", e);
        }
    };

    return (
        <>
            <div
                ref={containerRef}
                className="group relative aspect-video bg-amber-50/50 dark:bg-[#020617] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all hover:scale-[1.02]"
                style={{ zIndex: showModal ? 0 : 10 }}
                onClick={(e) => shatter(e.clientX, e.clientY)}>
                <img ref={imageRef}
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover pointer-events-none select-none"/>
                {!isShattered && (
                    <div className="absolute inset-0 bg-black/30 flex items-end p-6 z-10 pointer-events-none transition-opacity duration-300">
                        <h3 className="text-white font-black text-xl uppercase italic tracking-tighter">{title}</h3>
                    </div>
                )}
            </div>

            {/* МОДАЛЬНОЕ ОКНО */}
            {showModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
                    {/* Фон с размытием */}
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
                        onClick={closeModal}/>

                    {/* Контент */}
                    <div className="relative w-full max-w-5xl bg-white dark:bg-[#020617] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 dark:border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">

                        {/* CSS Крестик */}
                        <button onClick={closeModal}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all z-50">
                            <div className="relative w-5 h-5">
                                <span className="absolute block w-5 h-0.5 bg-black dark:bg-white rotate-45 top-2"></span>
                                <span className="absolute block w-5 h-0.5 bg-black dark:bg-white -rotate-45 top-2"></span>
                            </div>
                        </button>

                        {/* Слева картинка */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
                            <img src={imageSrc} className="w-full h-full object-cover" alt={title} />
                        </div>

                        {/* Справа текст */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic dark:text-white mb-6 tracking-tighter">
                                {title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                                {description || "Описание проекта по умолчанию. Здесь можно рассказать о технологиях, целях и достигнутых результатах."}
                            </p>

                            {link && (
                                <a href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-10 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl text-center transition-transform hover:scale-105 active:scale-95 w-fit">
                                    {t('projects.view_project')}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};