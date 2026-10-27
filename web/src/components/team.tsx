import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const BLUE = "#1262c1";
const MUTED = "#000000";
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
        .team-row{
          position:relative; display:flex; align-items:center;
          width:73%; margin: 0 auto;
        }
        .team-photo{
          flex:0 0 59%; min-width:0; border-radius:12px; overflow:hidden;
          aspect-ratio: 3 / 2; box-shadow:0 1px 3px rgba(16,24,40,.08);
        }
        .team-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        .team-card{
          flex:0 0 48%; min-width:0; position:relative; z-index:1;
          margin-left:-7%; background:#ffffff; border-radius:8px;
          border-top:3px solid ${BLUE};
          box-shadow:0 16px 32px -18px rgba(4,53,128,.25);
          padding:1.5rem 1.75rem;
        }
        .team-role{ margin:0.1rem 0 0.75rem; font-size:1.0625rem; color:${BLUE}; }
        @media (max-width: 760px) {
          .team-row{ flex-direction:column; align-items:stretch; width:86%; }
          .team-photo{ flex:none; width:100%; }
          .team-card{ flex:none; margin-left:0; margin-top:-1.5rem; width:calc(100% - 1.5rem); margin-inline:auto; }
        }
      `}</style>

      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ background: "rgba(18, 98, 193, 0.14)", borderRadius: 0 }}>
          <SectionTabHeader label="Our Team" accent={BLUE} tint="transparent" />

          <div
            style={{
              padding: "0 0 clamp(2rem, 5vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {team.map((member, idx) => (
              <div className="team-row" key={member.name}>
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                <div className="team-card">
                  <h3 style={{ margin: 0, fontSize: "1.1875rem", fontWeight: 600, color: BLUE }}>
                    <BlurReveal duration={0.5} delay={idx * 0.05}>{member.name}</BlurReveal>
                  </h3>
                  <p className="team-role">
                    <BlurReveal duration={0.5} delay={0.04 + idx * 0.05}>{member.title}</BlurReveal>
                  </p>
                  {member.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        margin: i === 0 ? 0 : "0.75rem 0 0",
                        color: MUTED,
                        fontSize: "0.875rem",
                        lineHeight: 1.55,
                      }}
                    >
                      <BlurReveal duration={0.5} delay={0.1 + i * 0.05}>{paragraph}</BlurReveal>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
