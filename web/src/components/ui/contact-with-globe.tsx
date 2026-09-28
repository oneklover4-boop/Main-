"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurReveal } from "@/components/ui/blur-reveal";
import type { FormEvent } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const DARK = "#15171c";
const GREY = "#6b7280";

interface ContactWithGlobeProps {
  title?: string;
  description?: string;
  className?: string;
}

type ContactFieldKey = "name" | "phone" | "email" | "message";

// Mobile: transparent field, underline only, white text (matches the
// reference). Desktop (sm+): solid white box, as before.
function fieldClass(hasError: boolean): string {
  return cn(
    "w-full bg-transparent border-0 border-b rounded-none px-1 pb-3 pt-2 text-base text-white placeholder:text-white/60 outline-none transition-colors duration-200",
    "sm:bg-white sm:border sm:rounded-sm sm:px-4 sm:py-3 sm:text-sm sm:text-zinc-800 sm:placeholder:text-zinc-500 sm:focus:ring-2 sm:focus:ring-[#34ac86]/20",
    hasError ? "border-red-400" : "border-white/25 focus:border-[#34ac86] sm:border-transparent",
  );
}

function validateContactField(key: ContactFieldKey, value: string): string {
  const trimmed = value.trim();
  if (key === "name") return trimmed ? "" : "Please enter your name.";
  if (key === "phone") return trimmed ? "" : "Please enter your phone number.";
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
      phone: validateContactField("phone", formValues.phone),
      email: validateContactField("email", formValues.email),
      message: validateContactField("message", formValues.message),
    };
    setFormErrors(nextErrors);
    const isValid = !nextErrors.name && !nextErrors.phone && !nextErrors.email && !nextErrors.message;
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
          style={{ background: DARK }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 64px 64px 0",
              borderColor: `transparent ${GREY} transparent transparent`,
            }}
          />

          <span
            className="absolute top-0 left-0 text-white font-bold text-xs sm:text-sm tracking-[0.08em] uppercase px-5 py-2.5 sm:px-6 sm:py-3"
            style={{ background: GREY }}
          >
            <BlurReveal duration={0.5}>{title}</BlurReveal>
          </span>

          <div className="hidden sm:flex flex-col items-center text-center gap-2 mb-8 sm:mb-10">
            <p className="text-sm sm:text-base text-white/70 max-w-md">{description}</p>
            <a
              href="mailto:hello@launchdoctors.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              hello@launchdoctors.com
            </a>
          </div>

          <form onSubmit={handleContactSubmit} noValidate className="flex flex-col gap-6 sm:gap-4 mt-6 sm:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
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
                  className={fieldClass(Boolean(formErrors.name))}
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
                  required
                  placeholder="Phone*"
                  value={formValues.phone}
                  onChange={(e) => setFormValues((v) => ({ ...v, phone: e.target.value }))}
                  onBlur={() => handleFieldBlur("phone")}
                  className={fieldClass(Boolean(formErrors.phone))}
                />
                <p role="alert" className="min-h-[1.1em] text-xs text-red-300">{formErrors.phone}</p>
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
                  className={fieldClass(Boolean(formErrors.email))}
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
                className={cn(fieldClass(Boolean(formErrors.message)), "resize-none")}
              />
              <p role="alert" className="min-h-[1.1em] text-xs text-red-300">{formErrors.message}</p>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
              <Button
                type="submit"
                className="w-full sm:w-fit h-12 sm:h-11 px-10 rounded-full font-semibold text-sm tracking-[0.04em] uppercase bg-[#34ac86] hover:bg-[#34ac86] text-white border-2 border-[#34ac86] transition-colors duration-150 touch-manipulation hover:brightness-110 active:bg-transparent active:text-[#34ac86]"
              >
                Send
              </Button>

              <p role="status" aria-live="polite" className={cn("min-h-[1.4em] text-sm font-semibold", formStatus?.success ? "text-emerald-400" : "text-red-300")}>
                {formStatus?.text ?? ""}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
