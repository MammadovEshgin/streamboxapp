import type { ScreenSources } from "@/assets/screens/manifest";

type Loading = "eager" | "lazy";
type FetchPriority = "high" | "low" | "auto";

interface ScreenshotProps {
  sources: ScreenSources;
  alt: string;
  className?: string;
  loading?: Loading;
  fetchPriority?: FetchPriority;
  sizes?: string;
}

const Screenshot = ({
  sources,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "(min-width: 768px) 320px, 240px",
}: ScreenshotProps) => (
  <picture>
    <source
      type="image/avif"
      sizes={sizes}
      srcSet={`${sources.avif.sm} 480w, ${sources.avif.md} 768w`}
    />
    <source
      type="image/webp"
      sizes={sizes}
      srcSet={`${sources.webp.sm} 480w, ${sources.webp.md} 768w`}
    />
    <img
      src={sources.jpg.md}
      srcSet={`${sources.jpg.sm} 480w, ${sources.jpg.md} 768w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      // @ts-expect-error - valid HTML attribute, missing from older React types
      fetchpriority={fetchPriority}
      width={768}
      height={1664}
    />
  </picture>
);

export default Screenshot;
