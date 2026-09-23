const NAVY = "#043580";
const BLUE = "#1262c1";
const CARD_BG = "#e6e6e6";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

export default function Experience() {
  return (
    <section style={{ background: "#f2f2f2", padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
          Experience &amp; Case Studies
        </p>
        <h2 style={{ margin: "0 0 2rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
          Led by real launch experience, not theory
        </h2>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            background: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 14,
            padding: "2rem",
            marginBottom: "1.5rem",
            maxWidth: 760,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: NAVY,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            A
          </div>
          <div>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: 700, color: INK }}>Avi, Founder</h3>
            <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
              25+ years of experience in global, regional and local roles
              across large, medium and small pharmaceutical companies, with
              deep expertise launching, commercialising and building growth
              for product portfolios.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 14,
            padding: "2rem",
            marginBottom: "1.5rem",
            maxWidth: 760,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              marginBottom: "1rem",
              padding: "0.2rem 0.7rem",
              borderRadius: 4,
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "transparent",
              color: MUTED,
              border: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            Illustrative example
          </span>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: 700, color: INK }}>A representative engagement</h3>
          <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
            A mid-sized biopharma company approaching its first commercial
            launch in years engaged Launch Doctors for a Launch Health Check
            roughly 24 months ahead of anticipated approval. The assessment
            surfaced gaps in cross-functional alignment between medical,
            market access and commercial teams, along with unclear ownership
            across key launch milestones. The resulting recommendations
            informed an Integrated Launch Plan, giving leadership a single,
            governed view of the path to launch.
          </p>
          <p style={{ margin: "1rem 0 0", fontSize: "0.8125rem", color: MUTED, fontStyle: "italic" }}>
            Composite example for illustration — ask us for real client references.
          </p>
        </div>

        <blockquote
          style={{
            maxWidth: 760,
            margin: 0,
            padding: "2rem",
            borderLeft: `4px solid ${BLUE}`,
            background: "#ffffff",
            borderRadius: "0 14px 14px 0",
          }}
        >
          <p style={{ margin: "0 0 0.75rem", fontSize: "1.125rem", fontStyle: "italic", color: INK }}>
            &ldquo;Launch Doctors provided excellent strategic direction for
            the brand and leadership to the team, which has ensured an
            excellent foundation for the business moving forward.&rdquo;
          </p>
          <cite style={{ fontSize: "0.9375rem", color: MUTED, fontStyle: "normal" }}>— Client testimonial</cite>
        </blockquote>
      </div>
    </section>
  );
}
