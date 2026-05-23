import { Routes, Route } from "react-router-dom";
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
  useReveal();
  useActiveSection(["home", "about", "skills", "projects", "contact"]);
  useParallax();

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
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
    </Routes>
  );
}
