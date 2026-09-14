import { useState } from "react";
import { Check } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";
import Reveal from "@/components/Reveal";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import SectionHeading from "@/components/SectionHeading";
import { SHOWCASE_TABS } from "@/content/showcase";
import { useExitTransition } from "@/hooks/useExitTransition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cssVars, cx } from "@/lib/style";

const PANEL_TRANSITION_MS = 350;
const PANEL_ID = "app-preview-panel";
const tabId = (index: number) => `app-preview-tab-${index}`;

export default function ScreenshotsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { current: shownIndex, isExiting } = useExitTransition(
    selectedIndex,
    reducedMotion ? 0 : PANEL_TRANSITION_MS
  );
  const tab = SHOWCASE_TABS[shownIndex];

  return (
    <section id="app-preview" className="relative overflow-hidden py-24 md:py-32 short:py-16">
      <div className="container">
        <SectionHeading
          className="mb-12"
          eyebrow="Inside the App"
          title="Beautifully Crafted"
          description="Every screen designed with obsessive attention to detail."
        />

        <Reveal y={10} delayMs={200} durationMs={500} className="mb-14 short:mb-8">
          <div
            role="tablist"
            aria-label="App screens"
            className="flex flex-wrap justify-center gap-2"
          >
            {SHOWCASE_TABS.map(({ label }, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={label}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={PANEL_ID}
                  onClick={() => setSelectedIndex(index)}
                  className={cx(
                    "rounded-[3px] px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="min-h-[480px] md:min-h-[600px]">
          <div
            key={shownIndex}
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={tabId(shownIndex)}
            data-state={isExiting ? "exit" : "enter"}
            style={cssVars({ "--panel-duration": `${PANEL_TRANSITION_MS}ms` })}
            className="tab-panel grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16"
          >
            <div className="flex justify-center md:justify-end">
              {tab.type === "single" ? (
                <PhoneMockup
                  sources={tab.sources}
                  alt={tab.label}
                  shadow
                  className="w-56 max-w-[38vh] sm:w-64 md:w-72"
                />
              ) : (
                <ScreenshotCarousel label={tab.label} slides={tab.slides} />
              )}
            </div>

            <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-primary">
                  {String(shownIndex + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-8 bg-primary/40" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {tab.label}
                </span>
              </div>

              <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-gradient-white md:text-3xl lg:text-4xl">
                {tab.tagline}
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">{tab.body}</p>

              <ul className="space-y-2.5">
                {tab.bullets.map((bullet, index) => (
                  <li
                    key={bullet}
                    className="animate-enter flex items-start justify-center gap-2.5 md:justify-start"
                    style={cssVars({
                      "--enter-x": "-8px",
                      "--enter-delay": `${150 + index * 70}ms`,
                      "--enter-duration": "300ms",
                    })}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check aria-hidden className="h-3 w-3 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/90">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
