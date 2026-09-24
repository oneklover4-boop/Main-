"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showBeamMask?: boolean;
}

// A slow, elegant beam of shifting brand colour (teal + blue only) on
// a background that stays predominantly white — concentrated in a
// vertical band from the middle to the right, fading to plain white
// on the left, rather than a wash across the whole box. One instance
// is meant to wrap every section it applies to, so the pattern is one
// continuous layer with nothing to mismatch where sections meet.
export function AuroraBackground({
  children,
  className,
  showBeamMask = true,
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
              "repeating-linear-gradient(100deg, var(--ld-aurora-teal) 0%, var(--ld-aurora-blue) 25%, var(--ld-aurora-teal) 50%, var(--ld-aurora-blue) 75%, var(--ld-aurora-teal) 100%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "animate-aurora absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,200%] [background-position:50%_50%,50%_50%] [background-attachment:fixed,fixed] opacity-[0.3] blur-[10px] invert will-change-transform",
            "after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,100%] after:[background-attachment:fixed,fixed] after:mix-blend-difference after:content-['']",
            showBeamMask &&
              "[mask-image:linear-gradient(90deg,transparent_0%,transparent_15%,black_55%,black_85%,transparent_100%)]"
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
