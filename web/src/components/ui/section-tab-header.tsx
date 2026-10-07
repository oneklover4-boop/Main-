import { BlurReveal } from "@/components/ui/blur-reveal";

interface SectionTabHeaderProps {
  label: string;
  accent: string;
  tint: string;
  description?: string;
  descriptionColor?: string;
  className?: string;
}

// The corner-tab header used across content sections: a tinted panel with
// a solid-color tab label standing in for the section heading (no separate
// big <h2> underneath it), plus an optional short supporting line.
export function SectionTabHeader({
  label,
  accent,
  tint,
  description,
  descriptionColor = "#4a4a4a",
  className,
}: SectionTabHeaderProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        background: tint,
        padding: description
          ? "4rem clamp(1.5rem, 4vw, 3rem) 2.5rem"
          : "4rem clamp(1.5rem, 4vw, 3rem) 2rem",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 56px 56px 0",
          borderColor: `transparent ${accent} transparent transparent`,
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: accent,
          color: "#ffffff",
          fontFamily: "var(--ld-font-heading)",
          fontWeight: 700,
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.65rem 1.5rem",
        }}
      >
        <BlurReveal duration={0.5}>{label}</BlurReveal>
      </span>
      {description && (
        <p style={{ margin: 0, maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: descriptionColor }}>
          <BlurReveal duration={0.5} delay={0.08}>{description}</BlurReveal>
        </p>
      )}
    </div>
  );
}
