import { BlurReveal } from "@/components/ui/blur-reveal";

const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

const items = [
  "Have an asset roughly 12–36 months from launch",
  "Have limited in-house launch capability",
  "Are preparing for a first or second commercial launch",
  "Need alignment across medical, market access, marketing, regulatory, supply and sales",
  "Want experienced support without the overhead of a large consultancy",
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
      `}</style>
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
