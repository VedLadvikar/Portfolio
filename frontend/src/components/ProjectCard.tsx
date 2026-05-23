import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const span =
    project.featured
      ? "md:col-span-12"
      : index === 1
      ? "md:col-span-7"
      : index === 2
      ? "md:col-span-5"
      : "md:col-span-12";

  return (
    <article
      data-cursor-hover
      className={`group relative overflow-hidden rounded-3xl border border-border bg-card ${span}`}
    >
      <div className={`grid ${project.featured ? "md:grid-cols-2" : "grid-cols-1"} gap-0`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            width={1280}
            height={832}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-mono">
              {project.number}
            </span>
            {project.featured && (
              <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {project.tag}
          </div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">{project.title}</h3>
          <p className="mt-3 text-muted-foreground text-pretty">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono rounded-full border border-border bg-background px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 flex items-center gap-2">
            <a
              href={project.live_url}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm hover:bg-primary transition-colors"
            >
              Live demo
              <span className="group-hover/btn:translate-x-0.5 transition-transform">↗</span>
            </a>
            <a
              href={project.code_url}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
