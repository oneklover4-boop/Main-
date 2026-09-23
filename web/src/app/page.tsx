import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";

export default function Home() {
  return (
    <div style={{ background: "#f2f2f2" }}>
      <div style={{ display: "flex", minHeight: "100dvh", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <GlyphPortalDemo />
      </div>
      <WhoWeHelp />
      <HowWeHelp />
      <LaunchHealthCheck />
    </div>
  );
}
