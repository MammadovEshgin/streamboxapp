import { useEffect, useRef, useState } from "react";

export interface InViewOptions {
  /** Latch to `true` on the first intersection and stop observing. */
  once?: boolean;
  rootMargin?: string;
  /** Value before the observer first reports — also what the prerendered HTML uses. */
  initialInView?: boolean;
}

/** Tracks whether an element intersects the viewport using a single `IntersectionObserver`. */
export function useInView<T extends Element>({
  once = false,
  rootMargin = "0px",
  initialInView = false,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(initialInView);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries[entries.length - 1];
        if (!latest) return;
        setInView(latest.isIntersecting);
        if (latest.isIntersecting && once) observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, inView] as const;
}
