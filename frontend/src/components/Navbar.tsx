import { useState } from "react";
import { Magnetic } from "./Magnetic";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,calc(100%-2rem))]">
      <nav className="glass rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_10px_40px_-20px_rgba(35,31,32,0.25)]">
        <button onClick={() => go("home")} className="flex items-center gap-2 font-display text-lg">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span>ved<span className="text-primary">.</span></span>
        </button>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <button
                data-nav-link={l.id}
                onClick={() => go(l.id)}
                className="group relative px-4 py-2 rounded-full transition-colors hover:text-primary data-[active=true]:text-primary"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-vanilla/0 group-data-[active=true]:bg-vanilla/60 transition-colors" />
              </button>
            </li>
          ))}
        </ul>

        <Magnetic>
          <button
            onClick={() => go("contact")}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm hover:bg-primary transition-colors"
          >
            Let's talk
            <span aria-hidden>→</span>
          </button>
        </Magnetic>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-2 glass rounded-3xl p-4 animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full text-left px-4 py-3 rounded-2xl hover:bg-vanilla/60 font-display text-2xl"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
