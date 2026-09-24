import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const BLUE = "#1262c1";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-glass-card]{background:rgba(0,0,0,.05);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
        [data-glass-card]:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
          <BlurReveal duration={0.5}>Experience &amp; Case Studies</BlurReveal>
        </p>
        <h2 style={{ margin: "0 0 2rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
          <BlurReveal duration={0.5} delay={0.08}>Led by real launch experience, not theory</BlurReveal>
        </h2>

        <div
          data-glass-card
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
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
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: 700, color: INK }}>
              <BlurReveal duration={0.5}>Avi, Founder</BlurReveal>
            </h3>
            <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
              <BlurReveal duration={0.5} delay={0.08}>
                25+ years of experience in global, regional and local roles
                across large, medium and small pharmaceutical companies, with
                deep expertise launching, commercialising and building growth
                for product portfolios.
              </BlurReveal>
            </p>
          </div>
        </div>

        <div
          data-glass-card
          style={{
            display: "flex",
            flexDirection: "column",
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
            <BlurReveal duration={0.5}>Illustrative example</BlurReveal>
          </span>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: 700, color: INK }}>
            <BlurReveal duration={0.5} delay={0.06}>A representative engagement</BlurReveal>
          </h3>
          <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
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
          <p style={{ margin: "1rem 0 0", fontSize: "0.8125rem", color: MUTED, fontStyle: "italic" }}>
            <BlurReveal duration={0.5} delay={0.18}>
              Composite example for illustration — ask us for real client references.
            </BlurReveal>
          </p>
        </div>

        <blockquote
          data-glass-card
          style={{
            maxWidth: 760,
            margin: 0,
            padding: "2rem",
            borderLeft: `4px solid ${BLUE}`,
            borderRadius: "0 14px 14px 0",
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
    </section>
  );
}
