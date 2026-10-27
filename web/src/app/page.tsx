import Hero from "@/components/hero";
import StickyNav from "@/components/sticky-nav";
import HowWeHelp from "@/components/how-we-help";
import Experience from "@/components/experience";
import Team from "@/components/team";
import ClientLogos from "@/components/client-logos";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <StickyNav />
      <Hero />
      <AuroraBackground>
        <ClientLogos />
        <HowWeHelp />
        <Experience />
        <Team />
        <Contact />
        <Footer />
      </AuroraBackground>
    </div>
  );
}
