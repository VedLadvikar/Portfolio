import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";
import type { Project } from "@/types/project";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";

import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const fallbackImages: Record<string, string> = {
  "/assets/project-1.jpg": p1,
  "/assets/project-2.jpg": p2,
  "/assets/project-3.jpg": p3,
  "/assets/project-4.jpg": p4,
};

const fallbackProjects: Project[] = [
  {
    id: "1",
    number: "01",
    title: "FinTrack- Expense Tracker With Dashboard",
    tag: "SaaS · Dashboard",
    description: "Full-stack MERN expense tracker with JWT authentication, transaction management, interactive analytics dashboard, financial reporting, and responsive UI.",
    stack: ["React.JS", "Tailwind CSS", "MongoDB", "Express", "REST APIs"],
    image_url: p1,
    live_url: "#",
    code_url: "#",
    featured: true,
    order: 1,
  },  
  {
    id: "2",
    number: "02",
    title: "Lume Studio",
    tag: "E-commerce",
    description: "Headless storefront for an artisan brand with editorial product stories and instant checkout.",
    stack: ["MERN", "Stripe", "Sanity"],
    image_url: p2,
    live_url: "#",
    code_url: "#",
    featured: false,
    order: 2,
  },
  {
    id: "3",
    number: "03",
    title: "Halo Chat",
    tag: "Realtime · Mobile",
    description: "End-to-end encrypted messaging with rich presence, threads, and a calm minimalist UI.",
    stack: ["React Native", "Socket.io", "Node"],
    image_url: p3,
    live_url: "#",
    code_url: "#",
    featured: false,
    order: 3,
  },
  {
    id: "4",
    number: "04",
    title: "Folio Journal",
    tag: "Editorial · CMS",
    description: "A typographic blogging platform with MDX-first authoring and a focus on slow reading.",
    stack: ["Next.js", "MDX", "Mongo"],
    image_url: p4,
    live_url: "#",
    code_url: "#",
    featured: false,
    order: 4,
  },
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    getProjects()
      .then((data) => {
        const resolved = data.map((p) => ({
          ...p,
          image_url: fallbackImages[p.image_url] || p.image_url,
        }));
        setProjects(resolved);
      })
      .catch(() => {
        // API unavailable — continue with fallback data
      });
  }, []);

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
