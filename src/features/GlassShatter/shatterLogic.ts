/* eslint-disable @typescript-eslint/no-explicit-any */

// Расширяем глобальный объект window для TS
interface CustomWindow extends Window {
  gsap?: any;
  Delaunay?: any;
}

export const performShatter = (
  clientX: number,
  clientY: number,
  container: HTMLDivElement,
  img: HTMLImageElement,
  isShattered: boolean,
): boolean => {
  const win = window as unknown as CustomWindow;
  const Delaunay = win.Delaunay;
  const gsap = win.gsap;

  // Проверяем наличие библиотек и не взорвано ли уже
  if (!Delaunay || !gsap || isShattered) return false;

  const rect = container.getBoundingClientRect();
  const clickX = clientX - rect.left;
  const clickY = clientY - rect.top;

  const vertices: [number, number][] = [[clickX, clickY]];
  for (let i = 0; i < 40; i++) {
    vertices.push([Math.random() * rect.width, Math.random() * rect.height]);
  }

  try {
    const indices = Delaunay.triangulate(vertices);

    for (let i = 0; i < indices.length; i += 3) {
      const p0 = vertices[indices[i]];
      const p1 = vertices[indices[i + 1]];
      const p2 = vertices[indices[i + 2]];

      const xMin = Math.min(p0[0], p1[0], p2[0]);
      const yMin = Math.min(p0[1], p1[1], p2[1]);
      const xMax = Math.max(p0[0], p1[0], p2[0]);
      const yMax = Math.max(p0[1], p1[1], p2[1]);

      const canvas = document.createElement("canvas");
      canvas.width = xMax - xMin;
      canvas.height = yMax - yMin;
      canvas.style.position = "absolute";
      canvas.style.left = `${xMin}px`;
      canvas.style.top = `${yMin}px`;
      canvas.style.zIndex = "50";
      canvas.style.pointerEvents = "none";

      const ctx = canvas.getContext("2d");
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

      const dx = xMin + (xMax - xMin) / 2 - clickX;
      const dy = yMin + (yMax - yMin) / 2 - clickY;

      gsap.to(canvas, {
        duration: 1.5,
        x: dx * 2.5,
        y: dy * 2.5,
        rotation: Math.random() * 360,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => canvas.remove(),
      });
    }

    gsap.to(img, { opacity: 0, duration: 0.1 });
    return true;
  } catch (e) {
    console.error("Shatter error:", e);
    return false;
  }
};
