import { screens } from "@/assets/screens/manifest";
import Floating from "@/components/Floating";
import PhoneMockup from "@/components/PhoneMockup";
import Reveal from "@/components/Reveal";
import { HIGHLIGHTS } from "@/content/features";
import { useInView } from "@/hooks/useInView";

export default function AppShowcase() {
  const [sectionRef, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      data-motion={inView ? "on" : "off"}
      className="relative overflow-hidden py-24 md:py-32 short:py-16"
    >
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal x={-40} y={0} className="relative flex justify-center">
            <div className="relative">
              <Floating distance={14} durationS={6}>
                <PhoneMockup
                  sources={screens.movieDetail}
                  alt="Movie detail"
                  shadow
                  className="w-48 max-w-[30vh] sm:w-56 md:w-64"
                />
              </Floating>
              <Floating
                distance={10}
                durationS={5}
                delayS={0.8}
                className="absolute -right-12 top-16 z-10 sm:-right-20"
              >
                <PhoneMockup
                  sources={screens.actor}
                  alt="Actor profile"
                  shadow
                  className="w-40 max-w-[24vh] sm:w-48 md:w-52"
                />
              </Floating>
            </div>
          </Reveal>

          <Reveal x={40} y={0} delayMs={150}>
            <p className="eyebrow">Why StreamBox</p>
            <h2 className="mb-6 font-display text-3xl font-bold text-gradient-white md:text-4xl lg:text-5xl">
              Your Entertainment, <span className="text-gradient-primary">Reimagined</span>
            </h2>
            <p className="mb-10 max-w-lg leading-relaxed text-muted-foreground">
              StreamBox isn't just another streaming app. It's a beautifully designed experience
              that combines streaming, discovery, and personal insights into one seamless platform.
            </p>

            <ul className="space-y-6">
              {HIGHLIGHTS.map(({ icon: Icon, title, description }, index) => (
                <li key={title}>
                  <Reveal
                    y={20}
                    delayMs={300 + index * 120}
                    durationMs={500}
                    className="group flex gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                      <Icon aria-hidden className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display font-semibold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
