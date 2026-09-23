import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

// One continuous wash for the whole page, so nothing resets to flat
// grey at a section boundary. The hero portal's own local gradient
// (glyph-portal-demo.tsx) fades to flat paper well before its box
// ends, matching this wash's base color there, so the two blend.
const PAGE_WASH = [
  "radial-gradient(circle 380px at 15% 4%, rgba(52,172,134,.5), transparent)",
  "radial-gradient(circle 380px at 88% 9%, rgba(18,98,193,.4), transparent)",
  "radial-gradient(circle 420px at 8% 24%, rgba(4,53,128,.09), transparent)",
  "radial-gradient(circle 420px at 90% 36%, rgba(52,172,134,.15), transparent)",
  "radial-gradient(circle 400px at 12% 50%, rgba(18,98,193,.11), transparent)",
  "radial-gradient(circle 420px at 88% 64%, rgba(4,53,128,.1), transparent)",
  "radial-gradient(circle 400px at 18% 79%, rgba(52,172,134,.14), transparent)",
  "radial-gradient(circle 420px at 82% 93%, rgba(18,98,193,.12), transparent)",
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
    </div>
  );
}
