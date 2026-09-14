import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cx } from "@/lib/style";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal y={20} durationMs={600} className={cx("text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mb-4 font-display text-3xl font-bold text-gradient-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-md text-muted-foreground">{description}</p>
    </Reveal>
  );
}
