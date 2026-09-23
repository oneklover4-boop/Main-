const CARD = "#e6e6e6";
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
        background: "#f2f2f2",
        padding: "2.5rem clamp(1.25rem, 5vw, 1.5rem) 4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          background: CARD,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 14,
          padding: "2rem 2.25rem",
          fontFamily: FONT_FAMILY,
        }}
      >
        <p style={{ margin: "0 0 0.875rem", fontWeight: 700, fontSize: "1.125rem", color: INK }}>
          Built for teams who:
        </p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", listStyle: "disc", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item) => (
            <li key={item} style={{ color: MUTED, fontSize: "1.0625rem", lineHeight: 1.5 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
