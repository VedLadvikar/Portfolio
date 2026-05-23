interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05] max-w-2xl">{title}</h2>
      </div>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-border to-transparent hidden md:block" />
    </div>
  );
}
