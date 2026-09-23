import GlyphPortalDemo from "@/components/glyph-portal-demo";
import WhoWeHelp from "@/components/who-we-help";
import HowWeHelp from "@/components/how-we-help";
import LaunchHealthCheck from "@/components/launch-health-check";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

// Same wash as before (colors untouched) — but now on a single fixed
// layer pinned to the viewport instead of scrolling with the page.
// The old approach put this on the scrolling wrapper AND gave the
// hero portal its own separate local gradient faking a matching
// fade; those were two independently-computed gradients, and however
// closely tuned, they never matched pixel-for-pixel where they met —
// there was always a faint kink in the color right at the portal's
// box edge. A single fixed layer can't have that seam: it's the same
// paint everywhere, inside the portal and out, permanently — pinned
// so it doesn't need to change as you scroll (see glyph-portal-demo.tsx
// for how the portal now draws its own letter contrast on top of it).
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
    <div style={{ position: "relative" }}>
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, background: PAGE_WASH }} />
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
