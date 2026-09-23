import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

// One continuous wash for the whole page, so nothing resets to flat
// grey at a section boundary. The hero portal's own local gradient
// (glyph-portal-demo.tsx) fades to flat paper well before its box
// ends, matching this wash's base color there, so the two blend.
const PAGE_WASH = [
  "radial-gradient(circle 380px at 15% 4%, rgba(52,172,134,.5), transparent)",
  "radial-gradient(circle 380px at 88% 9%, rgba(18,98,193,.4), transparent)",
  "radial-gradient(circle 520px at 8% 22%, rgba(4,53,128,.24), transparent)",
  "radial-gradient(circle 520px at 90% 34%, rgba(52,172,134,.28), transparent)",
  "radial-gradient(circle 500px at 12% 48%, rgba(18,98,193,.24), transparent)",
  "radial-gradient(circle 520px at 88% 62%, rgba(4,53,128,.22), transparent)",
  "radial-gradient(circle 500px at 18% 77%, rgba(52,172,134,.26), transparent)",
  "radial-gradient(circle 520px at 82% 92%, rgba(18,98,193,.24), transparent)",
  "#f2f2f2",
].join(", ");

export default function Home() {
  return (
    <div style={{ background: PAGE_WASH }}>
      <GlyphPortalDemo />
      <WhoWeHelp />
      <HowWeHelp />
      <LaunchHealthCheck />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
