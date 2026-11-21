import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiCheck, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Section from "../components/Section";
import { site } from "../data/site";

const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_2ramhvy",
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_otsyp77",
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "8Lrws5uHtdFJbNl-L",
};
const COOLDOWN_MS = 30_000;

const field =
  "mt-1.5 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent aria-[invalid=true]:border-red-500";

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const validate = (data) => {
    const e = {};
    if (!data.user_name.trim()) e.user_name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.user_email)) e.user_email = "Enter a valid email address, like name@example.com.";
    if (!data.subject.trim()) e.subject = "Add a short subject.";
    if (data.message.trim().length < 10) e.message = "Write at least 10 characters so I know how to help.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));
    if (data.company) return setStatus({ type: "success", message: "Message sent. I’ll reply by email." }); // honeypot

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return setStatus({ type: "error", message: "Fix the highlighted fields and send again." });

    try {
      const last = Number(sessionStorage.getItem("contact-last") || 0);
      if (Date.now() - last < COOLDOWN_MS) return setStatus({ type: "error", message: "You just sent a message. Wait a few seconds before sending another." });
    } catch { /* ignore */ }

    setStatus({ type: "sending", message: "Sending message…" });
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.key);
      try { sessionStorage.setItem("contact-last", String(Date.now())); } catch { /* ignore */ }
      form.current.reset();
      setStatus({ type: "success", message: "Message sent. I’ll reply by email." });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ type: "error", message: "Message not sent. Check your connection and try again, or contact me on LinkedIn." });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked */ }
  };

  const links = [
    { icon: FiLinkedin, label: "LinkedIn", href: site.linkedin },
    { icon: FiGithub, label: "GitHub", href: site.github.url },
    { icon: FiDownload, label: "Résumé", href: site.resumeUrl },
  ];

  return (
    <Section id="contact" title="Contact" intro="Hiring, a freelance project or a question about my work.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="max-w-[40ch] text-muted">
            Send a message and I’ll reply by email. Include a short description of the role or project and any deadline.
          </p>
          <ul className="mt-6 space-y-2">
            {site.email && (
              <li>
                <button type="button" onClick={copyEmail} className="btn btn-ghost w-full justify-start">
                  {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                  {copied ? "Email copied" : site.email}
                </button>
              </li>
            )}
            {links.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full justify-start">
                  <Icon aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form ref={form} onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="contact-status">
          {/* honeypot: hidden from people, tempting to bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Name
              <input name="user_name" type="text" autoComplete="name" aria-invalid={!!errors.user_name} aria-describedby={errors.user_name ? "err-name" : undefined} className={field} />
              {errors.user_name && <span id="err-name" className="mt-1 block text-sm font-normal text-red-500">{errors.user_name}</span>}
            </label>
            <label className="block text-sm font-medium">
              Email
              <input name="user_email" type="email" autoComplete="email" aria-invalid={!!errors.user_email} aria-describedby={errors.user_email ? "err-email" : undefined} className={field} />
              {errors.user_email && <span id="err-email" className="mt-1 block text-sm font-normal text-red-500">{errors.user_email}</span>}
            </label>
          </div>
          <label className="block text-sm font-medium">
            Subject
            <input name="subject" type="text" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "err-subject" : undefined} className={field} />
            {errors.subject && <span id="err-subject" className="mt-1 block text-sm font-normal text-red-500">{errors.subject}</span>}
          </label>
          <label className="block text-sm font-medium">
            Message
            <textarea name="message" rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} className={field} />
            {errors.message && <span id="err-message" className="mt-1 block text-sm font-normal text-red-500">{errors.message}</span>}
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status.type === "sending"} className="btn btn-primary disabled:opacity-60">
              <FiMail aria-hidden="true" /> {status.type === "sending" ? "Sending…" : "Send message"}
            </button>
            <p
              id="contact-status"
              role="status"
              aria-live="polite"
              className={`text-sm ${status.type === "error" ? "text-red-500" : status.type === "success" ? "text-ok" : "text-muted"}`}
            >
              {status.message}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
