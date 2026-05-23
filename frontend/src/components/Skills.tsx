import { skillCategories } from "@/data/skills";
import { SectionHeader } from "./SectionHeader";

const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}/bb4430`;

export function Skills() {
  let counter = 0;
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="03 — Toolkit"
          title={<>Tools I reach for, <em className="not-italic text-primary">often</em>.</>}
        />

        <div className="reveal mt-12 space-y-10">
          {skillCategories.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="font-display text-xl md:text-2xl">{cat.label}</h3>
                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {String(cat.items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cat.items.map((s) => {
                  const i = counter++;
                  return (
                    <div
                      key={`${cat.label}-${s.name}`}
                      data-cursor-hover
                      className="group relative rounded-2xl border border-border bg-card p-5 hover-lift cursor-default"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <img
                          src={icon(s.slug)}
                          alt={`${s.name} logo`}
                          width={28}
                          height={28}
                          loading="lazy"
                          className="w-7 h-7 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                          }}
                        />
                        <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                          {cat.label}
                        </span>
                      </div>
                      <div className="mt-6 text-base font-medium">{s.name}</div>
                      <div
                        aria-hidden
                        className="absolute inset-x-5 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
