import { Film, Play, Smartphone, Sparkles, TvMinimal } from "lucide-react";
import { screens } from "@/assets/screens/manifest";
import Floating from "@/components/Floating";
import PhoneMockup from "@/components/PhoneMockup";
import { useInView } from "@/hooks/useInView";
import { cssVars } from "@/lib/style";

const CHIPS = [
  { icon: Film, label: "Movies & series" },
  { icon: TvMinimal, label: "Track every episode" },
  { icon: Sparkles, label: "Personal insights" },
] as const;

export default function HeroSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ initialInView: true });

  return (
    <section
      ref={sectionRef}
      data-motion={inView ? "on" : "off"}
      className="film-grain relative flex min-h-[600px] items-center overflow-hidden bg-gradient-hero md:min-h-[700px] lg:min-h-[800px] xl:min-h-screen short:min-h-screen"
    >
      <div
        aria-hidden
        className="glow-hero pointer-events-none absolute left-1/2 top-1/4 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-[300px]"
      />

      <div className="container relative pb-12 pt-32 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40 short:pb-10 short:pt-24 shorter:pb-6 shorter:pt-[5.5rem]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8 shorter:grid-cols-[3fr_2fr]">
          <div
            className="animate-enter text-center md:text-left"
            style={cssVars({ "--enter-x": "-40px", "--enter-duration": "800ms" })}
          >
            <div
              className="animate-enter mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 short:mb-4 shorter:mb-3"
              style={cssVars({
                "--enter-y": "10px",
                "--enter-delay": "200ms",
                "--enter-duration": "500ms",
              })}
            >
              <Smartphone aria-hidden className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Now on Android
              </span>
            </div>

            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl short:mb-4 short:text-6xl shorter:text-5xl">
              <span className="text-gradient-white">Stream Movies.</span>
              <br />
              <span className="text-gradient-white">Binge Series.</span>
              <br />
              <span className="text-gradient-primary">All in One App.</span>
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg short:mb-6 shorter:mb-5 shorter:text-base">
              Discover what to watch next, track every episode, and see your taste come into focus —
              all from a single Android app.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2.5 rounded-[4px] bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-[filter] duration-200 hover:brightness-110"
              >
                <Play aria-hidden className="h-4 w-4 fill-current" />
                Start Watching
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-secondary/50"
              >
                Explore Features
              </a>
            </div>

            <ul
              className="animate-enter mt-10 flex flex-wrap items-center justify-center gap-2.5 md:justify-start short:mt-6 shorter:mt-5"
              style={cssVars({
                "--enter-y": "8px",
                "--enter-delay": "800ms",
                "--enter-duration": "500ms",
              })}
            >
              {CHIPS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5"
                >
                  <Icon aria-hidden className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              className="animate-enter relative"
              style={cssVars({
                "--enter-y": "60px",
                "--enter-delay": "300ms",
                "--enter-duration": "900ms",
              })}
            >
              <Floating
                distance={15}
                durationS={5}
                delayS={0.5}
                className="absolute -left-8 top-8 z-0 sm:-left-16"
              >
                <PhoneMockup
                  sources={screens.movieDetail}
                  alt="Movie detail screen"
                  depthBlur
                  className="w-36 max-w-[26vh] rotate-[-8deg] scale-90 opacity-50 sm:w-44 md:w-52"
                />
              </Floating>

              <Floating distance={20} durationS={6} className="relative z-10">
                <PhoneMockup
                  sources={screens.discover}
                  alt="Discover screen"
                  priority
                  shadow
                  className="w-52 max-w-[32vh] sm:w-60 md:w-72"
                />
              </Floating>

              <Floating
                distance={12}
                durationS={5.5}
                delayS={1}
                className="absolute -right-8 top-8 z-0 sm:-right-16"
              >
                <PhoneMockup
                  sources={screens.seriesDetailV2}
                  alt="Series detail screen"
                  depthBlur
                  className="w-36 max-w-[26vh] rotate-[8deg] scale-90 opacity-50 sm:w-44 md:w-52"
                />
              </Floating>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
