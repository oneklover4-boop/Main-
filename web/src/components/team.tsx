import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD_BORDER = "rgba(0, 0, 0, 0.06)";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

interface TeamMember {
  photo: string;
  name: string;
  title: string;
  bio: string[];
}

const team: TeamMember[] = [
  {
    photo: "images/avi-founder.jpg",
    name: "Avi Leaf",
    title: "Founder",
    bio: [
      "25+ years of global BioPharma and consulting experience across large, medium and small BioPharma companies, with deep expertise launching, commercialising and building growth for product portfolios.",
    ],
  },
  {
    photo: "images/darcy-ryan-v3.jpg",
    name: "D’Arcy Ryan",
    title: "Associate",
    bio: [
      "D’Arcy brings more than 25 years of Pharmaceutical marketing experience across client and agency roles, multiple therapeutic areas and brand ranging from large global products to rare disease launches. She has built deep expertise in launch planning, alignment, governance and execution across functions.",
    ],
  },
];

export default function Team() {
  return (
    <section id="team" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-team-card]{
          background:#ffffff;border:1px solid ${CARD_BORDER};border-radius:14px;
          box-shadow:0 1px 3px rgba(16,24,40,.04);
          transition:box-shadow .25s ease, transform .25s ease;
        }
        [data-team-card]:hover{box-shadow:0 24px 40px -16px rgba(4,53,128,.18);transform:translateY(-3px);}
        .team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.75rem;}
        .team-photo-ring{
          width:118px;height:118px;border-radius:50%;flex-shrink:0;
          background:linear-gradient(135deg, ${BLUE}, ${TEAL});
          padding:3px;
        }
        .team-photo-ring img{
          width:100%;height:100%;border-radius:50%;object-fit:cover;
          border:3px solid #ffffff;display:block;
        }
        .team-role-pill{
          display:inline-block;margin:0.5rem 0 1.25rem;padding:0.3rem 0.95rem;
          border-radius:999px;background:rgba(18,98,193,0.09);color:${BLUE};
          font-size:0.75rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;
        }
        @media (max-width: 760px) {
          .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Our Team"
          accent={BLUE}
          tint="rgba(18, 98, 193, 0.07)"
          description="The consultants leading your launch, with decades of hands-on BioPharma launch experience between them."
          descriptionColor={MUTED}
          className="mb-6"
        />

        <div className="team-grid">
          {team.map((member, idx) => (
            <div
              key={member.name}
              data-team-card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "2.75rem 2.25rem 2.5rem",
              }}
            >
              <div className="team-photo-ring">
                {/* Relative path (no leading slash) so it resolves correctly
                    whether the export is served from the site root (custom
                    domain) or under a GitHub Pages project subpath. */}
                <img src={member.photo} alt={member.name} />
              </div>

              <h3 style={{ margin: "1.25rem 0 0", fontSize: "1.5rem", fontWeight: 600, color: NAVY }}>
                <BlurReveal duration={0.5} delay={idx * 0.05}>{member.name}</BlurReveal>
              </h3>
              <span className="team-role-pill">
                <BlurReveal duration={0.5} delay={0.04 + idx * 0.05}>{member.title}</BlurReveal>
              </span>

              {member.bio.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "0.9rem 0 0",
                    color: MUTED,
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    textAlign: "left",
                  }}
                >
                  <BlurReveal duration={0.5} delay={0.1 + i * 0.05}>{paragraph}</BlurReveal>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
