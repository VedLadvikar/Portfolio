import { about } from "@/data/about";
import { SectionHeader } from "./SectionHeader";
import { MiniCard } from "./MiniCard";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="02 — About"
          title={<>A little about <em className="not-italic text-primary">me</em>.</>}
        />

        <div className="reveal mt-12 grid gap-5 md:gap-6">
          <article
            data-cursor-hover
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 hover-lift"
          >
            <div
              aria-hidden
              data-parallax="0.06"
              className="absolute -top-20 -right-16 w-72 h-72 blob opacity-50"
              style={{ background: "var(--gradient-warm)" }}
            />
            <div
              aria-hidden
              data-parallax="0.04"
              className="absolute -bottom-24 -left-20 w-80 h-80 blob opacity-40"
              style={{ background: "var(--gradient-cool)" }}
            />

            <div className="relative grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-center gap-4">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Who I am
                </div>
                <div className="mt-0 md:mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {about.badge}
                </div>
              </div>

              <div className="md:col-span-3 space-y-4">
                <p className="font-display text-2xl md:text-3xl leading-[1.2] text-pretty">
                  {about.headline.prefix}
                  <em className="not-italic text-primary">{about.headline.highlight1}</em>
                  {about.headline.middle}
                  <em className="not-italic text-primary">{about.headline.highlight2}</em>
                  {about.headline.suffix}
                </p>
                <p className="text-muted-foreground text-pretty">
                  Outside of coursework, I spend my time exploring{" "}
                  <span className="text-foreground font-medium">Web3</span>{" "}
                  and <span className="text-foreground font-medium">Artificial Intelligence</span> —
                  two spaces I think will shape the next generation of products.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {about.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono rounded-full border border-border bg-background/60 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            {about.miniCards.map((card) => (
              <MiniCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
