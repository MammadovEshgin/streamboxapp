import type { ScreenSources } from "@/assets/screens/manifest";

interface PhoneMockupProps {
  sources: ScreenSources;
  alt: string;
  className?: string;
  eager?: boolean;
}

const PhoneMockup = ({ sources, alt, className = "", eager = false }: PhoneMockupProps) => {
  const loading = eager ? "eager" : "lazy";

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[1.5rem] overflow-hidden border-[3px] border-secondary bg-background aspect-[9/19.5]">
        <img
          src={sources.md}
          srcSet={`${sources.sm} 480w, ${sources.md} 768w`}
          sizes="(min-width: 768px) 320px, 240px"
          alt={alt}
          className="w-full h-full object-cover object-top block"
          loading={loading}
          decoding="async"
          width={768}
          height={1664}
        />
      </div>
    </div>
  );
};

export default PhoneMockup;
