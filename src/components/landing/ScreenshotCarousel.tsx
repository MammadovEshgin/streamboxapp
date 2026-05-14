import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import PhoneMockup from "./PhoneMockup";
import type { ScreenSources } from "@/assets/screens/manifest";

interface CarouselSlide {
  sources: ScreenSources;
  label: string;
}

interface ScreenshotCarouselProps {
  slides: CarouselSlide[];
  autoplayMs?: number;
}

const ScreenshotCarousel = ({ slides, autoplayMs = 4000 }: ScreenshotCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || autoplayMs <= 0) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, autoplayMs]);

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden w-56 sm:w-64 md:w-72" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.label} className="flex-[0_0_100%] min-w-0 flex justify-center">
              <PhoneMockup
                sources={slide.sources}
                alt={slide.label}
                className="w-56 sm:w-64 md:w-72 phone-shadow"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Show ${slide.label}`}
            aria-current={selectedIndex === i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-xs font-medium text-muted-foreground">
        {slides[selectedIndex]?.label}
      </p>
    </div>
  );
};

export default ScreenshotCarousel;
