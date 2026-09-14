import type { ReactNode } from "react";
import { cssVars, cx } from "@/lib/style";

interface FloatingProps {
  children: ReactNode;
  className?: string;
  /** How far the element rises at the top of the loop, in px. */
  distance: number;
  durationS: number;
  delayS?: number;
}

/**
 * Endless idle bob. A CSS keyframe animation on `transform` only, so it never touches layout
 * or paint; it pauses whenever the nearest `[data-motion="off"]` ancestor is off-screen.
 */
export default function Floating({
  children,
  className,
  distance,
  durationS,
  delayS = 0,
}: FloatingProps) {
  return (
    <div
      className={cx("animate-float", className)}
      style={cssVars({
        "--float-distance": `${-distance}px`,
        "--float-duration": `${durationS}s`,
        "--float-delay": `${delayS}s`,
      })}
    >
      {children}
    </div>
  );
}
