import logo from "@/assets/logo.png";
import { cx } from "@/lib/style";

const SIZES = {
  sm: { gap: "gap-2", box: "h-7 w-7", px: 28, label: "text-sm font-semibold" },
  md: { gap: "gap-2.5", box: "h-9 w-9", px: 36, label: "text-lg font-bold tracking-tight" },
} as const;

interface BrandMarkProps {
  size: keyof typeof SIZES;
}

export default function BrandMark({ size }: BrandMarkProps) {
  const { gap, box, px, label } = SIZES[size];

  return (
    <span className={cx("group inline-flex items-center", gap)}>
      <span className={cx("relative flex items-center justify-center", box)}>
        <span aria-hidden className="logo-glow absolute inset-0 rounded-full" />
        <img
          src={logo}
          alt=""
          width={px}
          height={px}
          className={cx(
            "relative object-contain transition-transform duration-300 group-hover:scale-105",
            box
          )}
        />
      </span>
      <span
        className={cx(
          "font-display text-foreground transition-colors duration-300 group-hover:text-primary",
          label
        )}
      >
        StreamBox
      </span>
    </span>
  );
}
