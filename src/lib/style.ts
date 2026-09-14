import type { CSSProperties } from "react";

/** Joins the truthy class names. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Inline style made only of CSS custom properties, typed as a key-checked record. */
export function cssVars(vars: Record<`--${string}`, string>): CSSProperties {
  return vars;
}
