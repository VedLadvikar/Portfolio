import { useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { BgArt } from "@/components/BgArt";
import { Footer } from "@/components/Footer";
import { ProjectListCard } from "@/components/ProjectListCard";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";

export function AllProjectsPage() {
  useReveal();
  useParallax();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <main className="page-enter relative min-h-screen overflow-x-hidden">
      <Cursor />
      <Navbar />
      <BgArt />

      <section className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                04 — All work
              </div>
              <h1 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05] max-w-2xl">
                Every project I've <em className="not-italic text-primary">shipped</em>.
              </h1>
            </div>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-border to-transparent hidden md:block" />
          </div>

          <p className="reveal mt-4 max-w-2xl text-muted-foreground text-pretty">
            A complete look at builds, experiments, and products — from dashboards to decentralized apps.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sorted.map((project) => (
              <div key={project.id} className="reveal h-full">
                <ProjectListCard project={project} />
              </div>
            ))}
          </div>

          <div className="reveal mt-12 flex justify-center">
            <Link
              to="/"
              className="link-underline text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
