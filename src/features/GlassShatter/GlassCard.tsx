/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { performShatter } from "./shatterLogic";

interface GlassCardProps {
  imageSrc: string;
  title: string;
  description?: string;
  link?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  imageSrc,
  title,
  description,
  link,
}) => {
  // Явно указываем типы для useRef
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isShattered, setIsShattered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const scripts = [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        id: "gsap-script",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/delaunay.js",
        id: "delaunay-script",
      },
    ];
    scripts.forEach((s) => {
      if (!document.getElementById(s.id)) {
        const sc = document.createElement("script");
        sc.src = s.src;
        sc.id = s.id;
        document.body.appendChild(sc);
      }
    });
  }, []);

  const handleShatter = (e: React.MouseEvent) => {
    // Проверка на существование элементов
    if (!containerRef.current || !imageRef.current) return;

    const success = performShatter(
      e.clientX,
      e.clientY,
      containerRef.current,
      imageRef.current,
      isShattered,
    );

    if (success) {
      setIsShattered(true);
      setTimeout(() => setShowModal(true), 400);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsShattered(false);
    const gsap = (window as any).gsap;
    if (gsap && imageRef.current) {
      gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="group relative aspect-video bg-amber-50/50 dark:bg-[#020617] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all hover:scale-[1.02]"
        style={{ zIndex: showModal ? 0 : 10 }}
        onClick={handleShatter}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover pointer-events-none select-none"
        />
        {!isShattered && (
          <div className="absolute inset-0 bg-black/30 flex items-end p-6 z-10 pointer-events-none transition-opacity duration-300">
            <h3 className="text-white font-black text-xl uppercase italic tracking-tighter">
              {title}
            </h3>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 md:p-10">
          <div
            className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-5xl bg-white dark:bg-[#020617] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 dark:border-white/10 animate-in zoom-in-95 duration-500">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all z-50"
            >
              <div className="relative w-5 h-5">
                <span className="absolute block w-5 h-0.5 bg-black dark:bg-white rotate-45 top-2"></span>
                <span className="absolute block w-5 h-0.5 bg-black dark:bg-white -rotate-45 top-2"></span>
              </div>
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
              <img
                src={imageSrc}
                className="w-full h-full object-cover"
                alt={title}
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic dark:text-white mb-6 tracking-tighter">
                {title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                {description || "Описание проекта."}
              </p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl text-center transition-transform hover:scale-105 w-fit"
                >
                  {t("projects.view_project")}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
