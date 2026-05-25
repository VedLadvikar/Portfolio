import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { Magnetic } from "./Magnetic";

export function Projects() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="04 — Selected work"
          title={<>Things I've shipped <em className="not-italic text-primary">recently</em>.</>}
        />

        <div className="reveal mt-14 grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sorted.map((p) => (
            <ProjectCard key={p.id} project={p} uniformGrid />
          ))}
        </div>

        <div className="reveal mt-10 md:mt-12 flex justify-center">
          <Magnetic>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm transition-colors hover:bg-primary"
            >
              View All Projects
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background text-foreground group-hover:rotate-45 transition-transform">
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
