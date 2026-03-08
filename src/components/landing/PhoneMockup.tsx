interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
}

const PhoneMockup = ({ src, alt, className = "" }: PhoneMockupProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2rem] overflow-hidden border-[3px] border-secondary bg-background aspect-[9/19.5]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-background rounded-b-2xl z-10" />
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top block"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PhoneMockup;
