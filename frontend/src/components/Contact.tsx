import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Magnetic } from "./Magnetic";
import { Field } from "./Field";
import { Toast } from "./Toast";
import { useToast } from "@/hooks/useToast";
import { sendEmail } from "@/services/emailService";
import { validateContactForm } from "@/utils/contactValidation";

const CAPTCHA_MESSAGE = "Please verify that you are not a robot.";
const SUCCESS_MESSAGE = "Message sent successfully!";
const FAILURE_MESSAGE = "Failed to send message. Please try again.";

const initialForm = {
  from_name: "",
  from_email: "",
  message: "",
};

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState(initialForm);
  const [website, setWebsite] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast, showToast, clearToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setWebsite("");
    setCaptchaToken(null);
    captchaRef.current?.reset();
    formRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearToast();

    // Honeypot: bots that fill the hidden field are silently rejected
    if (website.trim()) {
      return;
    }

    const validationError = validateContactForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    if (!captchaToken) {
      showToast(CAPTCHA_MESSAGE, "error");
      return;
    }

    if (!formRef.current) {
      showToast(FAILURE_MESSAGE, "error");
      return;
    }

    setIsLoading(true);
    setSubmitSuccess(false);

    try {
      await sendEmail(formRef.current);
      setSubmitSuccess(true);
      showToast(SUCCESS_MESSAGE, "success");
      resetForm();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      showToast(FAILURE_MESSAGE, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = isLoading || submitSuccess;

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
                  { l: "Email", v: "vedladvikar@gmail.com", h: "mailto:vedladvikar@gmail.com" },
                  { l: "GitHub", v: "VedLadvikar", h: "https://github.com/VedLadvikar" },
                  { l: "LinkedIn", v: "/in/vedladvikar", h: "https://www.linkedin.com/in/vedladvikar/" },
                  { l: "X", v: "vedladvikar", h: "https://x.com/vedladvikar" },
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

            <form ref={formRef} className="md:col-span-3 space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
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
                  onChange={setCaptchaToken}
                  onExpired={() => setCaptchaToken(null)}
                />
              </div>

              <Magnetic>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm hover:bg-primary transition-colors disabled:opacity-60"
                  disabled={isDisabled}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background text-foreground">
                    {submitSuccess ? "✓" : "→"}
                  </span>
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>

      {toast && <Toast toast={toast} />}
    </section>
  );
}
