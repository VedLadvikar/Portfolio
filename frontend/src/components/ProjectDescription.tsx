import { useLayoutEffect, useRef, useState } from "react";

interface ProjectDescriptionProps {
  text: string;
}

export function ProjectDescription({ text }: ProjectDescriptionProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [maxH, setMaxH] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      if (expanded) {
        el.classList.remove("line-clamp-4");
        setMaxH(el.scrollHeight);
        return;
      }

      el.classList.add("line-clamp-4");
      const collapsed = el.clientHeight;
      el.classList.remove("line-clamp-4");
      const full = el.scrollHeight;
      el.classList.add("line-clamp-4");

      setMaxH(collapsed);
      setCanExpand(full > collapsed + 2);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, expanded]);

  return (
    <div className="mt-3 min-h-0 flex-1 flex flex-col">
      <p
        ref={textRef}
        className={`text-muted-foreground text-pretty overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "" : "line-clamp-4"
        }`}
        style={maxH !== undefined ? { maxHeight: maxH } : undefined}
      >
        {text}
      </p>
      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-mono uppercase tracking-wider text-primary hover:text-foreground transition-colors"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
