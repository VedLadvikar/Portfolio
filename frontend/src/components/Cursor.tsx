import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.classList.add("cursor-none");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 1.6 : 1})`,
          transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
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
        className="pointer-events-none fixed z-[99] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 0.4 : 1})`,
          transition: "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 300ms",
          opacity: hover ? 0.3 : 0.5,
        }}
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
