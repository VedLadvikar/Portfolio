import { projects } from "@/data/projects";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="04 — Selected work"
          title={<>Things I've shipped <em className="not-italic text-primary">recently</em>.</>}
        />

        <div className="reveal mt-14 grid gap-6 md:gap-8 md:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
