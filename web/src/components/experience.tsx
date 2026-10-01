import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-glass-card]{background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,.04);transition:box-shadow .2s ease,transform .2s ease;}
        [data-glass-card]:hover{box-shadow:0 16px 28px -8px rgba(0,0,0,.12);transform:translateY(-4px);}
        @media (max-width: 860px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Led by Real Launch Experience"
          accent={BLUE}
          tint="rgba(18, 98, 193, 0.07)"
          className="mb-6"
        />

        <div
          className="exp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          <div
            data-glass-card
            style={{
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 4,
              padding: "2.25rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                marginBottom: "1.25rem",
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
              <BlurReveal duration={0.5}>Illustrative example</BlurReveal>
            </span>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.25rem", fontWeight: 700, color: NAVY }}>
              <BlurReveal duration={0.5} delay={0.06}>A representative engagement</BlurReveal>
            </h3>
            <p style={{ margin: 0, color: MUTED, fontSize: "1.0625rem", lineHeight: 1.65 }}>
              <BlurReveal duration={0.5} delay={0.12}>
                A mid-sized biopharma company approaching its first commercial
                launch in years engaged Launch Doctors for a Launch Health Check
                roughly 24 months ahead of anticipated approval. The assessment
                surfaced gaps in cross-functional alignment between medical,
                market access and commercial teams, along with unclear ownership
                across key launch milestones. The resulting recommendations
                informed an Integrated Launch Plan, giving leadership a single,
                governed view of the path to launch.
              </BlurReveal>
            </p>
            <p style={{ margin: "1.25rem 0 0", fontSize: "0.8125rem", color: MUTED, fontStyle: "italic" }}>
              <BlurReveal duration={0.5} delay={0.18}>
                Composite example for illustration — ask us for real client references.
              </BlurReveal>
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              data-glass-card
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
                border: `1px solid ${CARD_BORDER}`,
                borderTop: `4px solid ${BLUE}`,
                borderRadius: 4,
                padding: "2rem",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: NAVY,
                  border: `3px solid ${TEAL}`,
                }}
              >
                {/* Relative path (no leading slash) so it resolves correctly
                    whether the export is served from the site root (custom
                    domain) or under a GitHub Pages project subpath. */}
                <img
                  src="images/avi-founder.jpg"
                  alt="Avi Leaf, Founder"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: 700, color: NAVY }}>
                  <BlurReveal duration={0.5}>Avi Leaf, Founder</BlurReveal>
                </h3>
                <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
                  <BlurReveal duration={0.5} delay={0.08}>
                    25+ years of global BioPharma and consulting experience
                    across large, medium and small BioPharma companies, with
                    deep expertise launching, commercialising and building growth
                    for product portfolios.
                  </BlurReveal>
                </p>
              </div>
            </div>

            <blockquote
              data-glass-card
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: 0,
                padding: "2rem",
                borderLeft: `4px solid ${BLUE}`,
                borderRadius: "0 4px 4px 0",
              }}
            >
              <p style={{ margin: "0 0 0.75rem", fontSize: "1.125rem", fontStyle: "italic", color: INK }}>
                <BlurReveal duration={0.5}>
                  &ldquo;Launch Doctors provided excellent strategic direction for
                  the brand and leadership to the team, which has ensured an
                  excellent foundation for the business moving forward.&rdquo;
                </BlurReveal>
              </p>
              <cite style={{ fontSize: "0.9375rem", color: MUTED, fontStyle: "normal" }}>
                <BlurReveal duration={0.5} delay={0.08}>— Client testimonial</BlurReveal>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
