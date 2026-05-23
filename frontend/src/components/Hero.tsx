import avatar from "@/assets/avatar.jpg";
import { Magnetic } from "./Magnetic";
import { FloatingIcons } from "./FloatingIcons";

export function Hero() {
  return (
    <section id="home" className="relative pt-32 md:pt-36 pb-24 md:pb-32 px-6">
      <FloatingIcons />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="relative mx-auto mb-6 w-28 h-28 md:w-32 md:h-32" data-cursor-hover>
          <div
            className="absolute inset-0 blob blur-xl"
            data-parallax="0.08"
            style={{ background: "color-mix(in oklab, var(--tomato) 40%, transparent)" }}
          />
          <div
            className="absolute -inset-3 blob"
            data-parallax="0.05"
            style={{
              background: "linear-gradient(135deg, var(--teal), var(--vanilla), var(--tomato))",
            }}
          />
          <img
            src={avatar}
            alt="Ved Ladvikar"
            width={128}
            height={128}
            className="relative w-full h-full rounded-full object-cover ring-4 ring-background shadow-[var(--shadow-soft)]"
          />
          <span className="absolute -bottom-1 -right-1 flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 text-[11px] font-medium border border-border shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            available
          </span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
          <span className="w-1 h-1 rounded-full bg-primary" />
          Ved Ladvikar
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-balance">
          Full Stack <em className="not-italic text-primary">Developer</em>
          <span className="inline-block ml-1 w-2.5 h-[0.9em] align-[-0.1em] bg-primary animate-pulse" />
        </h1>

        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
          Crafting clean, interactive, and user-focused web experiences — from idea sketch to
          deployed product.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm transition-colors hover:bg-primary"
            >
              View Projects
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background text-foreground group-hover:rotate-45 transition-transform">
                ↗
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-5 py-2 text-sm hover:border-foreground transition-colors"
            >
              Contact Me
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
