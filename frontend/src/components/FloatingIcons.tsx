import { useEffect, useRef } from "react";

const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/bb4430`;

const ICONS: { name: string; slug: string; x: number; y: number; s: number; d: number }[] = [
  { name: "React", slug: "react", x: 10, y: 25, s: 34, d: 0 },
  { name: "Node.js", slug: "nodedotjs", x: 88, y: 20, s: 32, d: 0.4 },
  { name: "MongoDB", slug: "mongodb", x: 82, y: 75, s: 30, d: 0.9 },
  { name: "JavaScript", slug: "javascript", x: 16, y: 70, s: 28, d: 0.6 },
  { name: "Tailwind CSS", slug: "tailwindcss", x: 26, y: 14, s: 26, d: 1.2 },
  { name: "Git", slug: "git", x: 74, y: 16, s: 24, d: 1.6 },
  { name: "Express", slug: "express", x: 92, y: 50, s: 26, d: 1.0 },
  { name: "Python", slug: "python", x: 6, y: 48, s: 28, d: 1.8 },
];

export function FloatingIcons() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia?.("(hover: none)").matches) return;

    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-float-icon]"));
    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const update = () => {
      raf = 0;
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 100;
        if (dist < radius) {
          const f = (1 - dist / radius) * 14;
          const ux = dx / (dist || 1);
          const uy = dy / (dist || 1);
          el.style.setProperty("--mx", `${ux * f}px`);
          el.style.setProperty("--my", `${uy * f}px`);
          el.style.setProperty("--ms", "1.08");
        } else {
          el.style.setProperty("--mx", `0px`);
          el.style.setProperty("--my", `0px`);
          el.style.setProperty("--ms", "1");
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden"
    >
      {ICONS.map((i) => (
        <div
          key={i.name}
          data-float-icon
          className="float-icon absolute"
          style={{
            left: `${i.x}%`,
            top: `${i.y}%`,
            width: i.s,
            height: i.s,
            animationDelay: `${i.d}s`,
            "--mx": "0px",
            "--my": "0px",
            "--ms": "1",
          } as React.CSSProperties}
          title={i.name}
        >
          <img
            src={icon(i.slug)}
            alt=""
            width={i.s}
            height={i.s}
            loading="lazy"
            className="w-full h-full opacity-70"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </div>
      ))}
    </div>
  );
}
