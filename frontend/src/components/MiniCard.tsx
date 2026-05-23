interface MiniCardProps {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  glyph: string;
}

export function MiniCard({ eyebrow, title, body, accent, glyph }: MiniCardProps) {
  return (
    <article
      data-cursor-hover
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-7 hover-lift"
    >
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </div>
        <span
          className="font-display text-3xl leading-none transition-transform duration-500 group-hover:rotate-12"
          style={{ color: accent }}
        >
          {glyph}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl md:text-2xl leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">{body}</p>
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  );
}
