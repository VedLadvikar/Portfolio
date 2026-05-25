import { useEffect, useRef } from "react";

function canUseCustomCursor() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.innerWidth >= 768
  );
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const hover = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setEnabled = (enabled: boolean) => {
      dot.style.display = enabled ? "block" : "none";
      ring.style.display = enabled ? "block" : "none";
      document.documentElement.classList.toggle("cursor-none", enabled);
    };

    const paint = () => {
      raf.current = 0;
      const { x, y } = pos.current;
      const h = hover.current;
      const base = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `${base} scale(${h ? 1.6 : 1})`;
      ring.style.transform = `${base} scale(${h ? 0.4 : 1})`;
      ring.style.opacity = h ? "0.3" : "0.5";
    };

    const queuePaint = () => {
      if (!raf.current) raf.current = requestAnimationFrame(paint);
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      queuePaint();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const next = !!t.closest("a, button, [data-cursor-hover]");
      if (next !== hover.current) {
        hover.current = next;
        queuePaint();
      }
    };

    const onLeave = () => {
      hover.current = false;
      queuePaint();
    };

    const syncEnabled = () => setEnabled(canUseCustomCursor());

    syncEnabled();
    paint();

    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    pointerMq.addEventListener("change", syncEnabled);
    window.addEventListener("resize", syncEnabled);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", queuePaint, { passive: true });
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      pointerMq.removeEventListener("change", syncEnabled);
      window.removeEventListener("resize", syncEnabled);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", queuePaint);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
        style={{ display: "none", transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div
          className="rounded-full"
          style={{
            width: 14,
            height: 14,
            background: "var(--tomato)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] will-change-transform"
        style={{ display: "none", transition: "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 300ms" }}
      >
        <div
          className="rounded-full border"
          style={{
            width: 42,
            height: 42,
            borderColor: "color-mix(in oklab, var(--shadow-grey) 50%, transparent)",
          }}
        />
      </div>
    </>
  );
}
