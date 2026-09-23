"use client";

import { useState, type FormEvent } from "react";

const NAVY = "#043580";
const BLUE = "#1262c1";
const CARD_BG = "#e6e6e6";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const OFF_WHITE = "#fafbfa";
const INK = "#000000";
const MUTED = "#4a4a4a";
const ERROR = "#c0392b";
const SUCCESS = "#1b7a4d";
const FONT_FAMILY = "Inter, Arial, sans-serif";

type FieldKey = "name" | "email" | "message";

function validate(key: FieldKey, value: string): string {
  const trimmed = value.trim();
  if (key === "name") return trimmed ? "" : "Please enter your name.";
  if (key === "message") return trimmed ? "" : "Please enter a message.";
  if (!trimmed) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email address.";
  return "";
}

const inputStyle: React.CSSProperties = {
  font: "inherit",
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.2)",
  background: OFF_WHITE,
  color: INK,
  minHeight: 44,
  width: "100%",
};

export default function Contact() {
  const [values, setValues] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<{ text: string; success: boolean } | null>(null);

  function handleBlur(key: FieldKey) {
    setErrors((prev) => ({ ...prev, [key]: validate(key, values[key]) }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<Record<FieldKey, string>> = {
      name: validate("name", values.name),
      email: validate("email", values.email),
      message: validate("message", values.message),
    };
    setErrors(nextErrors);
    const isValid = !nextErrors.name && !nextErrors.email && !nextErrors.message;
    if (!isValid) {
      setStatus({ text: "Please fix the highlighted fields.", success: false });
      return;
    }
    setStatus({ text: "Thanks! This is a demo form — no message was actually sent yet.", success: true });
    setValues({ name: "", company: "", email: "", message: "" });
    setErrors({});
  }

  const fieldRowStyle: React.CSSProperties = { display: "grid", gap: "0.5rem" };

  function fieldInputStyle(key: FieldKey): React.CSSProperties {
    return errors[key] ? { ...inputStyle, borderColor: ERROR } : inputStyle;
  }

  return (
    <section id="contact" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "3rem",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          .contact-input:focus, .contact-textarea:focus {
            outline: 2px solid ${BLUE};
            outline-offset: 1px;
            border-color: ${BLUE};
          }
        `}</style>

        <div>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
            Contact
          </p>
          <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
            Let&apos;s talk about your launch
          </h2>
          <p style={{ margin: 0, maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
            Start with a conversation — or book a Launch Health Check directly.
          </p>
          <ul style={{ listStyle: "none", margin: "1.5rem 0 0", padding: 0 }}>
            <li>
              <a href="mailto:hello@launchdoctors.com" style={{ fontWeight: 600, color: BLUE, textDecoration: "none" }}>
                hello@launchdoctors.com
              </a>
            </li>
          </ul>
          <p style={{ margin: "1.5rem 0 0", fontSize: "0.8125rem", color: MUTED, fontStyle: "italic" }}>
            Strategic consultancy — not a provider of medical advice or clinical services.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            display: "grid",
            gap: "1rem",
            padding: "2rem",
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 14,
            background: CARD_BG,
          }}
        >
          <div style={fieldRowStyle}>
            <label htmlFor="ld-name" style={{ fontWeight: 600, fontSize: "0.875rem", color: INK }}>
              Name
            </label>
            <input
              id="ld-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="contact-input"
              style={fieldInputStyle("name")}
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              onBlur={() => handleBlur("name")}
            />
            <p role="alert" style={{ margin: 0, minHeight: "1.2em", fontSize: "0.8125rem", color: ERROR }}>
              {errors.name}
            </p>
          </div>

          <div style={fieldRowStyle}>
            <label htmlFor="ld-company" style={{ fontWeight: 600, fontSize: "0.875rem", color: INK }}>
              Company
            </label>
            <input
              id="ld-company"
              name="company"
              type="text"
              autoComplete="organization"
              className="contact-input"
              style={inputStyle}
              value={values.company}
              onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            />
          </div>

          <div style={fieldRowStyle}>
            <label htmlFor="ld-email" style={{ fontWeight: 600, fontSize: "0.875rem", color: INK }}>
              Email
            </label>
            <input
              id="ld-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="contact-input"
              style={fieldInputStyle("email")}
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              onBlur={() => handleBlur("email")}
            />
            <p role="alert" style={{ margin: 0, minHeight: "1.2em", fontSize: "0.8125rem", color: ERROR }}>
              {errors.email}
            </p>
          </div>

          <div style={fieldRowStyle}>
            <label htmlFor="ld-message" style={{ fontWeight: 600, fontSize: "0.875rem", color: INK }}>
              Message
            </label>
            <textarea
              id="ld-message"
              name="message"
              rows={5}
              required
              className="contact-textarea"
              style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => handleBlur("message")}
            />
            <p role="alert" style={{ margin: 0, minHeight: "1.2em", fontSize: "0.8125rem", color: ERROR }}>
              {errors.message}
            </p>
          </div>

          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0.75rem 1.375rem",
              borderRadius: 10,
              border: "1.5px solid transparent",
              background: NAVY,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9375rem",
              fontFamily: "inherit",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Send message
          </button>

          <p role="status" aria-live="polite" style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 600, minHeight: "1.4em", color: status?.success ? SUCCESS : ERROR }}>
            {status?.text ?? ""}
          </p>
        </form>
      </div>
    </section>
  );
}
