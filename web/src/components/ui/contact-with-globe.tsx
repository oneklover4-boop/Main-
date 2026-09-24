"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentPropsWithoutRef, ComponentRef, FormEvent } from "react";
import { forwardRef } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "hello@launchdoctors.com",
    href: "mailto:hello@launchdoctors.com",
  },
];

const FormDots = forwardRef<
  ComponentRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 flex items-center justify-center overflow-hidden",
          isHorizontal ? "w-full" : "h-full",
          className,
        )}
        {...props}
      >
        <div
          className={cn("relative", isHorizontal ? "w-full h-4" : "h-full w-4")}
        >
          <div
            className={cn(
              "absolute inset-0 bg-repeat",
              "text-neutral-400 dark:text-white/20",
            )}
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
              backgroundSize: isHorizontal ? "6px 100%" : "100% 6px",
              maskImage: isHorizontal
                ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
        </div>
      </SeparatorPrimitive.Root>
    );
  },
);
FormDots.displayName = "FormDots";

interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
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
  title = "Contact us",
  subtitle = "Contact",
  description = "Start with a conversation — or book a Launch Health Check directly.",
  className,
}: ContactWithGlobeProps) {
  const [formValues, setFormValues] = useState({ name: "", company: "", email: "", message: "" });
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
    setFormValues({ name: "", company: "", email: "", message: "" });
    setFormErrors({});
  };

  return (
    <section
      className={cn(
        // Transparent: the site's own aurora background (behind this
        // whole section) shows through instead of a solid fill.
        "relative w-full overflow-hidden py-20",
        className,
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30"
          >
            <span className="text-sm text-rose-500 font-medium">
              {subtitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className="text-base text-zinc-500 dark:text-zinc-400 max-w-md"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: smoothEase }}
          className="flex flex-col items-center text-center gap-6 mb-12"
        >
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Get in touch
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Reach out via any channel below. We typically reply within one
              business day.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {CONTACT_LINKS.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: smoothEase,
                }}
                className="group flex items-center gap-3 w-fit text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 group-hover:border-rose-300 dark:group-hover:border-rose-500/40 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 flex items-center justify-center shrink-0 transition-all duration-200">
                  <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-200" />
                </div>
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleContactSubmit}
          noValidate
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
          // See-through grey, same translucent tone used for every
          // other card on the site, so the moving aurora background
          // shows through it rather than sitting on a solid fill.
          className="w-full max-w-4xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black/5 dark:bg-white/5 p-6 sm:p-10 flex flex-col gap-5"
        >
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-0.5">
              Send a message
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Fill out the form and we&apos;ll get back to you promptly.
            </p>
          </div>

          <FormDots />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="cwg-name" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                Full Name
              </label>
              <input
                id="cwg-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Smith"
                value={formValues.name}
                onChange={(e) => setFormValues((v) => ({ ...v, name: e.target.value }))}
                onBlur={() => handleFieldBlur("name")}
                className={cn(
                  "w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-rose-400 dark:focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/10 transition-all duration-200",
                  formErrors.name ? "border-red-400" : "border-zinc-200 dark:border-zinc-700",
                )}
              />
              <p role="alert" className="min-h-[1.2em] text-xs text-red-500">{formErrors.name}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cwg-company" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                Company
              </label>
              <input
                id="cwg-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Company name"
                value={formValues.company}
                onChange={(e) => setFormValues((v) => ({ ...v, company: e.target.value }))}
                className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-rose-400 dark:focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/10 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cwg-email" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              Email Address
            </label>
            <input
              id="cwg-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              value={formValues.email}
              onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
              onBlur={() => handleFieldBlur("email")}
              className={cn(
                "w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-rose-400 dark:focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/10 transition-all duration-200",
                formErrors.email ? "border-red-400" : "border-zinc-200 dark:border-zinc-700",
              )}
            />
            <p role="alert" className="min-h-[1.2em] text-xs text-red-500">{formErrors.email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cwg-message" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              Message
            </label>
            <textarea
              id="cwg-message"
              name="message"
              required
              placeholder="Type your message here"
              rows={4}
              value={formValues.message}
              onChange={(e) => setFormValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => handleFieldBlur("message")}
              className={cn(
                "w-full bg-zinc-50 dark:bg-zinc-800/60 border rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-rose-400 dark:focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/10 resize-none transition-all duration-200",
                formErrors.message ? "border-red-400" : "border-zinc-200 dark:border-zinc-700",
              )}
            />
            <p role="alert" className="min-h-[1.2em] text-xs text-red-500">{formErrors.message}</p>
          </div>

          <Button
            type="submit"
            className="w-fit h-11 px-8 rounded-xl font-semibold text-sm bg-[#1262c1]/35 bg-clip-padding border border-[#1262c1]/35 text-[#043580] hover:bg-transparent active:bg-transparent hover:border-[#1262c1] active:border-[#1262c1] transition-colors duration-200 group touch-manipulation"
          >
            Submit
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
          </Button>

          <p role="status" aria-live="polite" className={cn("min-h-[1.4em] text-sm font-semibold", formStatus?.success ? "text-emerald-600" : "text-red-500")}>
            {formStatus?.text ?? ""}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
