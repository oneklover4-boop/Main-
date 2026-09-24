import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <GlyphPortalDemo />
      <AuroraBackground>
        <WhoWeHelp />
        <HowWeHelp />
        <LaunchHealthCheck />
        <Experience />
        <Contact />
        <Footer />
      </AuroraBackground>
    </div>
  );
}
