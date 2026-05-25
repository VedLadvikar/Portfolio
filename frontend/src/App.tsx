import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AllProjectsPage } from "@/pages/AllProjectsPage";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { BgArt } from "@/components/BgArt";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useParallax } from "@/hooks/useParallax";

function Portfolio() {
  const location = useLocation();

  useReveal();
  useActiveSection(["home", "about", "skills", "projects", "contact"]);
  useParallax();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Cursor />
      <Navbar />
      <BgArt />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/projects" element={<AllProjectsPage />} />
    </Routes>
  );
}
