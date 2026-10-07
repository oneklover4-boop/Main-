"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuroraBeam } from "@/components/ui/aurora-background";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const NAVY = "#043580";
const BODY_FONT_FAMILY = '"Poppins", Arial, sans-serif';

const navLinks = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Hero() {
  // On narrow screens the nav links wrap onto a second line and collide
  // with the logo in the opposite corner, so below that width they
  // collapse behind a hamburger-menu toggle instead.
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-ld-content-nav]") && !target.closest("[data-ld-content-nav-toggle]")) {
        setNavOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [navOpen]);

  return (
    <section
      id="home"
      data-ld-hero
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(640px, 90svh)",
        display: "flex",
        flexDirection: "column",
        containerType: "inline-size",
        fontFamily: BODY_FONT_FAMILY,
        background: NAVY,
        overflow: "hidden",
      }}
    >
      <style>{`
        [data-ld-header]{position:absolute;top:clamp(24px,4.5cqw,48px);left:clamp(1.25rem,5cqw,5rem);display:inline-flex;align-items:center;z-index:2;}
        [data-ld-logo] img{height:28px;width:auto;display:block;}
        [data-ld-topbar-line]{position:absolute;top:calc(clamp(24px,4.5cqw,48px) + 44px);left:clamp(1.25rem,5cqw,5rem);right:clamp(1.25rem,5cqw,5rem);height:1px;background:rgba(255,255,255,.25);z-index:2;}
        [data-ld-content-nav]{top:clamp(24px,4.5cqw,48px);z-index:2;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:1.25rem;}
        [data-ld-content-nav] a{font-size:0.875rem;font-weight:500;text-decoration:none;color:#ffffff;transition:color .15s ease;}
        [data-ld-content-nav] a:hover{color:#34ac86;}
        [data-ld-content-nav-toggle]{display:none;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:40px;height:40px;padding:0;border:none;background:transparent;cursor:pointer;}
        [data-ld-content-nav-toggle] span{width:20px;height:2px;border-radius:1px;background:#ffffff;display:block;}
        @container(max-width:560px){
          [data-ld-content-nav-toggle]{display:flex;}
          [data-ld-content-nav]{
            position:absolute;
            flex-direction:column;
            align-items:stretch;
            top:calc(clamp(24px,4.5cqw,48px) + 44px + 20px);
            right:clamp(1.25rem,5cqw,5rem);
            white-space:nowrap;
            min-width:180px;
            gap:0;
            z-index:20;
            opacity:0;
            filter:blur(10px);
            transform:translateY(-8px);
            pointer-events:none;
            transition:opacity .35s ease, filter .35s ease, transform .35s ease;
          }
          [data-ld-content-nav][data-open="true"]{
            opacity:1;
            filter:blur(0px);
            transform:translateY(0);
            pointer-events:auto;
          }
          [data-ld-content-nav] a{
            padding:0.45rem 0;
            font-size:0.8125rem;
            text-align:right;
            border-bottom:1px solid rgba(255,255,255,.3);
          }
          [data-ld-content-nav] a:last-child{border-bottom:none;}
        }
        [data-ld-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:center;text-align:center;gap:clamp(1.5rem,4svh,2.5rem);}
        [data-ld-copy] h1{max-width:48rem;margin:0;color:#ffffff;font-size:clamp(2.5rem,1.6rem + 3.6cqw,4rem);font-weight:500;line-height:1.15;letter-spacing:.01em;text-wrap:balance;}
        [data-ld-copy] p{margin:0;color:rgba(255,255,255,.82);font-size:1.0625rem;line-height:1.6;max-width:38rem;}
      `}</style>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", isolation: "isolate" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(images/hero-rocket-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: NAVY, mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <AuroraBeam />
        </div>
      </div>

      <a
        href="#home"
        data-ld-logo
        data-ld-header
        onClick={(e) => { e.preventDefault(); smoothScrollTo("home"); }}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <img src="images/logo-white-text.png" alt="Launch Doctors" />
      </a>

      <button
        type="button"
        data-ld-content-nav-toggle
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((v) => !v)}
        style={{ position: "absolute", top: "clamp(24px,4.5cqw,48px)", right: "clamp(1.25rem,5cqw,5rem)", zIndex: 2 }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        data-ld-content-nav
        aria-label="Page sections"
        data-open={navOpen ? "true" : undefined}
        style={{ position: "absolute", right: "clamp(1.25rem,5cqw,5rem)" }}
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
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div data-ld-topbar-line aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", padding: "5.5rem clamp(1.25rem,5cqw,5rem) 4rem" }}
      >
        <div data-ld-copy>
          <h1>Structure, Clarity, Momentum</h1>
          <p>
            We help emerging and mid-sized BioPharma companies diagnose
            launch risks and build integrated plans for a successful
            commercial launch.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
