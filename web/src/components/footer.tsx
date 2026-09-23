"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";

const NAVY = "#043580";
const BLUE = "#1262c1";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

const links = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#health-check", label: "Launch Health Check" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: `1px solid ${CARD_BORDER}`,
        padding: "2.5rem clamp(1.25rem, 5vw, 1.5rem) 1.5rem",
        fontFamily: FONT_FAMILY,
      }}
    >
      <style>{`[data-footer-nav] a{transition:color .15s ease;} [data-footer-nav] a:hover{color:${BLUE};}`}</style>
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <div>
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("home"); }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontWeight: 700, textDecoration: "none", color: INK }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                background: NAVY,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              LD
            </span>
            Launch Doctors
          </a>
          <p style={{ margin: "0.875rem 0 0", maxWidth: "40ch", fontSize: "0.8125rem", color: MUTED, fontStyle: "italic" }}>
            Strategic consultancy — not a provider of medical advice or clinical services.
          </p>
        </div>

        <nav data-footer-nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href.slice(1)); }}
              style={{ fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", color: INK }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: "0.8125rem", color: MUTED }}>© {year} Launch Doctors. All rights reserved.</p>
      </div>
    </footer>
  );
}
