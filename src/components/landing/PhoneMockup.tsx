import type { ScreenSources } from "@/assets/screens/manifest";

type CommonProps = {
  alt: string;
  className?: string;
  eager?: boolean;
};

type PhoneMockupProps =
  | (CommonProps & { src: string; sources?: never })
  | (CommonProps & { sources: ScreenSources; src?: never });

const PhoneMockup = ({ alt, className = "", eager = false, ...rest }: PhoneMockupProps) => {
  const loading = eager ? "eager" : "lazy";
  const fetchPriority = eager ? "high" : "auto";

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[1.5rem] overflow-hidden border-[3px] border-secondary bg-background aspect-[9/19.5]">
        {"sources" in rest && rest.sources ? (
          <picture>
            <source
              type="image/avif"
              srcSet={`${rest.sources.avif.sm} 480w, ${rest.sources.avif.md} 768w`}
              sizes="(min-width: 768px) 320px, 240px"
            />
            <source
              type="image/webp"
              srcSet={`${rest.sources.webp.sm} 480w, ${rest.sources.webp.md} 768w`}
              sizes="(min-width: 768px) 320px, 240px"
            />
            <img
              src={rest.sources.jpg.md}
              srcSet={`${rest.sources.jpg.sm} 480w, ${rest.sources.jpg.md} 768w`}
              sizes="(min-width: 768px) 320px, 240px"
              alt={alt}
              className="w-full h-full object-cover object-top block"
              loading={loading}
              decoding="async"
              width={768}
              height={1664}
              // @ts-expect-error - valid HTML attribute, missing from older React types
              fetchpriority={fetchPriority}
            />
          </picture>
        ) : (
          <img
            src={(rest as { src: string }).src}
            alt={alt}
            className="w-full h-full object-cover object-top block"
            loading={loading}
            decoding="async"
            // @ts-expect-error - valid HTML attribute, missing from older React types
            fetchpriority={fetchPriority}
          />
        )}
      </div>
    </div>
  );
};

export default PhoneMockup;
