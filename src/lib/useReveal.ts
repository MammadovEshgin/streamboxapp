import { useEffect, useRef } from "react";

/**
 * Attach `.reveal` to a wrapper; this hook adds `.is-visible` on first
 * intersection. One observer per call site keeps the JS cheap.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: "-10% 0px", threshold: 0.05 },
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, options);

    el.querySelectorAll<HTMLElement>(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [options]);

  return ref;
};
