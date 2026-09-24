"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

// A soft, slowly shifting beam of light on a flat white background —
// not a page-wide color wash. The beam itself is a moving repeating
// gradient in brand teal/blue/navy, inverted and blended against a
// striped white layer (the classic "aurora" trick) so the colour
// visibly drifts and cycles rather than just sliding sideways, then
// masked into an ellipse so it reads as a beam rather than a tint
// covering the whole box.
export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)} {...props}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg, var(--ld-aurora-blue) 10%, var(--ld-aurora-teal) 15%, var(--ld-aurora-navy) 20%, var(--ld-aurora-teal) 25%, var(--ld-aurora-blue) 30%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "animate-aurora absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,200%] [background-position:50%_50%,50%_50%] opacity-40 blur-[8px] invert will-change-transform",
            "after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,100%] after:mix-blend-difference after:content-['']",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_20%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
