import { useEffect } from "react";

export function useActiveSection(ids: string[]) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll("[data-nav-link]").forEach((l) => l.removeAttribute("data-active"));
            document.querySelector(`[data-nav-link="${e.target.id}"]`)?.setAttribute("data-active", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);
}
