"use client";

import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const INK = "#000000";
const BLUE = "#1262c1";
const FONT_FAMILY = '"Poppins", Arial, sans-serif';

const navLinks = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  // On narrow screens the links collapse behind a hamburger-menu toggle,
  // same pattern as the hero's own content nav.
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    // Shown once the hero has scrolled out of view (scrolling down past
    // it), hidden again once it's back in view (scrolling back up to
    // it) — the hero already carries its own logo/nav, so this bar only
    // needs to stand in for those once they're off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
        if (entry.isIntersecting) setNavOpen(false);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-sticky-nav-menu]") && !target.closest("[data-sticky-nav-toggle]")) {
        setNavOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [navOpen]);

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
        [data-sticky-nav-toggle]{display:none;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:40px;height:40px;padding:0;border:none;background:transparent;cursor:pointer;}
        [data-sticky-nav-toggle] span{width:20px;height:2px;border-radius:1px;background:${INK};display:block;}
        @media (max-width: 560px) {
          [data-sticky-nav-toggle]{display:flex;}
          [data-sticky-nav-menu]{
            position:absolute;
            top:calc(100% + 12px);
            right:0;
            flex-direction:column;
            align-items:flex-end;
            white-space:nowrap;
            background:#ffffff;
            border:1px solid rgba(0,0,0,.08);
            border-radius:12px;
            padding:0.85rem 1.1rem;
            box-shadow:0 16px 32px rgba(0,0,0,.12);
            gap:0.85rem;
            opacity:0;
            filter:blur(10px);
            transform:translateY(-8px);
            pointer-events:none;
            transition:opacity .35s ease, filter .35s ease, transform .35s ease;
          }
          [data-sticky-nav-menu][data-open="true"]{
            opacity:1;
            filter:blur(0px);
            transform:translateY(0);
            pointer-events:auto;
          }
        }
      `}</style>
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); smoothScrollTo("home"); }}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <img src="images/logo-full.png" alt="Launch Doctors" style={{ height: 28, width: "auto", display: "block" }} />
      </a>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          data-sticky-nav-toggle
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          data-sticky-nav-menu
          aria-label="Page sections"
          data-open={navOpen ? "true" : undefined}
          style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setNavOpen(false);
                smoothScrollTo(link.href.slice(1));
              }}
              style={{ fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", color: INK }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
