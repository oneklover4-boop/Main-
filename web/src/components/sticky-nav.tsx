"use client";

import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const INK = "#000000";
const BLUE = "#1262c1";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const navLinks = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#health-check", label: "Launch Health Check" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    // Shown once the hero has scrolled out of view (scrolling down past
    // it), hidden again once it's back in view (scrolling back up to
    // it) — the hero already carries its own logo/nav, so this bar only
    // needs to stand in for those once they're off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-sticky-nav
      aria-hidden={!visible}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.625rem clamp(1.25rem, 5vw, 2.5rem)",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        fontFamily: FONT_FAMILY,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .25s ease, transform .25s ease",
      }}
    >
      <style>{`
        [data-sticky-nav] a{transition:color .15s ease;}
        [data-sticky-nav] nav a:hover{color:${BLUE};}
      `}</style>
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); smoothScrollTo("home"); }}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <img src="images/logo-full.png" alt="Launch Doctors" style={{ height: 28, width: "auto", display: "block" }} />
      </a>
      <nav aria-label="Page sections" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
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
    </div>
  );
}
