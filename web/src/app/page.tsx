import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

// Same soft teal/blue/navy wash used inside the hero portal, stretched
// across the whole page (fixed-radius blobs positioned by percentage so
// they read as one continuous flow no matter how tall the page grows)
// so every section blends into the next instead of resetting to flat grey.
const PAGE_WASH = [
  "radial-gradient(circle 380px at 15% 4%, rgba(52,172,134,.16), transparent)",
  "radial-gradient(circle 380px at 88% 9%, rgba(18,98,193,.13), transparent)",
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
      <div style={{ display: "flex", minHeight: "100dvh", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <GlyphPortalDemo />
      </div>
      <WhoWeHelp />
      <HowWeHelp />
      <LaunchHealthCheck />
      <Experience />
      <Contact />
    </div>
  );
}
