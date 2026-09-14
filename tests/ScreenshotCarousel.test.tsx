import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import type { ScreenSlide } from "@/content/showcase";
import { setAllInView } from "./utils/intersectionObserver";
import { mockMatchMedia } from "./utils/matchMedia";

const SLIDES: ScreenSlide[] = ["One", "Two", "Three"].map((label) => ({
  label,
  sources: { sm: `/${label}-sm.webp`, md: `/${label}-md.webp` },
}));

const SLIDE_WIDTH = 200;
const AUTOPLAY_MS = 4000;

/** jsdom has no layout or scrolling, so emulate a snapping track that is one slide wide. */
function emulateScrolling() {
  const offsets = new WeakMap<Element, number>();
  const scrollTo = vi.fn(function (this: HTMLElement, options: ScrollToOptions) {
    offsets.set(this, options.left ?? 0);
    this.dispatchEvent(new Event("scroll"));
  });

  Object.defineProperties(HTMLElement.prototype, {
    clientWidth: { configurable: true, get: () => SLIDE_WIDTH },
    scrollLeft: {
      configurable: true,
      get(this: HTMLElement) {
        return offsets.get(this) ?? 0;
      },
      set(this: HTMLElement, value: number) {
        offsets.set(this, value);
      },
    },
    scrollTo: { configurable: true, value: scrollTo },
  });

  return scrollTo;
}

const renderCarousel = () =>
  render(<ScreenshotCarousel label="Stats" slides={SLIDES} autoplayMs={AUTOPLAY_MS} />);

const dot = (label: string) => screen.getByRole("button", { name: `Show ${label}` });

describe("ScreenshotCarousel", () => {
  let scrollTo: ReturnType<typeof emulateScrolling>;

  beforeEach(() => {
    scrollTo = emulateScrolling();
  });

  afterEach(() => {
    const prototype = HTMLElement.prototype as unknown as Record<string, unknown>;
    delete prototype.clientWidth;
    delete prototype.scrollLeft;
    delete prototype.scrollTo;
    vi.useRealTimers();
  });

  it("exposes a labelled carousel with one group per slide", () => {
    renderCarousel();

    expect(screen.getByRole("region", { name: "Stats" })).toHaveAttribute(
      "aria-roledescription",
      "carousel"
    );
    expect(screen.getAllByRole("group").map((slide) => slide.getAttribute("aria-label"))).toEqual([
      "1 of 3: One",
      "2 of 3: Two",
      "3 of 3: Three",
    ]);
  });

  it("scrolls to the chosen slide and marks its dot as current", () => {
    renderCarousel();

    fireEvent.click(dot("Three"));

    expect(scrollTo).toHaveBeenLastCalledWith({ left: 2 * SLIDE_WIDTH, behavior: "smooth" });
    expect(dot("Three")).toHaveAttribute("aria-current", "true");
    expect(dot("One")).toHaveAttribute("aria-current", "false");
    expect(screen.getByText("Three", { selector: "p" })).toBeInTheDocument();
  });

  it("follows native swipes", () => {
    renderCarousel();
    const track = screen.getAllByRole("group")[0]?.parentElement as HTMLElement;

    track.scrollLeft = SLIDE_WIDTH;
    fireEvent.scroll(track);

    expect(dot("Two")).toHaveAttribute("aria-current", "true");
  });

  it("autoplays only while on screen and wraps from the last slide to the first", () => {
    vi.useFakeTimers();
    renderCarousel();

    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_MS);
    });
    expect(scrollTo).not.toHaveBeenCalled();

    setAllInView(true);
    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_MS);
    });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH, behavior: "smooth" });

    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_MS * 2);
    });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
    expect(dot("One")).toHaveAttribute("aria-current", "true");
  });

  it("pauses autoplay while the pointer is over it", () => {
    vi.useFakeTimers();
    renderCarousel();
    setAllInView(true);

    fireEvent.pointerEnter(screen.getByRole("region"));
    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_MS * 3);
    });

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("never autoplays and jumps without smooth scrolling under reduced motion", () => {
    vi.useFakeTimers();
    mockMatchMedia({ reducedMotion: true });
    renderCarousel();
    setAllInView(true);

    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_MS * 3);
    });
    expect(scrollTo).not.toHaveBeenCalled();

    fireEvent.click(dot("Two"));
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH, behavior: "auto" });
  });
});
