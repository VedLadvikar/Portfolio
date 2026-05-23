import { useState } from "react";
import { submitContact } from "@/services/contactService";
import { Magnetic } from "./Magnetic";
import { Field } from "./Field";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-14">
          <div
            aria-hidden
            data-parallax="0.08"
            className="absolute -top-32 -right-32 w-96 h-96 blob opacity-60"
            style={{ background: "var(--gradient-warm)" }}
          />
          <div
            aria-hidden
            data-parallax="0.05"
            className="absolute -bottom-32 -left-32 w-96 h-96 blob opacity-50"
            style={{ background: "var(--gradient-cool)" }}
          />

          <div className="relative grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                05 — Get in touch
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05]">
                Let's build something <em className="not-italic text-primary">good</em>.
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Open to freelance, full-time roles, and the occasional weekend experiment.
              </p>

              <div className="mt-8 space-y-2">
                {[
                  { l: "Email", v: "hello@vedladvikar.dev", h: "mailto:hello@vedladvikar.dev" },
                  { l: "GitHub", v: "@vedladvikar", h: "#" },
                  { l: "LinkedIn", v: "/in/vedladvikar", h: "#" },
                  { l: "X", v: "@vedladvikar", h: "#" },
                ].map((s) => (
                  <a
                    key={s.l}
                    href={s.h}
                    className="group flex items-baseline justify-between gap-4 py-2 border-b border-border/60"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground w-16">
                      {s.l}
                    </span>
                    <span className="link-underline flex-1 text-right text-base group-hover:text-primary transition-colors">
                      {s.v}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <form className="md:col-span-3 space-y-4" onSubmit={handleSubmit}>
              <Field
                label="Your name"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@studio.com"
                value={form.email}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the project…"
                  value={form.message}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-base outline-none transition-colors focus:border-foreground resize-none disabled:opacity-50"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}

              <Magnetic>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm hover:bg-primary transition-colors disabled:opacity-60"
                  disabled={isDisabled}
                >
                  {status === "loading" && "Sending…"}
                  {status === "success" && "Sent — talk soon!"}
                  {(status === "idle" || status === "error") && "Send message"}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background text-foreground">
                    {status === "success" ? "✓" : "→"}
                  </span>
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
