"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const NAVY = "#043580";
const TEAL = "#34ac86";

interface ContactWithGlobeProps {
  title?: string;
  description?: string;
  className?: string;
}

type ContactFieldKey = "name" | "email" | "message";

function validateContactField(key: ContactFieldKey, value: string): string {
  const trimmed = value.trim();
  if (key === "name") return trimmed ? "" : "Please enter your name.";
  if (key === "message") return trimmed ? "" : "Please enter a message.";
  if (!trimmed) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email address.";
  return "";
}

export default function ContactWithGlobe({
  title = "Contact Us",
  description = "Start with a conversation, or send a message below.",
  className,
}: ContactWithGlobeProps) {
  const [formValues, setFormValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<Partial<Record<ContactFieldKey, string>>>({});
  const [formStatus, setFormStatus] = useState<{ text: string; success: boolean } | null>(null);

  const handleFieldBlur = (key: ContactFieldKey) => {
    setFormErrors((prev) => ({ ...prev, [key]: validateContactField(key, formValues[key]) }));
  };

  const handleContactSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<ContactFieldKey, string>> = {
      name: validateContactField("name", formValues.name),
      email: validateContactField("email", formValues.email),
      message: validateContactField("message", formValues.message),
    };
    setFormErrors(nextErrors);
    const isValid = !nextErrors.name && !nextErrors.email && !nextErrors.message;
    if (!isValid) {
      setFormStatus({ text: "Please fix the highlighted fields.", success: false });
      return;
    }
    setFormStatus({ text: "Thanks! This is a demo form — no message was actually sent yet.", success: true });
    setFormValues({ name: "", phone: "", email: "", message: "" });
    setFormErrors({});
  };

  return (
    <section className={cn("relative w-full overflow-hidden py-10 sm:py-14", className)}>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: smoothEase }}
          className="relative overflow-hidden rounded-sm px-6 pt-16 pb-10 sm:px-10 sm:pt-16 sm:pb-12 md:px-14 md:pt-16 md:pb-14"
          style={{ background: NAVY }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 64px 64px 0",
              borderColor: `transparent rgba(255,255,255,0.12) transparent transparent`,
            }}
          />

          <span
            className="absolute top-0 left-0 text-white font-bold text-xs sm:text-sm tracking-[0.08em] uppercase px-5 py-2.5 sm:px-6 sm:py-3"
            style={{ background: TEAL }}
          >
            {title}
          </span>

          <div className="flex flex-col items-center text-center gap-2 mb-8 sm:mb-10">
            <p className="text-sm sm:text-base text-white/70 max-w-md">{description}</p>
            <a
              href="mailto:hello@launchdoctors.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              hello@launchdoctors.com
            </a>
          </div>

          <form onSubmit={handleContactSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="cwg-name" className="sr-only">Full Name</label>
                <input
                  id="cwg-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Name*"
                  value={formValues.name}
                  onChange={(e) => setFormValues((v) => ({ ...v, name: e.target.value }))}
                  onBlur={() => handleFieldBlur("name")}
                  className={cn(
                    "w-full bg-white border rounded-sm px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-500 outline-none focus:border-[#34ac86] focus:ring-2 focus:ring-[#34ac86]/20 transition-all duration-200",
                    formErrors.name ? "border-red-400" : "border-transparent",
                  )}
                />
                <p role="alert" className="min-h-[1.1em] text-xs text-red-300">{formErrors.name}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cwg-phone" className="sr-only">Phone</label>
                <input
                  id="cwg-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone"
                  value={formValues.phone}
                  onChange={(e) => setFormValues((v) => ({ ...v, phone: e.target.value }))}
                  className="w-full bg-white border border-transparent rounded-sm px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-500 outline-none focus:border-[#34ac86] focus:ring-2 focus:ring-[#34ac86]/20 transition-all duration-200"
                />
                <p className="min-h-[1.1em] text-xs" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="cwg-email" className="sr-only">Email Address</label>
                <input
                  id="cwg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email*"
                  value={formValues.email}
                  onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
                  onBlur={() => handleFieldBlur("email")}
                  className={cn(
                    "w-full bg-white border rounded-sm px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-500 outline-none focus:border-[#34ac86] focus:ring-2 focus:ring-[#34ac86]/20 transition-all duration-200",
                    formErrors.email ? "border-red-400" : "border-transparent",
                  )}
                />
                <p role="alert" className="min-h-[1.1em] text-xs text-red-300">{formErrors.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="cwg-message" className="sr-only">Message</label>
              <textarea
                id="cwg-message"
                name="message"
                required
                placeholder="Message*"
                rows={5}
                value={formValues.message}
                onChange={(e) => setFormValues((v) => ({ ...v, message: e.target.value }))}
                onBlur={() => handleFieldBlur("message")}
                className={cn(
                  "w-full bg-white border rounded-sm px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-500 outline-none focus:border-[#34ac86] focus:ring-2 focus:ring-[#34ac86]/20 resize-none transition-all duration-200",
                  formErrors.message ? "border-red-400" : "border-transparent",
                )}
              />
              <p role="alert" className="min-h-[1.1em] text-xs text-red-300">{formErrors.message}</p>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
              <Button
                type="submit"
                className="w-fit h-11 px-9 rounded-full font-semibold text-sm text-white border-0 transition-transform duration-200 group touch-manipulation hover:brightness-110 active:scale-[0.98]"
                style={{ background: TEAL }}
              >
                Send
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
              </Button>

              <p role="status" aria-live="polite" className={cn("min-h-[1.4em] text-sm font-semibold", formStatus?.success ? "text-[#5fe0b3]" : "text-red-300")}>
                {formStatus?.text ?? ""}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
