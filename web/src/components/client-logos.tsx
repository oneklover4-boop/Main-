"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import type { PointerEvent as ReactPointerEvent } from "react";

const NAVY = "#043580";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Poppins", Arial, sans-serif';

// Time (ms) to auto-scroll through one full set of logos.
const DURATION_MS = 34000;
// Movement (px) before a press is treated as a drag rather than a tap.
const DRAG_LOCK_THRESHOLD = 6;

const clients = [
  { name: "Galápagos", file: "galapagos.png", height: 20 },
  { name: "Novartis", file: "novartis.png", height: 22 },
  { name: "Allergan", file: "allergan.png", height: 24 },
  { name: "Sanofi", file: "sanofi.png", height: 22 },
  { name: "Regeneron", file: "regeneron.png", height: 18 },
  { name: "Janssen, Pharmaceutical Companies of Johnson & Johnson", file: "janssen.png", height: 22 },
  { name: "GSK", file: "gsk.png", height: 28 },
  { name: "Ipsen", file: "ipsen.png", height: 20 },
];

// Duplicated once so the track can loop seamlessly (scrolling exactly
// -50% of its own width lands back on an identical copy).
const track = [...clients, ...clients];

export default function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const posRef = useRef<number>(0);
  const halfWidthRef = useRef<number>(0);
  const dragRef = useRef<{ startX: number; startPos: number; locked: boolean } | null>(null);

  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (isInteracting) {
      lastTimeRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const halfWidth = halfWidthRef.current;
      if (halfWidth > 0) {
        const speed = halfWidth / DURATION_MS;
        posRef.current -= speed * delta;
        if (posRef.current <= -halfWidth) {
          posRef.current += halfWidth;
        }
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [isInteracting, applyTransform]);

  // Lets visitors drag/swipe the logo row themselves. Auto-scroll picks
  // back up the instant they let go.
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { startX: event.clientX, startPos: posRef.current, locked: false };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = event.clientX - drag.startX;

    if (!drag.locked) {
      if (Math.abs(dx) < DRAG_LOCK_THRESHOLD) return;
      drag.locked = true;
      setIsInteracting(true);
    }

    const halfWidth = halfWidthRef.current;
    let next = drag.startPos + dx;
    if (halfWidth > 0) {
      next = next % halfWidth;
      if (next > 0) next -= halfWidth;
    }
    posRef.current = next;
    applyTransform();
  };

  const endDrag = () => {
    dragRef.current = null;
    setIsInteracting(false);
  };

  return (
    <section style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 3rem", fontFamily: FONT_FAMILY }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto 1.5rem" }}>
        <p style={{ margin: 0, fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED, textAlign: "center" }}>
          <BlurReveal duration={0.5}>Experience across leading biopharma companies</BlurReveal>
        </p>
      </div>
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          overflow: "hidden",
          touchAction: "pan-y",
          cursor: isInteracting ? "grabbing" : "grab",
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div ref={trackRef} style={{ display: "flex", width: "max-content", gap: "0.875rem" }}>
          {track.map((client, i) => (
            <div
              key={`${client.file}-${i}`}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                padding: "0 1.75rem",
                borderRadius: 12,
                background: NAVY,
              }}
            >
              <img
                src={`images/clients/${client.file}`}
                alt={client.name}
                draggable={false}
                style={{ height: client.height, width: "auto", display: "block", pointerEvents: "none" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
