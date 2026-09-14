import type { ScreenSources } from "@/assets/screens/manifest";
import { cx } from "@/lib/style";

interface PhoneMockupProps {
  sources: ScreenSources;
  alt: string;
  className?: string;
  /** Above-the-fold hero image: load eagerly with high fetch priority. */
  priority?: boolean;
  shadow?: boolean;
  /** Depth-of-field blur for background phones (full rendering tier only). */
  depthBlur?: boolean;
}

export default function PhoneMockup({
  sources,
  alt,
  className,
  priority = false,
  shadow = false,
  depthBlur = false,
}: PhoneMockupProps) {
  return (
    <div className={cx("relative", className)}>
      <div
        className={cx(
          "relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] border-[3px] border-secondary bg-background",
          shadow && "phone-shadow",
          depthBlur && "depth-blur"
        )}
      >
        <img
          src={sources.md}
          srcSet={`${sources.sm} 480w, ${sources.md} 768w`}
          sizes="(min-width: 768px) 320px, 240px"
          alt={alt}
          width={768}
          height={1664}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="block h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
