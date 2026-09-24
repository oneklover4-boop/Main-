import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

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

// Duplicated once so the marquee track can loop seamlessly (scrolling
// exactly -50% of its own width lands back on an identical copy).
const track = [...clients, ...clients];

export default function ClientLogos() {
  return (
    <section style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 3rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        @keyframes client-logos-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        [data-client-logos-track]{animation: client-logos-scroll 34s linear infinite;}
        [data-client-logos-row]:hover [data-client-logos-track]{animation-play-state: paused;}
        @media (prefers-reduced-motion: reduce) {
          [data-client-logos-track]{animation: none;}
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto 1.5rem" }}>
        <p style={{ margin: 0, fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED, textAlign: "center" }}>
          <BlurReveal duration={0.5}>Experience across leading biopharma companies</BlurReveal>
        </p>
      </div>
      <div
        data-client-logos-row
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div data-client-logos-track style={{ display: "flex", width: "max-content", gap: "0.875rem" }}>
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
                style={{ height: client.height, width: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
