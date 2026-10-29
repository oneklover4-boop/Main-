"use client";

import { BlurReveal } from "@/components/ui/blur-reveal";
import { FadeInView } from "@/components/ui/fade-in-view";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const BLUE = "#3476d1";
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
    title: "Founder and Director",
    bio: [
      "Avi has more than 24 years experience working in global, regional and local roles in large, medium and small pharmaceutical companies.",
      "Avi has extensive experience launching, commercialising and building growth for product portfolios, optimising brand performance across the full product lifecycle from Phase 1 through launch to loss of exclusivity, with experience in many major therapy areas, oncology and rare disease.",
      "Avi has successfully built, led, developed, engaged and motivated teams whilst maintaining focus on a clear strategy and tactical delivery through a leadership style that is clear, values-driven and empowering.",
    ],
  },
  {
    photo: "images/darcy-ryan-v3.jpg",
    name: "D’Arcy Ryan",
    title: "Associate",
    bio: [
      "D’Arcy Ryan is co-lead for this engagement and brings more than 25 years of pharmaceutical marketing experience across client and agency roles, multiple therapeutic areas, and brands ranging from large global products to rare-disease launches.",
      "At Takeda, D’Arcy led diabetes brands and the diabetes portfolio, participated on the Global Therapeutic Area Development Team, and led Marketing Operations. She also developed and led the process for cross-functional, cross-brand Commercial Planning Teams, building deep experience in launch planning, alignment, governance, and execution across functions.",
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
          flex:0 0 29%; min-width:0; position:relative; z-index:2;
          border-radius:12px; overflow:hidden; background:#ffffff;
          aspect-ratio: 1 / 1; box-shadow:0 1px 3px rgba(16,24,40,.08);
        }
        .team-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        .team-card{
          flex:0 0 78%; min-width:0; position:relative; z-index:1;
          margin-left:-7%; background:#ffffff; border-radius:8px;
          border-top:3px solid ${BLUE};
          box-shadow:0 16px 32px -18px rgba(4,53,128,.25);
          padding:1.5rem 2.5rem 1.75rem 5.5rem;
        }
        .team-name{ margin:0; font-size:1.625rem; font-weight:600; color:${BLUE}; }
        .team-role{ margin:0.2rem 0 0.75rem; font-size:1.0625rem; color:${BLUE}; }
        .team-bio{ margin:0; color:${MUTED}; font-size:0.9375rem; line-height:1.5; }
        .team-bio + .team-bio{ margin-top:0.75rem; }
        /* The header's own rounded+clipped box would otherwise nip the top
           corners of the outer panel; force it fully square to match the
           bottom corners. */
        .team-header-square{ border-radius:0 !important; }
        @media (max-width: 760px) {
          .team-row{ flex-direction:column; align-items:stretch; width:86%; }
          .team-photo{ flex:none; width:100%; aspect-ratio: 4 / 3; }
          .team-card{ flex:none; margin-left:0; margin-top:-1.5rem; width:calc(100% - 1.5rem); margin-inline:auto; padding:2rem 1.75rem; }
        }
      `}</style>

      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ background: "rgba(52, 118, 209, 0.16)", borderRadius: 0 }}>
          <SectionTabHeader label="Our Team" accent={BLUE} tint="transparent" className="team-header-square" />

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
                <FadeInView className="team-photo">
                  <img src={member.photo} alt={member.name} />
                </FadeInView>
                <FadeInView className="team-card" y={0}>
                  <h3 className="team-name">
                    <BlurReveal duration={0.5} delay={idx * 0.05}>{member.name}</BlurReveal>
                  </h3>
                  <p className="team-role">
                    <BlurReveal duration={0.5} delay={0.04 + idx * 0.05}>{member.title}</BlurReveal>
                  </p>
                  {member.bio.map((paragraph, i) => (
                    <p key={i} className="team-bio">
                      <BlurReveal duration={0.5} delay={0.1 + i * 0.05}>{paragraph}</BlurReveal>
                    </p>
                  ))}
                </FadeInView>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
