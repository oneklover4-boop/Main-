"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// A slow-moving, low-opacity tinted gradient layer used as a shared
// backdrop behind the content sections (everything after the hero).
// One instance wraps all of them rather than one per section, so there's
// a single continuous layer instead of several independently-positioned
// ones that could show a seam where they meet (same lesson as the
// page-wide wash this replaces).
export function AuroraBackground({ children, className, ...props }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-aurora absolute -inset-[20%] opacity-[0.16] blur-[70px] will-change-transform"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, var(--ld-aurora-teal) 0%, var(--ld-aurora-blue) 14%, var(--ld-aurora-navy) 28%, var(--ld-aurora-blue) 42%, var(--ld-aurora-teal) 56%)",
            backgroundSize: "300% 300%",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
