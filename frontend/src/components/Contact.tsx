import { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { Magnetic } from "./Magnetic";
import { Field } from "./Field";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState({ from_name: "", from_email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if (form.honeypot) {
      // Silently block submission if honeypot is filled
      return;
    }

    const captchaValue = captchaRef.current?.getValue();
    if (!captchaValue) {
      setToast({ message: "Please verify that you are not a robot.", type: "error" });
      return;
    }

    setStatus("loading");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current!,
        {
          publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        }
      );
      
      setStatus("success");
      setToast({ message: "Message sent successfully!", type: "success" });
      setForm({ from_name: "", from_email: "", message: "", honeypot: "" });
      captchaRef.current?.reset();
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("error");
      setToast({ message: "Failed to send message. Please try again.", type: "error" });
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

            <form ref={formRef} className="md:col-span-3 space-y-4" onSubmit={handleSubmit}>
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={handleChange}
                />
              </div>

              <Field
                label="Your name"
                name="from_name"
                placeholder="Jane Doe"
                value={form.from_name}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <Field
                label="Email"
                name="from_email"
                type="email"
                placeholder="jane@studio.com"
                value={form.from_email}
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

              <div className="pt-2">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  theme="dark"
                />
              </div>

              <Magnetic>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm hover:bg-primary transition-colors disabled:opacity-60"
                  disabled={isDisabled}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background text-foreground">
                    {status === "success" ? "✓" : "→"}
                  </span>
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className={`px-6 py-3 rounded-full shadow-lg text-sm font-medium border flex items-center gap-2 ${
            toast.type === 'success' 
              ? 'bg-green-500/10 text-green-500 border-green-500/20' 
              : 'bg-red-500/10 text-red-500 border-red-500/20'
          }`}>
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            {toast.message}
          </div>
        </div>
      )}
    </section>
  );
}
