import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const NAVY = "#043580";
const BLUE = "#1262c1";
const CARD_BORDER = "rgba(0, 0, 0, 0.06)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-exp-card]{
          background:#ffffff;border:1px solid ${CARD_BORDER};border-radius:14px;
          box-shadow:0 1px 3px rgba(16,24,40,.04);
          transition:box-shadow .25s ease, transform .25s ease;
        }
        [data-exp-card]:hover{box-shadow:0 24px 40px -16px rgba(4,53,128,.18);transform:translateY(-3px);}
        .exp-tag{
          display:inline-block;margin-bottom:1rem;padding:0.3rem 0.95rem;
          border-radius:999px;background:rgba(4,53,128,0.08);color:${NAVY};
          font-size:0.75rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;
        }
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
            data-exp-card
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2.5rem",
            }}
          >
            <span className="exp-tag">
              <BlurReveal duration={0.5}>Case Study</BlurReveal>
            </span>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.375rem", fontWeight: 700, color: NAVY }}>
              <BlurReveal duration={0.5} delay={0.06}>Client Example Request</BlurReveal>
            </h3>
            <p style={{ margin: 0, color: MUTED, fontSize: "1.0625rem", lineHeight: 1.7 }}>
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
          </div>

          <blockquote
            data-exp-card
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: 0,
              padding: "2.75rem 2.5rem 2.5rem",
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "1.5rem",
                fontSize: "5rem",
                lineHeight: 1,
                fontFamily: "var(--ld-font-heading)",
                color: "rgba(18, 98, 193, 0.14)",
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>
            <p style={{ position: "relative", margin: "0.5rem 0 1rem", fontSize: "1.125rem", fontStyle: "italic", color: INK }}>
              <BlurReveal duration={0.5}>
                &ldquo;Launch Doctors provided excellent strategic direction for
                the brand and leadership to the team, which has ensured an
                excellent foundation for the business moving forward.&rdquo;
              </BlurReveal>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: 28, height: 2, background: BLUE, flexShrink: 0 }} aria-hidden="true" />
              <cite style={{ fontSize: "0.9375rem", color: MUTED, fontStyle: "normal" }}>
                <BlurReveal duration={0.5} delay={0.08}>Client testimonial</BlurReveal>
              </cite>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
