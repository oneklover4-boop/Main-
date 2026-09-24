"use client";

import { BlurReveal } from "@/components/ui/blur-reveal";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const BLUE = "#1262c1";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const items = [
  "Have an asset roughly 12–36 months from launch",
  "Have limited in-house launch capability",
  "Are preparing for a first or second commercial launch",
  "Need alignment across medical, market access, marketing, regulatory, supply and sales",
  "Want experienced support without the overhead of a large consultancy",
];

const navLinks = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#health-check", label: "Launch Health Check" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function WhoWeHelp() {
  return (
    <section
      style={{
        padding: "2.5rem clamp(1.25rem, 5vw, 1.5rem) 4rem",
      }}
    >
      <style>{`
        [data-glass-card]{background:rgba(0,0,0,.05);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
        [data-glass-card]:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
        [data-section-nav] a{transition:color .15s ease;}
        [data-section-nav] a:hover{color:${BLUE};}
      `}</style>
      <nav
        data-section-nav
        aria-label="Page sections"
        style={{
          maxWidth: "1120px",
          margin: "0 auto 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: "1.25rem",
          fontFamily: FONT_FAMILY,
        }}
      >
        {navLinks.map((link) => (
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
      <div
        data-glass-card
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 14,
          padding: "2rem 2.25rem",
          fontFamily: FONT_FAMILY,
        }}
      >
        <p style={{ margin: "0 0 0.875rem", fontWeight: 700, fontSize: "1.125rem", color: INK }}>
          <BlurReveal duration={0.5}>Built for teams who:</BlurReveal>
        </p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", listStyle: "disc", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item, i) => (
            <li key={item} style={{ color: MUTED, fontSize: "1.0625rem", lineHeight: 1.5 }}>
              <BlurReveal duration={0.5} delay={i * 0.06}>{item}</BlurReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
