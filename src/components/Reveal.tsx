import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cssVars, cx } from "@/lib/style";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Starting offset in px; the element settles at its natural position. */
  x?: number;
  y?: number;
  delayMs?: number;
  durationMs?: number;
}

/**
 * Fades and slides its children in the first time they scroll into view. The observer only
 * flips a data attribute; the motion itself is a CSS transition on `opacity`/`transform`,
 * which the browser runs on the compositor thread.
 */
export default function Reveal({
  children,
  className,
  x = 0,
  y = 24,
  delayMs = 0,
  durationMs = 700,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: "0px 0px -60px 0px" });

  return (
    <div
      ref={ref}
      className={cx("reveal", className)}
      data-revealed={inView || undefined}
      style={cssVars({
        "--reveal-x": `${x}px`,
        "--reveal-y": `${y}px`,
        "--reveal-delay": `${delayMs}ms`,
        "--reveal-duration": `${durationMs}ms`,
      })}
    >
      {children}
    </div>
  );
}
