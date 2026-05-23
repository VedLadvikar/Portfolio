import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="px-6 pb-10">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground border-t border-border pt-6">
        <span>© {new Date().getFullYear()} Ved Ladvikar</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          Pune, IN · {time || "—"}
        </span>
        <span>Designed & built with care.</span>
      </div>
    </footer>
  );
}
