import { useCallback, useEffect, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import type { ScreenSlide } from "@/content/showcase";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cx } from "@/lib/style";

interface ScreenshotCarouselProps {
  label: string;
  slides: readonly ScreenSlide[];
  autoplayMs?: number;
}

/**
 * Native CSS scroll-snap carousel. Swiping and programmatic smooth scrolling run on the
 * compositor thread, so it stays fluid on TV hardware where a JS-driven track janks.
 * Autoplay pauses off-screen, on hover or focus, and under reduced motion.
 */
export default function ScreenshotCarousel({
  label,
  slides,
  autoplayMs = 4000,
}: ScreenshotCarouselProps) {
  const [containerRef, inView] = useInView<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const scrollToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (index + slides.length) % slides.length;
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [slides.length, reducedMotion]
  );

  const syncActiveIndex = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const index = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth))
    );
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const isAutoplaying = autoplayMs > 0 && inView && !isPaused && !reducedMotion;

  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = window.setInterval(() => scrollToSlide(activeIndexRef.current + 1), autoplayMs);
    return () => window.clearInterval(timer);
  }, [isAutoplaying, autoplayMs, scrollToSlide]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="flex flex-col items-center"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={syncActiveIndex}
        className="scrollbar-none flex w-56 snap-x snap-mandatory overflow-x-auto overscroll-x-contain max-w-[38vh] sm:w-64 md:w-72"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            className="flex w-full shrink-0 snap-center justify-center"
          >
            <PhoneMockup sources={slide.sources} alt={slide.label} shadow className="w-full" />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={isActive}
              onClick={() => scrollToSlide(index)}
              className={cx(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                isActive
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
            />
          );
        })}
      </div>

      <p className="mt-3 text-xs font-medium text-muted-foreground">{slides[activeIndex]?.label}</p>
    </div>
  );
}
